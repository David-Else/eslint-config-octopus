import allExportedRules from '../airbnb-typescript-eslint-rules.json';
// import { BufReader } from './deps.ts';
import { basicPrettierConflicts } from './rulesToRemove.ts';
import { writeStatsToConsole } from './view.ts';
import { createRequire } from './deps.ts';
const require_ = createRequire(import.meta.url); // deno legacy module compatability

async function test(): Promise<void> {
  let p = Deno.run({
    args: [
      'npx',
      'eslint',
      '-c',
      '../package.json',
      '--print-config',
      'example.js'
    ],
    stdout: 'piped'
  });
  const fullOutPut = await Deno.readAll(p.stdout!);

  const text = new TextDecoder().decode(fullOutPut);
  const json_obj = JSON.parse(text);
  console.log(text);
}
test();

/**
 * ============================================================================
 * Build new config based on set of rules
 * ============================================================================
 */
const removedRules: { [key: string]: string[] } = {
  off: [],
  usedImport: [],
  conflicts: [],
  ts: []
};

const modifiedRules: string[] = [];

// Compatibility ruleset that disables rules from eslint:recommended which
// are already handled by TypeScript.
const tsEslintRecommendedRules = Object.keys(
  require_(
    '../node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js'
  ).default.overrides[0].rules
);

const newESLintConfig = Object.fromEntries(
  Object.entries(allExportedRules.rules).filter(([key, value]) => {
    const turnedOff = value[0] === 'off';
    const usesImportPlugin = key.startsWith('import/');
    const conflictsWithPrettier = basicPrettierConflicts.includes(key);
    const checkedByTS = tsEslintRecommendedRules.includes(key);

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
    // if (key === 'curly') {
    //   modifiedRules.push(key);
    //   console.log('arrgghhh!!!!!!!!!!!' + [key, value]);
    //   return [key, ['error', 'all']];
    // }
    return [key, value];
  })
);

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

/**
 * ============================================================================
 * Write information on removed rules to the console
 * ============================================================================
 */
writeStatsToConsole(removedRules);
