import videojs from "video.js";
import "../../node_modules/video.js/dist/video-js.min.css";

const defaultVideoSrc = "resource://android/assets/uvideo/blank.mp4";
let isDefaultVideoLoaded = false; // 标志变量，表示是否尝试加载默认视频

function mySendMessageToApp(message) {
  console.debug("Message sent to app:", message);
  message._uvideo = "1";
  alert(JSON.stringify(message));
}

function uPlayer(newId) {
  // Initialize video.js player
  this.player = videojs(newId, {
    controls: true,
    autoplay: true,
    muted: true,
    loop: false,
    sources: [
      {
        src: defaultVideoSrc, // Placeholder source
        type: "video/mp4",
        crossorigin: "anonymous",
      },
    ],
  });
  var player = this.player;
  // player.on("error", function () {
  //   const error = player.error();

  //   // 检查错误类型
  //   if (error && error.code === 4) {
  //     // 代码 4 表示 MEDIA_ERR_SRC_NOT_SUPPORTED
  //     if (!isDefaultVideoLoaded) {
  //       // 检查是否已经尝试加载默认视频
  //       console.log("主视频源加载失败，切换到默认视频");

  //       // 清空当前源，设置默认源
  //       player.src({
  //         src: defaultVideoSrc,
  //         type: "video/mp4",
  //       });

  //       // 重新加载并播放默认视频
  //       player.load();
  //       player.play().catch(function (err) {
  //         console.error("播放默认视频失败:", err);
  //         isDefaultVideoLoaded = true; // 设置标志，表示已经尝试加载默认视频
  //       });

  //       isDefaultVideoLoaded = true; // 设置标志，表示已经尝试加载默认视频
  //     }
  //   }
  // });
  // Listen for play event
  player.on("play", () => {
    isDefaultVideoLoaded = false;
    console.log("Video is playing");
    mySendMessageToApp({ event: "onPlay" });
  });

  // Listen for pause event
  player.on("pause", () => {
    console.log("Video is paused");
    mySendMessageToApp({ event: "onPause" });
  });

  // Listen for volume change event
  player.on("volumechange", () => {
    console.log("Volume changed");
    mySendMessageToApp({
      event: "volumechange",
      muted: player.muted(),
      volume: player.volume(),
    });
  });

  // Listen for video end event
  player.on("ended", () => {
    console.log("Video ended");
    mySendMessageToApp({ event: "ended" });
  });

  // Listen for fullscreen change
  player.on("fullscreenchange", () => {
    const isFullscreen = player.isFullscreen();
    const message = isFullscreen ? "Entered full screen" : "Exited full screen";
    console.log(message);
    mySendMessageToApp({
      event: "fullscreenchange",
      message,
    });
  });

  this.changeVideoUrl = (url) => {
    // 确保暂停当前播放
    player.pause();

    // 设置新的视频源
    // const source = document.getElementById("videoSource");
    // source.src = newUrl;

    // // 重新加载并播放
    // video.load();
    // video.play().catch((error) => {
    //   console.error("播放失败:", error);
    //   mySendMessageToApp({
    //     event: "changeVideoUrlNew",
    //     dataURL: url,
    //     error: error,
    //   });
    // });

    player.src({ type: "video/mp4", src: url, crossorigin: "anonymous" });
    player.load();
    player.play().catch((error) => {
      console.error("Auto play failed:", error);
      mySendMessageToApp({
        event: "changeVideoUrlNew",
        dataURL: url,
        error: error,
        msg: "",
      });
    });
  };

  // Capture screenshot logic (using canvas, similar to Plyr approach)
  this.captureScreenshot = () => {
    const videoElement = document.querySelector("#" + newId + " video");
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    mySendMessageToApp({
      event: "captureScreenshot",
      message: "Screenshot captured",
      dataURL: dataURL,
    });
  };

  this.destroy = () => {
    player.dispose(); // Dispose of the player when done
    try {
      document.getElementById(newId).remove();
    } catch (error) {
      console.error("Error removing video element:", error);
    }
  };

  return this;
}

var player = new uPlayer("player");
window.uvideoPlayer = {
  changeVideoUrl: (url) => {
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
  // player.play(); // Auto-play the video on load, if needed
};
