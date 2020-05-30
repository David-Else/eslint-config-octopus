import { assertEquals } from "./deps.ts";
import { ruleFilter, rulesToRemove } from "./mod.ts";

Deno.test({
  name: "turned off rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "turned off rule": ["off"],
    };
    // Act
    const filteredRules = ruleFilter(testData, rulesToRemove);
    // Assert
    assertEquals(filteredRules, [{}, ["turned off rule"]]);
  },
});

Deno.test({
  name: "import plugin rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "import/": ["on"],
    };
    // Act
    const filteredRules = ruleFilter(testData, rulesToRemove);
    // Assert
    assertEquals(filteredRules, [{}, ["import/"]]);
  },
});

Deno.test({
  name: "various rules removed",
  fn(): void {
    // Arrange
    const testData = {
      "1": ["on"],
      "import/": ["on"],
      "2": ["off"],
      "3": ["on"],
    };
    // Act
    const filteredRules = ruleFilter(testData, rulesToRemove);
    // Assert
    assertEquals(filteredRules, [
      {
        "1": ["on"],
        "3": ["on"],
      },
      ["2", "import/"],
    ]);
  },
});
