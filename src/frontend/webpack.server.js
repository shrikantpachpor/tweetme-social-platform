const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackNodeExternals = require("webpack-node-externals");

const config = {
  mode: "development",
  target: "node",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./serverJS"),
    filename: "bundle.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin(/*{
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          }
        }
      }*/)
      /*  new UglifyJsPlugin({
        // Compression specific options
        uglifyOptions: {
          // Eliminate comments
          comments: false,

          compress: {
            // remove warnings
            warnings: false,

            // Drop console statements
            drop_console: true
          }
        }
      })*/
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [webpackNodeExternals()]
};

module.exports = merge(common, config);
