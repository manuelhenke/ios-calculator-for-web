const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    "ios-calculator": "./src/ios-calculator.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        // HTML for shadow DOM
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        // CSS for shadow DOM
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "postcss-loader", "sass-loader"],
        sideEffects: true,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    compress: true,
    port: 9000,
  },
};
