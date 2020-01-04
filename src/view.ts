export function view(removedRules: { [key: string]: string[] }) {
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
${bold(`That were turned off (${removedRules.off.length})`)}
${removedRules.off.join('\n')}

${bold(`That were using the import plugin (${removedRules.usedImport.length})`)}
${removedRules.usedImport.join('\n')}

${bold(
  `That were conflicting with prettier (${removedRules.conflicts.length})`
)}
${removedRules.conflicts.join('\n')}

${bold(
  `That were not needed as TypeScript has built in checks (${removedRules.ts.length})`
)}
${removedRules.ts.join('\n')}`);
}
