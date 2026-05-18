from __future__ import annotations

import asyncio
import json
import os
from dataclasses import asdict, dataclass, field
from datetime import datetime
import calendar
from fractions import Fraction
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    Message,
    ReplyKeyboardMarkup,
    WebAppInfo,
)

from calculator import (
    ScaledIngredient,
    ScaledRecipe,
    ShoppingItem,
    build_shopping_list,
    format_plan,
    format_quantity,
    format_shopping_list,
    parse_quantity,
    scale_recipe,
)
from recipes import RECIPES, SCALE_OPTIONS


DATA_DIR = Path("data")
MORNING_PLAN_FILE = DATA_DIR / "morning_plan.json"
SHOPPING_LIST_FILE = DATA_DIR / "shopping_list.json"
HISTORY_FILE = DATA_DIR / "history.json"
USER_SETTINGS_FILE = DATA_DIR / "user_settings.json"
DEFAULT_TIMEZONE = "Asia/Bangkok"
WEBAPP_VERSION = "20260518-products-source"


@dataclass
class UserPlan:
    selected_recipe_keys: list[str] = field(default_factory=list)
    scaled_recipes: list = field(default_factory=list)
    shopping_items: list[ShoppingItem] = field(default_factory=list)
    current_index: int = 0
    awaiting_custom_item: bool = False
    awaiting_ingredient_edit: tuple[int, int] | None = None


user_plans: dict[int, UserPlan] = {}


BOT_TEXT = {
    "ru": {
        "open_app": "Открыть Mini App",
        "morning_plan": "План на утро",
        "shopping_list": "Список покупок",
        "history": "История",
        "recipes": "Рецепты",
        "products": "Products",
        "language": "Язык",
        "start": (
            "Привет. Я помогу собрать план приготовления и список покупок.\n\n"
            "Выберите нужное действие в меню ниже."
        ),
        "open_app_prompt": "Удобнее собрать план в Mini App:",
        "saved": "План из Mini App сохранен.",
        "choose_language": "Выберите язык:",
        "language_saved": "Язык сохранен.",
        "empty_morning": "План на утро пока пустой.",
        "empty_shopping": "Список покупок пока пустой.",
        "empty_history": "История пока пустая.",
        "morning_title": "План на утро",
        "shopping_title": "Список покупок",
        "created_date": "Дата создания",
        "purchase_date": "Дата закупки",
        "purchased": "Куплено",
        "group_meat": "Мясо / рыба",
        "group_vegetables": "Овощи / зелень",
        "group_dairy": "Молочное / яйца",
        "group_grocery": "Бакалея / соусы",
        "group_other": "Прочее",
        "dish": "Блюдо",
        "volume": "Объем",
        "status": "Ст",
        "position": "Позиция",
        "quantity": "Кол-во",
        "tap_to_purchase": "Нажмите на позицию ниже, чтобы отметить покупку.",
        "history_title": "История планов:",
        "choose_date": "Выберите дату:",
        "choose_history_section": "Что открыть в истории?",
        "choose_plan_date": "План по дате",
        "choose_shopping_date": "Покупки по дате",
        "latest": "Последний",
        "no_records_for_date": "На эту дату записей нет.",
        "shopping_for_date": "Список покупок за дату",
        "plans_for_date": "Планы на дату",
        "back": "Назад",
        "month_names": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        "weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        "dishes": "Блюда",
        "shopping_positions": "Позиций к покупке",
        "not_set": "не указана",
        "updated": "Обновлено",
        "not_found": "Позиция не найдена",
    },
    "en": {
        "open_app": "Open Mini App",
        "morning_plan": "Morning plan",
        "shopping_list": "Shopping list",
        "history": "History",
        "recipes": "Recipes",
        "products": "Products",
        "language": "Language",
        "start": (
            "Hi. I will help prepare the cooking plan and shopping list.\n\n"
            "Choose an action from the menu below."
        ),
        "open_app_prompt": "It is easier to create the plan in the Mini App:",
        "saved": "Mini App plan saved.",
        "choose_language": "Choose language:",
        "language_saved": "Language saved.",
        "empty_morning": "Morning plan is empty.",
        "empty_shopping": "Shopping list is empty.",
        "empty_history": "History is empty.",
        "morning_title": "Morning plan",
        "shopping_title": "Shopping list",
        "created_date": "Created",
        "purchase_date": "Purchase date",
        "purchased": "Purchased",
        "group_meat": "Meat / fish",
        "group_vegetables": "Vegetables / herbs",
        "group_dairy": "Dairy / eggs",
        "group_grocery": "Grocery / sauces",
        "group_other": "Other",
        "dish": "Dish",
        "volume": "Volume",
        "status": "St",
        "position": "Item",
        "quantity": "Qty",
        "tap_to_purchase": "Tap an item below to mark it as purchased.",
        "history_title": "Plan history:",
        "choose_date": "Choose date:",
        "choose_history_section": "What do you want to open?",
        "choose_plan_date": "Plan by date",
        "choose_shopping_date": "Shopping by date",
        "latest": "Latest",
        "no_records_for_date": "No records for this date.",
        "shopping_for_date": "Shopping list for date",
        "plans_for_date": "Plans for date",
        "back": "Back",
        "month_names": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        "weekdays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "dishes": "Dishes",
        "shopping_positions": "Items to buy",
        "not_set": "not set",
        "updated": "Updated",
        "not_found": "Item not found",
    },
}


