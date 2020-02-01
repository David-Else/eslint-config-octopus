# automatic-eslint-rule-generator (work in progress, beta)

Automatically create an `.eslintrc.json` file that contains not only the latest configuration and recommend rules for `typescript-eslint` but also the entire set of airbnb rules modified for typescript with all the rules that conflict with Prettier removed... all optimized with unused/conflicting rules removed.

This `.eslintrc.json` is then all you need, no need to install any additional dependencies, you can just copy it into each new project. It is completely self contained. If there are any updates to the `eslint-config-airbnb-typescript` and `eslint-config-prettier` packages you can run the script again and regenerate the whole config.

Thank to to `eslint-config-airbnb-typescript` and `eslint-config-prettier` that are used in this application!

Based on idea from the original article here:

https://www.elsewebdevelopment.com/typescript-airbnb-style-guide-optimized-for-prettier-in-one-json-file/

Dependencies : https://deno.land/ deno executable << AMAZING!

## Installation

`git clone https://github.com/David-Else/automatic-eslint-rule-collection-generator`

`cd automatic-eslint-rule-collection-generator`

`npm install`

## To create .eslintrc.json config with config and rules:

`deno --allow-read --allow-write --allow-run src/calculate.ts`

or run tests:

`deno test test/ --allow-env --allow-write --allow-net --allow-run`

Some prettier conflicting rules are hard coded in `rulesToRemove/basicPrettierConflicts`, to re-generate them from the latest version of `eslint-config-prettier` run `npm run print-prettier-conflicting-rules`. These would need to be manually copied across.
