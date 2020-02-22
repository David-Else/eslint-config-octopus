/**
 * @file Creates a .eslintrc.json config file for typescript-eslint with rules
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2020 David Else
 * @license gpl-3.0
 * @version 1.0
 *
 * deno -A mod.ts
 */

import { rulesToAdd } from "./rulesToAdd.ts";
import { outputToConsole } from "./view.ts";

interface EslintRules {
  [key: string]: any[];
}

/**
 * ============================================================================
 * Generate eslint rules based on airbnb with prettier conflicts turned off
 * ============================================================================
 */
const path = new URL("./", import.meta.url).pathname;
const eslintConfigFile = "airbnb_prettier_config.json";

const subprocess = Deno.run({
  args: [
    "npx",
    "eslint",
    "--no-eslintrc",
    "-c",
    `${path}/${eslintConfigFile}`,
    "--print-config",
    "example.js"
  ],
  stdout: "piped"
});
const commandOutput = await Deno.readAll(subprocess.stdout!);
const entireEslintConfig = JSON.parse(new TextDecoder().decode(commandOutput));

/**
 * ============================================================================
 * Remove rules
 * ============================================================================
 */

/**
 * These rules are meant to be removed by:
 *
 * ```
 * "extends": [ "plugin:@typescript-eslint/recommended" ]
 * ```
 * and are designed to be used after extending a config that turns them on
 * Our new config will have precidence so we need them removed from `"rules": {}`
 */
const checkedByTypeScript: readonly string[] = [
  "getter-return", // ts(2378)
  "no-dupe-args", // ts(2300)
  "no-dupe-keys", // ts(1117)
  "no-unreachable", // ts(7027)
  "valid-typeof", // ts(2367)
  "no-const-assign", // ts(2588)
  "no-new-symbol", // ts(2588)
  "no-this-before-super", // ts(2376)
  "no-undef", // This is checked by Typescript using the option `strictNullChecks`.
  "no-dupe-class-members",
  "no-redeclare"
];

const userRulesToRemove: readonly string[] = [
  "no-console",
  "lines-between-class-members"
];

type rulesToRemove = typeof checkedByTypeScript[number] &
  typeof userRulesToRemove[number];

export function rulesToRemove(key: string, val: any[]): boolean {
  return !!(
    val[0] !== "off" && // turned off rules
    !key.startsWith("import/") && // rules that use import plugin
    !checkedByTypeScript.includes(key) &&
    !userRulesToRemove.includes(key)
  );
}

// TYPE ERROR props is undefined, but it is not...
// export function ruleModifier(key: string, val: any[]): [string, any[]] {
//   if (key === "no-param-reassign" || val[1].props === "true") {
//     val[1].props = "false";
//     throw new Error();
//     return [key, val];
//   }
//   return [key, val];
// }

export function ruleFilter(
  esLintRules: EslintRules,
  rulesToRemoveCallback: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules: string[] = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        // if the rule is to be included check if it should be modified
        if (rulesToRemoveCallback(key, val)) {
          // [key, val] = ruleModifier(key, val);
          return true;
        }
        removedRules.push(key);
        return false;
      })
    ),
    removedRules
  ];
}

const [filteredEsLintRules, removedRuleNames] = ruleFilter(
  entireEslintConfig.rules,
  rulesToRemove
);

/**
 * ============================================================================
 * Define the new .eslintrc.json including the new rules
 * ============================================================================
 */
const eslintrcJson = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint"],
  rules: { ...filteredEsLintRules, ...rulesToAdd }
};

/**
 * ============================================================================
 * Write to disk and output log to console
 * ============================================================================
 */
async function writeToDisk(fileName: string, data: string): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(fileName, encoder.encode(data));
}

await writeToDisk(".eslintrc.json", JSON.stringify(eslintrcJson, null, 2));
outputToConsole(removedRuleNames, Object.keys(rulesToAdd));
