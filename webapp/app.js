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
  { key: "hot", label: { ru: "Горячее", en: "Hot dishes" }, icon: "🔥" },
  { key: "pancakes", label: { ru: "Блины", en: "Pancakes" }, icon: "🥞" },
  { key: "dumplings", label: { ru: "Пельмени/Вареники", en: "Dumplings" }, icon: "🥟" },
  { key: "salads", label: { ru: "Салаты", en: "Salads" }, icon: "🥗" },
  { key: "desserts", label: { ru: "Десерты", en: "Desserts" }, icon: "🍰" },
];

const scaleLabels = {
  1: { ru: "Полный объем", en: "Full batch" },
  0.75: { ru: "25% меньше", en: "25% less" },
  0.5: { ru: "50% меньше", en: "50% less" },
  0.25: { ru: "75% меньше", en: "75% less" },
};

const i18n = {
  ru: {
    title: "План на завтра",
    reset: "Сбросить",
    whatCook: "Что готовим",
    ingredients: "Ингредиенты",
    productCheck: "Проверка продуктов",
    recipesTitle: "Рецепты",
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
    reset: "Reset",
    whatCook: "What to cook",
    ingredients: "Ingredients",
    productCheck: "Product check",
    recipesTitle: "Recipes",
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
const view = params.get("view") === "recipes" ? "recipes" : "plan";
const state = {
  selected: {},
  plans: {},
  stockByProduct: {},
  activeCategory: "hot",
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

init();

function init() {
  tg?.ready();
  tg?.expand();
  applyLanguage();
  if (view === "recipes") {
    enableProtectedRecipeMode();
  }
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
  resetButton.textContent = tt("reset");
  const headings = document.querySelectorAll(".section h2");
  headings[0].textContent = tt("whatCook");
  headings[1].textContent = tt("ingredients");
  headings[2].textContent = tt("productCheck");
  if (recipeBookSection) {
    recipeBookSection.querySelector("h2").textContent = tt("recipesTitle");
  }
  saveButton.textContent = tt("save");
  document.querySelectorAll(".scale-select option").forEach((option) => {
    option.textContent = localize(scaleLabels[option.value]);
  });
}

function renderCategoryTabs() {
  categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const count = Object.values(recipes).filter((recipe) => recipe.category === category.key).length;
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
  const visibleRecipes = Object.entries(recipes).filter(([, recipe]) => recipe.category === state.activeCategory);

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
  state.plans[key] = scaleRecipe(recipes[key], scale);
}

function renderAll() {
  if (view === "recipes") {
    renderRecipeBook();
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
  document.querySelector(".footer-actions").hidden = true;
  recipeBookSection.hidden = false;
  recipeBookList.innerHTML = "";
  const currentRecipes = Object.values(recipes).filter((recipe) => recipe.category === state.activeCategory);
  recipeBookCount.textContent = plural(currentRecipes.length, tt("dishOne"), tt("dishFew"), tt("dishMany"));

  const template = document.querySelector("#recipeBookTemplate");
  currentRecipes.forEach((recipe) => {
    const node = template.content.cloneNode(true);
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
  state.activeCategory = "hot";
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

function enableProtectedRecipeMode() {
  document.body.classList.add("recipes-mode");
  ["copy", "cut", "contextmenu", "dragstart", "selectstart"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => event.preventDefault());
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
