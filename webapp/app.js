const recipes = {
  chicken_soup: {
    name: { ru: "Куриный суп", en: "Chicken soup" },
    category: "hot",
    icon: "🍲",
    portions: 16,
    ingredients: [
      { name: { ru: "куриные ножки", en: "chicken legs" }, quantity: 5, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "картошка", en: "potatoes" }, quantity: 1250, unit: { ru: "г", en: "g" } },
      { name: { ru: "морковь", en: "carrot" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "лук", en: "onion" }, quantity: 1, unit: { ru: "головка", en: "head" } },
      { name: { ru: "зеленый лук", en: "green onions" }, quantity: 1, unit: { ru: "пачка", en: "pack" } },
    ],
  },
  casserole: {
    name: { ru: "Запеканка", en: "Casserole" },
    category: "hot",
    icon: "🥘",
    portions: 9,
    ingredients: [
      { name: { ru: "куриная грудка", en: "chicken breast" }, quantity: 5, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "картошка", en: "potatoes" }, quantity: 2200, unit: { ru: "г", en: "g" } },
      { name: { ru: "грибы", en: "mushrooms" }, quantity: 1, unit: { ru: "бокс", en: "box" } },
      { name: { ru: "сыр", en: "cheese" }, quantity: 300, unit: { ru: "г", en: "g" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: "1/3", unit: { ru: "банка", en: "jar" } },
    ],
  },
  borscht: {
    name: { ru: "Борщ", en: "Borscht" },
    category: "hot",
    icon: "🥣",
    portions: 14,
    ingredients: [
      { name: { ru: "куриные ножки", en: "chicken legs" }, quantity: 7, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "свекла", en: "beetroot" }, quantity: 1000, unit: { ru: "г", en: "g" } },
      { name: { ru: "капуста", en: "cabbage" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "морковь", en: "carrot" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "картошка", en: "potatoes" }, quantity: 1300, unit: { ru: "г", en: "g" } },
      { name: { ru: "лук", en: "onion" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "чеснок", en: "garlic" }, quantity: 10, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "томатная паста", en: "tomato paste" }, quantity: 2, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "уксус", en: "vinegar" }, quantity: 3, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "соль", en: "salt" }, quantity: 5.5, unit: { ru: "ст. ложки", en: "tbsp" } },
    ],
  },
  mashed_potatoes: {
    name: { ru: "Картофельное пюре", en: "Mashed potatoes" },
    category: "hot",
    icon: "🥔",
    portions: 5,
    ingredients: [
      { name: { ru: "картошка", en: "potatoes" }, quantity: 1000, unit: { ru: "г", en: "g" } },
      { name: { ru: "молоко", en: "milk" }, quantity: 150, unit: { ru: "г", en: "g" } },
      { name: { ru: "масло сливочное", en: "butter" }, quantity: 40, unit: { ru: "г", en: "g" } },
      { name: { ru: "соль", en: "salt" }, quantity: 6, unit: { ru: "г", en: "g" } },
    ],
  },
  chicken_cutlets: {
    name: { ru: "Куриные котлеты", en: "Chicken cutlets" },
    category: "hot",
    icon: "🍗",
    portions: 13,
    ingredients: [
      { name: { ru: "куриная грудка", en: "chicken breast" }, quantity: 2000, unit: { ru: "г", en: "g" } },
      { name: { ru: "лук", en: "onion" }, quantity: 533, unit: { ru: "г", en: "g" } },
      { name: { ru: "масло сливочное", en: "butter" }, quantity: 127, unit: { ru: "г", en: "g" } },
      { name: { ru: "подсолнечное масло", en: "sunflower oil" }, quantity: 47, unit: { ru: "г", en: "g" } },
      { name: { ru: "соль", en: "salt" }, quantity: 19, unit: { ru: "г", en: "g" } },
      { name: { ru: "яйца", en: "eggs" }, quantity: 2, unit: { ru: "шт", en: "pcs" } },
    ],
  },
  olivier: {
    name: { ru: "Оливье", en: "Russian salad" },
    category: "salads",
    icon: "🥗",
    portions: 9,
    shelfLife: { ru: "2,5 дня", en: "2.5 days" },
    ingredients: [
      { name: { ru: "картошка", en: "potatoes" }, quantity: 600, unit: { ru: "г", en: "g" } },
      { name: { ru: "морковь", en: "carrot" }, quantity: 375, unit: { ru: "г", en: "g" } },
      { name: { ru: "яйца", en: "eggs" }, quantity: 5, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "зеленый горошек", en: "green peas" }, quantity: 300, unit: { ru: "г", en: "g" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: "", unit: "", note: { ru: "напоминание", en: "reminder" } },
    ],
  },
  crab_salad: {
    name: { ru: "Крабовый салат", en: "Crab salad" },
    category: "salads",
    icon: "🦀",
    portions: 13,
    shelfLife: { ru: "2,5 дня", en: "2.5 days" },
    ingredients: [
      { name: { ru: "крабовые палочки", en: "crab sticks" }, quantity: 500, unit: { ru: "г", en: "g" } },
      { name: { ru: "сладкая кукуруза", en: "sweet corn" }, quantity: 510, unit: { ru: "г", en: "g" } },
      { name: { ru: "огурец", en: "cucumber" }, quantity: 600, unit: { ru: "г", en: "g" } },
      { name: { ru: "яйца", en: "eggs" }, quantity: 10, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: "", unit: "", note: { ru: "напоминание", en: "reminder" } },
    ],
  },
  salad_shuba: {
    name: { ru: "Шуба", en: "Salad shuba" },
    category: "salads",
    icon: "🐟",
    portions: 8,
    shelfLife: { ru: "4 дня", en: "4 days" },
    ingredients: [
      { name: { ru: "свекла", en: "beetroot" }, quantity: 500, unit: { ru: "г", en: "g" } },
      { name: { ru: "картошка", en: "potatoes" }, quantity: 500, unit: { ru: "г", en: "g" } },
      { name: { ru: "морковь", en: "carrot" }, quantity: 300, unit: { ru: "г", en: "g" } },
      { name: { ru: "яйца", en: "eggs" }, quantity: 3, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "селедка", en: "herring" }, quantity: 200, unit: { ru: "г", en: "g" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: "", unit: "", note: { ru: "напоминание", en: "reminder" } },
    ],
  },
  pineapple_salad: {
    name: { ru: "Салат Курица-ананасы", en: "Pineapple salad" },
    category: "salads",
    icon: "🍍",
    portions: 5,
    shelfLife: { ru: "2,5 дня", en: "2.5 days" },
    ingredients: [
      { name: { ru: "ананас", en: "pineapple" }, quantity: 1, unit: { ru: "банка", en: "can" } },
      { name: { ru: "сыр", en: "cheese" }, quantity: 130, unit: { ru: "г", en: "g" } },
      { name: { ru: "куриные ножки", en: "chicken legs" }, quantity: 320, unit: { ru: "г", en: "g" } },
      { name: { ru: "чеснок", en: "garlic" }, quantity: 2, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "перец", en: "pepper" }, quantity: 10, unit: { ru: "оборотов", en: "turns" } },
      { name: { ru: "соль", en: "salt" }, quantity: "", unit: "", note: { ru: "немного", en: "a little" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: 1.5, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "сметана", en: "sour cream" }, quantity: 1.5, unit: { ru: "ст. ложки", en: "tbsp" } },
    ],
  },
  okroshka: {
    name: { ru: "Окрошка", en: "Okroshka" },
    category: "salads",
    icon: "🥒",
    portions: 8,
    shelfLife: { ru: "4 дня", en: "4 days" },
    ingredients: [
      { name: { ru: "картошка", en: "potatoes" }, quantity: 500, unit: { ru: "г", en: "g" } },
      { name: { ru: "редиска", en: "radish" }, quantity: 250, unit: { ru: "г", en: "g" } },
      { name: { ru: "огурец", en: "cucumber" }, quantity: 150, unit: { ru: "г", en: "g" } },
      { name: { ru: "яйца", en: "eggs" }, quantity: 4, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "майонез", en: "mayonnaise" }, quantity: 2, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "соль", en: "salt" }, quantity: 4, unit: { ru: "маленькие ложки", en: "small spoons" } },
      { name: { ru: "уксус", en: "vinegar" }, quantity: 5, unit: { ru: "ст. ложки", en: "tbsp" } },
    ],
  },
  quick_pickled_cucumber: {
    name: { ru: "Малосольные огурцы", en: "Quick pickled cucumber" },
    category: "salads",
    icon: "🥒",
    portions: 1,
    shelfLife: { ru: "долго", en: "long" },
    ingredients: [
      { name: { ru: "огурцы", en: "cucumbers" }, quantity: 1000, unit: { ru: "г", en: "g" } },
      { name: { ru: "чеснок", en: "garlic" }, quantity: 6, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "укроп", en: "dill" }, quantity: 30, unit: { ru: "г", en: "g" } },
      { name: { ru: "соль", en: "salt" }, quantity: 3, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "сахар", en: "sugar" }, quantity: 3, unit: { ru: "ст. ложки", en: "tbsp" } },
      { name: { ru: "уксус", en: "vinegar" }, quantity: 4, unit: { ru: "ст. ложки", en: "tbsp" } },
    ],
  },
  salo: {
    name: { ru: "Сало", en: "Salo" },
    category: "salads",
    icon: "🥓",
    portions: 1,
    shelfLife: { ru: "долго", en: "long" },
    ingredients: [
      { name: { ru: "свинина", en: "pork" }, quantity: 1000, unit: { ru: "г", en: "g" } },
      { name: { ru: "чеснок", en: "garlic" }, quantity: 125, unit: { ru: "г", en: "g" } },
      { name: { ru: "морская соль", en: "sea salt" }, quantity: 7, unit: { ru: "ст. ложек", en: "tbsp" } },
      { name: { ru: "черный перец", en: "black pepper" }, quantity: 200, unit: { ru: "поворотов", en: "turns" } },
    ],
  },
  braised_cabbage: {
    name: { ru: "Тушеная капуста", en: "Braised cabbage" },
    category: "hot",
    icon: "🥬",
    portions: 4,
    shelfLife: { ru: "3 дня", en: "3 days" },
    ingredients: [
      { name: { ru: "капуста", en: "cabbage" }, quantity: 2, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "сосиски", en: "sausages" }, quantity: 10, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "сахар", en: "sugar" }, quantity: 1, unit: { ru: "ст. ложка", en: "tbsp" } },
      { name: { ru: "соль", en: "salt" }, quantity: 1.5, unit: { ru: "ч. ложки", en: "tsp" } },
      { name: { ru: "перец", en: "pepper" }, quantity: 15, unit: { ru: "оборотов", en: "turns" } },
      { name: { ru: "подсолнечное масло", en: "sunflower oil" }, quantity: 15, unit: { ru: "ст. ложек", en: "tbsp" } },
    ],
  },
  braised_potato_beef: {
    name: { ru: "Тушеная картошка с говядиной", en: "Braised potato with beef" },
    category: "hot",
    icon: "🥩",
    portions: 5,
    shelfLife: { ru: "2 дня", en: "2 days" },
    ingredients: [
      { name: { ru: "говядина", en: "beef" }, quantity: 600, unit: { ru: "г", en: "g" } },
      { name: { ru: "морковь", en: "carrot" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "белый лук", en: "white onion" }, quantity: 1, unit: { ru: "шт", en: "pc" } },
      { name: { ru: "чеснок", en: "garlic" }, quantity: 8, unit: { ru: "шт", en: "pcs" } },
      { name: { ru: "томатная паста", en: "tomato paste" }, quantity: 1, unit: { ru: "ст. ложка", en: "tbsp" } },
      { name: { ru: "картошка", en: "potatoes" }, quantity: 1500, unit: { ru: "г", en: "g" } },
      { name: { ru: "соль", en: "salt" }, quantity: 4, unit: { ru: "ч. ложки", en: "tsp" } },
      { name: { ru: "перец", en: "pepper" }, quantity: 15, unit: { ru: "оборотов", en: "turns" } },
    ],
  },
  ham_cheese_julienne_crepe: {
    name: { ru: "Ham&Cheese Julienne Crepe", en: "Ham&Cheese Julienne Crepe" },
    category: "pancakes",
    icon: "🥞",
    portions: 1,
    ingredients: [],
  },
  shaublin_crepe: {
    name: { ru: "Shaublin Crepe", en: "Shaublin Crepe" },
    category: "pancakes",
    icon: "🥞",
    portions: 1,
    ingredients: [],
  },
  salmon_mush_sauce_crepe: {
    name: { ru: "Salmon Mush&Sauce Crepe", en: "Salmon Mush&Sauce Crepe" },
    category: "pancakes",
    icon: "🥞",
    portions: 1,
    ingredients: [],
  },
  tvorog_crepe: {
    name: { ru: "Tvorog Crepe", en: "Tvorog Crepe" },
    category: "pancakes",
    icon: "🥞",
    portions: 1,
    ingredients: [],
  },
  ice_cream_crepe: {
    name: { ru: "IceCream Crepe", en: "IceCream Crepe" },
    category: "pancakes",
    icon: "🍨",
    portions: 1,
    ingredients: [],
  },
  apple_pie: {
    name: { ru: "Apple Pie", en: "Apple Pie" },
    category: "desserts",
    icon: "🥧",
    portions: 1,
    ingredients: [],
  },
  honey_roll: {
    name: { ru: "Honey Roll", en: "Honey Roll" },
    category: "desserts",
    icon: "🍯",
    portions: 1,
    ingredients: [],
  },
  syrniki: {
    name: { ru: "Syrniki", en: "Syrniki" },
    category: "desserts",
    icon: "🍽️",
    portions: 1,
    ingredients: [],
  },
  tvorog_honey_jam: {
    name: { ru: "Tvorog&honey/jam", en: "Tvorog&honey/jam" },
    category: "desserts",
    icon: "🍯",
    portions: 1,
    ingredients: [],
  },
  ice_cream: {
    name: { ru: "Ice Cream", en: "Ice Cream" },
    category: "desserts",
    icon: "🍨",
    portions: 1,
    ingredients: [],
  },
};

