from __future__ import annotations

import glob
import json
import sqlite3
from pathlib import Path
from typing import Any


TELEGRAM_STORAGE_GLOB = (
    "/Users/admin1/Library/Containers/ru.keepcoder.Telegram/Data/Library/WebKit/"
    "WebsiteData/**/LocalStorage/localstorage.sqlite3"
)
OUTPUT_DIR = Path("webapp/data")
RECIPES_OUTPUT = OUTPUT_DIR / "recipes.json"
PRODUCTS_OUTPUT = OUTPUT_DIR / "products.json"

CATEGORY_LABELS = {
    "crepes": {"ru": "Crepes", "en": "Crepes"},
    "soup_hot": {"ru": "Soup&hot", "en": "Soup&hot"},
    "salads": {"ru": "Salads", "en": "Salads"},
    "pelmeni_vareniki": {"ru": "Pelmeni&Vareniki", "en": "Pelmeni&Vareniki"},
    "desserts": {"ru": "Desserts", "en": "Desserts"},
    "drinks": {"ru": "Drinks", "en": "Drinks"},
}

CATEGORIES = [
    {"key": "crepes", "legacyKeys": ["pancakes"], "label": CATEGORY_LABELS["crepes"], "icon": "🥞"},
    {"key": "soup_hot", "legacyKeys": ["hot"], "label": CATEGORY_LABELS["soup_hot"], "icon": "🔥"},
    {"key": "salads", "legacyKeys": [], "label": CATEGORY_LABELS["salads"], "icon": "🥗"},
    {"key": "pelmeni_vareniki", "legacyKeys": ["dumplings"], "label": CATEGORY_LABELS["pelmeni_vareniki"], "icon": "🥟"},
    {"key": "desserts", "legacyKeys": [], "label": CATEGORY_LABELS["desserts"], "icon": "🍰"},
    {"key": "drinks", "legacyKeys": [], "label": CATEGORY_LABELS["drinks"], "icon": "🥤"},
]


def decode_storage_value(value: bytes | str) -> str:
    if isinstance(value, str):
        return value

    for encoding in ("utf-16le", "utf-16", "utf-8"):
        try:
            return value.decode(encoding)
        except UnicodeDecodeError:
            continue

    return value.decode("utf-8", errors="replace")


def load_storage_payload() -> tuple[dict[str, Any], list[dict[str, Any]], dict[str, Any]]:
    for path in glob.glob(TELEGRAM_STORAGE_GLOB, recursive=True):
        try:
            connection = sqlite3.connect(path)
            rows = dict(
                connection.execute(
                    "select key, value from ItemTable where key in "
                    "('samovarDishes', 'samovarProducts', 'samovarRecipeLinks')"
                )
            )
        except sqlite3.Error:
            continue
        finally:
            try:
                connection.close()
            except Exception:
                pass

        if {"samovarDishes", "samovarProducts", "samovarRecipeLinks"}.issubset(rows):
            dishes = json.loads(decode_storage_value(rows["samovarDishes"]))
            products = json.loads(decode_storage_value(rows["samovarProducts"]))
            recipe_links = json.loads(decode_storage_value(rows["samovarRecipeLinks"]))
            return dishes, products, recipe_links

    raise FileNotFoundError("Telegram LocalStorage with Samovar recipes was not found")


def normalize_category(category: str | None) -> str:
    if category == "hot":
        return "soup_hot"
    if category == "pancakes":
        return "crepes"
    if category == "dumplings":
        return "pelmeni_vareniki"
    return category or "soup_hot"


def product_name(product: dict[str, Any] | None) -> dict[str, str]:
    if not product:
        return {"ru": "", "en": ""}
    return {"ru": str(product.get("ru") or ""), "en": str(product.get("en") or product.get("ru") or "")}


def ingredient_with_product_names(raw: dict[str, Any], products_by_id: dict[str, dict[str, Any]]) -> dict[str, Any]:
    product = products_by_id.get(str(raw.get("productId") or ""))
    ingredient = {
        "productId": raw.get("productId") or "",
        "name": raw.get("name") or product_name(product),
        "quantity": raw.get("quantity") or "",
        "unit": raw.get("unit") or product.get("unit", "") if product else raw.get("unit") or "",
    }
    if raw.get("note"):
        ingredient["note"] = raw["note"]
    return ingredient


def main() -> None:
    dishes, products, recipe_links = load_storage_payload()
    products_by_id = {str(product.get("id")): product for product in products}
    recipes: dict[str, Any] = {}

    for key, raw_dish in dishes.items():
        raw_ingredients = recipe_links.get(key) or raw_dish.get("ingredients") or []
        recipes[key] = {
            "name": raw_dish.get("name") or {"ru": key, "en": key},
            "category": normalize_category(raw_dish.get("category")),
            "icon": raw_dish.get("icon") or "🍽",
            "portions": raw_dish.get("portions") or "",
            "shelfLife": raw_dish.get("shelfLife"),
            "ingredients": [
                ingredient_with_product_names(raw_ingredient, products_by_id)
                for raw_ingredient in raw_ingredients
            ],
        }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    RECIPES_OUTPUT.write_text(
        json.dumps({"version": 2, "categories": CATEGORIES, "recipes": recipes}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    PRODUCTS_OUTPUT.write_text(
        json.dumps({"version": 1, "products": products}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(json.dumps({"recipes": len(recipes), "products": len(products)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
