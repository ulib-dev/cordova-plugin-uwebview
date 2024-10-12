import Foundation
import UIKit

@objc(UWebView)
public class UWebView: CDVPlugin {
    private static let TAG = "UWebView"
    public var callback: CDVInvokedUrlCommand?
    private var remoteVideoPlayer: GeckoViewRemoteVideoPlayer?

    @objc(initVideoPlayer:) 
    func initVideoPlayer(_ command: CDVInvokedUrlCommand) {
        playRemoteVideo2(isInit: true, command: command)  // 设置 `isInit: true`
    }

    @objc(playRemoteVideo:) 
    func playRemoteVideo(_ command: CDVInvokedUrlCommand) {
        playRemoteVideo2(isInit: false, command: command)
    }

    private func playRemoteVideo2(isInit: Bool, command: CDVInvokedUrlCommand) {
        do {
            let url = command.argument(at: 0) as! String
            let metrics = UIScreen.main.bounds.size
            let width = command.argument(at: 1) as! Int
            let height = command.argument(at: 2) as! Int
            let x = command.argument(at: 3) as! Int
            let y = command.argument(at: 4) as! Int
            
            let finalWidth = width == 0 ? Int(metrics.width) : width
            let finalHeight = height == 0 ? Int(Double(finalWidth) * (metrics.height / metrics.width)) : height

            DispatchQueue.main.async {
                if self.remoteVideoPlayer == nil {
                    self.remoteVideoPlayer = GeckoViewRemoteVideoPlayer(cordova: self.cordova, width: finalWidth, height: finalHeight, x: x, y: y)
                    if !isInit {
                        self.remoteVideoPlayer?.play(url: url)
                    }
                } else {
                    self.remoteVideoPlayer?.updateLayout(width: finalWidth, height: finalHeight, x: x, y: y)
                    if !isInit {
                        self.remoteVideoPlayer?.play(url: url)
                    }
                }
            }
        } catch {
            NSLog("Error in playRemoteVideo: \(error)")
        }
    }

    @objc(destroyVideoPlayer:)  
    func destroyVideoPlayer(_ command: CDVInvokedUrlCommand) -> Bool {
        if let player = remoteVideoPlayer {
            player.destroy()
            remoteVideoPlayer = nil
        }
        return true
    }

    @objc(destroyRemoteVideo:)  
    func destroyRemoteVideo(_ command: CDVInvokedUrlCommand) -> Bool {
        if let player = remoteVideoPlayer {
            player.destroy()
            remoteVideoPlayer = nil
        }
        return true
    }

    @objc(closePlayer:) 
    func closePlayer(_ command: CDVInvokedUrlCommand) -> Bool {
        remoteVideoPlayer?.closePlayer()
        return true
    }
}