const categories = [
  { key: "crepes", legacyKeys: ["pancakes"], label: { ru: "Crepes", en: "Crepes" }, icon: "🥞" },
  { key: "soup_hot", legacyKeys: ["hot"], label: { ru: "Soup&hot", en: "Soup&hot" }, icon: "🔥" },
  { key: "salads", legacyKeys: [], label: { ru: "Salads", en: "Salads" }, icon: "🥗" },
  { key: "pelmeni_vareniki", legacyKeys: ["dumplings"], label: { ru: "Pelmeni&Vareniki", en: "Pelmeni&Vareniki" }, icon: "🥟" },
  { key: "desserts", legacyKeys: [], label: { ru: "Desserts", en: "Desserts" }, icon: "🍰" },
  { key: "drinks", legacyKeys: [], label: { ru: "Drinks", en: "Drinks" }, icon: "🥤" },
];

const scaleLabels = {
  1: { ru: "Полный объем", en: "Full batch" },
  0.75: { ru: "25% меньше", en: "25% less" },
  0.5: { ru: "50% меньше", en: "50% less" },
  0.25: { ru: "75% меньше", en: "75% less" },
};

const productUnitOptions = ["kg", "gr", "TBsp", "tsp", "times", "turn", "pc", "box", "ladle", "litr", "ml"];

