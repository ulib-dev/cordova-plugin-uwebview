#import "UWebViewRemoteVideoPlayer.h"

@implementation UWebViewRemoteVideoPlayer

static NSString * const blankVideoFile = @""; // 空视频文件路径
static NSString *geckoViewRemoteVideoPlayerHtml = nil;

- (instancetype)initWithViewController:(UIViewController *)viewController 
                                 width:(CGFloat)width 
                                height:(CGFloat)height 
                                     x:(CGFloat)x 
                                     y:(CGFloat)y {
    self = [super initWithFrame:CGRectMake(x, y, width, height)];
    if (self) {
        geckoViewRemoteVideoPlayerHtml = [self getStringFromResRaw:@"u_video_player"];
        
        _originalWidth = width;
        _originalHeight = height;
        _originalX = x;
        _originalY = y;

        // 初始化 WKWebView
        WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
        configuration.allowsInlineMediaPlayback=YES;
        _webView = [[WKWebView alloc] initWithFrame:self.bounds configuration:configuration];
        _webView.backgroundColor = [UIColor blackColor];
        _webView.UIDelegate = self;
        _webView.hidden = NO;

        [self addSubview:_webView];
        [viewController.view addSubview:self];

        // 加载空视频文件
        [self loadBlankVideoFile];
    }
    return self;
}

- (void)updateLayoutWithWidth:(CGFloat)width 
                       height:(CGFloat)height 
                            x:(CGFloat)x 
                            y:(CGFloat)y {
    _webView.frame = CGRectMake(x, y, width, height);
    _originalWidth = width;
    _originalHeight = height;
    _originalX = x;
    _originalY = y;
}

- (void)play:(NSString *)url {
    _webView.hidden = NO;

    if (geckoViewRemoteVideoPlayerHtml) {
        NSString *updatedUrl = [url stringByAppendingFormat:@"?v=%f", [[NSDate date] timeIntervalSince1970]];
        NSString *finalHtml = [geckoViewRemoteVideoPlayerHtml stringByReplacingOccurrencesOfString:@"UVIEW{@##@}UVIEW" withString:updatedUrl];
        
        NSString *encodedHtml = [finalHtml stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
        NSString *dataUrl = [NSString stringWithFormat:@"data:text/html;charset=utf-8,%@", encodedHtml];
        NSURL *requestUrl = [NSURL URLWithString:dataUrl];
        [_webView loadRequest:[NSURLRequest requestWithURL:requestUrl]];
    } else {
        NSString *htmlContent = [NSString stringWithFormat:@"<html><body style='background-color: black; margin: 0;'>"
                                                          "<video id='myVideo' style='width: 100%%; height: 100vh; object-fit: cover;' autoplay muted>"
                                                          "<source src='%@' type='video/mp4'>"
                                                          "</video></body></html>", url];
        
        NSString *encodedHtml = [htmlContent stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
        NSString *dataUrl = [NSString stringWithFormat:@"data:text/html;charset=utf-8,%@", encodedHtml];
        NSURL *requestUrl = [NSURL URLWithString:dataUrl];
        [_webView loadRequest:[NSURLRequest requestWithURL:requestUrl]];
    }
}

- (void)setFullScreen:(BOOL)fullScreen {
    if (fullScreen && !_isFullScreen) {
        UIWindow *window = UIApplication.sharedApplication.keyWindow;
        self.frame = window.bounds;
        self.center = CGPointMake(CGRectGetMidX(window.bounds), CGRectGetMidY(window.bounds));
        _webView.frame = self.bounds;
        _isFullScreen = YES;
    } else if (!fullScreen && _isFullScreen) {
        self.frame = CGRectMake(_originalX, _originalY, _originalWidth, _originalHeight);
        _webView.frame = self.bounds;
        _isFullScreen = NO;
    }
}

- (void)resetPlayer {
    [self loadBlankVideoFile];
}

- (void)closePlayer {
    _webView.hidden = YES;
    [self loadBlankVideoFile];
}

- (void)destroy {
    [_webView stopLoading];
    [self removeFromSuperview];
    _webView = nil;
}

- (void)loadBlankVideoFile {
    NSString *blankUrl = [NSString stringWithFormat:@"data:text/html;charset=utf-8,%@", blankVideoFile];
    NSURL *url = [NSURL URLWithString:blankUrl];
    [_webView loadRequest:[NSURLRequest requestWithURL:url]];
}

// WKUIDelegate methods
- (void)webView:(WKWebView *)webView didEnterFullScreen:(BOOL)didEnterFullScreen {
    [self setFullScreen:YES];
}

- (void)webView:(WKWebView *)webView didExitFullScreen:(BOOL)didExitFullScreen {
    [self setFullScreen:NO];
}

// 加载 HTML 文件
- (NSString *)getStringFromResRaw:(NSString *)fileName {
    NSString *filePath = [[NSBundle mainBundle] pathForResource:fileName ofType:@"html"];
    if (filePath) {
        NSError *error = nil;
        NSString *content = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
        if (error) {
            NSLog(@"Error loading HTML from Bundle: %@", error.localizedDescription);
        }
        return content;
    } else {
        NSLog(@"File not found in Bundle: %@", fileName);
        return nil;
    }
}

@end
