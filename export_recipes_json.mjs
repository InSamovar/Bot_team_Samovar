import fs from "node:fs/promises";
import vm from "node:vm";

const source = await fs.readFile("webapp/app.js", "utf8");

function extractDeclaration(name) {
  const start = source.indexOf(`const ${name} = `);
  if (start === -1) {
    throw new Error(`Cannot find ${name}`);
  }
  const valueStart = start + `const ${name} = `.length;
  const opener = source[valueStart];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let inString = "";
  let escaped = false;

  for (let index = valueStart; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === inString) {
        inString = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      continue;
    }
    if (char === opener) {
      depth += 1;
    } else if (char === closer) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(valueStart, index + 1);
      }
    }
  }

  throw new Error(`Cannot find end of ${name}`);
}

const recipes = vm.runInNewContext(`(${extractDeclaration("recipes")})`);
const categories = vm.runInNewContext(`(${extractDeclaration("categories")})`);

await fs.mkdir("webapp/data", { recursive: true });
await fs.writeFile(
  "webapp/data/recipes.json",
  JSON.stringify({ version: 1, categories, recipes }, null, 2),
  "utf8",
);

console.log(`Exported ${Object.keys(recipes).length} recipes to webapp/data/recipes.json`);
