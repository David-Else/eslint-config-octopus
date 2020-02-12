import { green, bold } from './deps.ts';

export function outputToConsole(
  removedRules: string[],
  rulesAdded: string[]
): void {
  const printList = (list: string[]): string =>
    list.map(listItem => listItem).join('\n');

  console.log(`
⛔ ${bold(`${removedRules.length}`)} Rules Removed:

${printList(removedRules)}
  
👍 ${bold(`${rulesAdded.length}`)} Rules Added:
  
${printList(rulesAdded)}
  
Thanks for using ESLint Octopus!

Please add the following to your project's ${green(`package.json`)}:
${green(`
  "devDependencies": {
  "@typescript-eslint/eslint-plugin": "^2.19.2",
  "@typescript-eslint/parser": "^2.19.2",
  "eslint": "^6.8.0"
}`)}

and copy the generated ${green(`.eslintrc.json`)} into the root directory
`);
}
