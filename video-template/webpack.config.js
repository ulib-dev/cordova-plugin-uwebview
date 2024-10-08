const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    entry: './src/index.js', // JS 文件的入口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // 不需要关心这个文件名，它会被内联
    },
    module: {
        rules: [{
                test: /\.css$/, // 内联 CSS
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/, // 将图片和字体文件转换为 base64
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 基础 HTML 模板
            filename: 'geckoview_remote_video_player.html', // 指定输出的 HTML 文件名
            inject: 'body', // 将 JS 注入到 body 中
            minify: {
                collapseWhitespace: true, // 压缩 HTML
            },
        }),
        new HtmlInlineScriptPlugin(), // 将 JS 内联到 HTML 中
    ],
    mode: 'production', // 生产模式
};