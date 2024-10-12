const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入 CopyWebpackPlugin

module.exports = {
  entry: "./video-template/src/index.js", // JS 文件的入口
  output: {
    // path: path.resolve(__dirname, "src/android/assets/uvideo"),
    path: path.resolve(__dirname, "src/res"),
    filename: "bundle.js", // 不需要关心这个文件名，它会被内联
  },
  stats: {
    colors: true,
    reasons: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 内联 CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/, // 将图片和字体文件转换为 base64
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./video-template/index.html", // 基础 HTML 模板
      filename: "u_video_player.html", // 指定输出的 HTML 文件名
      inject: "body", // 将 JS 注入到 body 中
      minify: {
        collapseWhitespace: true, // 压缩 HTML
      },
    }),
    new HtmlInlineScriptPlugin(), // 将 JS 内联到 HTML 中
    // new CopyWebpackPlugin({
    //   // 使用 CopyWebpackPlugin
    //   patterns: [
    //     {
    //       from: path.resolve(
    //         __dirname,
    //         "src/android/assets/uvideo/u_video_player.html"
    //       ),
    //       to: path.resolve(
    //         __dirname,
    //         "src/android/res/raw/u_video_player.html"
    //       ),
    //     },
    //   ],
    // }),
  ],
  mode: "production", // 生产模式
  // 添加 `webpack` 钩子以在构建后复制 HTML 文件
};
