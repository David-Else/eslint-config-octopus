# ESLint Config Octopus 0.1

Automatically generate your stand-alone dependency free `typescript-eslint` custom config. All the rules you need are intelligently imported from the most popular configs like airbnb. All clashes with `prettier` are removed.

His anti-cruft tentacles grab ESLint rules from different sources and combine them into one dependency free `.eslintrc.json` config file!

Due to his distaste for excessive dependencies he only accepts official ESLint rules into his willing mouth. ESLint custom plugins get filtered.

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

`deno --allow-read --allow-write --allow-run mod.ts`

## Contribute

If you are using Visual Studio Code install the axetroy deno extension [Visual Studio Code Deno extension](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno) and help out.

Deno is in a state of rapid change until version 1.0, which at the time of writing should be out very soon. I will try to keep up with the breaking API changes as best as possible.

It would be great to integrate React linting, but the main goal is to elimate as many dependencies as possible and export a few files that can be copy/pasted into the users project folder. Deno
