module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "react-app", "prettier", "prettier/react", "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "tsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "prettier",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": 0,
    // "indent": [
    //   "warn",
    //   2
    // ],
    "eqeqeq": [
      "off"
    ],
    // "quotes": [
    //   "warn",
    //   "single"
    // ],
    "semi": [
      "warn",
      "always"
    ],
    "no-mixed-spaces-and-tabs": [
      0
    ],
    "no-console": [
      "off"
    ],
    "no-case-declarations": [
      "off"
    ],
    "no-multi-spaces": [
      "warn",
      { ignoreEOLComments: false }
    ],
    "no-trailing-spaces": [
      "warn",
      { "skipBlankLines": true }
    ],
    "prefer-const": ["warn", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "arrow-body-style": [
      "off"
    ],
    "object-shorthand": [
      "warn",
      "always"
    ],
    "space-before-blocks": [
      "warn",
      "always"
    ],
    "arrow-spacing": [
      "warn",
      { "before": true, "after": true }
    ],
    "keyword-spacing": [
      "warn",
      { "before": true, "after": true }
    ],
    "comma-spacing": [
      "warn",
      { "before": false, "after": true }
    ],
    "no-restricted-globals": [
      "warn"
    ],
    "no-duplicate-imports": [
      "warn"
    ],
    "no-else-return": [
      "warn"
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "off",
      { "allowExpressions": true }
    ],
    "@typescript-eslint/camelcase": [
      "off",
      { "properties": "always" }
    ],
    "@typescript-eslint/no-use-before-define": [
      "off",
      { "functions": true, "classes": true }
    ],
    "@typescript-eslint/no-unused-vars": [
      "off",
      { "vars": "local" }
    ],
    "@typescript-eslint/no-explicit-any": [
      "off"
    ],
    "@typescript-eslint/no-empty-function": [
      "off",
      { "allow": ["functions"] }
    ],
    "@typescript-eslint/ban-ts-ignore": [
      "off",
    ],
    "react-hooks/exhaustive-deps": 0
  }
};