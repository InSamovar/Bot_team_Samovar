from __future__ import annotations

from calculator import format_plan, scale_recipe
from recipes import RECIPES, SCALE_OPTIONS


def main() -> None:
    print("Выберите, что закончилось:")
    recipe_keys = list(RECIPES.keys())
    for index, key in enumerate(recipe_keys, start=1):
        print(f"{index}. {RECIPES[key].name}")

    raw_selected = input("Введите номера через запятую: ").strip()
    selected = parse_selected(raw_selected, recipe_keys)

    if not selected:
        print("Ничего не выбрано.")
        return

    scaled_recipes = []
    for key in selected:
        recipe = RECIPES[key]
        print("")
        print(f"{recipe.name}: какой объем готовим?")
        for option_key, (label, _) in SCALE_OPTIONS.items():
            print(f"{option_key}. {label}")

        option = input("Выберите вариант: ").strip()
        label, factor = SCALE_OPTIONS.get(option, SCALE_OPTIONS["1"])
        scaled_recipes.append(scale_recipe(recipe, factor, label))

    print("")
    print(format_plan(scaled_recipes))


def parse_selected(raw_value: str, recipe_keys: list[str]) -> list[str]:
    selected: list[str] = []
    for part in raw_value.split(","):
        part = part.strip()
        if not part.isdigit():
            continue

        index = int(part) - 1
        if 0 <= index < len(recipe_keys):
            selected.append(recipe_keys[index])

    return selected


if __name__ == "__main__":
    main()

