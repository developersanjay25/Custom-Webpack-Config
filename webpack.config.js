const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // ✅ Important! Output folder
    clean: true, // ✅ Webpack 5 clean
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // ✅ Correct regex
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // No need for options here if .babelrc exists
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  cache: {
    type: "filesystem",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // ✅ Correct template path
      filename: "index.html",
    }),
  ],
};

module.exports = config;
