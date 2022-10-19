module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'modules': false
    }]
  ],
  'env': {
    'test': {
      'plugins': [
        '@babel/plugin-transform-modules-commonjs',
        [
          '@babel/plugin-transform-runtime',
          {
            'regenerator': true,
          }
        ]
      ]
    }
  }
}
