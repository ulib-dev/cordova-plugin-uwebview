const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './video-template/src/index.js', // JS 文件的入口
    output: {
        // path: path.resolve(__dirname, "src/android/assets/uvideo"),
        path: path.resolve(__dirname, "src/res"),
        filename: 'bundle.js', // 输出的 JS 文件名
    },
    module: {
        rules: [{
            test: /\.css$/, // 处理 CSS 文件
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './video-template/index.html', // 基础 HTML 模板
            filename: 'u_video_player.html', // 输出的 HTML 文件名
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', // 输出的 CSS 文件名
        }),
    ],
    mode: 'production', // 生产模式
};