const unitAliases = {
  г: "gr",
  g: "gr",
  кг: "kg",
  kg: "kg",
  шт: "pc",
  штука: "pc",
  штук: "pc",
  pc: "pc",
  pcs: "pc",
  головка: "pc",
  банка: "pc",
  can: "pc",
  jar: "pc",
  пачка: "pc",
  pack: "pc",
  бокс: "box",
  box: "box",
  "ст. ложка": "TBsp",
  "ст. ложки": "TBsp",
  "ст. ложек": "TBsp",
  tbsp: "TBsp",
  "ч. ложки": "tsp",
  "маленькие ложки": "tsp",
  tsp: "tsp",
  оборотов: "turn",
  поворотов: "turn",
  turns: "turn",
  л: "litr",
  litr: "litr",
  мл: "ml",
  ml: "ml",
};

const productStorageKey = "samovarProducts";
const dishStorageKey = "samovarDishes";
const recipeStorageKey = "samovarRecipeLinks";

const i18n = {
  ru: {
    title: "План на завтра",
    planTab: "План",
    reset: "Сбросить",
    whatCook: "Что готовим",
    ingredients: "Ингредиенты",
    productCheck: "Проверка продуктов",
    recipesTitle: "Рецепты",
    productsTitle: "Products",
    productCatalogEmpty: "Добавьте первый продукт выше",
    productRuLabel: "Название RU",
    productEnLabel: "Name EN",
    productUnitLabel: "Мера измерения",
    productSearchLabel: "Поиск продукта",
    productSearchPlaceholder: "Начните вводить название",
    productAdd: "Добавить",
    productUpdate: "Сохранить",
    productCancel: "Отмена",
    productEdit: "Изменить",
    productDelete: "Удалить",
    productRequired: "Заполните название на русском, английском и выберите меру.",
    recipeSearchLabel: "Поиск блюда",
    recipeSearchPlaceholder: "Начните вводить название",
    recipeNameRuLabel: "Название RU",
    recipeNameEnLabel: "Name EN",
    recipeCategoryLabel: "Категория",
    recipePortionsLabel: "Порции",
    recipeIconLabel: "Иконка",
    recipeShelfLifeLabel: "Срок хранения",
    recipeIngredientLabel: "Продукт",
    recipeQuantityLabel: "Кол-во",
    recipeMeasureLabel: "Мера",
    recipeNew: "Новое блюдо",
    recipeAddIngredient: "Добавить продукт",
    recipeSave: "Сохранить рецепт",
    recipeDelete: "Удалить",
    recipeDeleteDish: "Удалить блюдо",
    recipeSaved: "Рецепт сохранен",
    recipeRequired: "Заполните название, порции, продукт, количество и меру.",
    recipeDeleted: "Блюдо удалено",
    recipeNoIngredients: "Рецепт пока не внесен",
    shelfLife: "Срок хранения",
    selectedEmpty: "Выберите блюда выше",
    emptyCategory: "В этой вкладке пока нет блюд",
    productsEmpty: "Продукты появятся после выбора блюд",
    needed: "Нужно",
    inStock: "Есть",
    buy: "Купить",
    buyNone: "Купить: не нужно",
    save: "Сохранить план",
    saving: "Сохраняю...",
    checkProducts: "Проверить продукты",
    fillStock: "Заполните остатки по всем продуктам перед сохранением.",
    tooLarge: "План слишком большой для отправки в Telegram. Сохраните меньше блюд за один раз.",
    sendError: "Не получилось отправить план в Telegram. Попробуйте открыть Mini App из бота еще раз.",
    savedBrowser: "План сохранен в браузере",
    dishOne: "блюдо",
    dishFew: "блюда",
    dishMany: "блюд",
    itemOne: "позиция",
    itemFew: "позиции",
    itemMany: "позиций",
    portions: "порций",
    approx: "примерно",
  },
  en: {
    title: "Plan for tomorrow",
    planTab: "Plan",
    reset: "Reset",
    whatCook: "What to cook",
    ingredients: "Ingredients",
    productCheck: "Product check",
    recipesTitle: "Recipes",
    productsTitle: "Products",
    productCatalogEmpty: "Add the first product above",
    productRuLabel: "Name RU",
    productEnLabel: "Name EN",
    productUnitLabel: "Unit",
    productSearchLabel: "Product search",
    productSearchPlaceholder: "Start typing a name",
    productAdd: "Add",
    productUpdate: "Save",
    productCancel: "Cancel",
    productEdit: "Edit",
    productDelete: "Delete",
    productRequired: "Fill in Russian name, English name, and unit.",
    recipeSearchLabel: "Dish search",
    recipeSearchPlaceholder: "Start typing a name",
    recipeNameRuLabel: "Name RU",
    recipeNameEnLabel: "Name EN",
    recipeCategoryLabel: "Category",
    recipePortionsLabel: "Portions",
    recipeIconLabel: "Icon",
    recipeShelfLifeLabel: "Shelf life",
    recipeIngredientLabel: "Product",
    recipeQuantityLabel: "Qty",
    recipeMeasureLabel: "Unit",
    recipeNew: "New dish",
    recipeAddIngredient: "Add product",
    recipeSave: "Save recipe",
    recipeDelete: "Delete",
    recipeDeleteDish: "Delete dish",
    recipeSaved: "Recipe saved",
    recipeRequired: "Fill in name, portions, product, quantity, and unit.",
    recipeDeleted: "Dish deleted",
    recipeNoIngredients: "Recipe not added yet",
    shelfLife: "Shelf life",
    selectedEmpty: "Select dishes above",
    emptyCategory: "No dishes in this tab yet",
    productsEmpty: "Products will appear after selecting dishes",
    needed: "Needed",
    inStock: "In stock",
    buy: "Buy",
    buyNone: "Buy: not needed",
    save: "Save plan",
    saving: "Saving...",
    checkProducts: "Check products",
    fillStock: "Fill in stock amounts for all products before saving.",
    tooLarge: "The plan is too large to send to Telegram. Save fewer dishes at once.",
    sendError: "Could not send the plan to Telegram. Open the Mini App from the bot and try again.",
    savedBrowser: "Plan saved in browser",
    dishOne: "dish",
    dishFew: "dishes",
    dishMany: "dishes",
    itemOne: "item",
    itemFew: "items",
    itemMany: "items",
    portions: "portions",
    approx: "about",
  },
};

const tg = window.Telegram?.WebApp;
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") === "en" ? "en" : "ru";
const rawView = params.get("view");
const view = ["recipes", "products"].includes(rawView) ? rawView : "plan";
const state = {
  selected: {},
  plans: {},
  stockByProduct: {},
  activeCategory: "soup_hot",
  products: loadProducts(),
  dishes: loadDishes(),
  recipeLinks: loadRecipeLinks(),
  editingProductId: null,
  editingRecipeKey: "chicken_soup",
  isNewRecipe: false,
  productSearch: "",
  recipeSearch: "",
};

