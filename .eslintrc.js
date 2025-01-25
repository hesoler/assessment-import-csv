module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@angular-eslint/recommended",
    "standard"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 15
  },
  "plugins": [
    "@typescript-eslint",
    "@angular-eslint",
    "standard",
    "promise",
    "import",
    "node"
  ],
  "ignorePatterns": ['dist', '.eslintrc.js'],
  "rules": {
    'dot-notation': 'off',
  }
};

