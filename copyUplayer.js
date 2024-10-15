const fs = require('fs');
const path = require('path');

// 定义源文件和目标路径
const source = path.join(__dirname, 'dist/uPlayer.js'); // 源文件路径
const target1 = path.join(__dirname, 'www/uPlayer.js'); // 目标文件路径
// const target2 = path.join(__dirname, 'src/android/res/raw/u_video_player.html'); // 目标文件路径

// 延迟执行的时间（毫秒）
const delay = 1000; // 2 秒

// 使用 setTimeout 延迟执行文件复制
setTimeout(() => {
    fs.copyFile(source, target1, (err) => {
        if (err) {
            console.error('Error copying file:', err);
        } else {
            console.log(`File copied from ${source} to ${target1}`);
        }
    });
    // fs.copyFile(source, target2, (err) => {
    //     if (err) {
    //         console.error('Error copying file:', err);
    //     } else {
    //         console.log(`File copied from ${source} to ${target2}`);
    //     }
    // });
}, delay);