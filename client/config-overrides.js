const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  const htmlWebpackPlugin = config.plugins.find(
    plugin => plugin instanceof HtmlWebpackPlugin
  );

  if (htmlWebpackPlugin) {
    htmlWebpackPlugin.options.minify.removeComments = false; // Preserve comments
  }

  return config;
};
