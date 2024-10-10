import Plyr from "plyr";
import "../../node_modules/plyr/dist/plyr.css";


//const defaultVideoSrc = "resource://android/assets/uvideo/u_video_blank.mp4";
//const defaultVideoSrc = "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAOEbW9vdgAAAGxtdmhkAAAAANOs4tLTrOLSAAAD6AAAA+gAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAoh0cmFrAAAAXHRraGQAAAAD06zi0tOs4tIAAAABAAAAAAAAA+gAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAACAAAAAUAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPoAACMoAABAAAAAAIAbWRpYQAAACBtZGhkAAAAANOs4tLTrOLSAAFfkAABX5BVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABq21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAWtzdGJsAAAAl3N0c2QAAAAAAAAAAQAAAIdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAACAAFABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMWF2Y0MBTUAo/+EAGWdNQCjspL881AQEBQAAAwABAAK/IA8YMZYBAAVo74GfIAAAABhzdHRzAAAAAAAAAAEAAAAFAABGUAAAABRzdHNzAAAAAAAAAAEAAAABAAAAOGN0dHMAAAAAAAAABQAAAAEAAIygAAAAAQABX5AAAAABAACMoAAAAAEAAAAAAAAAAQAARlAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAMQAAAADAAAAAsAAAALAAAACwAAACRzdGNvAAAAAAAAAAUAAAO0AAAGxAAABtAAAAbbAAAG5gAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC41IDIwMTYwMjExMDAAAAAIZnJlZQAAA0VtZGF0AAAC8AYF///s3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9NTAga2V5aW50X21pbj01IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9MTAgcmM9Y3JmIG1idHJlZT0xIGNyZj0xLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAGGWIhAH/+n/CVf/Y9kSiv//ffLnuYgWj/wAAAAhBmiQYv/7a4AAAAAdBnkJC/xXRAAAABwGeYUX/FdAAAAAHAZ5jRf8V0Q==";
const defaultVideoSrc = "";
// 模拟发送消息到应用
function mySendMessageToApp(message) {
  // 这是一个模拟的函数，你可以根据你的实际需求实现与应用程序的通信逻辑
  console.debug("Message sent to app:", message);
  message._uvideo = "1";
  alert(JSON.stringify(message));
}

