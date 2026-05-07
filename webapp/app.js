const recipes = {
  chicken_soup: {
    name: "Куриный суп",
    portions: 16,
    ingredients: [
      { name: "куриные ножки", quantity: 5, unit: "шт" },
      { name: "картошка", quantity: 1250, unit: "г" },
      { name: "морковь", quantity: 1, unit: "шт" },
      { name: "лук", quantity: 1, unit: "головка" },
      { name: "зеленый лук", quantity: "", unit: "", note: "для подачи" },
    ],
  },
  casserole: {
    name: "Запеканка",
    portions: 9,
    ingredients: [
      { name: "куриная грудка", quantity: 5, unit: "шт" },
      { name: "картошка", quantity: 2200, unit: "г" },
      { name: "грибы", quantity: 1, unit: "бокс" },
      { name: "сыр", quantity: 300, unit: "г" },
      { name: "майонез", quantity: 4, unit: "ст. ложки", note: "примерно 70 г на полный объем" },
    ],
  },
};

const scaleLabels = {
  1: "Полный объем",
  0.75: "25% меньше",
  0.5: "50% меньше",
  0.25: "75% меньше",
};

const tg = window.Telegram?.WebApp;
const state = {
  selected: {},
  plans: {},
  stockByProduct: {},
};

const dishList = document.querySelector("#dishList");
const recipeList = document.querySelector("#recipeList");
const shoppingList = document.querySelector("#shoppingList");
const selectedCount = document.querySelector("#selectedCount");
const shoppingCount = document.querySelector("#shoppingCount");
const saveButton = document.querySelector("#saveButton");
const resetButton = document.querySelector("#resetButton");

init();

function init() {
  tg?.ready();
  tg?.expand();
  renderDishes();
  renderAll();
  saveButton.addEventListener("click", savePlan);
  resetButton.addEventListener("click", resetPlan);
}

function renderDishes() {
  dishList.innerHTML = "";
  const template = document.querySelector("#dishTemplate");

  Object.entries(recipes).forEach(([key, recipe]) => {
    const node = template.content.cloneNode(true);
    const row = node.querySelector(".dish-row");
    const checkbox = node.querySelector(".dish-checkbox");
    const name = node.querySelector(".dish-name");
    const scale = node.querySelector(".scale-select");

    row.dataset.key = key;
    name.textContent = recipe.name;
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
}

function selectRecipe(key, scale) {
  state.selected[key] = { scale };
  state.plans[key] = scaleRecipe(recipes[key], scale);
}

function renderAll() {
  renderRecipes();
  renderProductCheck();
  const count = Object.keys(state.selected).length;
  selectedCount.textContent = plural(count, "блюдо", "блюда", "блюд");
}

function renderRecipes() {
  recipeList.innerHTML = "";
  const entries = Object.entries(state.plans);

  if (!entries.length) {
    recipeList.innerHTML = '<div class="empty-state">Выберите блюда выше</div>';
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
  shoppingCount.textContent = `${plural(items.length, "позиция", "позиции", "позиций")} / купить ${buyCount}`;

  if (!items.length) {
    shoppingList.innerHTML = '<div class="empty-state">Продукты появятся после выбора блюд</div>';
    return;
  }

  items.forEach((item) => {
    const key = productKey(item);
    const stockValue = state.stockByProduct[key] ?? "";
    const toBuy = calculateToBuy(item, stockValue);
    const row = document.createElement("div");
    row.className = `stock-row${stockValue === "" ? " is-unchecked" : ""}`;
    row.innerHTML = `
      <div class="stock-main">
        <span class="shopping-name">${escapeHtml(item.name)}</span>
        <span class="shopping-meta">Нужно: ${escapeHtml(formatAmount(item))}</span>
      </div>
      <label class="stock-input-wrap">
        <span>Есть</span>
        <input class="stock-input" inputmode="decimal" value="${escapeHtml(stockValue)}" placeholder="0">
        <span>${escapeHtml(item.unit)}</span>
      </label>
      <div class="buy-result">${escapeHtml(formatToBuy(item, toBuy))}</div>
    `;

    const input = row.querySelector(".stock-input");
    input.addEventListener("input", () => {
      state.stockByProduct[key] = normalizeInput(input.value);
      renderProductCheck();
    });
    shoppingList.appendChild(row);
  });

  saveButton.disabled = uncheckedCount > 0;
  saveButton.textContent = uncheckedCount > 0 ? `Проверить продукты: ${uncheckedCount}` : "Сохранить план";
}

function scaleRecipe(recipe, scale) {
  return {
    name: recipe.name,
    scale,
    scaleLabel: scaleLabels[scale],
    portionsLabel: formatPortions(recipe.portions * scale),
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity === "" ? "" : formatQuantity(Number(ingredient.quantity) * scale),
      unit: ingredient.unit,
      note: ingredient.note || "",
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
    alert("Заполните остатки по всем продуктам перед сохранением.");
    return;
  }

  const payload = {
    recipes: Object.values(state.plans),
    productCheck: buildProductCheckList(),
    shoppingList: buildShoppingList(),
    purchaseDate: formatPurchaseDate(new Date()),
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem("samovarKitchenPlan", JSON.stringify(payload));

  if (tg) {
    tg.sendData(JSON.stringify(payload));
    tg.close();
  } else {
    alert("План сохранен в браузере");
  }
}

function resetPlan() {
  state.selected = {};
  state.plans = {};
  state.stockByProduct = {};
  saveButton.disabled = false;
  saveButton.textContent = "Сохранить план";
  localStorage.removeItem("samovarKitchenPlan");
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

function formatToBuy(item, quantity) {
  if (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0) {
    return "Купить: не нужно";
  }
  return `Купить: ${formatQuantity(Number(quantity))}${item.unit ? ` ${item.unit}` : ""}`;
}

function formatPortions(value) {
  if (Number.isInteger(value)) {
    return `${value} порций`;
  }
  return `примерно ${Math.floor(value)}-${Math.ceil(value)} порций`;
}

function formatQuantity(value) {
  if (typeof value === "string") {
    return value;
  }
  if (Number.isInteger(value)) {
    return String(value);
  }
  if (value < 10) {
    return String(Number(value.toFixed(1)));
  }
  return String(Math.round(value));
}

function normalizeInput(value) {
  return value.replace(/[^\d.,]/g, "").replace(",", ".");
}

function parseAmount(value) {
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : NaN;
}

function formatAmount(item) {
  const amount = item.quantity === "" ? "" : formatQuantity(item.quantity);
  return `${amount}${item.unit ? ` ${item.unit}` : ""}${item.note ? ` (${item.note})` : ""}`.trim();
}

function productKey(item) {
  return `${item.name}|${item.unit}|${item.note}`;
}

function formatPurchaseDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
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

