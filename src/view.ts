import { RemovedRulesLog } from './calculate.ts';

export function writeStatsToConsole(removedRules: RemovedRulesLog) {
  const bold = (text: string) => `\x1b[1m${text}\x1b[0m`;

  const totalNumberOfRules = Object.values(removedRules)
    .map(ruleNames => ruleNames.length)
    .reduce((total, noOfRules) => total + noOfRules);

  const removedRulesList = Object.entries(removedRules)
    .map(([ruleDescription, ruleNames]) => [
      `${ruleNames.length} were ${bold(ruleDescription)}

${ruleNames.map(ruleName => ruleName).join('\n')}

`
    ])
    .join('');

  console.log(`
${totalNumberOfRules} rules were removed
----------------------
${removedRulesList}
`);
}

// const testRules = {
//   off: ['off rule 1', `off rule 2`],
//   usedImport: [],
//   conflicts: [],
//   ts: [`ts rule 1`, `ts rule 2`, `ts rule 3`],
//   modified: []
// };

// writeStatsToConsole(testRules);
