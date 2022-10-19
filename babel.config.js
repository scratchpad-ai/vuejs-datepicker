module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'modules': false
    }]
  ],
  'plugins': [
    [
      '@babel/plugin-transform-runtime',
      {
        'regenerator': true,
      }
    ]
  ],
  'env': {
    'test': {
      'plugins': ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
