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
            Ingredient("зеленый лук", Fraction(1), "пачка"),
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
            Ingredient("майонез", Fraction(1, 3), "банка"),
        ),
    ),
    "borscht": Recipe(
        name="Борщ",
        portions=14,
        ingredients=(
            Ingredient("куриные ножки", Fraction(7), "шт"),
            Ingredient("свекла", Fraction(1000), "г"),
            Ingredient("капуста", Fraction(1), "шт"),
            Ingredient("морковь", Fraction(1), "шт"),
            Ingredient("картошка", Fraction(1300), "г"),
            Ingredient("лук", Fraction(1), "шт"),
            Ingredient("чеснок", Fraction(10), "шт"),
            Ingredient("томатная паста", Fraction(2), "ст. ложки"),
            Ingredient("уксус", Fraction(3), "ст. ложки"),
            Ingredient("соль", Fraction(11, 2), "ст. ложки"),
        ),
    ),
    "mashed_potatoes": Recipe(
        name="Картофельное пюре",
        portions=5,
        ingredients=(
            Ingredient("картошка", Fraction(1000), "г"),
            Ingredient("молоко", Fraction(150), "г"),
            Ingredient("масло сливочное", Fraction(40), "г"),
            Ingredient("соль", Fraction(6), "г"),
        ),
    ),
    "chicken_cutlets": Recipe(
        name="Куриные котлеты",
        portions=18,
        ingredients=(
            Ingredient("куриная грудка", Fraction(2000), "г"),
            Ingredient("лук", Fraction(533), "г"),
            Ingredient("масло сливочное", Fraction(127), "г"),
            Ingredient("подсолнечное масло", Fraction(47), "г"),
            Ingredient("соль", Fraction(19), "г"),
            Ingredient("яйца", Fraction(2), "шт"),
        ),
    ),
}


SCALE_OPTIONS = {
    "1": ("Полный объем", Fraction(1, 1)),
    "2": ("25% меньше", Fraction(3, 4)),
    "3": ("50% меньше", Fraction(1, 2)),
    "4": ("75% меньше", Fraction(1, 4)),
}
