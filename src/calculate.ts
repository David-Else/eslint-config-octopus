import { basicPrettierConflicts } from './rulesToRemove.ts';
import { writeStatsToConsole } from './view.ts';
import { createRequire } from './deps.ts';
const require_ = createRequire(import.meta.url); // deno legacy module compatability
const path = new URL('../', import.meta.url).pathname;
<<<<<<< HEAD

export type JsonWithoutNull =
  | string
  | number
  | boolean
  | { [property: string]: JsonWithoutNull }
  | JsonWithoutNull[];
=======
>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9

/**
 * ============================================================================
 * Execute CLI command with optional arguments and return the results
 * ============================================================================
 */
async function runCommandReturnResults(command: string[]) {
  let p = Deno.run({
    args: command,
    stdout: 'piped'
  });
  const commandOutput = await Deno.readAll(p.stdout!);
  const text = new TextDecoder().decode(commandOutput);
  return JSON.parse(text);
}

/**
 * ============================================================================
 * Create objects of arrays to store names of removed rules to print to console
 * ============================================================================
 */
export interface RemovedOrModifiedRules {
  off: string[];
  usedImport: string[];
  conflicts: string[];
  ts: string[];
  modified: string[];
  [key: string]: string[];
}
<<<<<<< HEAD

// const removedOrModifiedRules: RemovedOrModifiedRules = {
//   off: [],
//   usedImport: [],
//   conflicts: [],
//   ts: [],
//   modified: []
// };

=======

const removedOrModifiedRules: RemovedOrModifiedRules = {
  off: [],
  usedImport: [],
  conflicts: [],
  ts: [],
  modified: []
};

>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9
/**
 * ============================================================================
 * Import and generate files with rules from NPM dependencies
 * ============================================================================
 */
const tsEslintRecommendedRules = Object.keys(
  require_(
    '../node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js'
  ).default.overrides[0].rules
);

const entireEslintConfig = await runCommandReturnResults([
  'npx',
  'eslint',
  '-c',
  `${path}/package.json`,
  '--print-config',
  'example.js'
]);

const eslintConfigRules = entireEslintConfig.rules;

/**
 * ============================================================================
 * Create the new final list of rules by filering out ones we don't want
 * ============================================================================
 */

<<<<<<< HEAD
export function filterRules(
  ruly: JsonWithoutNull
): [JsonWithoutNull, RemovedOrModifiedRules] {
  const removedOrModifiedRules: RemovedOrModifiedRules = {
    off: [],
    usedImport: [],
    conflicts: [],
    ts: [],
    modified: []
  };
  Object.entries(ruly).filter(([key, value]) => {
=======
// export function tempReturnStuff(
//   eslintRules: any,
//   removedModRules: RemovedOrModifiedRules
// ): [object, RemovedOrModifiedRules] {
//   const removedOrModifiedRules: RemovedOrModifiedRules = {
//     off: [],
//     usedImport: [],
//     conflicts: [],
//     ts: [],
//     modified: []
//   };

//   return [eslintRules, removedOrModifiedRules];
// }

const newESLintConfig = Object.fromEntries(
  Object.entries(eslintConfigRules).filter(([key, value]) => {
>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9
    const turnedOff = value[0] === 'off';
    const usesImportPlugin = key.startsWith('import/');
    const conflictsWithPrettier = basicPrettierConflicts.includes(key);
    const checkedByTS = tsEslintRecommendedRules.includes(key);

    if (turnedOff) {
      removedOrModifiedRules.off.push(key);
      return;
    }
    if (usesImportPlugin) {
      removedOrModifiedRules.usedImport.push(key);
      return;
    }
    if (conflictsWithPrettier) {
      removedOrModifiedRules.conflicts.push(key);
      return;
    }
    if (checkedByTS) {
      removedOrModifiedRules.ts.push(key);
      return;
    }
<<<<<<< HEAD
    // if (key === 'curly') {
    //   removedOrModifiedRules.modified.push(key);
    //   console.log('arrgghhh!!!!!!!!!!!' + [key, value]);
    //   return [key, ['error', 'all']];
    // }
=======
    if (key === 'curly') {
      removedOrModifiedRules.modified.push(key);
      console.log('arrgghhh!!!!!!!!!!!' + [key, value]);
      return [key, ['error', 'all']];
    }
>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9
    return [key, value];
  });

  return [ruly, removedOrModifiedRules];
}

const [newESLintConfig, removedOrModifiedRules] = filterRules(
  eslintConfigRules
);

// const newESLintConfig = Object.fromEntries(
//   Object.entries(eslintConfigRules).filter(([key, value]) => {
//     const turnedOff = value[0] === 'off';
//     const usesImportPlugin = key.startsWith('import/');
//     const conflictsWithPrettier = basicPrettierConflicts.includes(key);
//     const checkedByTS = tsEslintRecommendedRules.includes(key);

//     if (turnedOff) {
//       removedOrModifiedRules.off.push(key);
//       return;
//     }
//     if (usesImportPlugin) {
//       removedOrModifiedRules.usedImport.push(key);
//       return;
//     }
//     if (conflictsWithPrettier) {
//       removedOrModifiedRules.conflicts.push(key);
//       return;
//     }
//     if (checkedByTS) {
//       removedOrModifiedRules.ts.push(key);
//       return;
//     }
//     if (key === 'curly') {
//       removedOrModifiedRules.modified.push(key);
//       console.log('arrgghhh!!!!!!!!!!!' + [key, value]);
//       return [key, ['error', 'all']];
//     }
//     return [key, value];
//   })
// );

/**
 * ============================================================================
 * Define the objects we are going to write to disk
 * ============================================================================
 */
const eslintignore = `# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist`;

const finalOutput = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: newESLintConfig
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
<<<<<<< HEAD

// const [diagnostics, emitMap] = await Deno.compile(`${path}src/calculate.ts`);
// // assert(diagnostics == null); // ensuring no diagnostics are returned
// console.log(emitMap);

// Any imported module obviously needs to be executed... that's fundamental to JS.
// Anything top-level in a module you want only to be run when it's used as a main module should be underneath an import.meta.main check.
if (import.meta.main) {
  writeToDisk('.eslintrc.json', JSON.stringify(finalOutput, null, 2));
  writeToDisk('.eslintignore', eslintignore);
  writeStatsToConsole(removedOrModifiedRules);
}

// dont forget deno types > lib.deno_runtime.d.ts
=======
writeStatsToConsole(removedOrModifiedRules);
>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9
