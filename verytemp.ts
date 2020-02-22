const checkedByTypeScript: readonly string[] = [
  "getter-return",
  "no-redeclare"
];

const userRulesToRemove: readonly string[] = [
  "no-console",
  "lines-between-class-members"
];

type rulesToRemove =
  | typeof checkedByTypeScript[number]
  | typeof userRulesToRemove[number];

function rulesToRemove(key: string, val: any[]): boolean {
  return !!(
    val[0] !== "off" && // turned off rules
    !key.startsWith("import/") && // rules that use import plugin
    !checkedByTypeScript.includes(key) &&
    !userRulesToRemove.includes(key)
  );
}

interface EslintRules {
  [key: string]: any[];
}

export function ruleFilter(
  esLintRules: EslintRules,
  rulesToRemoveCallback: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules: string[] = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        // if the rule is to be included check if it should be modified
        if (rulesToRemoveCallback(key, val)) {
          return true;
        }
        removedRules.push(key);
        return false;
      })
    ),
    removedRules
  ];
}

const entireEslintConfig = { rules: {} }; // mock, this is generated async can't be typed in advance

const [filteredEsLintRules, removedRuleNames] = ruleFilter(
  entireEslintConfig.rules,
  rulesToRemove
);
