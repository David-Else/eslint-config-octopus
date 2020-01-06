# automatic-eslint-rule-generator (work in progress, alpha)

Generate set of ESLint rules for various situations into one file. Based on `eslint-config-airbnb-typescript` and `eslint-config-prettier`:

https://www.elsewebdevelopment.com/typescript-airbnb-style-guide-optimized-for-prettier-in-one-json-file/

Dependencies : https://deno.land/ deno executable

## Installation

git clone https://github.com/David-Else/automatic-eslint-rule-collection-generator

cd automatic-eslint-rule-collection-generator

## To create .eslintrc.json config and rules file in /src

npx generate-airbnb-typescript-eslint-rules-file

deno --allow-read --allow-write calculate.ts
