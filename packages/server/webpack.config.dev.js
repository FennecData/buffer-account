const webpack = require('webpack');
const config = require('./webpack.config');

// NOTE: Bugsnag will not notify in local setup with current weback configuration
// https://docs.bugsnag.com/platforms/browsers/faq/#4-code-generated-with-eval-e-g-from-webpack
config.devtool = 'cheap-module-eval-source-map';

config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
);

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
);

module.exports = config;
