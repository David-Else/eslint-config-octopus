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
