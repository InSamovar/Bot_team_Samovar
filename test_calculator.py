from __future__ import annotations

from fractions import Fraction
from unittest import TestCase

from calculator import build_shopping_list, scale_recipe
from recipes import RECIPES


class CalculatorTest(TestCase):
    def test_scales_chicken_soup_to_half_volume(self) -> None:
        recipe = scale_recipe(RECIPES["chicken_soup"], Fraction(1, 2), "50% меньше")

        self.assertEqual(recipe.portions_label, "8 порций")
        self.assertEqual(recipe.ingredients[0].display_quantity, "2.5")
        self.assertEqual(recipe.ingredients[1].display_quantity, "625")

    def test_scales_casserole_to_half_volume(self) -> None:
        recipe = scale_recipe(RECIPES["casserole"], Fraction(1, 2), "50% меньше")

        self.assertEqual(recipe.portions_label, "примерно 4-5 порций")
        self.assertEqual(recipe.ingredients[0].display_quantity, "2.5")
        self.assertEqual(recipe.ingredients[2].display_quantity, "150")

    def test_builds_shopping_list_from_scaled_recipes(self) -> None:
        soup = scale_recipe(RECIPES["chicken_soup"], Fraction(1, 1), "Полный объем")
        casserole = scale_recipe(RECIPES["casserole"], Fraction(1, 2), "50% меньше")

        items = build_shopping_list([soup, casserole])
        item_names = [item.name for item in items]

        self.assertIn("куриные ножки", item_names)
        self.assertIn("куриная грудка", item_names)
        self.assertIn("сыр", item_names)
