const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  //  entry: ["@babel/polyfill", "./src/index.js"],
  devServer: {
    compress: true,
    disableHostCheck: true // That solved it
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: ["/node_modules/", path.resolve(__dirname, "/node_modules/")], //"/node_modules/*",
        query: {
          presets: [
            //  "@babel/env",
            //"@babel/react",
            //  "babel-preset-es2015",
            "@babel/preset-react",
            "@babel/preset-env"
            //  "@babel/core",
            //  "@babel/preset-stage-2",
            //"@babel/runtime"
          ]
          /*plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            { loose: true, useBuiltIns: true }
            /*" "@babel/plugin-transform-spread","*/
          //  ]
        }
      },
      {
        test: /\.(svg|jpg|png|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};
