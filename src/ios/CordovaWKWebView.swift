import WebKit
import Cordova

class CordovaWKWebView: CDVPlugin {

    private var webView: WKWebView!
    private var callback: CDVInvokedUrlCommand?
    private var remoteVideoPlayer: WKWebViewRemoteVideoPlayer?

    override func pluginInitialize() {
        super.pluginInitialize()
        print("CordovaWKWebView: Initialization")
    }

    @objc(execute:)
    func execute(command: CDVInvokedUrlCommand) {
        let action = command.argument(at: 0) as? String ?? ""
        let context = self.viewController
        
        switch action {
        case "loadUrlWithWKWebView":
            let url = command.argument(at: 1) as? String ?? ""
            openWKWebViewActivity(context: context, url: url)
        case "initVideoPlayer":
            playRemoteVideo(isInit: true, command: command)
        case "playRemoteVideo":
            playRemoteVideo(isInit: false, command: command)
        case "closePlayer":
            closePlayer()
        case "destroyVideoPlayer":
            destroyVideoPlayer()
        default:
            print("Unknown action: \(action)")
        }
    }

    private func openWKWebViewActivity(context: UIViewController, url: String) {
        print("WKWebView: Opening WebView Activity")
        let webViewController = WebViewController()
        webViewController.urlString = url
        context.present(webViewController, animated: true, completion: nil)
    }

    private func playRemoteVideo(isInit: Bool, command: CDVInvokedUrlCommand) {
        guard let url = command.argument(at: 0) as? String else { return }
        let width = command.argument(at: 1) as? CGFloat ?? UIScreen.main.bounds.width
        let height = command.argument(at: 2) as? CGFloat ?? UIScreen.main.bounds.height
        let x = command.argument(at: 3) as? CGFloat ?? 0
        let y = command.argument(at: 4) as? CGFloat ?? 0

        DispatchQueue.main.async {
            if self.remoteVideoPlayer == nil {
                self.remoteVideoPlayer = WKWebViewRemoteVideoPlayer(frame: CGRect(x: x, y: y, width: width, height: height))
                self.viewController.view.addSubview(self.remoteVideoPlayer!)
                if !isInit {
                    self.remoteVideoPlayer?.loadVideo(url: url)
                }
            } else {
                self.remoteVideoPlayer?.updateLayout(width: width, height: height, x: x, y: y)
                if !isInit {
                    self.remoteVideoPlayer?.loadVideo(url: url)
                }
            }
        }
    }

    private func closePlayer() {
        DispatchQueue.main.async {
            self.remoteVideoPlayer?.closePlayer()
        }
    }

    private func destroyVideoPlayer() {
        DispatchQueue.main.async {
            self.remoteVideoPlayer?.removeFromSuperview()
            self.remoteVideoPlayer = nil
        }
    }
}