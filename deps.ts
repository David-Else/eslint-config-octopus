// to update use `udd deps.ts --test="deno test --allow-run ./mod_test.ts"`

export { green, bold } from "https://deno.land/std@v0.61.0/fmt/colors.ts";
export { fromFileUrl } from "https://deno.land/std@v0.61.0/path/mod.ts";
export { writeJsonSync } from "https://deno.land/std@v0.61.0/fs/write_json.ts";
export {
  assert,
  assertEquals,
} from "https://deno.land/std@v0.61.0/testing/asserts.ts";
