module.exports = {
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  extends: [
    "eslint:recommended",
  ],
  rules: {
  /* best practises */
  'accessor-pairs': 'error', // https://eslint.org/docs/rules/accessor-pairs
  'curly': ['error', 'all'], // https://eslint.org/docs/rules/curly
  'global-require': 0, // https://eslint.org/docs/rules/global-require
  'no-alert': 'warn', // https://eslint.org/docs/rules/no-alert
  'no-console': 'error', // https://eslint.org/docs/rules/no-console
  'no-div-regex': 'error', // https://eslint.org/docs/rules/no-div-regex
  'no-new': 'off', // https://eslint.org/docs/rules/no-new
  'no-param-reassign': 'off', // https://eslint.org/docs/rules/no-param-reassign
  'vars-on-top': 'off', // https://eslint.org/docs/rules/vars-on-top
  'wrap-iife': ['error', 'inside', { functionPrototypeMethods: false }], // https://eslint.org/docs/rules/wrap-iife
  'no-unused-vars': 'warn', // https://eslint.org/docs/rules/no-unused-vars

  /* stylistic issues */
  'consistent-this': ['error', '_this'], // https://eslint.org/docs/rules/consistent-this
  'func-names': 'off', // https://eslint.org/docs/rules/func-names
  'indent': ['error', 2, { SwitchCase: 1 }], // https://eslint.org/docs/rules/indent
  'max-depth': ['error', 4], // https://eslint.org/docs/rules/max-depth
  'max-len': ['warn', 120, 2, { ignoreComments: true }], // https://eslint.org/docs/rules/max-len
  'max-nested-callbacks': [2, 4], // https://eslint.org/docs/rules/max-nested-callbacks
  'max-params': ['error', 5], // https://eslint.org/docs/rules/max-params
  'no-bitwise': ['error', { int32Hint: true }], // https://eslint.org/docs/rules/no-bitwise
  'no-mixed-operators': 'off', // https://eslint.org/docs/rules/no-mixed-operators
  'no-plusplus': 'off', // https://eslint.org/docs/rules/no-plusplus
  'no-restricted-syntax': 'off', // https://eslint.org/docs/rules/no-restricted-syntax
  'padded-blocks': ['error', { classes: 'always', blocks: 'never', switches: 'never' }], // https://eslint.org/docs/rules/padded-blocks

  /* es6 */
  'arrow-parens': ['error', 'as-needed'], // https://eslint.org/docs/rules/arrow-parens
  },
};