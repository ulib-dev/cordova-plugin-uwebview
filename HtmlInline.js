const fs = require('fs');
const path = require('path');

// 读取 CSS 文件内容
const cssFilePath = path.resolve(__dirname, 'src/res/styles.css');
const cssContent = fs.readFileSync(cssFilePath, 'utf8');

// 读取 JS 文件内容
const jsFilePath = path.resolve(__dirname, 'src/res/bundle.js');
const jsContent = fs.readFileSync(jsFilePath, 'utf8');

// 读取 HTML 文件内容
const htmlFilePath = path.resolve(__dirname, 'src/res/u_video_player.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// 将 CSS 内容内联到 HTML 文件的 <head> 中
htmlContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);

// 将 JS 内容内联到 HTML 文件的 <body> 中
htmlContent = htmlContent.replace('</body>', `<script>${jsContent}</script></body>`);

// 替换 <script> 和 <link> 标签为空字符串
htmlContent = htmlContent.replace('<script defer="defer" src="bundle.js"></script>', '');
htmlContent = htmlContent.replace('<link href="styles.css" rel="stylesheet">', '');

// 写回 HTML 文件
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

console.log('CSS 和 JS 已成功内联到 HTML 文件中');