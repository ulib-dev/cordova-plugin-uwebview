export  interface PlayRemoteVideoOptions {
    url: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

interface UWebView {
    loadUrlWithGeckoView(url: string, success?: () => void, error?: (err: any) => void): void;
    playRemoteVideo(arg: PlayRemoteVideoOptions, success?: () => void, error?: (err: any) => void): void;
    destroyRemoteVideo(success?: () => void, error?: (err: any) => void): void;
}
  
declare var UWebView: UWebView;