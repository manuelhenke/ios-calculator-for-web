const path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    'ios-calculator': './src/iOSCalculator.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        // HTML for shadow DOM
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        // CSS for shadow DOM
        test: /\.s[ac]ss$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
        sideEffects: true,
      },
    ],
  },
};
