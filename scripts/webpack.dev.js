// webpack.dev.js
const { merge } = require("webpack-merge");
var path = require("path");

const base = require("./webpack.base.js");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

module.exports = merge(base, {
  mode: "development", // 开发模式
  devServer: {
    open: true, // 编译完自动打开浏览器
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: { postcssOptions: ["postcss-preset-env", {}] },
          },
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
