module.exports = function(api) {
  api.cache(false)

  const presets = ['@babel/preset-flow']
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ]

  return {
    presets,
    plugins,
  }
}
