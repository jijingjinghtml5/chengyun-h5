module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // 'eslint:recommended',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
  }
}
