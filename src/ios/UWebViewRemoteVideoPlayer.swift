import UIKit
import WebKit
import Foundation
class UWebViewRemoteVideoPlayer: UIView, WKUIDelegate {
    static let blankVideoFile = "" // "resource://android/assets/uvideo/u_video_blank.mp4"
    private static let tag = "UWebViewRemoteVideoPlayer"
    private var webView: WKWebView!
    private var originalWidth: CGFloat = 0
    private var originalHeight: CGFloat = 0
    private var originalX: CGFloat = 0
    private var originalY: CGFloat = 0
    private var isFullScreen = false
    private static var geckoViewRemoteVideoPlayerHtml: String?

    init(appCompatActivity: UIViewController, width: CGFloat, height: CGFloat, x: CGFloat, y: CGFloat) {
        super.init(frame: CGRect(x: x, y: y, width: width, height: height))
        Self.geckoViewRemoteVideoPlayerHtml = getStringFromResRaw(fileName: "u_video_player")   
        self.originalWidth = width
        self.originalHeight = height
        self.originalX = x
        self.originalY = y
 

        // Initialize WKWebView
        let configuration = WKWebViewConfiguration()
        webView = WKWebView(frame: self.bounds, configuration: configuration)
        webView.backgroundColor = .black
        webView.uiDelegate = self
        webView.isHidden = false
        self.addSubview(webView)
        appCompatActivity.view.addSubview(self)

        // Load blank video file
        loadBlankVideoFile()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func updateLayout(width: CGFloat, height: CGFloat, x: CGFloat, y: CGFloat) {
        webView.frame = CGRect(x: x, y: y, width: width, height: height)
        originalWidth = width
        originalHeight = height
        originalX = x
        originalY = y
    }

func play(url: String) {
    webView.isHidden = false
    
    // 加载 HTML 视频内容，不需要监听全屏事件
    if let htmlContent = Self.geckoViewRemoteVideoPlayerHtml {
        var updatedUrl = url
        if url.contains("?") {
            updatedUrl += "&v=\(Date().timeIntervalSince1970)"
        } else {
            updatedUrl += "?v=\(Date().timeIntervalSince1970)"
        }

        let finalHtml = htmlContent.replacingOccurrences(of: "UVIEW{@##@}UVIEW", with: updatedUrl)
        if let encodedHtml = finalHtml.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
            let dataUrl = "data:text/html;charset=utf-8,\(encodedHtml)"
            if let requestUrl = URL(string: dataUrl) {
                webView.load(URLRequest(url: requestUrl))
            }
        }
    } else {
        let htmlContent = """
        <html><body style="background-color: black; margin: 0;">
        <video id="myVideo" style="width: 100%; height: 100vh; object-fit: cover;" autoplay muted>
        <source src="\(url)" type="video/mp4">
        </video></body></html>
        """
        
        if let encodedHtml = htmlContent.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
            let dataUrl = "data:text/html;charset=utf-8,\(encodedHtml)"
            if let requestUrl = URL(string: dataUrl) {
                webView.load(URLRequest(url: requestUrl))
            }
        }
    }
}


    func setFullScreen(_ fullScreen: Bool) {
        if fullScreen && !isFullScreen {
            if let window = UIApplication.shared.keyWindow {
                self.frame = window.bounds
                self.center = CGPoint(x: window.bounds.midX, y: window.bounds.midY)
                webView.frame = self.bounds
            }
            isFullScreen = true
        } else if !fullScreen && isFullScreen {
            self.frame = CGRect(x: originalX, y: originalY, width: originalWidth, height: originalHeight)
            webView.frame = self.bounds
            isFullScreen = false
        }
    }

    func resetPlayer() {
        loadBlankVideoFile()
    }

    func closePlayer() {
        webView.isHidden = true
        loadBlankVideoFile()
    }

    func destroy() {
        webView.stopLoading()
        self.removeFromSuperview()
        webView = nil
    }

    private func loadBlankVideoFile() {
        let blankUrl = "data:text/html;charset=utf-8," + UWebViewRemoteVideoPlayer.blankVideoFile
        if let url = URL(string: blankUrl) {
            webView.load(URLRequest(url: url))
        }
    }

    // MARK: - WKUIDelegate methods
    func webView(_ webView: WKWebView, didEnterFullScreen: Bool) {
        setFullScreen(true)
    }

    func webView(_ webView: WKWebView, didExitFullScreen: Bool) {
        setFullScreen(false)
    }
  

private func getStringFromResRaw(fileName: String) -> String? {
    // 尝试从 Bundle 中加载文件
    if let url = Bundle.main.url(forResource: fileName, withExtension: "html") {
        do {
            let content = try String(contentsOf: url, encoding: .utf8)
            return content
        } catch {
            print("Error loading HTML from Bundle: \(error)")
            return nil
        }
    } else {
        print("File not found in Bundle: \(fileName)")
        return nil
    }
}

}