const categoryTabs = document.querySelector("#categoryTabs");
const dishList = document.querySelector("#dishList");
const recipeList = document.querySelector("#recipeList");
const shoppingList = document.querySelector("#shoppingList");
const selectedCount = document.querySelector("#selectedCount");
const shoppingCount = document.querySelector("#shoppingCount");
const saveButton = document.querySelector("#saveButton");
const resetButton = document.querySelector("#resetButton");
const recipeBookSection = document.querySelector("#recipeBookSection");
const recipeBookList = document.querySelector("#recipeBookList");
const recipeBookCount = document.querySelector("#recipeBookCount");
const productCatalogSection = document.querySelector("#productCatalogSection");
const productCatalogList = document.querySelector("#productCatalogList");
const productCatalogCount = document.querySelector("#productCatalogCount");
const productForm = document.querySelector("#productForm");
const productSearchInput = document.querySelector("#productSearchInput");
const productRuInput = document.querySelector("#productRuInput");
const productEnInput = document.querySelector("#productEnInput");
const productUnitSelect = document.querySelector("#productUnitSelect");
const productSaveButton = document.querySelector("#productSaveButton");
const productCancelButton = document.querySelector("#productCancelButton");
const viewButtons = document.querySelectorAll("[data-view-target]");
const recipeEditor = document.querySelector("#recipeEditor");
const recipeSearchInput = document.querySelector("#recipeSearchInput");
const recipeNameRuInput = document.querySelector("#recipeNameRuInput");
const recipeNameEnInput = document.querySelector("#recipeNameEnInput");
const recipeCategorySelect = document.querySelector("#recipeCategorySelect");
const recipePortionsInput = document.querySelector("#recipePortionsInput");
const recipeIconInput = document.querySelector("#recipeIconInput");
const recipeShelfLifeInput = document.querySelector("#recipeShelfLifeInput");
const recipeEditorList = document.querySelector("#recipeEditorList");
const recipeNewButton = document.querySelector("#recipeNewButton");
const recipeAddIngredientButton = document.querySelector("#recipeAddIngredientButton");
const recipeSaveButton = document.querySelector("#recipeSaveButton");
const recipeDeleteButton = document.querySelector("#recipeDeleteButton");

init();

function init() {
  tg?.ready();
  tg?.expand();
  applyLanguage();
  if (view === "recipes") {
    enableProtectedRecipeMode();
  }
  if (view === "products") {
    document.body.classList.add("products-mode");
  }
  initViewTabs();
  initProductForm();
  initRecipeEditor();
  renderCategoryTabs();
  renderDishes();
  renderAll();
  saveButton.addEventListener("click", savePlan);
  resetButton.addEventListener("click", resetPlan);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelector("h1").textContent = tt("title");
  if (view === "recipes") {
    document.querySelector("h1").textContent = tt("recipesTitle");
  }
  if (view === "products") {
    document.querySelector("h1").textContent = tt("productsTitle");
  }
  document.querySelector("#planViewButton").textContent = tt("planTab");
  document.querySelector("#recipesViewButton").textContent = tt("recipesTitle");
  document.querySelector("#productsViewButton").textContent = tt("productsTitle");
  viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === view);
  });
  resetButton.textContent = tt("reset");
  const headings = document.querySelectorAll(".section h2");
  headings[0].textContent = tt("whatCook");
  headings[1].textContent = tt("recipesTitle");
  headings[2].textContent = tt("productsTitle");
  headings[3].textContent = tt("ingredients");
  headings[4].textContent = tt("productCheck");
  if (recipeBookSection) {
    recipeBookSection.querySelector("h2").textContent = tt("recipesTitle");
  }
  if (productCatalogSection) {
    productCatalogSection.querySelector("h2").textContent = tt("productsTitle");
  }
  document.querySelector("#productRuLabel").textContent = tt("productRuLabel");
  document.querySelector("#productEnLabel").textContent = tt("productEnLabel");
  document.querySelector("#productUnitLabel").textContent = tt("productUnitLabel");
  document.querySelector("#productSearchLabel").textContent = tt("productSearchLabel");
  productSearchInput.placeholder = tt("productSearchPlaceholder");
  productSaveButton.textContent = state.editingProductId ? tt("productUpdate") : tt("productAdd");
  productCancelButton.textContent = tt("productCancel");
  document.querySelector("#recipeSearchLabel").textContent = tt("recipeSearchLabel");
  recipeSearchInput.placeholder = tt("recipeSearchPlaceholder");
  document.querySelector("#recipeNameRuLabel").textContent = tt("recipeNameRuLabel");
  document.querySelector("#recipeNameEnLabel").textContent = tt("recipeNameEnLabel");
  document.querySelector("#recipeCategoryLabel").textContent = tt("recipeCategoryLabel");
  document.querySelector("#recipePortionsLabel").textContent = tt("recipePortionsLabel");
  document.querySelector("#recipeIconLabel").textContent = tt("recipeIconLabel");
  document.querySelector("#recipeShelfLifeLabel").textContent = tt("recipeShelfLifeLabel");
  document.querySelector("#recipeIngredientLabel").textContent = tt("recipeIngredientLabel");
  document.querySelector("#recipeQuantityLabel").textContent = tt("recipeQuantityLabel");
  document.querySelector("#recipeMeasureLabel").textContent = tt("recipeMeasureLabel");
  recipeNewButton.textContent = tt("recipeNew");
  recipeAddIngredientButton.textContent = tt("recipeAddIngredient");
  recipeSaveButton.textContent = tt("recipeSave");
  recipeDeleteButton.textContent = tt("recipeDeleteDish");
  saveButton.textContent = tt("save");
  document.querySelectorAll(".scale-select option").forEach((option) => {
    option.textContent = localize(scaleLabels[option.value]);
  });
}

function initViewTabs() {
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.viewTarget;
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("lang", lang);
      nextUrl.searchParams.set("view", nextView);
      window.location.href = nextUrl.toString();
    });
  });
}

function renderCategoryTabs() {
  categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const count = Object.values(getRecipes()).filter((recipe) => normalizeCategoryKey(recipe.category) === category.key).length;
    const button = document.createElement("button");
    button.className = `category-tab${state.activeCategory === category.key ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>${category.icon}</span><span>${escapeHtml(localize(category.label))}</span><small>${count}</small>`;
    button.addEventListener("click", () => {
      state.activeCategory = category.key;
      renderCategoryTabs();
      renderDishes();
    });
    categoryTabs.appendChild(button);
  });
}

function renderDishes() {
  dishList.innerHTML = "";
  const template = document.querySelector("#dishTemplate");
  const visibleRecipes = Object.entries(getRecipes()).filter(([, recipe]) => normalizeCategoryKey(recipe.category) === state.activeCategory);

  if (!visibleRecipes.length) {
    dishList.innerHTML = `<div class="empty-state">${escapeHtml(tt("emptyCategory"))}</div>`;
    return;
  }

  visibleRecipes.forEach(([key, recipe]) => {
    const node = template.content.cloneNode(true);
    const row = node.querySelector(".dish-row");
    const checkbox = node.querySelector(".dish-checkbox");
    const icon = node.querySelector(".dish-icon");
    const name = node.querySelector(".dish-name");
    const scale = node.querySelector(".scale-select");

    row.dataset.key = key;
    icon.textContent = recipe.icon;
    name.textContent = localize(recipe.name);
    checkbox.checked = Boolean(state.selected[key]);
    scale.value = String(state.selected[key]?.scale ?? 1);
    scale.disabled = !checkbox.checked;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectRecipe(key, Number(scale.value));
      } else {
        delete state.selected[key];
        delete state.plans[key];
      }
      renderAll();
      renderDishes();
    });

    scale.addEventListener("change", () => {
      selectRecipe(key, Number(scale.value));
      renderAll();
    });

    dishList.appendChild(node);
  });

  if (view === "recipes") {
    dishList.querySelectorAll(".dish-checkbox, .scale-select").forEach((element) => {
      element.hidden = true;
    });
  }
}

function selectRecipe(key, scale) {
  state.selected[key] = { scale };
  state.plans[key] = scaleRecipe(getEditableRecipe(key), scale);
}

