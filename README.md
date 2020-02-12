# ESLint Config Octopus 0.1

Automatically generate your stand-alone dependency free `typescript-eslint` custom  config. All the rules you need are intelligently imported from the most popular configs like airbnb. All clashes with `prettier` are removed.

His anti-cruft tentacles grab ESLint rules from different sources and combine them into one dependency free `.eslintrc.json` config file!

Due to his distaste for excessive dependencies he only accepts official ESLint rules into his willing mouth. ESLint custom plugins get filtered.
```
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
```

Right now he only cares about TypeScript using `typescript-eslint` (sensible creature), but I might pursuade him to munch on plain JavaScript files too. 

He only comes to life if `deno` is installed, he is fanatical about using only the best and latest technology.