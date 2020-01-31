import { assertEquals } from "../deps.ts";
import { test, runTests } from "../deps.ts";
import { filter2, conditions } from "../src/calculate.ts";

test({
  name: "turned off rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "turned off rule": ["off"]
    };
    // Act
    const filteredRules = filter2(testData, conditions);
    // Assert
    assertEquals(filteredRules, [{}, ["turned off rule"]]);
  }
});

test({
  name: "import plugin rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "import/": ["on"]
    };
    // Act
    const filteredRules = filter2(testData, conditions);
    // Assert
    assertEquals(filteredRules, [{}, ["import/"]]);
  }
});

test({
  name: "various rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "1": ["on"],
      "import/": ["on"],
      "2": ["off"],
      "3": ["on"]
    };
    // Act
    const filteredRules = filter2(testData, conditions);
    // Assert
    assertEquals(filteredRules, [
      {
        "1": ["on"],
        "3": ["on"]
      },
      ["2", "import/"]
    ]);
  }
});

// test({
//   name: "turned off rules removed and added to log",
//   fn(): void {
//     // Arrange
//     const testData = {
//       "turned off rule": ["off"],
//       "another rule": ["not off"]
//     };
//     // Act
//     const [filteredRules, removedOrModifiedRules] = filterRules(testData);
//     // Assert
//     assertEquals(filteredRules, { "another rule": ["not off"] });
//     assertEquals(removedOrModifiedRules, {
//       off: ["turned off rule"],
//       usedImport: [],
//       conflicts: [],
//       ts: [],
//       modified: []
//     });
//   }
// });

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
