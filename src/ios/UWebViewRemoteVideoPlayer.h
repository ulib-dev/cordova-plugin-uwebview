#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface UWebViewRemoteVideoPlayer : UIView <WKUIDelegate>

@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, assign) CGFloat originalWidth;
@property (nonatomic, assign) CGFloat originalHeight;
@property (nonatomic, assign) CGFloat originalX;
@property (nonatomic, assign) CGFloat originalY;
@property (nonatomic, assign) BOOL isFullScreen;

- (instancetype)initWithViewController:(UIViewController *)viewController 
                                width:(CGFloat)width 
                               height:(CGFloat)height 
                                    x:(CGFloat)x 
                                    y:(CGFloat)y;

- (void)updateLayoutWithWidth:(CGFloat)width 
                       height:(CGFloat)height 
                            x:(CGFloat)x 
                            y:(CGFloat)y;

- (void)play:(NSString *)url;

- (void)setFullScreen:(BOOL)fullScreen;

- (void)resetPlayer;

- (void)closePlayer;

- (void)destroy;

@end