function renderAll() {
  if (view === "recipes") {
    renderRecipeBook();
    return;
  }
  if (view === "products") {
    renderProductCatalog();
    return;
  }
  renderRecipes();
  renderProductCheck();
  const count = Object.keys(state.selected).length;
  selectedCount.textContent = plural(count, tt("dishOne"), tt("dishFew"), tt("dishMany"));
}

function renderRecipeBook() {
  document.querySelectorAll(".section")[1].hidden = true;
  document.querySelectorAll(".section")[2].hidden = true;
  document.querySelectorAll(".section")[3].hidden = true;
  document.querySelectorAll(".section")[4].hidden = true;
  document.querySelector(".footer-actions").hidden = true;
  recipeBookSection.hidden = false;
  renderRecipeEditor();
  recipeBookList.innerHTML = "";
  const currentRecipes = Object.entries(getRecipes())
    .filter(([, recipe]) => normalizeCategoryKey(recipe.category) === state.activeCategory)
    .filter(([, recipe]) => matchesSearch(localizeLanguage(recipe.name, "ru"), state.recipeSearch) || matchesSearch(localizeLanguage(recipe.name, "en"), state.recipeSearch))
    .map(([key]) => [key, getEditableRecipe(key)]);
  recipeBookCount.textContent = plural(currentRecipes.length, tt("dishOne"), tt("dishFew"), tt("dishMany"));

  const template = document.querySelector("#recipeBookTemplate");
  currentRecipes.forEach(([recipeKey, recipe]) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".recipe-block");
    card.classList.add("is-clickable");
    card.addEventListener("click", () => startRecipeEdit(recipeKey));
    node.querySelector("h3").textContent = `${recipe.icon} ${localize(recipe.name)}`;
    const meta = [`${recipe.portions} ${tt("portions")}`];
    if (recipe.shelfLife) {
      meta.push(`${tt("shelfLife")}: ${localize(recipe.shelfLife)}`);
    }
    node.querySelector(".recipe-title-row span").textContent = meta.join(" · ");
    const grid = node.querySelector(".ingredient-grid");

    if (!recipe.ingredients.length) {
      grid.innerHTML = `<div class="empty-state">${escapeHtml(tt("recipeNoIngredients"))}</div>`;
    } else {
      recipe.ingredients.forEach((ingredient) => {
        const row = document.createElement("div");
        row.className = "ingredient-row";
        row.innerHTML = `
          <span class="ingredient-name">${escapeHtml(localize(ingredient.name))}</span>
          <span class="unit-label">${escapeHtml(formatRecipeIngredient(ingredient))}</span>
        `;
        grid.appendChild(row);
      });
    }

    recipeBookList.appendChild(node);
  });
}

function renderProductCatalog() {
  document.querySelectorAll(".section")[0].hidden = true;
  document.querySelectorAll(".section")[1].hidden = true;
  document.querySelectorAll(".section")[3].hidden = true;
  document.querySelectorAll(".section")[4].hidden = true;
  document.querySelector(".footer-actions").hidden = true;
  resetButton.hidden = true;
  productCatalogSection.hidden = false;
  productCatalogList.innerHTML = "";

  const products = state.products.filter(
    (product) => matchesSearch(product.ru, state.productSearch) || matchesSearch(product.en, state.productSearch)
  );
  productCatalogCount.textContent = plural(products.length, tt("itemOne"), tt("itemFew"), tt("itemMany"));

  if (!products.length) {
    productCatalogList.innerHTML = `<div class="empty-state">${escapeHtml(tt("productCatalogEmpty"))}</div>`;
    return;
  }

  const template = document.querySelector("#productTemplate");
  products.forEach((product) => {
    const node = template.content.cloneNode(true);
    node.querySelector("h3").textContent = product.ru;
    node.querySelector(".product-meta-en").textContent = product.en;
    node.querySelector(".product-unit").textContent = product.unit;
    const editButton = node.querySelector(".product-edit-button");
    const deleteButton = node.querySelector(".product-delete-button");
    editButton.textContent = tt("productEdit");
    deleteButton.textContent = tt("productDelete");
    editButton.addEventListener("click", () => startProductEdit(product.id));
    deleteButton.addEventListener("click", () => deleteProduct(product.id));
    productCatalogList.appendChild(node);
  });
}

function initProductForm() {
  productUnitSelect.innerHTML = productUnitOptions
    .map((unit) => `<option value="${escapeHtml(unit)}">${escapeHtml(unit)}</option>`)
    .join("");
  productUnitSelect.value = "gr";
  productSearchInput.addEventListener("input", () => {
    state.productSearch = productSearchInput.value.trim();
    renderProductCatalog();
  });
  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveProductFromForm();
  });
  productCancelButton.addEventListener("click", resetProductForm);
}

function initRecipeEditor() {
  recipeCategorySelect.innerHTML = categories
    .map((category) => `<option value="${escapeHtml(category.key)}">${escapeHtml(localize(category.label))}</option>`)
    .join("");
  recipeSearchInput.addEventListener("input", () => {
    state.recipeSearch = recipeSearchInput.value.trim();
    renderRecipeBook();
  });
  recipeNewButton.addEventListener("click", startNewRecipe);
  recipeAddIngredientButton.addEventListener("click", () => addRecipeEditorRow());
  recipeDeleteButton.addEventListener("click", deleteCurrentRecipe);
  recipeEditor.addEventListener("submit", (event) => {
    event.preventDefault();
    saveRecipeEditor();
  });
}

function renderRecipeEditor() {
  const allRecipes = getRecipes();
  const categoryKeys = Object.keys(allRecipes).filter((key) => normalizeCategoryKey(allRecipes[key].category) === state.activeCategory);
  if (!state.isNewRecipe && !categoryKeys.includes(state.editingRecipeKey)) {
    state.editingRecipeKey = categoryKeys[0] || Object.keys(allRecipes)[0];
  }

  fillRecipeEditor(state.editingRecipeKey ? getEditableRecipe(state.editingRecipeKey) : null);
}

function startRecipeEdit(recipeKey) {
  const recipe = getRecipes()[recipeKey];
  if (!recipe) {
    return;
  }
  state.isNewRecipe = false;
  state.editingRecipeKey = recipeKey;
  state.activeCategory = normalizeCategoryKey(recipe.category);
  renderCategoryTabs();
  renderDishes();
  renderRecipeEditor();
}

function startNewRecipe() {
  state.isNewRecipe = true;
  state.editingRecipeKey = "";
  fillRecipeEditor(null);
}

function fillRecipeEditor(recipe) {
  recipeDeleteButton.disabled = state.isNewRecipe;
  recipeNameRuInput.value = recipe ? localizeLanguage(recipe.name, "ru") : "";
  recipeNameEnInput.value = recipe ? localizeLanguage(recipe.name, "en") : "";
  recipeCategorySelect.value = normalizeCategoryKey(recipe?.category || state.activeCategory);
  recipePortionsInput.value = recipe?.portions || "";
  recipeIconInput.value = recipe?.icon || "🍽";
  recipeShelfLifeInput.value = recipe ? localizeLanguage(recipe.shelfLife, lang) : "";
  renderRecipeEditorRows(recipe?.ingredients || []);
}

function renderRecipeEditorRows(ingredients) {
  recipeEditorList.innerHTML = "";
  if (!ingredients.length) {
    addRecipeEditorRow();
    return;
  }
  ingredients.forEach((ingredient) => addRecipeEditorRow(ingredient));
}

