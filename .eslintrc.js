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
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "no-unused-expressions": off,
        "no-unused-vars": warn,
        "implicit-arrow-linebreak": off,
        "no-undef": off,
        "no-extra-semi": error,
        "semi": off,
        "comma-dangle": off,
        "no-new": warn,
        "quotes": ["error", "double"],
        "no-underscore-dangle": off,
        "operator-linebreak": off,
        "arrow-parens": off,
        "class-methods-use-this": warn,
        "react/jsx-one-expression-per-line": warn,
        "react/jsx-filename-extension": [warn, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": warn,
        "no-multi-assign": warn,
        "arrow-body-style": warn,
      },
      "globals": {
        "document": true
      }
    }
  ]
})
