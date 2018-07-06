// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  env: {
    node: true,
    commonjs: true,
    es6: true
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],

  // html plugin required to lint *.vue files
  plugins: [ "vue", "html"],

  // custom rules
  rules: {
    "no-console" : "off",

    // allow paren-less arrow functions
    "arrow-parens": "off",

    // allow async-await
    "generator-star-spacing": "off",

    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === 'production' ? "error" : "off",

    // allow semicolons
    "semi": "off",

    // no space before function parenthesis
    "space-before-function-paren": "off",

    "quotes": "off",

    "padded-blocks": "off",

    "no-unused-vars": [ "error", { "vars": "local", "args": "none" } ]
  },

  overrides: [
    {
      files: [
        "**/*.test.js", "**/*.spec.js"
      ],
      env: {
        jest: true
      },
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
]
};
