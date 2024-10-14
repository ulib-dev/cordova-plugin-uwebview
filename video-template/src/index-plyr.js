//import Plyr from "plyr";
// import "../../node_modules/plyr/dist/plyr.min.js";
import "../../node_modules/plyr/dist/plyr.css";
import "./uPlayer";

//const defaultVideoSrc = "resource://android/assets/uvideo/u_video_blank.mp4";
//const defaultVideoSrc = "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAOEbW9vdgAAAGxtdmhkAAAAANOs4tLTrOLSAAAD6AAAA+gAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAoh0cmFrAAAAXHRraGQAAAAD06zi0tOs4tIAAAABAAAAAAAAA+gAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAACAAAAAUAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPoAACMoAABAAAAAAIAbWRpYQAAACBtZGhkAAAAANOs4tLTrOLSAAFfkAABX5BVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABq21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAWtzdGJsAAAAl3N0c2QAAAAAAAAAAQAAAIdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAACAAFABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMWF2Y0MBTUAo/+EAGWdNQCjspL881AQEBQAAAwABAAK/IA8YMZYBAAVo74GfIAAAABhzdHRzAAAAAAAAAAEAAAAFAABGUAAAABRzdHNzAAAAAAAAAAEAAAABAAAAOGN0dHMAAAAAAAAABQAAAAEAAIygAAAAAQABX5AAAAABAACMoAAAAAEAAAAAAAAAAQAARlAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAMQAAAADAAAAAsAAAALAAAACwAAACRzdGNvAAAAAAAAAAUAAAO0AAAGxAAABtAAAAbbAAAG5gAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC41IDIwMTYwMjExMDAAAAAIZnJlZQAAA0VtZGF0AAAC8AYF///s3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9NTAga2V5aW50X21pbj01IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9MTAgcmM9Y3JmIG1idHJlZT0xIGNyZj0xLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAGGWIhAH/+n/CVf/Y9kSiv//ffLnuYgWj/wAAAAhBmiQYv/7a4AAAAAdBnkJC/xXRAAAABwGeYUX/FdAAAAAHAZ5jRf8V0Q==";
const defaultVideoSrc = "";

function getQueryStringRegExp(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

function getQueryStringRegExp2(name, qs) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(qs)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }
    // Android detection
    if (/android/i.test(userAgent)) {
        return "android";
    }
    return "unknown";
}
// 模拟发送消息到应用
function mySendMessageToApp(message) {
    // 这是一个模拟的函数，你可以根据你的实际需求实现与应用程序的通信逻辑
    console.debug("Message sent to app:", message);
    message._uvideo = "1";
    if (getMobileOperatingSystem() == "android") alert(JSON.stringify(message));
    else {}
}


var player = new uPlayer("player", mySendMessageToApp);
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
    if (getMobileOperatingSystem() == "ios") {
        player.play().catch((error) => {
            console.error("Auto play failed:", error);
        });
    }
};