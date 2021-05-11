module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    eqeqeq: [0, 'allow-null'],
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json', '.vue']
      }
    }
  }
}
