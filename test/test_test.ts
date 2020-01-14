<<<<<<< HEAD
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
=======
// @ts-ignore
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
// @ts-ignore
import { test } from 'https://deno.land/std/testing/mod.ts';
import { RemovedOrModifiedRules } from '../src/calculate.ts';
import { returnNewShit } from '../src/calculate.ts';
// import { RemovedOrModifiedRules } from '../src/calculate.ts';

console.log(returnNewShit);
// test({
//   name: 'TEST()',
//   fn(): void {
//     // Arrange
//     const removedOrModifiedRulesTest: RemovedOrModifiedRules = {
//       off: [],
//       usedImport: [],
//       conflicts: [],
//       ts: [],
//       modified: []
//     };
//     const rules = {};
//     // Act
//     const result = returnNewShit(rules, removedOrModifiedRulesTest);
//     // Assert
//     assertEquals(result, {
//       primaryNumber: 3,
//       typeOfExpression: 'Thunder'
//     });
//   }
// });

// test({
//   name: 'findSecondaryNumber()',
//   fn(): void {
//     // Arrange
//     const primaryNumber = 1;
//     const gender = 'M';
//     const monthOfBirth = 1;
//     // Act
//     const result = findSecondaryNumber(primaryNumber, gender, monthOfBirth);
//     // Assert
//     assertEquals(result, 8);
//   }
// });
>>>>>>> d465a23f9fb74d3b26cb746e1365b391bdbf31d9
