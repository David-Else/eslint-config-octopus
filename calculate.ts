import data from './output.json';
import { createRequire } from './deps.ts';
import { BufReader } from './deps.ts';
const require_ = createRequire(import.meta.url);
const eslintRecommended = require_(
  './node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js'
);

// Disables rules (from eslint:recommended) which are already handled by TypeScript
const checkedByTypescript = Object.keys(
  eslintRecommended.default.overrides[0].rules
);

// const stdinReader = new BufReader(Deno.stdin);
// console.log('yes/no:');
// const input = ((await stdinReader.readString('\n')) as string).trim();
// console.log(`You wrote "${input}"`);

const basicPrettierConflicts = [
  '@typescript-eslint/brace-style',
  '@typescript-eslint/func-call-spacing',
  '@typescript-eslint/indent',
  '@typescript-eslint/semi',
  'array-bracket-spacing',
  'arrow-parens',
  'arrow-spacing',
  'block-spacing',
  'comma-dangle',
  'comma-spacing',
  'comma-style',
  'computed-property-spacing',
  'dot-location',
  'eol-last',
  'function-paren-newline',
  'generator-star-spacing',
  'implicit-arrow-linebreak',
  'key-spacing',
  'keyword-spacing',
  'linebreak-style',
  'new-parens',
  'newline-per-chained-call',
  'no-extra-semi',
  'no-floating-decimal',
  'no-mixed-spaces-and-tabs',
  'no-multi-spaces',
  'no-multiple-empty-lines',
  'no-spaced-func',
  'no-trailing-spaces',
  'no-whitespace-before-property',
  'nonblock-statement-body-position',
  'object-curly-newline',
  'object-curly-spacing',
  'object-property-newline',
  'one-var-declaration-per-line',
  'operator-linebreak',
  'padded-blocks',
  'quote-props',
  'rest-spread-spacing',
  'semi-spacing',
  'semi-style',
  'space-before-blocks',
  'space-before-function-paren',
  'space-in-parens',
  'space-infix-ops',
  'space-unary-ops',
  'switch-colon-spacing',
  'template-curly-spacing',
  'template-tag-spacing',
  'unicode-bom',
  'wrap-iife',
  'yield-star-spacing'
];

const conflictingOptions = ['curly', 'no-confusing-arrow'];

const cantBeChecked = [
  '@typescript-eslint/quotes',
  'arrow-body-style',
  'max-len',
  'no-mixed-operators',
  'no-tabs',
  'no-unexpected-multiline',
  'prefer-arrow-callback'
];

/**
 * ============================================================================
 * Build new config based on set of rules
 * ============================================================================
 */
function assert(condition: any): asserts condition {
  if (!condition) {
    throw new Error();
  }
}
const off: string[] = [];
const usedImport: string[] = [];
const conflicts: string[] = [];
const ts: string[] = [];

// assert(typeof data.rules === 'object' || null);

const newESLintConfig = Object.fromEntries(
  Object.entries(data.rules).filter(([key, value]) => {
    // assert(Array.isArray(value));

    const turnedOff = value[0] === 'off';
    const usesImportPlugin = key.startsWith('import/');
    const conflictsWithPrettier = basicPrettierConflicts.includes(key);
    const checkedByTS = checkedByTypescript.includes(key);

    if (turnedOff) {
      off.push(key);
      return;
    }
    if (usesImportPlugin) {
      usedImport.push(key);
      return;
    }
    if (conflictsWithPrettier) {
      conflicts.push(key);
      return;
    }
    if (checkedByTS) {
      ts.push(key);
      return;
    }
    // replace BUG!!!!! does not replace value
    // if (key === 'curly') {
    //   return [key, ['error', 'all']];
    // }
    return [key, value];
  })
);

/**
 * ============================================================================
 * Write output to disk
 * ============================================================================
 */
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
const bold = (text: string) => `\x1b[1m${text}\x1b[0m`;
const allRemovedRules = [...off, ...usedImport, ...conflicts, ...ts];

console.log(`${bold(`${allRemovedRules.length} rules were removed`)}
----------------------
${bold(`That were turned off (${off.length})`)}
${off.join('\n')});

${bold(`That were using the import plugin (${usedImport.length})`)}
${usedImport.join('\n')});

${bold(`That were conflicting with prettier (${conflicts.length})`)}
${conflicts.join('\n')});

${bold(`That were not needed as TypeScript has built in checks (${ts.length})`)}
${ts.join('\n')}`);

// deno --allow-read --allow-write calculate.ts
