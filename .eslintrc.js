/* 
use airbnb's eslint rules
https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
*/

const off = 0,
warn = 1,
error = 2

let eslintConfigAirbnb = require("eslint-config-airbnb");

module.exports = Object.assign({}, eslintConfigAirbnb, {
  /*
    your custom rules here.
  */
  "rules": {
    "no-extra-semi": error,
    "semi": off,
    "react/jsx-filename-extension": [warn, { "extensions": [".js", ".jsx"] }]
  },
  "overrides": [
    {
      "files": ["*.test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": off,
        "no-undef": off
      }
    }
  ]
})
