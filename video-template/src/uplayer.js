import Plyr from "plyr";
import "plyr/dist/plyr.css";

class uPlayer {
    constructor(playerElId, sendMessageToApp) {
        console.log("uPlayer", "constructor id: " + playerElId);
        this.playerElId = playerElId;
        this.mySendMessageToApp = (message) => {
            if (sendMessageToApp != null) {
                sendMessageToApp(message);
            }
        };

        this.player = new Plyr("#" + playerElId, {
            hideControls: false,
            blankVideo: "defaultVideoSrc",
            resetOnEnd: true,
            controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
            muted: true,
            autoplay: true,
            playsinline: true,
        });

        this.initEvents();
    }

    initEvents() {
        this.player.on("play", () => {
            console.log("Video is playing");
            this.mySendMessageToApp({ event: "onPlay" });
        });

        this.player.on("pause", () => {
            console.log("Video is paused");
            this.mySendMessageToApp({ event: "onPause" });
        });

        this.player.on("volumechange", () => {
            console.log("Volume changed");
            this.mySendMessageToApp({
                event: "volumechange",
                muted: this.player.muted,
                volume: this.player.volume,
            });
        });

        this.player.on("ended", () => {
            console.log("ended");
            this.mySendMessageToApp({ event: "ended" });
        });

        this.player.on("enterfullscreen", () => {
            console.log("Entered full screen");
            this.mySendMessageToApp({
                event: "fullscreenchange",
                message: "Entered full screen",
            });
        });

        this.player.on("exitfullscreen", () => {
            console.log("Exited full screen");
            this.mySendMessageToApp({
                event: "fullscreenchange",
                message: "Exited full screen",
            });
        });
    }

    play() {
        this.player.play();
        this.mySendMessageToApp({
            event: "play_button",
            message: "Play button clicked",
        });
    }

    pause() {
        this.player.pause();
        this.mySendMessageToApp({
            event: "pause_button",
            message: "Pause button clicked",
        });
    }

    toggleMute() {
        this.player.muted = !this.player.muted;
        this.mySendMessageToApp({
            event: "mute_button",
            message: "Mute button clicked",
            muted: this.player.muted,
        });
    }

    enterFullScreen() {
        this.player.fullscreen.enter();
        this.mySendMessageToApp({
            event: "fullscreen_button",
            message: "Fullscreen button clicked",
        });
    }

    exitFullScreen() {
        this.player.fullscreen.exit();
        this.mySendMessageToApp({
            event: "exit_fullscreen_button",
            message: "Exit fullscreen button clicked",
        });
    }

    captureScreenshot() {
        const video = document.querySelector("#player");
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        this.mySendMessageToApp({
            event: "captureScreenshot",
            message: "Screenshot captured",
            dataURL: dataURL,
        });
    }

    changeVideoUrl(url) {
        const video = document.getElementById(this.playerElId);
        //const source = document.getElementById("videoSource");
        const source = video.querySelector("source")[0];
        source.src = url;
        video.load();
        video.addEventListener("loadeddata", () => {
            this.mySendMessageToApp({
                event: "changeVideoUrlNew",
                data: url,
                s: "新视频数据已加载",
            });
            console.log("新视频数据已加载");
            video.play().catch((error) => {
                this.mySendMessageToApp({
                    event: "changeVideoUrlNew",
                    data: url,
                    s: "直接播放失败",
                });
                console.error("直接播放失败:", error);
            });
        });
        video.addEventListener("error", (event) => {
            this.mySendMessageToApp({
                event: "changeVideoUrlNew",
                data: url,
                s: "视频加载错误",
            });
            console.error("视频加载错误:", event);
        });
        video.load(); // 重新加载视频
    }

    destroy() {
        try {
            this.player.destroy();
        } catch (error) {}
        try {
            document.getElementById(this.playerElId).remove();
        } catch (error) {}
    }
}
// 将 uPlayer 绑定到 window 对象
window.uPlayer = uPlayer;
export default uPlayer;