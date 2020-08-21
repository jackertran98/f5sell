import { has } from "lodash";

var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 100
  .has()
  .uppercase()
  .has()
  .digits() // Must have digits
  .has()
  .lowercase()
  .not()
  .spaces()
  .is()
  .letters(); // Should not have spaces

export const checkPassword = (password) => {
  return schema.validate(password, { list: true });
};

// // Validate against a password string
// console.log(schema.validate('validPASS123'));
// // => true
// console.log(schema.validate('invalidPASS'));
// // => false

// // Get a full list of rules which failed
// console.log(schema.validate('joke', { list: true }));
// // => [ 'min', 'uppercase', 'digits' ]
