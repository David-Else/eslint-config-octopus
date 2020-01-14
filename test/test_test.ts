import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { test, runTests } from 'https://deno.land/std/testing/mod.ts';
import { filterRules } from '../src/calculate.ts';

test({
  name: 'turned off rules removed',
  fn(): void {
    // Arrange
    const testData = { 'turned off rule': ['off'] };
    // Act
    const result = filterRules(testData);
    // Assert
    assertEquals(result, [
      testData,
      {
        off: ['turned off rule'],
        usedImport: [],
        conflicts: [],
        ts: [],
        modified: []
      }
    ]);
  }
});

test({
  name: 'import plugin rules removed',
  fn(): void {
    // Arrange
    const testData = { 'import/': 1 };
    // Act
    const result = filterRules(testData);
    // Assert
    assertEquals(result, [
      testData,
      {
        off: [],
        usedImport: ['import/'],
        conflicts: [],
        ts: [],
        modified: []
      }
    ]);
  }
});

runTests();

// deno test test/ --allow-env --allow-write --allow-net --allow-run
