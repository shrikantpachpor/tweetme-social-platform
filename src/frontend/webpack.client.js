const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  devServer: {
    //  contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    contentBase: "./",
    hot: true
  },
  mode: "development",
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "./clientJS"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ hash: true, template: "./src/public/index.html" })
  ],
  module: {
    rules: []
  }
};

module.exports = merge(common, config);
