export function writeStatsToConsole(removedRules: { [key: string]: string[] }) {
  const bold = (text: string) => `\x1b[1m${text}\x1b[0m`;

  console.log(`${`${Object.values(removedRules)
    .map(ruleNames => ruleNames.length)
    .reduce((total, noOfRules) => total + noOfRules)} rules were removed`}
----------------------
${Object.entries(removedRules)
  .map(([ruleDescription, ruleNames]) => [
    `${ruleNames.length} were ${bold(ruleDescription)}

    ${ruleNames.map(ruleName => ruleName).join('\n')}

`
  ])
  .join('')}
  
  `);
}