function uPlayer(newId) {
  // 初始化 Plyr 播放器
  const player = new Plyr("#" + newId, {
    hideControls: false, // 设置为 false，控件将不会自动隐藏
    blankVideo: defaultVideoSrc,
    resetOnEnd: true,
    controls: [
      "play-large", // 大的播放按钮
      "play", // 播放/暂停按钮
      "progress", // 进度条
      "current-time", // 当前时间
      "mute", // 静音按钮
      "volume", // 音量控制
      // 'settings', // 设置按钮
      "fullscreen", // 全屏按钮
      "custom-screenshot", // 自定义截图按钮
    ],
    muted: true, // 确保播放器在加载时静音
    autoplay: true, // 尝试自动播放
  });

  // 监听播放事件
  player.on("play", () => {
    console.log("Video is playing");
    mySendMessageToApp({ event: "onPlay" });
  });

  // 监听暂停事件
  player.on("pause", () => {
    console.log("Video is paused");
    mySendMessageToApp({ event: "onPause" });
  });

  // 监听音量变化事件
  player.on("volumechange", () => {
    console.log("Volume changed");
    mySendMessageToApp({
      event: "volumechange",
      muted: player.muted,
      volume: player.volume,
    });
  });

  // 监听视频播放结束事件，重置到开始
  player.on("ended", () => {
    console.log("ended");
    mySendMessageToApp({
      event: "ended",
    });
    // // 将播放时间重置为 0
    // player.currentTime = 0;
    // // 显示大播放按钮
    // player.playing = false; // 使 Plyr 恢复初始状态
    // // 暂停播放（防止自动播放）
    // player.pause();
  });

  // 监听全屏切换事件
  player.on("enterfullscreen", () => {
    console.log("Entered full screen");
    mySendMessageToApp({
      event: "fullscreenchange",
      message: "Entered full screen",
    });
  });

  player.on("exitfullscreen", () => {
    console.log("Exited full screen");
    mySendMessageToApp({
      event: "fullscreenchange",
      message: "Exited full screen",
    });
  });

  // 控制按钮功能
  this.play = () => {
    player.play();
    mySendMessageToApp({
      event: "play_button",
      message: "Play button clicked",
    });
  };

  function pause() {
    player.pause();
    mySendMessageToApp({
      event: "pause_button",
      message: "Pause button clicked",
    });
  }

  function toggleMute() {
    player.muted = !player.muted;
    mySendMessageToApp({
      event: "mute_button",
      message: "Mute button clicked",
      muted: player.muted,
    });
  }

  function enterFullScreen() {
    player.fullscreen.enter();
    mySendMessageToApp({
      event: "fullscreen_button",
      message: "Fullscreen button clicked",
    });
  }

  function exitFullScreen() {
    player.fullscreen.exit();
    mySendMessageToApp({
      event: "exit_fullscreen_button",
      message: "Exit fullscreen button clicked",
    });
  }

  // 创建自定义按钮并添加到播放器控件中
  function createCustomButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "plyr__controls__item plyr__control"; // Plyr 控件样式
    // 使用 Font Awesome 的截图图标
    button.innerHTML = '<i class="fas fa-camera"></i>'; // 截图图标
    // 当按钮点击时，执行截图功能
    button.addEventListener("click", captureScreenshot);
    return button;
  }

  // 将自定义按钮插入到全屏按钮前
  player.on("ready", () => {
    return;
    const controls = player.elements.controls;
    const customButton = createCustomButton();
    // 查找全屏按钮
    const fullscreenButton = controls.querySelector(
      ".plyr__control--fullscreen"
    );
    // 将自定义按钮插入到全屏按钮之前
    controls.insertBefore(customButton, fullscreenButton);
    player.muted = true; // 确保静音
  });

  // 截图功能：使用 Canvas 对视频进行截图
  this.captureScreenshot = () => {
    const video = document.querySelector("#player");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    mySendMessageToApp({
      event: "captureScreenshot",
      message: "Screenshot captured",
      dataURL: dataURL,
    });
    // 如果你需要将图片下载到本地，可以使用下面的代码
    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'screenshot.png';
    // link.click();
  };
  this.destroy = () => {
    try {
      player.destroy();
    } catch (error) {}
    try {
      document.getElementById(newId).remove();
    } catch (error) {}
  };
  this.changeVideoUrl = (url) => {
    const video = document.getElementById("player");
    const source = document.getElementById("videoSource");

    source.src = url;
    video.load(); // 重新加载新源

    video.addEventListener("loadeddata", () => {
      mySendMessageToApp({
        event: "changeVideoUrlNew",
        data: url,
        s: "新视频数据已加载",
      });
      console.log("新视频数据已加载");
      video.play().catch((error) => {
        mySendMessageToApp({
            event: "changeVideoUrlNew",
            data: url,
            s: "直接播放失败",
          });
        console.error("直接播放失败:", error);
      });
    });

    video.addEventListener("error", (event) => {
      mySendMessageToApp({
        event: "changeVideoUrlNew",
        data: url,
        s: "视频加载错误",
      });
      console.error("视频加载错误:", event);
    });

    video.load(); // 重新加载视频
  };
  this.player = player;
  return this;
}
var player = new uPlayer("player");
window.uvideoPlayer = {
  changeVideoUrl: (url) => {
    // mySendMessageToApp({
    //   event: "changeVideoUrl",
    //   data: url,
    // });
    try {
      player.changeVideoUrl(url);
    } catch (error) {
      console.error(error);
    }
  },
  captureScreenshot: () => {
    try {
      player.captureScreenshot();
    } catch (error) {
      console.error(error);
    }
  },
};

window.onload = () => {
  // player.play().catch((error) => {
  //     console.error("Auto play failed:", error);
  // });
};
