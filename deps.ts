// to update use `udd deps.ts --test="deno test --allow-run ./mod_test.ts"`

export { green, bold } from "https://deno.land/std@0.105.0/fmt/colors.ts";
export { fromFileUrl } from "https://deno.land/std@0.105.0/path/mod.ts";
export { readAll } from "https://deno.land/std@0.105.0/io/util.ts"
export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.105.0/testing/asserts.ts";
