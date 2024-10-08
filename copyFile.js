const fs = require('fs');
const path = require('path');

// 定义源文件和目标路径
const source = path.join(__dirname, 'src/android/assets/uvideo/u_video_player.html'); // 源文件路径
const target = path.join(__dirname, 'src/android/res/raw/u_video_player.html'); // 目标文件路径

// 延迟执行的时间（毫秒）
const delay = 1500; // 2 秒

// 使用 setTimeout 延迟执行文件复制
setTimeout(() => {
  fs.copyFile(source, target, (err) => {
    if (err) {
      console.error('Error copying file:', err);
    } else {
      console.log(`File copied from ${source} to ${target}`);
    }
  });
}, delay);
