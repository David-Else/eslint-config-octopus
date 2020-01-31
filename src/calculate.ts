import { basicPrettierConflicts } from "./rulesToRemove.ts";
import { writeStatsToConsole } from "./view.ts";
import { createRequire } from "../deps.ts";
const require_ = createRequire(import.meta.url); // deno legacy module compatability
const path = new URL("../", import.meta.url).pathname;

const status = await Deno.permissions.query({ name: "write" });
console.log(status.state);

export type JsonWithoutNull =
  | string
  | number
  | boolean
  | { [property: string]: JsonWithoutNull }
  | JsonWithoutNull[];

/**
 * ============================================================================
 * Execute CLI command with optional arguments and return the results
 * ============================================================================
 */
async function runCommandReturnResults(command: string[]) {
  let p = Deno.run({
    args: command,
    stdout: "piped"
  });
  const commandOutput = await Deno.readAll(p.stdout!);
  const text = new TextDecoder().decode(commandOutput);
  return JSON.parse(text);
}

/**
 * ============================================================================
 * Import and generate files with rules from NPM dependencies
 * ============================================================================
 */
const tsEslintRecommendedRules = Object.keys(
  require_(
    "../node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js"
  ).default.overrides[0].rules
);

// ERROR once a .eslintrc in ./ is created it reads that and not package.json!
const entireEslintConfig = await runCommandReturnResults([
  "npx",
  "eslint",
  "--no-eslintrc",
  "-c",
  `${path}/package.json`,
  "--print-config",
  "example.js"
]);

/**
 * ============================================================================
 * Create the new final list of rules by filering out ones we don't want
 * ============================================================================
 */
// split this into removed AND modified list and make modified work
export interface RemovedRulesLog {
  off: string[];
  usedImport: string[];
  conflicts: string[];
  ts: string[];
  // modified: string[];
  [key: string]: string[];
}

///////////////////////////
interface EslintRules {
  [key: string]: any[];
}

export const conditions = (key: string, val: any[]) =>
  val[0] !== "off" &&
  !key.startsWith("import/") &&
  !basicPrettierConflicts.includes(key) &&
  !tsEslintRecommendedRules.includes(key)
    ? true
    : false;

export function filter2(
  esLintRules: EslintRules,
  conditionToAccept: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        if (conditionToAccept(key, val)) {
          return true;
        }
        removedRules.push(key);
        return false;
      })
    ),
    removedRules
  ];
}

// export function filterRules(
//   eslintRules: JsonWithoutNull
// ): [JsonWithoutNull, RemovedRulesLog] {
//   const removedRulesLog: RemovedRulesLog = {
//     off: [],
//     usedImport: [],
//     conflicts: [],
//     ts: [],
//     modified: [] // << why can't we delete this?!
//   };

//   const filteredRules = Object.entries(eslintRules).filter(
//     ([rulesKey, rulesValue]) => {
//       const rulesToRemove = new Map([
//         ["off", rulesValue[0] === "off"],
//         ["usedImport", rulesKey.startsWith("import/")],
//         ["conflicts", basicPrettierConflicts.includes(rulesKey)],
//         ["ts", tsEslintRecommendedRules.includes(rulesKey)]
//       ]);

//       for (let [key, value] of rulesToRemove.entries()) {
//         if (value) {
//           removedRulesLog[key].push(rulesKey);
//           break; // continue? test! should only save time not do much
//         }
//       }
//       return [rulesKey, rulesValue];
//     }
//   );
//   return [filteredRules, removedRulesLog];
// }

// const [newESLintConfig, removedOrModifiedRules] = filterRules(
//   entireEslintConfig.rules
// );

const [latestESLintConfig, removedRules] = filter2(
  entireEslintConfig.rules,
  conditions
);

console.log(`${removedRules.length} Removed
${removedRules.map(ruleName => ruleName).join("\n")}`);

/**
 * ============================================================================
 * Define the objects we are going to write to disk
 * ============================================================================
 */
const eslintignore = `# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist
.eslintrc.json`;

const finalOutput = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint"],
  rules: latestESLintConfig
};

/**
 * ============================================================================
 * Write output to disk
 * ============================================================================
 */
async function writeToDisk(fileName: string, data: string) {
  const encoder = new TextEncoder();
  await Deno.writeFile(fileName, encoder.encode(data));
}

/**
 * ============================================================================
 * Write information on removed rules to the console
 * ============================================================================
 */
if (import.meta.main) {
  writeToDisk(".eslintrc.json", JSON.stringify(finalOutput, null, 2));
  writeToDisk(".eslintignore", eslintignore);
  // writeStatsToConsole(removedOrModifiedRules);
}

// dont forget deno types > lib.deno_runtime.d.ts
