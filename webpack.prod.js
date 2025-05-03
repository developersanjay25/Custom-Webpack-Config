const webpack = require("webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(config, {
  mode: "production",
  output: {
    filename: "[id].[contenthash].js",
    path: path.resolve(__dirname, "dist_build"),
    publicPath: "./",
  },
  plugins: [
    new webpack.DefinePlugin({
      _DEVELOPMENT: false,
      _CACHEBLE: false,
      _PWA: false,
    }),
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: path.resolve(__dirname, "./dist_build/assets"),
        },
      ],
    }),
  ],
});
