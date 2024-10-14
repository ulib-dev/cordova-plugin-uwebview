import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import md5 from 'blueimp-md5';
declare let UWebView: any, window: any, cordova: any, FileTransfer: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit {
  public showVideoDisabled = true;
  constructor(public platform: Platform) {}
  ngOnInit() {}
  ngAfterContentInit() {
    let self = this;
    window.setTimeout(() => {
      let _player_with = Number(this.platform.width());
      let _player_height = parseInt(((_player_with * 3) / 4).toFixed(0));
      UWebView.initVideoPlayer({
        url: '',
        width: _player_with,
        height: _player_height,
        x: 0,
        y: 0,
      });
      self.showVideoDisabled = false;
    }, 1000);
  }

  downloadVideo(remoteURL: string, callback: any) {
    const download = (remoteURL: string, callback: any) => {
      var fileName = md5(remoteURL); // 以 MD5 作为文件名，保持扩展名
      //var fileURL = cordova.file.dataDirectory + fileName; // 存储在应用的内部存储目录中
      // var fileURL = cordova.file.externalRootDirectory + 'Download/' + fileName; // 下载到公共Download目录
      var fileURL = cordova.file.externalCacheDirectory + fileName; // 存储在外部缓存目录

      // 检查文件是否已经存在
      window.resolveLocalFileSystemURL(
        fileURL,
        function (entry: any) {
          // 如果文件存在，直接返回成功
          console.log('File already exists: ' + entry.toURL());
          callback({
            success: true,
            fileURL: fileURL,
            toURL: entry.toURL(),
          });
        },
        function () {
          // 文件不存在，开始下载
          var fileTransfer = new FileTransfer();

          fileTransfer.onprogress = function (progressEvent: any) {
            if (progressEvent.lengthComputable) {
              var percent = (progressEvent.loaded / progressEvent.total) * 100;
              console.log('Downloaded ' + percent + '%');
              // 这里可以更新进度条或其他 UI 元素
            } else {
              console.log('Downloading...');
            }
          };

          fileTransfer.download(
            remoteURL,
            fileURL,
            function (entry: any) {
              console.log('Download complete: ' + entry.toURL());
              callback({
                success: true,
                fileURL: fileURL,
                toURL: entry.toURL(),
              });
            },
            function (error: any) {
              console.log('Download error: ' + error.source);
              console.log('HTTP status: ' + error.http_status);
              callback({
                fileURL: fileURL,
                errorCode: error.http_status,
              });
            },
            false, // 如果需要使用凭证，可以将此项设置为 true
            {
              headers: {
                // 如果需要，可以在此添加请求头，例如身份验证
              },
            }
          );
        }
      );
    };
    cordova.plugins.manageStorage.checkPermission((result: any) => {
      if (result.response_code === 1) {
        //we have the permission
        download(remoteURL, callback);
     
      } else if (result.response_code === 2) {
        cordova.plugins.manageStorage.requestPermission(function (status: any) {
          if (status.hasPermission) {
            // Permissions granted, proceed with download
            download(remoteURL, callback);
          } else {
            console.error('Permission denied2');
            alert('Permission denied2');
          }
        });
 
      } else {
        //API of device is below 30. Here, you can request WRITE_EXTERNAL_STORAGE permission here using cordova-plugin-android-permissions
      }
    });
     
  }

  showVideo() {
    let _player_with = Number(this.platform.width());
    let _player_height = parseInt(((_player_with * 3) / 4).toFixed(0));
    let url =
      'http://api.ecjob.la/uipr/StorageServer/Storage/7090B2493B30EFE06C1C51611383908CQ15098608_CH01_20240929161805.mp4';

    this.downloadVideo(url, (data: any) => {
      console.log('downloadVideo', data);
      if (data.success) {
        UWebView.playRemoteVideo({
          url: data.fileURL,
          width: _player_with,
          height: _player_height,
          x: 0,
          y: 0,
        });
      } else {
      }
    });
  }
  closePlayer() {
    let _player_with = Number(this.platform.width());
    let _player_height = parseInt(((_player_with * 3) / 4).toFixed(0));
    UWebView.closePlayer();
  }
}
