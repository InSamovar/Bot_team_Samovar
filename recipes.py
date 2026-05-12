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
        portions=13,
        ingredients=(
            Ingredient("куриная грудка", Fraction(2000), "г"),
            Ingredient("лук", Fraction(533), "г"),
            Ingredient("масло сливочное", Fraction(127), "г"),
            Ingredient("подсолнечное масло", Fraction(47), "г"),
            Ingredient("соль", Fraction(19), "г"),
            Ingredient("яйца", Fraction(2), "шт"),
        ),
    ),
    "olivier": Recipe(
        name="Оливье",
        portions=9,
        ingredients=(
            Ingredient("картошка", Fraction(600), "г"),
            Ingredient("морковь", Fraction(375), "г"),
            Ingredient("яйца", Fraction(5), "шт"),
            Ingredient("зеленый горошек", Fraction(300), "г"),
            Ingredient("майонез", None, "", "напоминание"),
        ),
    ),
    "crab_salad": Recipe(
        name="Крабовый салат",
        portions=13,
        ingredients=(
            Ingredient("крабовые палочки", Fraction(500), "г"),
            Ingredient("сладкая кукуруза", Fraction(510), "г"),
            Ingredient("огурец", Fraction(600), "г"),
            Ingredient("яйца", Fraction(10), "шт"),
            Ingredient("майонез", None, "", "напоминание"),
        ),
    ),
    "salad_shuba": Recipe(
        name="Шуба",
        portions=8,
        ingredients=(
            Ingredient("свекла", Fraction(500), "г"),
            Ingredient("картошка", Fraction(500), "г"),
            Ingredient("морковь", Fraction(300), "г"),
            Ingredient("яйца", Fraction(3), "шт"),
            Ingredient("селедка", Fraction(200), "г"),
            Ingredient("майонез", None, "", "напоминание"),
        ),
    ),
    "pineapple_salad": Recipe(
        name="Салат Курица-ананасы",
        portions=5,
        ingredients=(
            Ingredient("ананас", Fraction(1), "банка"),
            Ingredient("сыр", Fraction(130), "г"),
            Ingredient("куриные ножки", Fraction(320), "г"),
            Ingredient("чеснок", Fraction(2), "шт"),
            Ingredient("перец", Fraction(10), "оборотов"),
            Ingredient("соль", None, "", "немного"),
            Ingredient("майонез", Fraction(3, 2), "ст. ложки"),
            Ingredient("сметана", Fraction(3, 2), "ст. ложки"),
        ),
    ),
    "okroshka": Recipe(
        name="Окрошка",
        portions=8,
        ingredients=(
            Ingredient("картошка", Fraction(500), "г"),
            Ingredient("редиска", Fraction(250), "г"),
            Ingredient("огурец", Fraction(150), "г"),
            Ingredient("яйца", Fraction(4), "шт"),
            Ingredient("майонез", Fraction(2), "ст. ложки"),
            Ingredient("соль", Fraction(4), "маленькие ложки"),
            Ingredient("уксус", Fraction(5), "ст. ложки"),
        ),
    ),
    "quick_pickled_cucumber": Recipe(
        name="Малосольные огурцы",
        portions=1,
        ingredients=(
            Ingredient("огурцы", Fraction(1000), "г"),
            Ingredient("чеснок", Fraction(6), "шт"),
            Ingredient("укроп", Fraction(30), "г"),
            Ingredient("соль", Fraction(3), "ст. ложки"),
            Ingredient("сахар", Fraction(3), "ст. ложки"),
            Ingredient("уксус", Fraction(4), "ст. ложки"),
        ),
    ),
    "salo": Recipe(
        name="Сало",
        portions=1,
        ingredients=(
            Ingredient("свинина", Fraction(1000), "г"),
            Ingredient("чеснок", Fraction(125), "г"),
            Ingredient("морская соль", Fraction(7), "ст. ложки"),
            Ingredient("черный перец", Fraction(200), "поворотов"),
        ),
    ),
    "braised_cabbage": Recipe(
        name="Тушеная капуста",
        portions=4,
        ingredients=(
            Ingredient("капуста", Fraction(2), "шт"),
            Ingredient("сосиски", Fraction(10), "шт"),
            Ingredient("сахар", Fraction(1), "ст. ложка"),
            Ingredient("соль", Fraction(3, 2), "ч. ложки"),
            Ingredient("перец", Fraction(15), "оборотов"),
            Ingredient("подсолнечное масло", Fraction(15), "ст. ложек"),
        ),
    ),
    "braised_potato_beef": Recipe(
        name="Тушеная картошка с говядиной",
        portions=5,
        ingredients=(
            Ingredient("говядина", Fraction(600), "г"),
            Ingredient("морковь", Fraction(1), "шт"),
            Ingredient("белый лук", Fraction(1), "шт"),
            Ingredient("чеснок", Fraction(8), "шт"),
            Ingredient("томатная паста", Fraction(1), "ст. ложка"),
            Ingredient("картошка", Fraction(1500), "г"),
            Ingredient("соль", Fraction(4), "ч. ложки"),
            Ingredient("перец", Fraction(15), "оборотов"),
        ),
    ),
}


SCALE_OPTIONS = {
    "1": ("Полный объем", Fraction(1, 1)),
    "2": ("25% меньше", Fraction(3, 4)),
    "3": ("50% меньше", Fraction(1, 2)),
    "4": ("75% меньше", Fraction(1, 4)),
}
