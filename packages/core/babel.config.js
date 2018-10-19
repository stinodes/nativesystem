module.exports = function(api) {
  api.cache(false)

  const presets = ['flow']
  const plugins = []

  return {
    presets,
    plugins,
  }
}
