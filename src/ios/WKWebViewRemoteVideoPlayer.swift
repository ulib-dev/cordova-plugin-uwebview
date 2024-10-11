import UIKit
import WebKit

class WKWebViewRemoteVideoPlayer: UIView {

    private var webView: WKWebView!
    private var originalFrame: CGRect = .zero
    private var isFullScreen: Bool = false
    private var blankVideoFile: String = ""
    private var videoPlayerHtml: String = ""

    init(frame: CGRect) {
        super.init(frame: frame)
        setupWebView()
        originalFrame = frame
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupWebView()
    }

    private func setupWebView() {
        webView = WKWebView(frame: self.bounds)
        webView.backgroundColor = .black
        webView.isOpaque = false
        self.addSubview(webView)
    }

    func loadVideo(url: String) {
        let videoHtml = """
        <html>
        <body style="background-color: black; margin: 0;">
        <video id="player" style="width: 100%; height: 100vh; object-fit: cover;" autoplay muted playsinline controls>
        <source src="\(url)" type="video/mp4">
        </video>
        </body>
        </html>
        """
        webView.loadHTMLString(videoHtml, baseURL: nil)
    }

    func updateLayout(width: CGFloat, height: CGFloat, x: CGFloat, y: CGFloat) {
        let newFrame = CGRect(x: x, y: y, width: width, height: height)
        self.frame = newFrame
        webView.frame = self.bounds
        originalFrame = newFrame
    }

    func setFullScreen(_ fullScreen: Bool) {
        if fullScreen && !isFullScreen {
            // 进入全屏并切换为横屏
            if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
                appDelegate.window?.rootViewController?.presentFullScreenMode()
            }
            isFullScreen = true
        } else if !fullScreen && isFullScreen {
            // 退出全屏并恢复为竖屏
            if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
                appDelegate.window?.rootViewController?.dismissFullScreenMode()
            }
            // 恢复到原始布局
            self.frame = originalFrame
            isFullScreen = false
        }
    }

    func closePlayer() {
        webView.loadHTMLString("", baseURL: nil)
        webView.isHidden = true
    }

    func destroyPlayer() {
        webView.removeFromSuperview()
        webView = nil
    }
}

extension UIViewController {
    func presentFullScreenMode() {
        self.view.window?.windowLevel = UIWindow.Level.statusBar + 1
        UIDevice.current.setValue(UIInterfaceOrientation.landscapeRight.rawValue, forKey: "orientation")
        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }

    func dismissFullScreenMode() {
        self.view.window?.windowLevel = UIWindow.Level.normal
        UIDevice.current.setValue(UIInterfaceOrientation.portrait.rawValue, forKey: "orientation")
        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }
}