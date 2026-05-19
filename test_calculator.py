from __future__ import annotations

from fractions import Fraction
from unittest import TestCase

from calculator import build_shopping_list, scale_recipe
from recipes import RECIPES


class CalculatorTest(TestCase):
    def test_scales_chicken_soup_to_half_volume(self) -> None:
        recipe = scale_recipe(RECIPES["chicken_soup"], Fraction(1, 2), "50% меньше")
        ingredients = {ingredient.name: ingredient for ingredient in recipe.ingredients}

        self.assertEqual(recipe.portions_label, "8 порций")
        self.assertEqual(ingredients["куриные ножки (шт)"].display_quantity, "4")
        self.assertEqual(ingredients["картошка"].display_quantity, "650")

    def test_scales_casserole_to_half_volume(self) -> None:
        recipe = scale_recipe(RECIPES["casserole"], Fraction(1, 2), "50% меньше")
        ingredients = {ingredient.name: ingredient for ingredient in recipe.ingredients}

        self.assertEqual(recipe.portions_label, "примерно 4-5 порций")
        self.assertEqual(ingredients["куриная грудка (шт)"].display_quantity, "2.5")
        self.assertEqual(ingredients["сыр"].display_quantity, "150")
        self.assertEqual(ingredients["майонез"].display_quantity, "2.5")

    def test_builds_shopping_list_from_scaled_recipes(self) -> None:
        soup = scale_recipe(RECIPES["chicken_soup"], Fraction(1, 1), "Полный объем")
        casserole = scale_recipe(RECIPES["casserole"], Fraction(1, 2), "50% меньше")

        items = build_shopping_list([soup, casserole])
        item_names = [item.name for item in items]

        self.assertIn("куриные ножки (шт)", item_names)
        self.assertIn("куриная грудка (шт)", item_names)
        self.assertIn("сыр", item_names)

    def test_new_hot_dishes_have_expected_portions(self) -> None:
        self.assertEqual(RECIPES["borscht"].portions, 14)
        self.assertEqual(RECIPES["mashed_potatoes"].portions, 5)
        self.assertEqual(RECIPES["chicken_cutlets"].portions, 13)

    def test_salads_have_expected_portions(self) -> None:
        self.assertEqual(RECIPES["olivier"].portions, 9)
        self.assertEqual(RECIPES["crab_salad"].portions, 13)
        self.assertEqual(RECIPES["salad_shuba"].portions, 8)

    def test_scales_borscht_to_half_volume(self) -> None:
        recipe = scale_recipe(RECIPES["borscht"], Fraction(1, 2), "50% меньше")
        ingredients = {ingredient.name: ingredient for ingredient in recipe.ingredients}

        self.assertEqual(recipe.portions_label, "7 порций")
        self.assertEqual(ingredients["свекла"].display_quantity, "500")
        self.assertEqual(ingredients["соль (стл)"].display_quantity, "2.8")
