#import "UWebView.h"
#import "UWebViewRemoteVideoPlayer.h"
#import <UIKit/UIKit.h>

@interface UWebView ()

@property (nonatomic, strong) UWebViewRemoteVideoPlayer *remoteVideoPlayer;
@property (nonatomic, strong) CDVInvokedUrlCommand *callbackCommand;

@end

@implementation UWebView

- (void)pluginInitialize {
    NSLog(@"UWebView: initialization");
    [super pluginInitialize];
}

// 加载GeckoView URL
- (void)loadUrlWithGeckoView:(CDVInvokedUrlCommand *)command {
    NSString *url = [command.arguments objectAtIndex:0];
    [self openGeckoViewActivity:url];
}

// 初始化视频播放器
- (void)initVideoPlayer:(CDVInvokedUrlCommand *)command {
    [self playRemoteVideo:YES command:command];
}

// 播放远程视频
- (void)playRemoteVideo:(CDVInvokedUrlCommand *)command {
    [self playRemoteVideo:NO command:command];
}

// 关闭播放器
- (void)closePlayer:(CDVInvokedUrlCommand *)command {
    if (self.remoteVideoPlayer) {
        [self.remoteVideoPlayer closePlayer];
    }
}

// 销毁远程视频播放器
- (void)destroyRemoteVideo:(CDVInvokedUrlCommand *)command {
    if (self.remoteVideoPlayer) {
        [self.remoteVideoPlayer destroy];
        self.remoteVideoPlayer = nil;
    }
}

// 私有方法：打开GeckoView
- (void)openGeckoViewActivity:(NSString *)url {
    NSLog(@"UWebView: openGeckoViewActivity");
    // 假设这是打开一个新的UIViewController
    UIViewController *geckoViewController = [[UIViewController alloc] init];
    [self.viewController presentViewController:geckoViewController animated:YES completion:nil];
}

// 私有方法：播放远程视频
- (void)playRemoteVideo:(BOOL)isInit command:(CDVInvokedUrlCommand *)command {
    @try {
        NSString *url = [command.arguments objectAtIndex:0];
        CGFloat width = [[command.arguments objectAtIndex:1] floatValue];
        CGFloat height = [[command.arguments objectAtIndex:2] floatValue];
        CGFloat x = [[command.arguments objectAtIndex:3] floatValue];
        CGFloat y = [[command.arguments objectAtIndex:4] floatValue];
        
        if (width == 0) {
            width = CGRectGetWidth(self.viewController.view.frame);
        }

        if (height == 0) {
            height = width * (CGRectGetHeight(self.viewController.view.frame) / CGRectGetWidth(self.viewController.view.frame));
        }

        if (self.remoteVideoPlayer == nil) {
            dispatch_async(dispatch_get_main_queue(), ^{
                self.remoteVideoPlayer = [[UWebViewRemoteVideoPlayer alloc] initWithViewController:self.viewController
                                                                                              width:width
                                                                                             height:height
                                                                                                  x:x
                                                                                                  y:y];
                if (!isInit) {
                    [self.remoteVideoPlayer play:url];
                }
            });
        } else {
            dispatch_async(dispatch_get_main_queue(), ^{
                [self.remoteVideoPlayer updateLayoutWithWidth:width height:height x:x y:y];
                if (!isInit) {
                    [self.remoteVideoPlayer play:url];
                }
            });
        }
    } @catch (NSException *exception) {
        NSLog(@"Error: %@", exception.reason);
    }
}

@end