function addRecipeEditorRow(ingredient = null) {
  const template = document.querySelector("#recipeEditorRowTemplate");
  const node = template.content.cloneNode(true);
  const productSelect = node.querySelector(".recipe-product-select");
  const quantityInput = node.querySelector(".recipe-quantity-input");
  const unitDisplay = node.querySelector(".recipe-unit-display");
  const removeButton = node.querySelector(".recipe-remove-button");
  const productId = ingredient?.productId || findProductIdByIngredient(ingredient) || state.products[0]?.id || "";

  productSelect.innerHTML = state.products
    .map((product) => `<option value="${escapeHtml(product.id)}">${escapeHtml(productLabel(product))}</option>`)
    .join("");
  productSelect.value = productId;
  quantityInput.value = ingredient?.quantity ?? "";
  const updateUnit = () => {
    const product = state.products.find((item) => item.id === productSelect.value);
    unitDisplay.textContent = product?.unit || "gr";
    unitDisplay.dataset.unit = product?.unit || "gr";
  };
  updateUnit();
  removeButton.textContent = tt("recipeDelete");
  productSelect.addEventListener("change", updateUnit);
  removeButton.addEventListener("click", () => {
    removeButton.closest(".recipe-editor-row").remove();
  });
  recipeEditorList.appendChild(node);
}

function saveRecipeEditor() {
  const nameRu = recipeNameRuInput.value.trim();
  const nameEn = recipeNameEnInput.value.trim();
  const category = normalizeCategoryKey(recipeCategorySelect.value);
  const portions = Number(recipePortionsInput.value);
  const icon = recipeIconInput.value.trim() || "🍽";
  const shelfLife = recipeShelfLifeInput.value.trim();
  const rows = Array.from(recipeEditorList.querySelectorAll(".recipe-editor-row"));
  const ingredients = rows.map((row) => ({
    productId: row.querySelector(".recipe-product-select").value,
    quantity: normalizeInput(row.querySelector(".recipe-quantity-input").value),
    unit: row.querySelector(".recipe-unit-display").dataset.unit,
  }));

  if (
    !nameRu ||
    !nameEn ||
    !Number.isFinite(portions) ||
    portions <= 0 ||
    !ingredients.length ||
    ingredients.some((ingredient) => !ingredient.productId || !ingredient.quantity || !productUnitOptions.includes(ingredient.unit))
  ) {
    alert(tt("recipeRequired"));
    return;
  }

  const recipeKey = state.isNewRecipe ? uniqueDishKey(makeDishKey(nameRu, nameEn)) : state.editingRecipeKey;
  state.dishes[recipeKey] = {
    name: { ru: nameRu, en: nameEn },
    category,
    icon,
    portions,
    shelfLife: shelfLife ? { ru: shelfLife, en: shelfLife } : null,
    ingredients,
  };
  state.recipeLinks[recipeKey] = ingredients;
  state.isNewRecipe = false;
  state.editingRecipeKey = recipeKey;
  state.activeCategory = category;
  saveDishes();
  saveRecipeLinks();
  if (state.selected[recipeKey]) {
    selectRecipe(recipeKey, state.selected[recipeKey].scale);
  }
  renderCategoryTabs();
  renderDishes();
  renderRecipeBook();
  alert(tt("recipeSaved"));
}

function deleteCurrentRecipe() {
  const recipeKey = state.editingRecipeKey;
  if (!recipeKey || state.isNewRecipe) {
    return;
  }
  delete state.dishes[recipeKey];
  delete state.recipeLinks[recipeKey];
  delete state.selected[recipeKey];
  delete state.plans[recipeKey];
  saveDishes();
  saveRecipeLinks();
  state.editingRecipeKey = "";
  renderCategoryTabs();
  renderDishes();
  renderRecipeBook();
  alert(tt("recipeDeleted"));
}

function loadRecipeLinks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(recipeStorageKey) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveRecipeLinks() {
  localStorage.setItem(recipeStorageKey, JSON.stringify(state.recipeLinks));
}

function loadDishes() {
  const savedDishes = localStorage.getItem(dishStorageKey);
  if (savedDishes !== null) {
    try {
      const parsed = JSON.parse(savedDishes);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? normalizeDishes(parsed) : normalizeDishes(recipes);
    } catch (error) {
      return normalizeDishes(recipes);
    }
  }
  const seededDishes = normalizeDishes(recipes);
  localStorage.setItem(dishStorageKey, JSON.stringify(seededDishes));
  return seededDishes;
}

function normalizeDishes(dishes) {
  return Object.fromEntries(
    Object.entries(dishes)
      .map(([key, recipe]) => [
        key,
        {
          name: recipe.name || { ru: "", en: "" },
          category: normalizeCategoryKey(recipe.category || "soup_hot"),
          icon: recipe.icon || "🍽",
          portions: Number(recipe.portions) || 1,
          shelfLife: recipe.shelfLife || null,
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        },
      ])
      .filter(([, recipe]) => localizeLanguage(recipe.name, "ru") && localizeLanguage(recipe.name, "en"))
  );
}

function saveDishes() {
  localStorage.setItem(dishStorageKey, JSON.stringify(state.dishes));
}

function getRecipes() {
  return state.dishes;
}

function getEditableRecipe(recipeKey) {
  const recipe = getRecipes()[recipeKey];
  const linkedIngredients = state.recipeLinks[recipeKey];
  if (!Array.isArray(linkedIngredients)) {
    return {
      ...recipe,
      ingredients: recipe.ingredients.map(normalizeDisplayIngredient),
    };
  }

  return {
    ...recipe,
    ingredients: linkedIngredients.map((ingredient) => {
      const product = state.products.find((item) => item.id === ingredient.productId);
      return {
        productId: ingredient.productId,
        name: {
          ru: product?.ru || "",
          en: product?.en || "",
        },
        quantity: ingredient.quantity,
        unit: {
          ru: ingredient.unit,
          en: ingredient.unit,
        },
      };
    }),
  };
}

function normalizeDisplayIngredient(ingredient) {
  if (!ingredient?.productId) {
    return ingredient;
  }
  const product = state.products.find((item) => item.id === ingredient.productId);
  return {
    productId: ingredient.productId,
    name: {
      ru: product?.ru || "",
      en: product?.en || "",
    },
    quantity: ingredient.quantity,
    unit: {
      ru: ingredient.unit,
      en: ingredient.unit,
    },
  };
}

function findProductIdByIngredient(ingredient) {
  if (!ingredient) {
    return "";
  }
  const ru = localizeLanguage(ingredient.name, "ru").toLocaleLowerCase("ru");
  const en = localizeLanguage(ingredient.name, "en").toLocaleLowerCase("en");
  return state.products.find((product) => product.ru.toLocaleLowerCase("ru") === ru || product.en.toLocaleLowerCase("en") === en)?.id || "";
}

function productLabel(product) {
  return lang === "en" ? `${product.en} / ${product.ru}` : `${product.ru} / ${product.en}`;
}

function normalizeCategoryKey(categoryKey) {
  const category = categories.find((item) => item.key === categoryKey || item.legacyKeys.includes(categoryKey));
  return category?.key || "soup_hot";
}

function matchesSearch(value, query) {
  if (!query) {
    return true;
  }
  return normalizeSearchText(value).includes(normalizeSearchText(query));
}

function normalizeSearchText(value) {
  return String(value || "").trim().toLocaleLowerCase(lang === "en" ? "en" : "ru");
}

