import { eslintConfig } from "../package.json";
import { runCommandReturnResults, writeToDisk } from "./utils.ts";

if (
  eslintConfig.extends.length > 1 ||
  eslintConfig.extends[0] !== "airbnb-typescript/base"
) {
  throw new Error(
    'Your package.json "eslintConfig" should only extend "airbnb-typescript/base"'
  );
}

// const filter = { filterRows: ["one"] };

// const template = {
//   one: { title: "one" },
//   two: { title: "two" },
//   three: { title: "three" }
// };

// const filterDialogView = filter.filterRows;
// const final = Object.entries(template).filter(
//   ([row]) => !filterDialogView.includes(row)
// );

/**
 * ============================================================================
 * Extract the entire set of rules from eslint-config-airbnb-typescript using
 *  the eslint command line and a Deno sub process
 * ============================================================================
 */
const pathToPackageJson = new URL("..//package.json", import.meta.url).pathname;
const entireEslintConfig = await runCommandReturnResults([
  "npx",
  "eslint",
  "--no-eslintrc", // disables use of configuration from .eslintrc.* and package.json files
  "-c", // use this configuration, overriding .eslintrc.* config options if present
  `${pathToPackageJson}`,
  "--print-config",
  "example.js" // dummy file that seems to be needed for eslint to work
]);

export const airBnBRules: { [key: string]: any[] } = entireEslintConfig.rules;

// console.log(Object.entries(airBnBRules).length);
const filtered = Object.entries(airBnBRules).filter(
  ([key, value]) => !key.startsWith("import/") || value[0] !== "off"
);

// const filtered2 = Object.entries(airBnBRules).filter(
//   ([row]) => !filterDialogView.includes(row)
// );

// console.log(JSON.stringify(filtered, null, 2));
console.log(Object.entries(filtered).length);

const finalOutput = {
  rules: filtered
};

// only run if the file is being called directly on the CLI, not tests
if (import.meta.main) {
  writeToDisk(".filtered.json", JSON.stringify(finalOutput, null, 2));
}

// THIS is the answer but you must correct the logic error!!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators
const object1 = { a: 1, b: 2, c: 3 };

// it returns the array when true.
// !true = false | !== "c" is false when true, val !== 2 is false when true
// only true and true = true
const object4 = Object.fromEntries(
  Object.entries(object1).filter(([key, val]) => key !== "a" || val !== 2) // true || false = true so a:1 is added!
);

console.log(object4); //?
