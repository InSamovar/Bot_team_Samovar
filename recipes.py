from __future__ import annotations

from fractions import Fraction

from calculator import Ingredient, Recipe


RECIPES: dict[str, Recipe] = {
    "chicken_soup": Recipe(
        name="Куриный суп",
        portions=16,
        ingredients=(
            Ingredient("куриные ножки", Fraction(5), "шт"),
            Ingredient("картошка", Fraction(1250), "г"),
            Ingredient("морковь", Fraction(1), "шт"),
            Ingredient("лук", Fraction(1), "головка"),
            Ingredient("зеленый лук", None, "", "для подачи"),
        ),
    ),
    "casserole": Recipe(
        name="Запеканка",
        portions=9,
        ingredients=(
            Ingredient("куриная грудка", Fraction(5), "шт"),
            Ingredient("картошка", Fraction(2200), "г"),
            Ingredient("грибы", Fraction(1), "бокс"),
            Ingredient("сыр", Fraction(300), "г"),
            Ingredient("майонез", Fraction(4), "ст. ложки", "примерно 70 г на полный объем"),
        ),
    ),
}


SCALE_OPTIONS = {
    "1": ("Полный объем", Fraction(1, 1)),
    "2": ("25% меньше", Fraction(3, 4)),
    "3": ("50% меньше", Fraction(1, 2)),
    "4": ("75% меньше", Fraction(1, 4)),
}