function makeDishKey(ru, en) {
  return `${ru}-${en}`
    .toLocaleLowerCase("en")
    .replace(/[^a-zа-я0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "") || `dish_${Date.now()}`;
}

function uniqueDishKey(baseKey) {
  let key = baseKey;
  let index = 2;
  while (state.dishes[key]) {
    key = `${baseKey}_${index}`;
    index += 1;
  }
  return key;
}

function loadProducts() {
  const savedProducts = localStorage.getItem(productStorageKey);
  if (savedProducts !== null) {
    try {
      const parsed = JSON.parse(savedProducts);
      return Array.isArray(parsed) ? normalizeProducts(parsed) : [];
    } catch (error) {
      return [];
    }
  }

  const seededProducts = buildSeedProductsFromRecipes();
  localStorage.setItem(productStorageKey, JSON.stringify(seededProducts));
  return seededProducts;
}

function normalizeProducts(products) {
  return products
    .map((product) => ({
      id: String(product.id || makeProductId(product.ru || "", product.en || "")),
      ru: String(product.ru || "").trim(),
      en: String(product.en || "").trim(),
      unit: productUnitOptions.includes(product.unit) ? product.unit : "pc",
    }))
    .filter((product) => product.ru && product.en)
    .sort(sortProducts);
}

function buildSeedProductsFromRecipes() {
  const products = new Map();
  Object.values(recipes).forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ru = localizeLanguage(ingredient.name, "ru");
      const en = localizeLanguage(ingredient.name, "en");
      if (!ru || !en) {
        return;
      }
      const key = ru.toLocaleLowerCase("ru");
      if (!products.has(key)) {
        products.set(key, {
          id: makeProductId(ru, en),
          ru,
          en,
          unit: normalizeProductUnit(localizeLanguage(ingredient.unit, "ru") || localizeLanguage(ingredient.unit, "en")),
        });
      }
    });
  });

  return Array.from(products.values()).sort(sortProducts);
}

function saveProductFromForm() {
  const ru = productRuInput.value.trim();
  const en = productEnInput.value.trim();
  const unit = productUnitSelect.value;
  if (!ru || !en || !productUnitOptions.includes(unit)) {
    alert(tt("productRequired"));
    return;
  }

  if (state.editingProductId) {
    state.products = state.products.map((product) =>
      product.id === state.editingProductId ? { ...product, ru, en, unit } : product
    );
  } else {
    state.products = [...state.products, { id: makeProductId(ru, en), ru, en, unit }];
  }

  state.products = dedupeProducts(state.products).sort(sortProducts);
  saveProducts();
  resetProductForm();
  renderProductCatalog();
}

function startProductEdit(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) {
    return;
  }
  state.editingProductId = product.id;
  productRuInput.value = product.ru;
  productEnInput.value = product.en;
  productUnitSelect.value = product.unit;
  productSaveButton.textContent = tt("productUpdate");
  productCancelButton.hidden = false;
  productRuInput.focus();
}

function deleteProduct(productId) {
  state.products = state.products.filter((product) => product.id !== productId);
  saveProducts();
  if (state.editingProductId === productId) {
    resetProductForm();
  }
  renderProductCatalog();
}

function resetProductForm() {
  state.editingProductId = null;
  productForm.reset();
  productUnitSelect.value = "gr";
  productSaveButton.textContent = tt("productAdd");
  productCancelButton.hidden = true;
}

function saveProducts() {
  localStorage.setItem(productStorageKey, JSON.stringify(state.products));
}

function dedupeProducts(products) {
  const byName = new Map();
  products.forEach((product) => {
    const key = `${product.ru.toLocaleLowerCase("ru")}|${product.en.toLocaleLowerCase("en")}`;
    byName.set(key, product);
  });
  return Array.from(byName.values());
}

function sortProducts(a, b) {
  return a.ru.localeCompare(b.ru, "ru");
}

function makeProductId(ru, en) {
  const slug = `${ru}-${en}`
    .toLocaleLowerCase("en")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "product"}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function normalizeProductUnit(unit) {
  const normalized = unitAliases[String(unit || "").trim().toLowerCase()];
  return productUnitOptions.includes(normalized) ? normalized : "pc";
}

function renderRecipes() {
  recipeList.innerHTML = "";
  const entries = Object.entries(state.plans);

  if (!entries.length) {
    recipeList.innerHTML = `<div class="empty-state">${escapeHtml(tt("selectedEmpty"))}</div>`;
    return;
  }

  const recipeTemplate = document.querySelector("#recipeTemplate");
  const ingredientTemplate = document.querySelector("#ingredientTemplate");

  entries.forEach(([recipeKey, plan]) => {
    const recipeNode = recipeTemplate.content.cloneNode(true);
    recipeNode.querySelector("h3").textContent = plan.name;
    recipeNode.querySelector(".recipe-title-row span").textContent = `${plan.scaleLabel}, ${plan.portionsLabel}`;
    const grid = recipeNode.querySelector(".ingredient-grid");

    plan.ingredients.forEach((ingredient, index) => {
      const ingredientNode = ingredientTemplate.content.cloneNode(true);
      const input = ingredientNode.querySelector(".quantity-input");
      ingredientNode.querySelector(".ingredient-name").textContent = ingredient.name;
      ingredientNode.querySelector(".unit-label").textContent = ingredient.unit || ingredient.note || "";
      input.value = ingredient.quantity;
      input.placeholder = ingredient.note || "";
      input.disabled = ingredient.quantity === "" && !ingredient.unit;
      input.addEventListener("input", () => {
        state.plans[recipeKey].ingredients[index].quantity = normalizeInput(input.value);
        renderProductCheck();
      });
      grid.appendChild(ingredientNode);
    });

    recipeList.appendChild(recipeNode);
  });
}

function renderProductCheck() {
  const items = buildProductNeedList();
  const uncheckedCount = items.filter((item) => !hasStockValue(item)).length;
  const buyCount = buildShoppingList().length;
  shoppingList.innerHTML = "";
  shoppingCount.textContent = `${plural(items.length, tt("itemOne"), tt("itemFew"), tt("itemMany"))} / ${tt("buy").toLowerCase()} ${buyCount}`;

  if (!items.length) {
    shoppingList.innerHTML = `<div class="empty-state">${escapeHtml(tt("productsEmpty"))}</div>`;
    return;
  }

  items.forEach((item) => {
    const key = productKey(item);
    const stockValue = state.stockByProduct[key] ?? "";
    const toBuy = calculateToBuy(item, stockValue);
    const row = document.createElement("div");
    row.className = `stock-row${stockValue === "" ? " is-unchecked" : ""}`;
    row.dataset.productKey = key;
    row.innerHTML = `
      <div class="stock-main">
        <span class="shopping-name">${escapeHtml(item.name)}</span>
        <span class="shopping-meta">${tt("needed")}: ${escapeHtml(formatAmount(item))}</span>
      </div>
      <label class="stock-input-wrap">
        <span>${tt("inStock")}</span>
        <input class="stock-input" inputmode="decimal" value="${escapeHtml(stockValue)}" placeholder="0">
        <span>${escapeHtml(item.unit)}</span>
      </label>
      <div class="buy-result">${escapeHtml(formatToBuy(item, toBuy))}</div>
    `;

    const input = row.querySelector(".stock-input");
    input.addEventListener("input", () => {
      state.stockByProduct[key] = normalizeInput(input.value);
      updateStockRow(row, item, input.value);
      updateSaveState();
    });
    shoppingList.appendChild(row);
  });

  updateSaveState();
}

function scaleRecipe(recipe, scale) {
  return {
    name: localize(recipe.name),
    scale,
    scaleLabel: localize(scaleLabels[scale]),
    portionsLabel: formatPortions(recipe.portions * scale),
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: localize(ingredient.name),
      quantity: ingredient.quantity === "" ? "" : formatQuantity(parseAmount(ingredient.quantity) * scale),
      unit: localize(ingredient.unit),
      note: ingredient.note ? localize(ingredient.note) : "",
    })),
  };
}

