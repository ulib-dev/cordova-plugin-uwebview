#import <Cordova/CDVPlugin.h>

@interface UWebView : CDVPlugin

- (void)initialize:(CDVInvokedUrlCommand *)command;
- (void)execute:(CDVInvokedUrlCommand *)command;
- (void)openGeckoViewActivity:(NSString *)url;
- (void)playRemoteVideo:(BOOL)isInit command:(CDVInvokedUrlCommand *)command;
- (void)closePlayer;
- (void)destroyVideoPlayer;

@end
