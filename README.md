# automatic-eslint-rule-generator (work in progress, alpha)

Generate set of ESLint rules for various situations into one file. Based on `eslint-config-airbnb-typescript` and `eslint-config-prettier`:

https://www.elsewebdevelopment.com/typescript-airbnb-style-guide-optimized-for-prettier-in-one-json-file/

Dependencies : https://deno.land/ deno executable

## Installation

git clone https://github.com/David-Else/automatic-eslint-rule-collection-generator

cd automatic-eslint-rule-collection-generator

npm install

## To create .eslintrc.json config and rules file in /src

deno --allow-read --allow-write --allow-run src/calculate.ts

Some prettier conficting rules are hard coded, to see them generated from latest `npm run print-prettier-conflicting-rules`
