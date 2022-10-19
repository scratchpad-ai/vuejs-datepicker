module.exports = {
  root: true,
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  overrides: [
    {
      files: ['**/*js'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        'ecmaVersion': 2020,
        'sourceType': 'module'
      },
      extends: [
        'eslint:recommended'
      ]
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      plugins: ['vue'],
      extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
      ],
      rules: {
        'vue/multi-word-component-names': 'off',
      }
    }
  ]
}
