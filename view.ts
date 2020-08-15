import { green, bold } from "./deps.ts";

export function outputToConsole(
  removedRules: readonly string[],
  rulesAdded: readonly string[]
): void {
  const printList = (list: readonly string[]): string =>
    list.map((listItem) => listItem).join("\n");

  console.log(`
⛔${bold(` ${removedRules.length}`)} Rules Removed:

${printList(removedRules)}
  
👍${bold(` ${rulesAdded.length}`)} Rules Added:
  
${printList(rulesAdded)}
  
Thanks for using ESLint Octopus!

Please add the following to your project's ${green(`package.json`)}:
${green(`
"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^3.6.0",
  "@typescript-eslint/parser": "^3.6.0",
  "eslint": "^7.4.0",
}`)}

and copy the generated ${green(`.eslintrc.json`)} into the root directory
`);
}