def load_env() -> None:
    if not os.path.exists(".env"):
        return

    with open(".env", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


def save_json(path: Path, payload: Any) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def load_json(path: Path) -> Any | None:
    if not path.exists():
        return None

    return json.loads(path.read_text(encoding="utf-8"))


def append_history(entry: dict[str, Any]) -> None:
    history = load_json(HISTORY_FILE)
    if not isinstance(history, list):
        history = []

    history.append(entry)
    save_json(HISTORY_FILE, history)


def get_user_lang(user_id: int | None) -> str:
    settings = load_json(USER_SETTINGS_FILE)
    if not isinstance(settings, dict) or user_id is None:
        return "ru"

    lang = settings.get(str(user_id), {}).get("lang")
    return lang if lang in BOT_TEXT else "ru"


def set_user_lang(user_id: int, lang: str) -> None:
    settings = load_json(USER_SETTINGS_FILE)
    if not isinstance(settings, dict):
        settings = {}

    settings[str(user_id)] = {"lang": lang if lang in BOT_TEXT else "ru"}
    save_json(USER_SETTINGS_FILE, settings)


def t(lang: str, key: str) -> str:
    return BOT_TEXT.get(lang, BOT_TEXT["ru"]).get(key, BOT_TEXT["ru"][key])


def tr(lang: str, key: str) -> Any:
    return BOT_TEXT.get(lang, BOT_TEXT["ru"]).get(key, BOT_TEXT["ru"][key])


def webapp_url_for_lang(lang: str, view: str = "plan") -> str | None:
    webapp_url = os.getenv("WEBAPP_URL")
    if not webapp_url:
        return None

    separator = "&" if "?" in webapp_url else "?"
    return f"{webapp_url}{separator}lang={lang}&view={view}&v={WEBAPP_VERSION}"


def recipe_keyboard(selected: list[str]) -> InlineKeyboardMarkup:
    buttons = []
    for key, recipe in RECIPES.items():
        mark = "✓ " if key in selected else ""
        buttons.append([InlineKeyboardButton(text=f"{mark}{recipe.name}", callback_data=f"recipe:{key}")])

    buttons.append([InlineKeyboardButton(text="Готово", callback_data="recipes_done")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def scale_keyboard(recipe_key: str) -> InlineKeyboardMarkup:
    buttons = []
    for option_key, (label, _) in SCALE_OPTIONS.items():
        buttons.append([InlineKeyboardButton(text=label, callback_data=f"scale:{recipe_key}:{option_key}")])

    return InlineKeyboardMarkup(inline_keyboard=buttons)


def plan_confirmation_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Подтвердить план", callback_data="confirm_plan")],
            [InlineKeyboardButton(text="Редактировать план", callback_data="edit_plan")],
            [InlineKeyboardButton(text="Начать заново", callback_data="restart_plan")],
        ]
    )


def plan_edit_keyboard(plan: UserPlan) -> InlineKeyboardMarkup:
    buttons = []
    buttons.append([InlineKeyboardButton(text="Редактировать продукты", callback_data="edit_ingredients")])
    for index, recipe in enumerate(plan.scaled_recipes):
        buttons.append([InlineKeyboardButton(text=f"Изменить объем: {recipe.name}", callback_data=f"edit_volume:{index}")])
        buttons.append([InlineKeyboardButton(text=f"Убрать: {recipe.name}", callback_data=f"remove_recipe:{index}")])

    buttons.append([InlineKeyboardButton(text="Вернуться к плану", callback_data="back_to_plan")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def volume_edit_keyboard(recipe_index: int) -> InlineKeyboardMarkup:
    buttons = []
    for option_key, (label, _) in SCALE_OPTIONS.items():
        buttons.append([InlineKeyboardButton(text=label, callback_data=f"update_volume:{recipe_index}:{option_key}")])

    buttons.append([InlineKeyboardButton(text="Назад", callback_data="edit_plan")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def ingredient_edit_keyboard(plan: UserPlan) -> InlineKeyboardMarkup:
    buttons = []
    for recipe_index, recipe in enumerate(plan.scaled_recipes):
        buttons.append([InlineKeyboardButton(text=recipe.name, callback_data="noop")])
        for ingredient_index, ingredient in enumerate(recipe.ingredients):
            buttons.append(
                [
                    InlineKeyboardButton(text=ingredient.name, callback_data="noop"),
                    InlineKeyboardButton(
                        text=format_ingredient_value_button(ingredient),
                        callback_data=f"edit_ingredient_value:{recipe_index}:{ingredient_index}",
                    ),
                ]
            )

    buttons.append([InlineKeyboardButton(text="Готово", callback_data="back_to_plan")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def shopping_edit_keyboard(items: list[ShoppingItem]) -> InlineKeyboardMarkup:
    buttons = []
    for index, item in enumerate(items):
        mark = "✓" if item.enabled else " "
        buttons.append([InlineKeyboardButton(text=f"{mark} {item.name}", callback_data=f"toggle_item:{index}")])

    buttons.append([InlineKeyboardButton(text="Добавить вручную", callback_data="add_custom_item")])
    buttons.append([InlineKeyboardButton(text="Подтвердить покупки", callback_data="confirm_shopping")])
    buttons.append([InlineKeyboardButton(text="Назад к плану", callback_data="back_to_plan")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def language_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Русский", callback_data="language:ru"),
                InlineKeyboardButton(text="English", callback_data="language:en"),
            ]
        ]
    )


def main_keyboard(lang: str) -> ReplyKeyboardMarkup | None:
    webapp_url = webapp_url_for_lang(lang)
    recipes_url = webapp_url_for_lang(lang, "recipes")
    products_url = webapp_url_for_lang(lang, "products")
    keyboard = []
    if webapp_url:
        keyboard.append([KeyboardButton(text=t(lang, "open_app"), web_app=WebAppInfo(url=webapp_url))])
    if recipes_url:
        keyboard.append([KeyboardButton(text=t(lang, "recipes"), web_app=WebAppInfo(url=recipes_url))])
    if products_url:
        keyboard.append([KeyboardButton(text=t(lang, "products"), web_app=WebAppInfo(url=products_url))])

    keyboard.extend(
        [
            [KeyboardButton(text=t(lang, "morning_plan")), KeyboardButton(text=t(lang, "shopping_list"))],
            [KeyboardButton(text=t(lang, "history")), KeyboardButton(text=t(lang, "language"))],
        ]
    )
    return ReplyKeyboardMarkup(
        keyboard=keyboard,
        resize_keyboard=True,
    )


async def start_plan(message: Message) -> None:
    user_plans[message.from_user.id] = UserPlan()
    await message.answer("Выберите, что закончилось:", reply_markup=recipe_keyboard([]))


async def show_next_scale_question(callback: CallbackQuery, plan: UserPlan) -> None:
    if plan.current_index >= len(plan.selected_recipe_keys):
        await show_plan(callback, plan)
        return

    recipe_key = plan.selected_recipe_keys[plan.current_index]
    recipe = RECIPES[recipe_key]
    await callback.message.edit_text(f"{recipe.name}: какой объем готовим?", reply_markup=scale_keyboard(recipe_key))


async def show_plan(callback: CallbackQuery, plan: UserPlan) -> None:
    await callback.message.edit_text(format_plan(plan.scaled_recipes), reply_markup=plan_confirmation_keyboard())


async def show_shopping_list(callback: CallbackQuery, plan: UserPlan) -> None:
    await callback.message.edit_text(
        format_shopping_list(plan.shopping_items) + "\n\nНажмите на позицию, чтобы убрать или вернуть ее.",
        reply_markup=shopping_edit_keyboard(plan.shopping_items),
    )


def find_recipe_key_by_name(name: str) -> str | None:
    for key, recipe in RECIPES.items():
        if recipe.name == name:
            return key
    return None


def format_ingredient_value_button(ingredient: ScaledIngredient) -> str:
    parts = []
    if ingredient.display_quantity:
        parts.append(ingredient.display_quantity)
    if ingredient.unit:
        parts.append(ingredient.unit)
    if not parts:
        return "задать"
    return " ".join(parts)


def adjust_ingredient_quantity(plan: UserPlan, recipe_index: int, ingredient_index: int, direction: int) -> bool:
    if recipe_index >= len(plan.scaled_recipes):
        return False

    recipe = plan.scaled_recipes[recipe_index]
    if ingredient_index >= len(recipe.ingredients):
        return False

    ingredient = recipe.ingredients[ingredient_index]
    current_quantity = parse_quantity(ingredient.display_quantity) or Fraction(0)
    new_quantity = current_quantity + ingredient_increment(ingredient.unit) * direction
    if new_quantity < 0:
        new_quantity = Fraction(0)

    ingredients = list(recipe.ingredients)
    ingredients[ingredient_index] = ScaledIngredient(
        name=ingredient.name,
        display_quantity=format_quantity(new_quantity),
        unit=ingredient.unit,
        note=ingredient.note,
    )
    plan.scaled_recipes[recipe_index] = ScaledRecipe(
        name=recipe.name,
        portions_label=recipe.portions_label,
        scale_label=recipe.scale_label,
        ingredients=tuple(ingredients),
    )
    return True


def set_ingredient_quantity(plan: UserPlan, recipe_index: int, ingredient_index: int, raw_value: str) -> bool:
    if recipe_index >= len(plan.scaled_recipes):
        return False

    recipe = plan.scaled_recipes[recipe_index]
    if ingredient_index >= len(recipe.ingredients):
        return False

    parsed = parse_quantity(raw_value.replace(",", "."))
    if parsed is None or parsed < 0:
        return False

    ingredient = recipe.ingredients[ingredient_index]
    ingredients = list(recipe.ingredients)
    ingredients[ingredient_index] = ScaledIngredient(
        name=ingredient.name,
        display_quantity=format_quantity(parsed),
        unit=ingredient.unit,
        note=ingredient.note,
    )
    plan.scaled_recipes[recipe_index] = ScaledRecipe(
        name=recipe.name,
        portions_label=recipe.portions_label,
        scale_label=recipe.scale_label,
        ingredients=tuple(ingredients),
    )
    return True


def ingredient_increment(unit: str) -> Fraction:
    if unit == "г":
        return Fraction(50)
    if unit == "ст. ложки":
        return Fraction(1)
    return Fraction(1)


def serializable_plan(plan: UserPlan) -> dict[str, Any]:
    return {
        "createdDate": today_label(),
        "recipes": [asdict(recipe) for recipe in plan.scaled_recipes],
    }


def serializable_shopping_list(plan: UserPlan) -> dict[str, Any]:
    return {
        "createdDate": today_label(),
        "purchaseDate": today_label(),
        "items": [asdict(item) for item in plan.shopping_items if item.enabled],
    }


def save_webapp_payload(payload: dict[str, Any]) -> None:
    recipes = normalize_webapp_recipes(payload)
    shopping_list = normalize_webapp_shopping_list(payload)
    product_check = payload.get("productCheck", [])
    created_date = payload.get("createdDate") or payload.get("cd") or today_label()
    purchase_date = payload.get("purchaseDate") or payload.get("pd") or created_date
    saved_at = payload.get("savedAt") or payload.get("at") or datetime.now(ZoneInfo(DEFAULT_TIMEZONE)).isoformat()
    history_entry = {
        "id": saved_at,
        "createdDate": created_date,
        "purchaseDate": purchase_date,
        "recipes": recipes,
        "productCheck": product_check,
        "shoppingList": shopping_list,
    }

    save_json(MORNING_PLAN_FILE, {"createdDate": created_date, "recipes": recipes, "productCheck": product_check})
    save_json(
        SHOPPING_LIST_FILE,
        {
            "createdDate": created_date,
            "purchaseDate": purchase_date,
            "items": [
                {
                    "name": item.get("name", ""),
                    "quantity": str(item.get("quantity", "")),
                    "unit": item.get("unit", ""),
                    "note": item.get("note", ""),
                    "enabled": True,
                    "purchased": False,
                }
                for item in shopping_list
            ]
        },
    )
    append_history(history_entry)


def normalize_webapp_recipes(payload: dict[str, Any]) -> list[dict[str, Any]]:
    if payload.get("recipes"):
        return payload["recipes"]

    return [
        {
            "name": item.get("n", ""),
            "scaleLabel": item.get("sl", ""),
            "portionsLabel": item.get("pl", ""),
        }
        for item in payload.get("r", [])
    ]


def normalize_webapp_shopping_list(payload: dict[str, Any]) -> list[dict[str, Any]]:
    if payload.get("shoppingList"):
        return payload["shoppingList"]

    return [
        {
            "name": item.get("n", ""),
            "quantity": item.get("q", ""),
            "unit": item.get("u", ""),
            "note": item.get("note", ""),
        }
        for item in payload.get("s", [])
    ]


def today_label() -> str:
    return datetime.now(ZoneInfo(DEFAULT_TIMEZONE)).strftime("%d.%m.%Y")


def format_saved_morning_plan(lang: str = "ru") -> str:
    payload = load_json(MORNING_PLAN_FILE)
    if not payload or not payload.get("recipes"):
        return t(lang, "empty_morning")

    created_date = payload.get("createdDate") or t(lang, "not_set")
    sections = [
        t(lang, "morning_title"),
        f"{t(lang, 'created_date')}: {created_date}",
        "",
        "```",
        f"N  {t(lang, 'dish'):<25} {t(lang, 'volume')}",
        "-- ------------------------- ----------------",
    ]
    for index, recipe in enumerate(payload["recipes"], start=1):
        scale_label = recipe.get("scale_label") or recipe.get("scaleLabel", "")
        portions_label = recipe.get("portions_label") or recipe.get("portionsLabel", "")
        sections.append(f"{index:<2} {recipe['name'][:25]:<25} {portions_label}")

    sections.append("```")
    return "\n".join(sections)


def load_shopping_payload() -> dict[str, Any] | None:
    payload = load_json(SHOPPING_LIST_FILE)
    if not payload or not payload.get("items"):
        return None
    return payload


def format_saved_shopping_list(lang: str = "ru") -> str:
    payload = load_shopping_payload()
    if not payload:
        return t(lang, "empty_shopping")

    created_date = payload.get("createdDate") or t(lang, "not_set")
    purchase_date = payload.get("purchaseDate") or t(lang, "not_set")
    items = payload["items"]
    purchased_count = sum(1 for item in items if item.get("purchased"))
    sections = [
        t(lang, "shopping_title"),
        f"{t(lang, 'created_date')}: {created_date}",
        f"{t(lang, 'purchase_date')}: {purchase_date}",
        f"{t(lang, 'purchased')}: {purchased_count}/{len(items)}",
        "",
        "```",
        f"N  {t(lang, 'status'):<3} {t(lang, 'position'):<23} {t(lang, 'quantity')}",
        "-- --- ----------------------- ----------",
    ]

    group_label_keys = dict(SHOPPING_GROUPS)
    for group, group_items in grouped_shopping_items(items):
        sections.append(f"{t(lang, group_label_keys[group])}")
        for index, item in group_items:
            status = "OK" if item.get("purchased") else "--"
            quantity = format_item_quantity(item)
            sections.append(f"{index + 1:<2} {status:<3} {item.get('name', '')[:23]:<23} {quantity}")

    sections.append("```")
    sections.append(t(lang, "tap_to_purchase"))
    return "\n".join(sections)


def format_item_quantity(item: dict[str, Any]) -> str:
    quantity = str(item.get("quantity", "")).strip()
    unit = str(item.get("unit", "")).strip()
    return f"{quantity} {unit}".strip()


SHOPPING_GROUPS = [
    ("meat", "group_meat"),
    ("vegetables", "group_vegetables"),
    ("dairy", "group_dairy"),
    ("grocery", "group_grocery"),
    ("other", "group_other"),
]


PRODUCT_GROUP_KEYWORDS = {
    "meat": [
        "beef",
        "chicken",
        "crab",
        "herring",
        "pork",
        "sausage",
        "говядина",
        "грудка",
        "краб",
        "кури",
        "мяс",
        "ножк",
        "палоч",
        "свинина",
        "селед",
        "сосиск",
    ],
    "vegetables": [
        "beet",
        "cabbage",
        "carrot",
        "cucumber",
        "dill",
        "garlic",
        "green onion",
        "mushroom",
        "onion",
        "potato",
        "radish",
        "ананас",
        "гриб",
        "зел",
        "капуст",
        "карто",
        "лук",
        "морков",
        "огур",
        "редиск",
        "свек",
        "укроп",
        "чеснок",
    ],
    "dairy": [
        "butter",
        "cheese",
        "cream",
        "egg",
        "milk",
        "sour cream",
        "масло слив",
        "молоко",
        "сметан",
        "сыр",
        "яйц",
    ],
    "grocery": [
        "corn",
        "mayonnaise",
        "oil",
        "paste",
        "pea",
        "pepper",
        "salt",
        "sugar",
        "vinegar",
        "майонез",
        "масло подсол",
        "паста",
        "перец",
        "сахар",
        "соль",
        "уксус",
        "горошек",
        "кукуруз",
    ],
}


def shopping_item_group(item: dict[str, Any]) -> str:
    name = str(item.get("name", "")).casefold()
    for group, keywords in PRODUCT_GROUP_KEYWORDS.items():
        if any(keyword in name for keyword in keywords):
            return group
    return "other"


def grouped_shopping_items(items: list[dict[str, Any]]) -> list[tuple[str, list[tuple[int, dict[str, Any]]]]]:
    grouped: dict[str, list[tuple[int, dict[str, Any]]]] = {group: [] for group, _ in SHOPPING_GROUPS}
    for index, item in enumerate(items):
        grouped[shopping_item_group(item)].append((index, item))

    return [(group, grouped[group]) for group, _ in SHOPPING_GROUPS if grouped[group]]


def shopping_tracking_keyboard(payload: dict[str, Any]) -> InlineKeyboardMarkup:
    buttons = []
    items = payload.get("items", [])
    for group, group_items in grouped_shopping_items(items):
        group_label_key = dict(SHOPPING_GROUPS)[group]
        buttons.append([InlineKeyboardButton(text=f"— {t('ru', group_label_key)} —", callback_data="noop")])
        for index, item in group_items:
            mark = "✓" if item.get("purchased") else "□"
            quantity = format_item_quantity(item)
            item_number = f"{index + 1:02d}"
            buttons.append(
                [
                    InlineKeyboardButton(
                        text=f"{item_number}  {mark}  {item.get('name', '')}  {quantity}".strip(),
                        callback_data=f"purchase_toggle:{index}",
                    )
                ]
            )

    buttons.append([InlineKeyboardButton(text="📅", callback_data="history_shopping_calendar")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


def plan_history_keyboard(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=f"📅 {t(lang, 'choose_plan_date')}", callback_data="history_plan_calendar")]
        ]
    )


def history_section_keyboard(lang: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=f"🛒 {t(lang, 'choose_shopping_date')}", callback_data="history_shopping_calendar")],
            [InlineKeyboardButton(text=f"🍳 {t(lang, 'choose_plan_date')}", callback_data="history_plan_calendar")],
        ]
    )


def calendar_keyboard(kind: str, lang: str, year: int | None = None, month: int | None = None) -> InlineKeyboardMarkup:
    dates = history_dates()
    available = set(dates)
    if year is None or month is None:
        year, month = latest_history_year_month()

    month_names = tr(lang, "month_names")
    weekdays = tr(lang, "weekdays")
    rows = [[InlineKeyboardButton(text=f"{month_names[month - 1]} {year}", callback_data="noop")]]
    rows.append([InlineKeyboardButton(text=day, callback_data="noop") for day in weekdays])

    for week in calendar.monthcalendar(year, month):
        row = []
        for day in week:
            if day == 0:
                row.append(InlineKeyboardButton(text=" ", callback_data="noop"))
                continue

            date = f"{day:02d}.{month:02d}.{year}"
            text = f"● {day}" if date in available else str(day)
            callback = f"history_{kind}:{date}" if date in available else "noop"
            row.append(InlineKeyboardButton(text=text, callback_data=callback))
        rows.append(row)

    prev_year, prev_month = shift_month(year, month, -1)
    next_year, next_month = shift_month(year, month, 1)
    rows.append(
        [
            InlineKeyboardButton(text="‹", callback_data=f"calendar:{kind}:{prev_year}:{prev_month}"),
            InlineKeyboardButton(text=t(lang, "back"), callback_data="history_sections"),
            InlineKeyboardButton(text="›", callback_data=f"calendar:{kind}:{next_year}:{next_month}"),
        ]
    )
    rows.append([InlineKeyboardButton(text=t(lang, "latest"), callback_data=f"history_{kind}:latest")])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def toggle_purchased(index: int) -> bool:
    payload = load_shopping_payload()
    if not payload or index >= len(payload.get("items", [])):
        return False

    item = payload["items"][index]
    item["purchased"] = not item.get("purchased", False)
    save_json(SHOPPING_LIST_FILE, payload)
    return True


def load_history() -> list[dict[str, Any]]:
    history = load_json(HISTORY_FILE)
    return history if isinstance(history, list) else []


def history_dates() -> list[str]:
    dates = {entry.get("createdDate") for entry in load_history() if entry.get("createdDate")}
    return sorted(dates, key=date_sort_key, reverse=True)


def latest_history_year_month() -> tuple[int, int]:
    dates = history_dates()
    if dates:
        day, month, year = dates[0].split(".")
        return int(year), int(month)

    now = datetime.now(ZoneInfo(DEFAULT_TIMEZONE))
    return now.year, now.month


def shift_month(year: int, month: int, delta: int) -> tuple[int, int]:
    month += delta
    while month < 1:
        month += 12
        year -= 1
    while month > 12:
        month -= 12
        year += 1
    return year, month


def date_sort_key(value: str) -> tuple[int, int, int]:
    try:
        day, month, year = value.split(".")
        return int(year), int(month), int(day)
    except ValueError:
        return 0, 0, 0


def date_year_month(value: str) -> tuple[int, int]:
    try:
        day, month, year = value.split(".")
        return int(year), int(month)
    except ValueError:
        return latest_history_year_month()


def history_entries_for_date(date: str) -> list[dict[str, Any]]:
    return [entry for entry in load_history() if entry.get("createdDate") == date]


def format_history_plans_for_date(date: str, lang: str = "ru") -> str:
    entries = history_entries_for_date(date)
    if not entries:
        return t(lang, "no_records_for_date")

    sections = [t(lang, "plans_for_date"), f"{t(lang, 'created_date')}: {date}", ""]
    for entry_index, entry in enumerate(entries, start=1):
        sections.append(f"{entry_index}. {entry.get('id', '')[:16]}")
        sections.append("```")
        sections.append(f"N  {t(lang, 'dish'):<25} {t(lang, 'volume')}")
        sections.append("-- ------------------------- ----------------")
        for recipe_index, recipe in enumerate(entry.get("recipes", []), start=1):
            portions_label = recipe.get("portions_label") or recipe.get("portionsLabel") or recipe.get("pl", "")
            sections.append(f"{recipe_index:<2} {recipe.get('name', recipe.get('n', ''))[:25]:<25} {portions_label}")
        sections.append("```")

    return "\n".join(sections)


def aggregate_shopping_for_date(date: str) -> list[dict[str, str]]:
    aggregated: dict[tuple[str, str], float] = {}
    display_quantities: dict[tuple[str, str], str] = {}
    for entry in history_entries_for_date(date):
        for item in entry.get("shoppingList", []):
            name = item.get("name", item.get("n", ""))
            unit = item.get("unit", item.get("u", ""))
            quantity = str(item.get("quantity", item.get("q", ""))).strip()
            key = (name, unit)
            parsed = parse_number(quantity)
            if parsed is None:
                display_quantities[key] = quantity
                aggregated.setdefault(key, 0)
            else:
                aggregated[key] = aggregated.get(key, 0) + parsed

    items = []
    for (name, unit), quantity in aggregated.items():
        if quantity:
            display_quantity = format_float(quantity)
        else:
            display_quantity = display_quantities.get((name, unit), "")
        items.append({"name": name, "quantity": display_quantity, "unit": unit})
    return items


def parse_number(value: str) -> float | None:
    try:
        return float(value.replace(",", "."))
    except ValueError:
        return None


def format_float(value: float) -> str:
    if value.is_integer():
        return str(int(value))
    return f"{value:.2f}".rstrip("0").rstrip(".")


def format_history_shopping_for_date(date: str, lang: str = "ru") -> str:
    entries = history_entries_for_date(date)
    if not entries:
        return t(lang, "no_records_for_date")

    items = aggregate_shopping_for_date(date)
    sections = [
        t(lang, "shopping_for_date"),
        f"{t(lang, 'created_date')}: {date}",
        "",
        "```",
        f"N  {t(lang, 'position'):<23} {t(lang, 'quantity')}",
        "-- ----------------------- ----------",
    ]
    for index, item in enumerate(items, start=1):
        quantity = f"{item['quantity']} {item['unit']}".strip()
        sections.append(f"{index:<2} {item['name'][:23]:<23} {quantity}")
    sections.append("```")
    return "\n".join(sections)


def format_history(lang: str = "ru", limit: int = 5) -> str:
    history = load_history()
    if not history:
        return t(lang, "empty_history")

    sections = [t(lang, "history_title")]
    for index, entry in enumerate(reversed(history[-limit:]), start=1):
        recipes = entry.get("recipes", [])
        shopping_list = entry.get("shoppingList", [])
        recipe_names = ", ".join(recipe.get("name", "") for recipe in recipes) or "без блюд"
        sections.append("")
        sections.append(f"{index}. {t(lang, 'created_date')}: {entry.get('createdDate', t(lang, 'not_set'))}")
        sections.append(f"   {t(lang, 'dishes')}: {recipe_names}")
        sections.append(f"   {t(lang, 'shopping_positions')}: {len(shopping_list)}")

    return "\n".join(sections)


async def main() -> None:
    load_env()
    token = os.getenv("BOT_TOKEN")
    if not token:
        raise RuntimeError("BOT_TOKEN is missing. Add it to .env or environment variables.")

    bot = Bot(token=token)
    dp = Dispatcher()

    @dp.message(Command("start"))
    async def handle_start(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        await message.answer(
            t(lang, "start"),
            reply_markup=main_keyboard(lang),
        )

    @dp.message(Command("plan"))
    async def handle_plan(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        webapp_url = os.getenv("WEBAPP_URL")
        if webapp_url:
            await message.answer(t(lang, "open_app_prompt"), reply_markup=main_keyboard(lang))
        else:
            await start_plan(message)

    @dp.message(Command("morning_plan"))
    async def handle_morning_plan(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        await message.answer(format_saved_morning_plan(lang), reply_markup=plan_history_keyboard(lang))

    @dp.message(Command("shopping_list"))
    async def handle_shopping_list(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        payload = load_shopping_payload()
        await message.answer(
            format_saved_shopping_list(lang),
            reply_markup=shopping_tracking_keyboard(payload) if payload else None,
        )

    @dp.message(Command("history"))
    async def handle_history(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        await message.answer(t(lang, "choose_history_section"), reply_markup=history_section_keyboard(lang))

    @dp.message(Command("language"))
    async def handle_language(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        await message.answer(t(lang, "choose_language"), reply_markup=language_keyboard())

    @dp.message(F.web_app_data)
    async def handle_webapp_data(message: Message) -> None:
        try:
            payload = json.loads(message.web_app_data.data)
        except json.JSONDecodeError:
            await message.answer("Не получилось прочитать данные Mini App.")
            return

        lang = get_user_lang(message.from_user.id)
        save_webapp_payload(payload)
        shopping_payload = load_shopping_payload()
        await message.answer(
            f"{t(lang, 'saved')}\n\n"
            f"{format_saved_morning_plan(lang)}\n\n"
            f"{format_saved_shopping_list(lang)}",
            reply_markup=shopping_tracking_keyboard(shopping_payload) if shopping_payload else None,
        )

    @dp.message(F.text == "План на утро")
    async def handle_morning_plan_button(message: Message) -> None:
        await message.answer(format_saved_morning_plan("ru"), reply_markup=plan_history_keyboard("ru"))

    @dp.message(F.text == "Morning plan")
    async def handle_morning_plan_button_en(message: Message) -> None:
        await message.answer(format_saved_morning_plan("en"), reply_markup=plan_history_keyboard("en"))

    @dp.message(F.text == "Список покупок")
    async def handle_shopping_list_button(message: Message) -> None:
        payload = load_shopping_payload()
        await message.answer(
            format_saved_shopping_list("ru"),
            reply_markup=shopping_tracking_keyboard(payload) if payload else None,
        )

    @dp.message(F.text == "Shopping list")
    async def handle_shopping_list_button_en(message: Message) -> None:
        payload = load_shopping_payload()
        await message.answer(
            format_saved_shopping_list("en"),
            reply_markup=shopping_tracking_keyboard(payload) if payload else None,
        )

    @dp.message(F.text == "История")
    async def handle_history_button(message: Message) -> None:
        await message.answer(t("ru", "choose_history_section"), reply_markup=history_section_keyboard("ru"))

    @dp.message(F.text == "History")
    async def handle_history_button_en(message: Message) -> None:
        await message.answer(t("en", "choose_history_section"), reply_markup=history_section_keyboard("en"))

    @dp.message(F.text.in_({"Язык", "Language"}))
    async def handle_language_button(message: Message) -> None:
        lang = get_user_lang(message.from_user.id)
        await message.answer(t(lang, "choose_language"), reply_markup=language_keyboard())

    @dp.callback_query(F.data.startswith("purchase_toggle:"))
    async def handle_purchase_toggle(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        index = int(callback.data.split(":", 1)[1])
        if not toggle_purchased(index):
            await callback.answer(t(lang, "not_found"), show_alert=True)
            return

        payload = load_shopping_payload()
        await callback.message.edit_text(
            format_saved_shopping_list(lang),
            reply_markup=shopping_tracking_keyboard(payload) if payload else None,
        )
        await callback.answer(t(lang, "updated"))

    @dp.callback_query(F.data == "history_sections")
    async def handle_history_sections(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        await callback.message.edit_text(t(lang, "choose_history_section"), reply_markup=history_section_keyboard(lang))
        await callback.answer()

    @dp.callback_query(F.data == "history_plan_calendar")
    async def handle_history_plan_calendar(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        await callback.message.edit_text(t(lang, "choose_date"), reply_markup=calendar_keyboard("plan", lang))
        await callback.answer()

    @dp.callback_query(F.data == "history_shopping_calendar")
    async def handle_history_shopping_calendar(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        await callback.message.edit_text(t(lang, "choose_date"), reply_markup=calendar_keyboard("shopping", lang))
        await callback.answer()

    @dp.callback_query(F.data.startswith("calendar:"))
    async def handle_calendar_month(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        _, kind, raw_year, raw_month = callback.data.split(":", 3)
        await callback.message.edit_text(
            t(lang, "choose_date"),
            reply_markup=calendar_keyboard(kind, lang, int(raw_year), int(raw_month)),
        )
        await callback.answer()

    @dp.callback_query(F.data.startswith("history_plan:"))
    async def handle_history_plan_date(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        date = callback.data.split(":", 1)[1]
        if date == "latest":
            await callback.message.edit_text(format_saved_morning_plan(lang), reply_markup=plan_history_keyboard(lang))
        else:
            await callback.message.edit_text(
                format_history_plans_for_date(date, lang),
                reply_markup=calendar_keyboard("plan", lang, *date_year_month(date)),
            )
        await callback.answer()

    @dp.callback_query(F.data.startswith("history_shopping:"))
    async def handle_history_shopping_date(callback: CallbackQuery) -> None:
        lang = get_user_lang(callback.from_user.id)
        date = callback.data.split(":", 1)[1]
        if date == "latest":
            payload = load_shopping_payload()
            await callback.message.edit_text(
                format_saved_shopping_list(lang),
                reply_markup=shopping_tracking_keyboard(payload) if payload else None,
            )
        else:
            await callback.message.edit_text(
                format_history_shopping_for_date(date, lang),
                reply_markup=calendar_keyboard("shopping", lang, *date_year_month(date)),
            )
        await callback.answer()

    @dp.callback_query(F.data.startswith("language:"))
    async def handle_language_select(callback: CallbackQuery) -> None:
        lang = callback.data.split(":", 1)[1]
        set_user_lang(callback.from_user.id, lang)
        await callback.message.answer(t(lang, "language_saved"), reply_markup=main_keyboard(lang))
        await callback.answer()

    @dp.message(F.text)
    async def handle_text(message: Message) -> None:
        plan = user_plans.get(message.from_user.id)
        if not plan:
            return

        text = message.text.strip()
        if plan.awaiting_ingredient_edit is not None:
            recipe_index, ingredient_index = plan.awaiting_ingredient_edit
            changed = set_ingredient_quantity(plan, recipe_index, ingredient_index, text)
            if not changed:
                await message.answer("Введите только число, например: 1250 или 2.5")
                return

            plan.awaiting_ingredient_edit = None
            await message.answer(
                format_plan(plan.scaled_recipes) + "\n\nНажмите на цифру рядом с продуктом, чтобы изменить ее.",
                reply_markup=ingredient_edit_keyboard(plan),
            )
            return

        if not plan.awaiting_custom_item:
            return

        if not text:
            await message.answer("Напишите позицию текстом, например: сливки 33% - 2 л.")
            return

        plan.shopping_items.append(ShoppingItem(name=text, quantity="", unit=""))
        plan.awaiting_custom_item = False
        await message.answer(format_shopping_list(plan.shopping_items), reply_markup=shopping_edit_keyboard(plan.shopping_items))

    @dp.callback_query(F.data.startswith("recipe:"))
    async def handle_recipe(callback: CallbackQuery) -> None:
        recipe_key = callback.data.split(":", 1)[1]
        plan = user_plans.setdefault(callback.from_user.id, UserPlan())

        if recipe_key in plan.selected_recipe_keys:
            plan.selected_recipe_keys.remove(recipe_key)
        else:
            plan.selected_recipe_keys.append(recipe_key)

        await callback.message.edit_reply_markup(reply_markup=recipe_keyboard(plan.selected_recipe_keys))
        await callback.answer()

    @dp.callback_query(F.data == "recipes_done")
    async def handle_recipes_done(callback: CallbackQuery) -> None:
        plan = user_plans.setdefault(callback.from_user.id, UserPlan())
        if not plan.selected_recipe_keys:
            await callback.answer("Выберите хотя бы одно блюдо", show_alert=True)
            return

        plan.current_index = 0
        plan.scaled_recipes = []
        plan.shopping_items = []
        await show_next_scale_question(callback, plan)
        await callback.answer()

    @dp.callback_query(F.data.startswith("scale:"))
    async def handle_scale(callback: CallbackQuery) -> None:
        _, recipe_key, option_key = callback.data.split(":", 2)
        plan = user_plans.setdefault(callback.from_user.id, UserPlan())
        label, factor = SCALE_OPTIONS.get(option_key, SCALE_OPTIONS["1"])
        plan.scaled_recipes.append(scale_recipe(RECIPES[recipe_key], Fraction(factor), label))
        plan.current_index += 1

        await show_next_scale_question(callback, plan)
        await callback.answer()

    @dp.callback_query(F.data == "edit_plan")
    async def handle_edit_plan(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan or not plan.scaled_recipes:
            await callback.answer("План пустой", show_alert=True)
            return

        await callback.message.edit_text("Что редактируем?", reply_markup=plan_edit_keyboard(plan))
        await callback.answer()

    @dp.callback_query(F.data == "edit_ingredients")
    async def handle_edit_ingredients(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan or not plan.scaled_recipes:
            await callback.answer("План пустой", show_alert=True)
            return

        await callback.message.edit_text(
            format_plan(plan.scaled_recipes) + "\n\nНажмите на цифру рядом с продуктом, чтобы изменить ее.",
            reply_markup=ingredient_edit_keyboard(plan),
        )
        await callback.answer()

    @dp.callback_query(F.data.startswith("edit_ingredient_value:"))
    async def handle_edit_ingredient_value(callback: CallbackQuery) -> None:
        _, raw_recipe_index, raw_ingredient_index = callback.data.split(":", 2)
        plan = user_plans.get(callback.from_user.id)
        if not plan:
            await callback.answer("План пустой", show_alert=True)
            return

        recipe_index = int(raw_recipe_index)
        ingredient_index = int(raw_ingredient_index)
        if recipe_index >= len(plan.scaled_recipes) or ingredient_index >= len(plan.scaled_recipes[recipe_index].ingredients):
            await callback.answer("Позиция не найдена", show_alert=True)
            return

        ingredient = plan.scaled_recipes[recipe_index].ingredients[ingredient_index]
        plan.awaiting_ingredient_edit = (recipe_index, ingredient_index)
        unit_label = f" {ingredient.unit}" if ingredient.unit else ""
        await callback.message.answer(
            f"Введите новое количество для позиции: {ingredient.name}{unit_label}\n"
            "Например: 1250"
        )
        await callback.answer()

    @dp.callback_query(F.data == "noop")
    async def handle_noop(callback: CallbackQuery) -> None:
        await callback.answer()

    @dp.callback_query(F.data.startswith("edit_volume:"))
    async def handle_edit_volume(callback: CallbackQuery) -> None:
        recipe_index = int(callback.data.split(":", 1)[1])
        plan = user_plans.get(callback.from_user.id)
        if not plan or recipe_index >= len(plan.scaled_recipes):
            await callback.answer("Блюдо не найдено", show_alert=True)
            return

        recipe = plan.scaled_recipes[recipe_index]
        await callback.message.edit_text(
            f"{recipe.name}: выберите новый объем",
            reply_markup=volume_edit_keyboard(recipe_index),
        )
        await callback.answer()

    @dp.callback_query(F.data.startswith("update_volume:"))
    async def handle_update_volume(callback: CallbackQuery) -> None:
        _, raw_index, option_key = callback.data.split(":", 2)
        recipe_index = int(raw_index)
        plan = user_plans.get(callback.from_user.id)
        if not plan or recipe_index >= len(plan.scaled_recipes):
            await callback.answer("Блюдо не найдено", show_alert=True)
            return

        recipe_key = find_recipe_key_by_name(plan.scaled_recipes[recipe_index].name)
        if not recipe_key:
            await callback.answer("Рецепт не найден", show_alert=True)
            return

        label, factor = SCALE_OPTIONS.get(option_key, SCALE_OPTIONS["1"])
        plan.scaled_recipes[recipe_index] = scale_recipe(RECIPES[recipe_key], Fraction(factor), label)
        await show_plan(callback, plan)
        await callback.answer("Объем обновлен")

    @dp.callback_query(F.data.startswith("remove_recipe:"))
    async def handle_remove_recipe(callback: CallbackQuery) -> None:
        recipe_index = int(callback.data.split(":", 1)[1])
        plan = user_plans.get(callback.from_user.id)
        if not plan or recipe_index >= len(plan.scaled_recipes):
            await callback.answer("Блюдо не найдено", show_alert=True)
            return

        del plan.scaled_recipes[recipe_index]
        if not plan.scaled_recipes:
            user_plans[callback.from_user.id] = UserPlan()
            await callback.message.edit_text("План пустой. Выберите, что закончилось:", reply_markup=recipe_keyboard([]))
        else:
            await show_plan(callback, plan)
        await callback.answer("Блюдо убрано")

    @dp.callback_query(F.data == "back_to_plan")
    async def handle_back_to_plan(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan or not plan.scaled_recipes:
            await callback.answer("План пустой", show_alert=True)
            return

        await show_plan(callback, plan)
        await callback.answer()

    @dp.callback_query(F.data == "confirm_plan")
    async def handle_confirm_plan(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan or not plan.scaled_recipes:
            await callback.answer("План пустой", show_alert=True)
            return

        plan.shopping_items = build_shopping_list(plan.scaled_recipes)
        save_json(MORNING_PLAN_FILE, serializable_plan(plan))
        await show_shopping_list(callback, plan)
        await callback.answer("План сохранен")

    @dp.callback_query(F.data.startswith("toggle_item:"))
    async def handle_toggle_item(callback: CallbackQuery) -> None:
        item_index = int(callback.data.split(":", 1)[1])
        plan = user_plans.get(callback.from_user.id)
        if not plan or item_index >= len(plan.shopping_items):
            await callback.answer("Позиция не найдена", show_alert=True)
            return

        item = plan.shopping_items[item_index]
        plan.shopping_items[item_index] = ShoppingItem(
            name=item.name,
            quantity=item.quantity,
            unit=item.unit,
            note=item.note,
            enabled=not item.enabled,
        )
        await show_shopping_list(callback, plan)
        await callback.answer()

    @dp.callback_query(F.data == "add_custom_item")
    async def handle_add_custom_item(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan:
            plan = UserPlan()
            user_plans[callback.from_user.id] = plan

        plan.awaiting_custom_item = True
        await callback.message.answer("Напишите позицию для списка покупок, например: сливки 33% - 2 л.")
        await callback.answer()

    @dp.callback_query(F.data == "confirm_shopping")
    async def handle_confirm_shopping(callback: CallbackQuery) -> None:
        plan = user_plans.get(callback.from_user.id)
        if not plan:
            await callback.answer("Список пустой", show_alert=True)
            return

        save_json(SHOPPING_LIST_FILE, serializable_shopping_list(plan))
        await callback.message.edit_text(
            format_shopping_list([item for item in plan.shopping_items if item.enabled]) + "\n\nСписок покупок подтвержден."
        )
        await callback.answer("Список сохранен")

    @dp.callback_query(F.data == "restart_plan")
    async def handle_restart_plan(callback: CallbackQuery) -> None:
        user_plans[callback.from_user.id] = UserPlan()
        await callback.message.edit_text("Выберите, что закончилось:", reply_markup=recipe_keyboard([]))
        await callback.answer()

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
