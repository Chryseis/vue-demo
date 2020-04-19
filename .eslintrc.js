// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    Util: true,
    Fetch: true,
    Constant: true,
    Telescope: true
  },
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'no-unused-vars': 'off',
    eqeqeq: 'off',
    'space-before-function-paren': 'off'
  }
};
