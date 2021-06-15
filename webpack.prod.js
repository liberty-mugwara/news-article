import { resolve as resolvePath } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";

export default {
  entry: "./src/client/index.js",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: resolvePath("dist"),
    library: {
      type: "var",
      name: "Client",
    },
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new WorkboxPlugin.GenerateSW(),
  ],

  optimization: {
    minimizer: [new TerserPlugin(), `...`, new CssMinimizerPlugin()],
  },
};
