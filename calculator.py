from __future__ import annotations

from dataclasses import dataclass
from fractions import Fraction
from typing import Iterable


@dataclass(frozen=True)
class Ingredient:
    name: str
    quantity: Fraction | None
    unit: str
    note: str = ""


@dataclass(frozen=True)
class Recipe:
    name: str
    portions: int
    ingredients: tuple[Ingredient, ...]


@dataclass(frozen=True)
class ScaledIngredient:
    name: str
    display_quantity: str
    unit: str
    note: str = ""


@dataclass(frozen=True)
class ScaledRecipe:
    name: str
    portions_label: str
    scale_label: str
    ingredients: tuple[ScaledIngredient, ...]


@dataclass(frozen=True)
class ShoppingItem:
    name: str
    quantity: str
    unit: str
    note: str = ""
    enabled: bool = True


def scale_recipe(recipe: Recipe, factor: Fraction, scale_label: str) -> ScaledRecipe:
    portions = recipe.portions * factor
    return ScaledRecipe(
        name=recipe.name,
        portions_label=format_portions(portions),
        scale_label=scale_label,
        ingredients=tuple(scale_ingredient(ingredient, factor) for ingredient in recipe.ingredients),
    )


def scale_ingredient(ingredient: Ingredient, factor: Fraction) -> ScaledIngredient:
    if ingredient.quantity is None:
        return ScaledIngredient(
            name=ingredient.name,
            display_quantity="",
            unit=ingredient.unit,
            note=ingredient.note,
        )

    return ScaledIngredient(
        name=ingredient.name,
        display_quantity=format_quantity(ingredient.quantity * factor),
        unit=ingredient.unit,
        note=ingredient.note,
    )


def format_plan(scaled_recipes: Iterable[ScaledRecipe]) -> str:
    sections: list[str] = ["План приготовления:"]

    for recipe in scaled_recipes:
        sections.append("")
        sections.append(f"{recipe.name} - {recipe.scale_label}, {recipe.portions_label}")
        for ingredient in recipe.ingredients:
            parts = [f"- {ingredient.name}"]
            if ingredient.display_quantity:
                parts.append(f" - {ingredient.display_quantity}")
            if ingredient.unit:
                parts.append(f" {ingredient.unit}")
            if ingredient.note:
                parts.append(f" ({ingredient.note})")
            sections.append("".join(parts))

    return "\n".join(sections)


def build_shopping_list(scaled_recipes: Iterable[ScaledRecipe]) -> list[ShoppingItem]:
    items: dict[tuple[str, str, str], Fraction | None] = {}
    displays: dict[tuple[str, str, str], str] = {}

    for recipe in scaled_recipes:
        for ingredient in recipe.ingredients:
            key = (ingredient.name, ingredient.unit, ingredient.note)
            parsed = parse_quantity(ingredient.display_quantity)
            if key not in items:
                items[key] = parsed
                displays[key] = ingredient.display_quantity
                continue

            if items[key] is None or parsed is None:
                displays[key] = ingredient.display_quantity or displays[key]
                items[key] = None
            else:
                items[key] += parsed
                displays[key] = format_quantity(items[key])

    shopping_items = []
    for (name, unit, note), quantity in items.items():
        shopping_items.append(
            ShoppingItem(
                name=name,
                quantity=format_quantity(quantity) if quantity is not None else displays[(name, unit, note)],
                unit=unit,
                note=note,
            )
        )

    return shopping_items


def format_shopping_list(items: Iterable[ShoppingItem]) -> str:
    sections = ["Список покупок:"]
    enabled_items = [item for item in items if item.enabled]

    if not enabled_items:
        sections.append("- пока пусто")
        return "\n".join(sections)

    for item in enabled_items:
        parts = [f"- {item.name}"]
        if item.quantity:
            parts.append(f" - {item.quantity}")
        if item.unit:
            parts.append(f" {item.unit}")
        if item.note:
            parts.append(f" ({item.note})")
        sections.append("".join(parts))

    return "\n".join(sections)


def parse_quantity(value: str) -> Fraction | None:
    if not value:
        return None

    try:
        return Fraction(value)
    except ValueError:
        try:
            return Fraction(float(value)).limit_denominator(10)
        except ValueError:
            return None


def format_portions(value: Fraction) -> str:
    if value.denominator == 1:
        return f"{value.numerator} порций"

    lower = value.numerator // value.denominator
    upper = lower + 1
    return f"примерно {lower}-{upper} порций"


def format_quantity(value: Fraction) -> str:
    if value.denominator == 1:
        return str(value.numerator)

    decimal = float(value)
    if decimal < 10:
        return f"{decimal:.1f}".rstrip("0").rstrip(".")

    return f"{decimal:.0f}"
