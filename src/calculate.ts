import data from '../output.json';
import { createRequire } from './deps.ts';
// import { BufReader } from './deps.ts';
import { view } from './view.ts';
import { basicPrettierConflicts } from './basicPrettierConflicts.ts';
const require_ = createRequire(import.meta.url); // deno legacy module compatability

// const stdinReader = new BufReader(Deno.stdin);
// console.log('yes/no:');
// const input = ((await stdinReader.readString('\n')) as string).trim();
// console.log(`You wrote "${input}"`);

// assert(typeof data.rules === 'object' || null);
// assert(Array.isArray(value));

/**
 * ============================================================================
 * Generic assert function for TS 3.7
 * ============================================================================
 */
function assert(condition: any): asserts condition {
  if (!condition) {
    throw new Error();
  }
}

/**
 * ============================================================================
 * Build new config based on set of rules
 * ============================================================================
 */
const eslintRecommended = require_(
  '../node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js'
);
// extract rule names (from eslint:recommended) which are already handled by TypeScript
const checkedByTypescript = Object.keys(
  eslintRecommended.default.overrides[0].rules
);

const removedRules: { [key: string]: string[] } = {
  off: [],
  usedImport: [],
  conflicts: [],
  ts: []
};

const newESLintConfig = Object.fromEntries(
  Object.entries(data.rules).filter(([key, value]) => {
    const turnedOff = value[0] === 'off';
    const usesImportPlugin = key.startsWith('import/');
    const conflictsWithPrettier = basicPrettierConflicts.includes(key);
    const checkedByTS = checkedByTypescript.includes(key);

    if (turnedOff) {
      removedRules.off.push(key);
      return;
    }
    if (usesImportPlugin) {
      removedRules.usedImport.push(key);
      return;
    }
    if (conflictsWithPrettier) {
      removedRules.conflicts.push(key);
      return;
    }
    if (checkedByTS) {
      removedRules.ts.push(key);
      return;
    }
    // replace BUG!!!!! does not replace value
    // if (key === 'curly') {
    //   return [key, ['error', 'all']];
    // }
    return [key, value];
  })
);

// assert(typeof newESLintConfig === 'object' && newESLintConfig !== null);

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

writeToDisk('.eslintrc.json', JSON.stringify(finalOutput, null, 2));
writeToDisk('.eslintignore', eslintignore);

if (typeof finalOutput === 'object') {
  finalOutput;
  // input is typed as unknown here, why not object?
}

/**
 * ============================================================================
 * Write information on removed rules to the console
 * ============================================================================
 */
view(removedRules);

// deno --allow-read --allow-write calculate.ts
