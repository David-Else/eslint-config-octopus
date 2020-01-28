const testRules = {
  'import/': ['on'],
  'rule 2': ['on'],
  'rule 3': [
    'off',
    {
      'rule 2 extra': true
    }
  ]
};

const rulesToRemove = [
  [(key: string, value) => value[0] === 'off'],
  [(key: string, value) => key.startsWith('import/')]
];

function removeEsLintRules(eslintRules, rulesToRemove) {
  const origEsLintRules = new Map(Object.entries(eslintRules));
  const newEsLintRules = new Map();

  for (const [origEslintRulesKey, origEslintRulesValue] of origEsLintRules) {
    for (const [ruleToRemove] of rulesToRemove) {
      if (ruleToRemove(origEslintRulesKey, origEslintRulesValue)) {
        break;
      }
      newEsLintRules.set(origEslintRulesKey, origEslintRulesValue);
    }
  }
  return Object.fromEntries(newEsLintRules);
}

console.log(removeEsLintRules(testRules, rulesToRemove));
