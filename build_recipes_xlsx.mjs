import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const payload = JSON.parse(await fs.readFile("webapp/data/recipes.json", "utf8"));
const recipes = payload.recipes;
const categories = payload.categories;
const categoryByKey = new Map();
for (const category of categories) {
  categoryByKey.set(category.key, category.label?.en || category.key);
  for (const legacy of category.legacyKeys || []) {
    categoryByKey.set(legacy, category.label?.en || category.key);
  }
}

function text(value, language = "ru") {
  if (value && typeof value === "object") {
    return value[language] || value.ru || value.en || "";
  }
  return value ?? "";
}

function unitText(value) {
  return text(value, "en") || text(value, "ru");
}

const recipeRows = [["ID", "Category", "Name RU", "Name EN", "Portions", "Shelf life", "Icon", "Ingredient count"]];
const ingredientRows = [["ID", "Category", "Dish RU", "Dish EN", "Ingredient RU", "Ingredient EN", "Quantity", "Unit", "Note RU", "Note EN"]];
const compositionRows = [["Category", "Dish RU", "Dish EN", "Portions", "Shelf life", "Composition RU", "Composition EN"]];

for (const [id, recipe] of Object.entries(recipes)) {
  const category = categoryByKey.get(recipe.category) || recipe.category || "";
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  recipeRows.push([
    id,
    category,
    text(recipe.name, "ru"),
    text(recipe.name, "en"),
    recipe.portions ?? "",
    text(recipe.shelfLife, "ru"),
    recipe.icon || "",
    ingredients.length,
  ]);

  const compositionRu = ingredients
    .map((ingredient) => {
      const quantity = ingredient.quantity ?? "";
      const unit = unitText(ingredient.unit);
      const note = text(ingredient.note, "ru");
      return [
        text(ingredient.name, "ru"),
        quantity,
        unit,
        note ? `(${note})` : "",
      ].filter(Boolean).join(" ");
    })
    .join("\n");
  const compositionEn = ingredients
    .map((ingredient) => {
      const quantity = ingredient.quantity ?? "";
      const unit = unitText(ingredient.unit);
      const note = text(ingredient.note, "en");
      return [
        text(ingredient.name, "en"),
        quantity,
        unit,
        note ? `(${note})` : "",
      ].filter(Boolean).join(" ");
    })
    .join("\n");

  compositionRows.push([
    category,
    text(recipe.name, "ru"),
    text(recipe.name, "en"),
    recipe.portions ?? "",
    text(recipe.shelfLife, "ru"),
    compositionRu,
    compositionEn,
  ]);

  for (const ingredient of ingredients) {
    ingredientRows.push([
      id,
      category,
      text(recipe.name, "ru"),
      text(recipe.name, "en"),
      text(ingredient.name, "ru"),
      text(ingredient.name, "en"),
      ingredient.quantity ?? "",
      unitText(ingredient.unit),
      text(ingredient.note, "ru"),
      text(ingredient.note, "en"),
    ]);
  }
}

const workbook = Workbook.create();
const recipesSheet = workbook.worksheets.add("Recipes");
const ingredientsSheet = workbook.worksheets.add("Ingredients");
const compositionSheet = workbook.worksheets.add("Dish composition");

recipesSheet.getRangeByIndexes(0, 0, recipeRows.length, recipeRows[0].length).values = recipeRows;
ingredientsSheet.getRangeByIndexes(0, 0, ingredientRows.length, ingredientRows[0].length).values = ingredientRows;
compositionSheet.getRangeByIndexes(0, 0, compositionRows.length, compositionRows[0].length).values = compositionRows;

function styleSheet(sheet, rangeAddress, titleAddress, tabColor) {
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  const used = sheet.getUsedRange();
  used.format = {
    font: { name: "Arial", size: 11, color: "#1F2933" },
    fill: "#FFFFFF",
    wrapText: true,
    verticalAlignment: "Top",
  };
  sheet.getRange(rangeAddress).format = {
    fill: tabColor,
    font: { bold: true, color: "#FFFFFF" },
    horizontalAlignment: "Center",
    verticalAlignment: "Middle",
  };
  sheet.getRange(titleAddress).format = {
    font: { bold: true },
  };
  used.format.autofitColumns();
  used.format.autofitRows();
}

styleSheet(recipesSheet, "A1:H1", "C2:D200", "#2F6F4E");
styleSheet(ingredientsSheet, "A1:J1", "C2:F500", "#7A4A20");
styleSheet(compositionSheet, "A1:G1", "B2:G200", "#355C7D");

recipesSheet.tables.add(`A1:H${recipeRows.length}`, true, "RecipesTable").style = "TableStyleMedium4";
ingredientsSheet.tables.add(`A1:J${ingredientRows.length}`, true, "IngredientsTable").style = "TableStyleMedium7";
compositionSheet.tables.add(`A1:G${compositionRows.length}`, true, "CompositionTable").style = "TableStyleMedium2";

recipesSheet.getRange("A:A").format.columnWidthPx = 190;
recipesSheet.getRange("B:B").format.columnWidthPx = 130;
recipesSheet.getRange("C:D").format.columnWidthPx = 180;
recipesSheet.getRange("E:E").format.columnWidthPx = 85;
recipesSheet.getRange("F:F").format.columnWidthPx = 120;
recipesSheet.getRange("G:H").format.columnWidthPx = 90;

ingredientsSheet.getRange("A:A").format.columnWidthPx = 185;
ingredientsSheet.getRange("B:B").format.columnWidthPx = 120;
ingredientsSheet.getRange("C:D").format.columnWidthPx = 170;
ingredientsSheet.getRange("E:F").format.columnWidthPx = 175;
ingredientsSheet.getRange("G:H").format.columnWidthPx = 90;
ingredientsSheet.getRange("I:J").format.columnWidthPx = 140;

compositionSheet.getRange("A:A").format.columnWidthPx = 130;
compositionSheet.getRange("B:C").format.columnWidthPx = 170;
compositionSheet.getRange("D:E").format.columnWidthPx = 95;
compositionSheet.getRange("F:G").format.columnWidthPx = 310;
compositionSheet.getRange(`F2:G${compositionRows.length}`).format.wrapText = true;
compositionSheet.getRange(`A2:G${compositionRows.length}`).format.verticalAlignment = "Top";

const outputDir = "outputs/recipes_export";
await fs.mkdir(outputDir, { recursive: true });

await workbook.inspect({
  kind: "table",
  range: "Recipes!A1:H12",
  include: "values",
  tableMaxRows: 12,
  tableMaxCols: 8,
});
await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
});
await workbook.render({ sheetName: "Recipes", range: "A1:H20", scale: 1 });
await workbook.render({ sheetName: "Ingredients", range: "A1:J30", scale: 1 });
await workbook.render({ sheetName: "Dish composition", range: "A1:G18", scale: 1 });

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/samovar_recipes.xlsx`);

console.log(JSON.stringify({
  recipes: recipeRows.length - 1,
  ingredients: ingredientRows.length - 1,
  output: `${process.cwd()}/${outputDir}/samovar_recipes.xlsx`,
}));
