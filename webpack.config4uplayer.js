const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./video-template/src/uPlayer.js", // JS 文件的入口
    output: {
        path: path.resolve(__dirname, "dist"), // 输出路径
        filename: "uPlayer.js", // 输出的文件名
        library: 'uPlayer', // 导出库名称
        libraryTarget: 'umd', // 使用 UMD 格式
        globalObject: 'this' // 解决 'window is not defined' 问题
    },
    stats: {
        colors: true,
        reasons: true,
        errorDetails: true,
    },
    module: {
        rules: [{
                test: /\.css$/, // 处理 CSS 文件
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/, // 将图片和字体文件转换为 base64
                type: "asset/inline",
            },
            {
                test: /\.js$/, // 处理 JS 文件
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ],
    },
    optimization: {
        minimize: true, // 启用最小化
    },
    mode: "production", // 生产模式
};