function buildProductNeedList() {
  const items = new Map();
  Object.values(state.plans).forEach((plan) => {
    plan.ingredients.forEach((ingredient) => {
      const key = productKey(ingredient);
      const amount = parseAmount(ingredient.quantity);
      if (!items.has(key)) {
        items.set(key, { ...ingredient, quantity: Number.isFinite(amount) ? amount : ingredient.quantity });
        return;
      }

      const current = items.get(key);
      if (Number.isFinite(amount) && Number.isFinite(parseAmount(current.quantity))) {
        current.quantity = parseAmount(current.quantity) + amount;
      }
    });
  });

  return Array.from(items.values()).filter((item) => item.quantity !== "" || item.note);
}

function buildProductCheckList() {
  return buildProductNeedList().map((item) => {
    const inStock = state.stockByProduct[productKey(item)] ?? "";
    return {
      ...item,
      neededQuantity: item.quantity,
      inStockQuantity: inStock,
      toBuyQuantity: calculateToBuy(item, inStock),
    };
  });
}

function buildShoppingList() {
  return buildProductCheckList()
    .filter((item) => Number(item.toBuyQuantity) > 0)
    .map((item) => ({
      name: item.name,
      quantity: item.toBuyQuantity,
      unit: item.unit,
      note: item.note,
    }));
}

function savePlan() {
  const unchecked = buildProductNeedList().filter((item) => !hasStockValue(item));
  if (unchecked.length) {
    alert(tt("fillStock"));
    return;
  }

  const fullPayload = {
    recipes: buildPlanSummary(),
    productCheck: buildProductCheckList(),
    shoppingList: buildShoppingList(),
    createdDate: formatDisplayDate(new Date()),
    purchaseDate: formatPurchaseDate(new Date()),
    savedAt: new Date().toISOString(),
  };
  const compactPayload = {
    v: 2,
    cd: fullPayload.createdDate,
    pd: fullPayload.purchaseDate,
    at: fullPayload.savedAt,
    r: fullPayload.recipes.map((recipe) => ({
      n: recipe.name,
      sl: recipe.scaleLabel,
      pl: recipe.portionsLabel,
    })),
    s: fullPayload.shoppingList.map((item) => ({
      n: item.name,
      q: formatQuantity(Number(item.quantity)),
      u: item.unit,
    })),
  };

  localStorage.setItem("samovarKitchenPlan", JSON.stringify(fullPayload));

  if (tg) {
    const telegramPayload = JSON.stringify(compactPayload);
    if (telegramPayload.length > 3900) {
      alert(tt("tooLarge"));
      return;
    }

    try {
      saveButton.textContent = tt("saving");
      tg.sendData(telegramPayload);
      tg.close();
    } catch (error) {
      saveButton.textContent = tt("save");
      alert(tt("sendError"));
    }
  } else {
    alert(tt("savedBrowser"));
  }
}

function buildPlanSummary() {
  return Object.values(state.plans).map((plan) => ({
    name: plan.name,
    scaleLabel: plan.scaleLabel,
    portionsLabel: plan.portionsLabel,
  }));
}

function resetPlan() {
  state.selected = {};
  state.plans = {};
  state.stockByProduct = {};
  state.activeCategory = "soup_hot";
  saveButton.disabled = false;
  saveButton.textContent = tt("save");
  localStorage.removeItem("samovarKitchenPlan");
  renderCategoryTabs();
  renderDishes();
  renderAll();
}

function hasStockValue(item) {
  return state.stockByProduct[productKey(item)] !== undefined && state.stockByProduct[productKey(item)] !== "";
}

function calculateToBuy(item, stockValue) {
  const needed = parseAmount(item.quantity);
  const inStock = parseAmount(stockValue);
  if (!Number.isFinite(needed) || !Number.isFinite(inStock)) {
    return 0;
  }
  return Math.max(0, needed - inStock);
}

function updateStockRow(row, item, stockValue) {
  const toBuy = calculateToBuy(item, stockValue);
  row.classList.toggle("is-unchecked", stockValue === "");
  row.querySelector(".buy-result").textContent = formatToBuy(item, toBuy);
}

function updateSaveState() {
  const items = buildProductNeedList();
  const uncheckedCount = items.filter((item) => !hasStockValue(item)).length;
  const buyCount = buildShoppingList().length;
  shoppingCount.textContent = `${plural(items.length, tt("itemOne"), tt("itemFew"), tt("itemMany"))} / ${tt("buy").toLowerCase()} ${buyCount}`;
  saveButton.disabled = uncheckedCount > 0;
  saveButton.textContent = uncheckedCount > 0 ? `${tt("checkProducts")}: ${uncheckedCount}` : tt("save");
}

function formatToBuy(item, quantity) {
  if (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0) {
    return tt("buyNone");
  }
  return `${tt("buy")}: ${formatQuantity(Number(quantity))}${item.unit ? ` ${item.unit}` : ""}`;
}

function formatPortions(value) {
  if (Number.isInteger(value)) {
    return `${value} ${tt("portions")}`;
  }
  return `${tt("approx")} ${Math.floor(value)}-${Math.ceil(value)} ${tt("portions")}`;
}

function formatQuantity(value) {
  if (typeof value === "string") {
    return value;
  }
  if (Number.isInteger(value)) {
    return String(value);
  }
  const fraction = asSimpleFraction(value);
  if (fraction) {
    return fraction;
  }
  if (value < 10) {
    return String(Number(value.toFixed(1)));
  }
  return String(Math.round(value));
}

function normalizeInput(value) {
  return value.replace(/[^\d.,/]/g, "").replace(",", ".");
}

function parseAmount(value) {
  if (String(value).includes("/")) {
    const [rawNumerator, rawDenominator] = String(value).split("/");
    const numerator = Number(rawNumerator);
    const denominator = Number(rawDenominator);
    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }

  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : NaN;
}

function formatAmount(item) {
  const amount = item.quantity === "" ? "" : formatQuantity(item.quantity);
  return `${amount}${item.unit ? ` ${item.unit}` : ""}${item.note ? ` (${item.note})` : ""}`.trim();
}

function formatRecipeIngredient(ingredient) {
  const quantity = ingredient.quantity === "" ? "" : formatQuantity(parseAmount(ingredient.quantity));
  const unit = localize(ingredient.unit);
  const note = ingredient.note ? localize(ingredient.note) : "";
  return `${quantity}${unit ? ` ${unit}` : ""}${note ? ` (${note})` : ""}`.trim();
}

function productKey(item) {
  return `${item.name}|${item.unit}|${item.note}`;
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatPurchaseDate(date) {
  return formatDisplayDate(date);
}

function tt(key) {
  return i18n[lang][key] || i18n.ru[key];
}

function localize(value) {
  if (value && typeof value === "object") {
    return value[lang] || value.ru || value.en || "";
  }
  return value || "";
}

function localizeLanguage(value, targetLang) {
  if (value && typeof value === "object") {
    return value[targetLang] || value.ru || value.en || "";
  }
  return value || "";
}

function enableProtectedRecipeMode() {
  document.body.classList.add("recipes-mode");
  ["copy", "cut", "contextmenu", "dragstart", "selectstart"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (event.target.closest(".recipe-editor")) {
        return;
      }
      event.preventDefault();
    });
  });
}

function asSimpleFraction(value) {
  const denominators = [2, 3, 4, 5, 6, 8, 10, 12];
  for (const denominator of denominators) {
    const numerator = Math.round(value * denominator);
    if (numerator > 0 && numerator < denominator && Math.abs(value - numerator / denominator) < 0.001) {
      return `${numerator}/${denominator}`;
    }
  }
  return "";
}

function plural(count, one, few, many) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word = mod10 === 1 && mod100 !== 11 ? one : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? few : many;
  return `${count} ${word}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
