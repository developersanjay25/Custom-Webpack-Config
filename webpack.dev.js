const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge(config, {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dev_build"),
    publicPath: "/",
  },

  devtool: "source-map",
  mode: "development",
  devServer: {
    open: true,
    compress: true,
    hot: true,
    port: 4000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./dev_build"),
    },
    // devMiddleware: {
    //   index: false,
    //   writeToDisk: true, // Enable this option if you want the development build to be written to your local directory
    // },
    /** Use this if you want to proxy requests to a different server **/
    proxy: [
      {
        context: ["/ss"],
        target: "https://example.com",
        secure: false,
        changeOrigin: true,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      _DEVELOPMENT: true,
      _CACHEBLE: false,
      _PWA: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "dev_build/assets",
        },
      ],
    }),
  ],
});
