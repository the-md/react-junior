module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "multiline-ternary": "off",
    indent: ["error", 2, { SwitchCase: 1, offsetTernaryExpressions: true }],
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "no-nested-ternary": "off",
    camelcase: "off",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "never"]
  }
};
