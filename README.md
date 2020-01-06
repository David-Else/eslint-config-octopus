# automatic-eslint-rule-generator (Work in progress, alpha)

Generate set of ESLint rules for various situations into one file. Based on Airbnb and Prettier using https://www.elsewebdevelopment.com/typescript-airbnb-style-guide-optimized-for-prettier-in-one-json-file/

Dependencies : https://deno.land/ deno executable

git clone https://github.com/David-Else/automatic-eslint-rule-collection-generator
cd automatic-eslint-rule-collection-generator

npx generate-airbnb-typescript-eslint-rules-file
deno --allow-read --allow-write calculate.ts
