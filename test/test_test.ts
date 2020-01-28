import { assertEquals } from "../deps.ts";
import { test, runTests } from "../deps.ts";
import { filterRules } from "../src/calculate.ts";

test({
  name: "turned off rules removed and added to log",
  fn(): void {
    // Arrange
    const testData = {
      "turned off rule": ["off"],
      "another rule": ["not off"]
    };
    // Act
    const [filteredRules, removedOrModifiedRules] = filterRules(testData);
    // Assert
    assertEquals(filteredRules, { "another rule": ["not off"] });
    assertEquals(removedOrModifiedRules, {
      off: ["turned off rule"],
      usedImport: [],
      conflicts: [],
      ts: [],
      modified: []
    });
  }
});

// test({
//   name: 'import plugin rules removed and added to log',
//   fn(): void {
//     // Arrange
//     const testData = { 'import/': 1 };
//     // Act
//     const result = filterRules(testData);
//     // Assert
//     assertEquals(result, [
//       {},
//       {
//         off: [],
//         usedImport: ['import/'],
//         conflicts: [],
//         ts: [],
//         modified: []
//       }
//     ]);
//   }
// });

runTests();

// deno test test/ --allow-env --allow-write --allow-net --allow-run
