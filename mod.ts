/**
 * @file Creates a .eslintrc.json config file for typescript-eslint with rules
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2020 David Else
 * @license gpl-3.0
 * @version 1.0
 * tested with deno 0.41.0
 * deno -A mod.ts
 */

import { rulesToAdd } from "./rulesToAdd.ts";
import { outputToConsole } from "./view.ts";
import { assert } from "./deps.ts";
export interface EslintRules {
  [key: string]: any[];
}

export interface EslintConfig {
  rules: EslintRules;
}

/**
 * ============================================================================
 * Generate eslint rules based on airbnb with prettier conflicts turned off
 * ============================================================================
 */

// When you get <some file URL object>.pathname on Windows, you'll get an
// extraneous leading slash: /C:/path/to/file. You just need to strip that
let eslintConfigPath = new URL("airbnb_prettier_config.json", import.meta.url)
  .pathname;

if (Deno.build.os === "win") {
  eslintConfigPath = eslintConfigPath.slice(1);
}

const subprocess = Deno.run({
  cmd: [
    "npx",
    "eslint",
    "--no-eslintrc",
    "-c",
    eslintConfigPath,
    "--print-config",
    "example.js",
  ],
  stdout: "piped",
});

assert(subprocess.stdout);
const commandOutput = await Deno.readAll(subprocess.stdout);
const entireEslintConfig: EslintConfig = JSON.parse(
  new TextDecoder().decode(commandOutput)
);

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
  "no-redeclare",
];

const userRulesToRemove: readonly string[] = [
  "no-console",
  "lines-between-class-members",
];

export type rulesToRemove = typeof checkedByTypeScript[number] &
  typeof userRulesToRemove[number];

/**
 * Returns a value of (true?) if the rule is to be included
 *
 * @param key Current key name of rule being checked
 * @param val Current value of rule being checked
 */
export function rulesToRemove(key: string, val: any[]): boolean {
  return !!(
    val[0] !== "off" && // turned off rules
    val[0] !== 0 && // turned off rules
    !key.startsWith("import/") && // rules that use import plugin
    !checkedByTypeScript.includes(key) &&
    !userRulesToRemove.includes(key)
  );
}

/**
 * Filters a set of ESLint rules and returns an array with the new list and the removed rules
 *
 * @param esLintRules
 * @param rulesToRemoveCallback
 */
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
    removedRules,
  ];
}

const [filteredEsLintRules, removedRuleNames] = ruleFilter(
  entireEslintConfig.rules,
  rulesToRemove
);

/**
 * Define the new .eslintrc.json including the new rules
 */
const eslintrcJson = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: { ...filteredEsLintRules, ...rulesToAdd },
};

/**
 * Write to disk and output log to console
 */
export async function writeToDisk(
  fileName: string,
  data: string
): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(fileName, encoder.encode(data));
}

await writeToDisk(".eslintrc.json", JSON.stringify(eslintrcJson, null, 2));
outputToConsole(removedRuleNames, Object.keys(rulesToAdd));
