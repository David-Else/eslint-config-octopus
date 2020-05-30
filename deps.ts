// to update use `udd deps.ts --test="deno test ./mod_test.ts -A"`

export { green, bold } from "https://deno.land/std@v0.54.0/fmt/colors.ts";
export { fromFileUrl } from "https://deno.land/std@v0.54.0/path/mod.ts";
export { writeJsonSync } from "https://deno.land/std@v0.54.0/fs/write_json.ts";
export {
  assert,
  assertEquals,
} from "https://deno.land/std@v0.54.0/testing/asserts.ts";
