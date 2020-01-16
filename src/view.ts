export function writeStatsToConsole(removedRules: { [key: string]: string[] }) {
  const bold = (text: string) => `\x1b[1m${text}\x1b[0m`;

  console.log(`${bold(
    `${
      [
        ...removedRules.off,
        ...removedRules.usedImport,
        ...removedRules.conflicts,
        ...removedRules.ts
      ].length
    } rules were removed`
  )}
----------------------
${Object.entries(removedRules)
  .map(([ruleDescription, ruleNames]) => {
    return [
      `That were: ${bold(`${ruleDescription}`)} ${ruleNames.length}
      ${ruleNames.map(ruleName => ruleName).join('\n')}

    `
    ];
  })
  .join('')}`);
}
