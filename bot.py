from __future__ import annotations

import asyncio
import json
import os
from dataclasses import asdict, dataclass, field
from datetime import datetime
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
DEFAULT_TIMEZONE = "Asia/Bangkok"


@dataclass
class UserPlan:
    selected_recipe_keys: list[str] = field(default_factory=list)
    scaled_recipes: list = field(default_factory=list)
    shopping_items: list[ShoppingItem] = field(default_factory=list)
    current_index: int = 0
    awaiting_custom_item: bool = False
    awaiting_ingredient_edit: tuple[int, int] | None = None


user_plans: dict[int, UserPlan] = {}


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


def main_keyboard() -> ReplyKeyboardMarkup | None:
    webapp_url = os.getenv("WEBAPP_URL")
    if not webapp_url:
        return None

    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Открыть Mini App", web_app=WebAppInfo(url=webapp_url))],
            [KeyboardButton(text="План на утро"), KeyboardButton(text="Список покупок")],
        ],
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
        "recipes": [asdict(recipe) for recipe in plan.scaled_recipes],
    }


def serializable_shopping_list(plan: UserPlan) -> dict[str, Any]:
    return {
        "purchaseDate": today_label(),
        "items": [asdict(item) for item in plan.shopping_items if item.enabled],
    }


def save_webapp_payload(payload: dict[str, Any]) -> None:
    recipes = payload.get("recipes", [])
    shopping_list = payload.get("shoppingList", [])
    purchase_date = payload.get("purchaseDate") or today_label()

    save_json(MORNING_PLAN_FILE, {"recipes": recipes})
    save_json(
        SHOPPING_LIST_FILE,
        {
            "purchaseDate": purchase_date,
            "items": [
                {
                    "name": item.get("name", ""),
                    "quantity": str(item.get("quantity", "")),
                    "unit": item.get("unit", ""),
                    "note": item.get("note", ""),
                    "enabled": True,
                }
                for item in shopping_list
            ]
        },
    )


def today_label() -> str:
    return datetime.now(ZoneInfo(DEFAULT_TIMEZONE)).strftime("%d.%m.%Y")


def format_saved_morning_plan() -> str:
    payload = load_json(MORNING_PLAN_FILE)
    if not payload or not payload.get("recipes"):
        return "План на утро пока пустой."

    sections = ["План на утро:"]
    for recipe in payload["recipes"]:
        scale_label = recipe.get("scale_label") or recipe.get("scaleLabel", "")
        portions_label = recipe.get("portions_label") or recipe.get("portionsLabel", "")
        sections.append(f"- {recipe['name']} - {scale_label}, {portions_label}")

    return "\n".join(sections)


def format_saved_shopping_list() -> str:
    payload = load_json(SHOPPING_LIST_FILE)
    if not payload or not payload.get("items"):
        return "Список покупок пока пустой."

    items = [ShoppingItem(**item) for item in payload["items"]]
    purchase_date = payload.get("purchaseDate") or "не указана"
    return f"Дата закупки: {purchase_date}\n\n{format_shopping_list(items)}"


async def main() -> None:
    load_env()
    token = os.getenv("BOT_TOKEN")
    if not token:
        raise RuntimeError("BOT_TOKEN is missing. Add it to .env or environment variables.")

    bot = Bot(token=token)
    dp = Dispatcher()

    @dp.message(Command("start"))
    async def handle_start(message: Message) -> None:
        await message.answer(
            "Привет. Я помогу собрать план приготовления и список покупок.\n\n"
            "Команды:\n"
            "/plan - собрать новый план\n"
            "/morning_plan - план на утро\n"
            "/shopping_list - список покупок",
            reply_markup=main_keyboard(),
        )

    @dp.message(Command("plan"))
    async def handle_plan(message: Message) -> None:
        webapp_url = os.getenv("WEBAPP_URL")
        if webapp_url:
            await message.answer("Удобнее собрать план в Mini App:", reply_markup=main_keyboard())
        else:
            await start_plan(message)

    @dp.message(Command("morning_plan"))
    async def handle_morning_plan(message: Message) -> None:
        await message.answer(format_saved_morning_plan())

    @dp.message(Command("shopping_list"))
    async def handle_shopping_list(message: Message) -> None:
        await message.answer(format_saved_shopping_list())

    @dp.message(F.web_app_data)
    async def handle_webapp_data(message: Message) -> None:
        try:
            payload = json.loads(message.web_app_data.data)
        except json.JSONDecodeError:
            await message.answer("Не получилось прочитать данные Mini App.")
            return

        save_webapp_payload(payload)
        await message.answer(
            "План из Mini App сохранен.\n\n"
            f"{format_saved_morning_plan()}\n\n"
            f"{format_saved_shopping_list()}"
        )

    @dp.message(F.text == "План на утро")
    async def handle_morning_plan_button(message: Message) -> None:
        await message.answer(format_saved_morning_plan())

    @dp.message(F.text == "Список покупок")
    async def handle_shopping_list_button(message: Message) -> None:
        await message.answer(format_saved_shopping_list())

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
