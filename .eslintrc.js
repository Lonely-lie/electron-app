module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  extends: [
    // 'standard',
    'plugin:vue/essential',
    'plugin:prettier/recommended' // 如果同时使用了eslint和prettier发送能冲突，会使用prettier认为对的规则
  ],
  plugins: [
    'prettier' // eslint会使用prettier的规则对代码格式化
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  // 全局变量
  globals: {
    baseConfig: true
    /* CURRENT_MODE: true,
		CURRENT_VERSION: true,
		CURRENT_PLATFORM: true */
  },
  rules: {
    'prettier/prettier': 2, // 对于不符合prettier规范的写法，eslint会提示报错
    'no-tabs': 0,
    indent: [
      2,
      'tab',
      {
        SwitchCase: 1
      }
    ], // 使用tab缩进否则报错
    'space-before-function-paren': 0,
    eqeqeq: 0, // 没有使用全等则警告
    'prefer-promise-reject-errors': 0,
    'no-fallthrough': 1,
    'no-callback-literal': 0,
    'node/no-callback-literal': 0
  }
}
