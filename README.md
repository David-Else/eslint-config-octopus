# ESLint Config Octopus 0.9

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/David-Else/eslint-config-octopus/master/mod.ts)

Automatically create your own custom `.eslintrc.json` config file containing rules taken from `eslint-config-airbnb-typescript` with the following modifications:

- All turned `off` rules removed as they are not needed as overides
- All references to the `import` plugin used by the airbnb rules removed to allow the creation of one dependency free config file
- All conflicts with Prettier removed using `eslint-config-prettier`
- All rules removed that are superceeded by the TypeScript compiler used as supplied by `typescript-eslint/recommended`
- Addition rules supplied by the user removed
- Custom list of user rules added

`````
                        ___
                     .-'   `'.
                    /         \
                    |         ;
                    |         |           ___.--,
           _.._     |0) ~ (0) |    _.---'`__.-( (_. airbnb rules
    __.--'`_.. '.__.\    '--. \_.-' ,.--'`     `""`
   ( ,.--'`   ',__ /./;   ;, '.__.'`    __
   _`) )  .---.__.' / |   |\   \__..--""  """--.,_
  `---' .'.''-._.-'`_./  /\ '.  \ _.-~~~````~~~-._`-.__.'custom rules
        | |  .' _.-' |  |  \  \  '.               `~---`
         \ \/ .'     \  \   '. '-._)
          \/ /        \  \    `=.__`~-.
          / /\         `) )    / / `"".`\
    , _.-'.'\ \        / /    ( (     / /
     `--~`   ) )    .-'.'      '.'.  | (
            (/`    ( (`          ) )  '-; bloat! spit it out...
             `      '-;         (-'
`````

Right now he only cares about using `typescript-eslint` for TypeScript linting (sensible creature), but I might pursuade him to munch on plain JavaScript files too.

He only comes to life if `deno` is installed, he is fanatical about using only the best and latest technology.

## Usage

`deno run --allow-read --allow-write --allow-run mod.ts`
