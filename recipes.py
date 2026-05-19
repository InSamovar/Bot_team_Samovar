from __future__ import annotations

import json
import re
from fractions import Fraction
from pathlib import Path
from typing import Any

from calculator import Ingredient, Recipe


RECIPE_DATA_FILE = Path(__file__).parent / "webapp" / "data" / "recipes.json"


def localized(value: Any, lang: str = "ru") -> str:
    if isinstance(value, dict):
        return str(value.get(lang) or value.get("ru") or value.get("en") or "")
    return str(value or "")


def parse_fraction(value: Any) -> Fraction | None:
    if value in ("", None):
        return None
    return Fraction(str(value).replace(",", "."))


def parse_portions(value: Any) -> int:
    match = re.search(r"\d+(?:[.,]\d+)?", str(value or ""))
    if not match:
        return 1
    return max(1, int(Fraction(match.group(0).replace(",", "."))))


def load_recipes(path: Path = RECIPE_DATA_FILE) -> dict[str, Recipe]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    raw_recipes = payload.get("recipes", {})
    recipes: dict[str, Recipe] = {}

    for key, raw_recipe in raw_recipes.items():
        ingredients = []
        for raw_ingredient in raw_recipe.get("ingredients", []):
            ingredients.append(
                Ingredient(
                    name=localized(raw_ingredient.get("name")),
                    quantity=parse_fraction(raw_ingredient.get("quantity")),
                    unit=localized(raw_ingredient.get("unit")),
                    note=localized(raw_ingredient.get("note")),
                )
            )

        recipes[key] = Recipe(
            name=localized(raw_recipe.get("name")),
            portions=parse_portions(raw_recipe.get("portions")),
            ingredients=tuple(ingredients),
        )

    return recipes


RECIPES: dict[str, Recipe] = load_recipes()

SCALE_OPTIONS = {
    "1": ("Полный объем", Fraction(1, 1)),
    "2": ("25% меньше", Fraction(3, 4)),
    "3": ("50% меньше", Fraction(1, 2)),
    "4": ("75% меньше", Fraction(1, 4)),
}
