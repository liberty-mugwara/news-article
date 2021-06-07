const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "src/client/index.js",
  mode: "development",
  devtool: "source-map",
  stats: "verbose",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        loader: "style-loader css-loader sass-loader",
      },
    ],

    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
      }),

      new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false,
      }),
    ],
  },
};