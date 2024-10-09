export declare interface PlayRemoteVideoOptions {
  url: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export declare class UWebView {
  loadUrlWithGeckoView(
    url: string,
    success?: () => void,
    error?: (err: any) => void
  ): void;
  playRemoteVideo(
    arg: PlayRemoteVideoOptions,
    success?: () => void,
    error?: (err: any) => void
  ): void;
  initVideoPlayer(
    arg: PlayRemoteVideoOptions,
    success?: () => void,
    error?: (err: any) => void
  ): void;
  destroyRemoteVideo(success?: () => void, error?: (err: any) => void): void;
  setRemoteVideoFullScreen(
    full: boolean,
    success?: () => void,
    error?: (err: any) => void
  ): void;
}
