const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {require('webpack').Configuration} */
module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    'ios-calculator': './src/iOSCalculator.js',
    'ios-calculator.min': './src/iOSCalculator.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
        sideEffects: true,
      },
    ],
  },
};
