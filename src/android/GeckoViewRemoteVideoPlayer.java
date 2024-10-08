package com.udev.uwebview;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.content.res.Resources;
import android.graphics.Color;
import android.util.Log;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.apache.cordova.CordovaInterface;
import org.json.JSONException;
import org.json.JSONObject;
import org.mozilla.geckoview.BuildConfig;
import org.mozilla.geckoview.GeckoResult;
import org.mozilla.geckoview.GeckoRuntime;
import org.mozilla.geckoview.GeckoRuntimeSettings;
import org.mozilla.geckoview.GeckoSession;
import org.mozilla.geckoview.GeckoView;
import org.mozilla.geckoview.WebExtension;

import java.io.IOException;
import java.io.InputStream;

public class GeckoViewRemoteVideoPlayer extends FrameLayout {
  private static final String TAG = "GeckoViewRemoteVideoPlayer"; // 日志标签
  private static final String EXTENSION_LOCATION = "resource://android/assets/messaging/";
  private static final String EXTENSION_ID = "messaging@example.com";
  private static WebExtension.Port mPort;
  private static String GeckoViewRemoteVideoPlayerHtml = "";
  private final WebExtension.PortDelegate mPortDelegate = new WebExtension.PortDelegate() {
    @Override
    public void onPortMessage(final @NonNull Object message,
        final @NonNull WebExtension.Port port) {
      Log.e("MessageDelegate", "from extension: " + message);
      try {

        JSONObject jsonObject = (JSONObject) message;
        String method = jsonObject.getString("event");
        if (method.contains("captureScreenshot")) {
          JSONObject request = new JSONObject();
          String dataURL = request.getString("dataURL");
          // request.put("method", "androidView('hasCamera','0')");
          // mPort.postMessage(request);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    @Override
    public void onDisconnect(final @NonNull WebExtension.Port port) {
      Log.e("MessageDelegate:", "onDisconnect");
      if (port == mPort) {
        mPort = null;
      }
    }
  };
  private final WebExtension.MessageDelegate mMessagingDelegate = new WebExtension.MessageDelegate() {
    @Nullable
    @Override
    public void onConnect(@NonNull WebExtension.Port port) {
      Log.e("MessageDelegate", "onConnect");
      mPort = port;
      mPort.setDelegate(mPortDelegate);
    }
  };
  GeckoSession session;
  AppCompatActivity appCompatActivity;
  int originalWidth = 0;
  int originalHeight = 0;
  int originalX = 0;
  int originalY = 0;
  GeckoRuntime runtime;
  private GeckoView geckoView;
  // 全屏状态标志
  private boolean isFullScreen = false;

  public GeckoViewRemoteVideoPlayer(@NonNull CordovaInterface cordova, int width, int height, int x, int y)
      throws IOException {
    this(cordova.getActivity(), width, height, x, y);
  }

  @SuppressLint("WrongThread")
  public GeckoViewRemoteVideoPlayer(@NonNull AppCompatActivity appCompatActivity, int width, int height, int x, int y)
      throws IOException {

    super(appCompatActivity);
    this.appCompatActivity = appCompatActivity;
    GeckoViewRemoteVideoPlayerHtml = loadHtmlFromRes("geckoview_remote_video_player");
    // 设置 GeckoView 容器的布局参数
    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(width, height);
    params.leftMargin = x;
    params.topMargin = y;

    originalWidth = params.width;
    originalHeight = params.height;
    originalX = params.leftMargin;
    originalY = params.topMargin;

    // 初始化 GeckoView
    geckoView = new GeckoView(appCompatActivity);
    geckoView.setBackgroundColor(Color.TRANSPARENT);
    session = new GeckoSession();

    GeckoRuntimeSettings.Builder builder = new GeckoRuntimeSettings.Builder()
        .allowInsecureConnections(GeckoRuntimeSettings.ALLOW_ALL)
        .javaScriptEnabled(true)
        .doubleTapZoomingEnabled(false)
        .inputAutoZoomEnabled(true)
        .forceUserScalableEnabled(true)
        .aboutConfigEnabled(true)
        .loginAutofillEnabled(true)
        .webManifest(true)
        .consoleOutput(true)
        .remoteDebuggingEnabled(BuildConfig.DEBUG)
        .debugLogging(BuildConfig.DEBUG);
    runtime = GeckoRuntime.create(appCompatActivity, builder.build());

    session.open(runtime);
    geckoView.setSession(session);
    session.getSettings().setAllowJavascript(true);
    // 建立交互
    installExtension();

    session.setContentDelegate(new GeckoSession.ContentDelegate() {
      @Override
      public void onFullScreen(@NonNull final GeckoSession session, final boolean fullScreen) {
        setFullScreen(fullScreen);
      }

    });

    session.setPermissionDelegate(new GeckoSession.PermissionDelegate() {
      @Nullable
      @Override
      public GeckoResult<Integer> onContentPermissionRequest(@NonNull GeckoSession session, @NonNull ContentPermission perm) {
        return GeckoResult.fromValue(ContentPermission.VALUE_ALLOW);
      }
    });

    // 将 GeckoView 添加到容器中
    this.addView(geckoView, params);
    // 使用 addContentView 动态将容器添加到 Activity 中
    appCompatActivity.addContentView(this,
        new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
  }

  /**
   * 建立交互
   */
  @SuppressLint("LongLogTag")
  private void installExtension() {

    runtime.getWebExtensionController()
        .ensureBuiltIn(EXTENSION_LOCATION, EXTENSION_ID)
        .accept(
            extension -> {
              Log.i(TAG, "Extension installed: " + extension);
              appCompatActivity.runOnUiThread(() -> {
                assert extension != null;
                extension.setMessageDelegate(mMessagingDelegate, "browser");
              });
            },
            e -> Log.e(TAG, "Error registering WebExtension", e));
  }

  /**
   * 向 js 发送数据 示例：evaluateJavascript("callStartUpload", "startUpload");
   *
   * @param methodName 定义的方法名
   * @param data       发送的数据
   */
  @SuppressLint("LongLogTag")
  private void evaluateJavascript(String methodName, String data) {
    try {
      long id = System.currentTimeMillis();
      JSONObject message = new JSONObject();
      message.put("action", "evalJavascript");
      message.put("data", "window." + methodName + "('" + data + "')");
      message.put("id", id);
      mPort.postMessage(message);
      Log.e(TAG, "mPort.postMessage：" + message);
    } catch (JSONException ex) {
      throw new RuntimeException(ex);
    }
  }

  public void updateLayout(int width, int height, int x, int y) {
    // 更新 GeckoView 的布局参数
    if (geckoView != null) {
      FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) geckoView.getLayoutParams();
      params.width = width;
      params.height = height;
      params.leftMargin = x;
      params.topMargin = y;

      originalWidth = params.width;
      originalHeight = params.height;
      originalX = params.leftMargin;
      originalY = params.topMargin;

      // 应用新的布局参数
      geckoView.setLayoutParams(params);
    }
  }

  public void Play(String url) {
    // 加载 HTML 视频内容，不需要监听全屏事件

    if (GeckoViewRemoteVideoPlayerHtml != null) {
      session
          .loadUri("data:text/html;charset=utf-8," + GeckoViewRemoteVideoPlayerHtml.replace("UVIEW{@##@}UVIEW", url));
    } else {
      String htmlContent = "<html><body style=\"background-color: black; margin: 0;\">" +
          "<video id=\"myVideo\" style=\"width: 100%; height: 100vh; object-fit: cover;\"  autoplay muted>" +
          "<source src=\"" + url + "\" type=\"video/mp4\">" +
          " " +
          "</video></body></html>";
      session.loadUri("data:text/html;charset=utf-8," + htmlContent);
    }

    // session.loadUri("javascript:pay();");
  }

  private String loadHtmlFromRes(String fileName) {
    try {
      // 动态获取资源 ID
      Resources res = getResources();
      int resId = res.getIdentifier(fileName, "raw", this.appCompatActivity.getPackageName());

      if (resId != 0) { // 检查资源是否存在
        InputStream inputStream = res.openRawResource(resId);
        byte[] buffer = new byte[inputStream.available()];
        inputStream.read(buffer);
        inputStream.close();
        return new String(buffer, "UTF-8");
      } else {
        Log.e("loadHtmlFromRes", "File not found: " + fileName);
        return null;
      }
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  public void destroy() {
    try {
      if (session != null)
        session.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
    try {
      ((ViewGroup) this.getParent()).removeView(this);
    } catch (Exception e) {
      e.printStackTrace();
    }
    geckoView = null;
  }

  public void setFullScreen(boolean fullScreen) {
    // 保存原始的宽、高、X、Y位置

    if (fullScreen && !isFullScreen) {
      // 进入全屏并切换为横屏
      appCompatActivity.getWindow().setFlags(
          WindowManager.LayoutParams.FLAG_FULLSCREEN,
          WindowManager.LayoutParams.FLAG_FULLSCREEN);
      appCompatActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); // 切换到横屏
      geckoView.setLayoutParams(new FrameLayout.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT));
      isFullScreen = true;
    } else if (!fullScreen && isFullScreen) {
      // 退出全屏并恢复为竖屏
      appCompatActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
      appCompatActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // 切换回竖屏

      // 恢复到原始布局尺寸
      FrameLayout.LayoutParams restoredParams = new FrameLayout.LayoutParams(originalWidth, originalHeight);
      restoredParams.leftMargin = originalX;
      restoredParams.topMargin = originalY;
      geckoView.setLayoutParams(restoredParams);

      isFullScreen = false;
    }
  }

  public void takeScreenshot() {
    // 检查 session 是否可用
    if (geckoView != null) {
      geckoView.capturePixels();
    }
  }

  public void evaluateJavascript(String javascriptString) {
    try {
      long id = System.currentTimeMillis();
      Log.e("evalJavascript:id:", id + "");
      JSONObject jsonObject = new JSONObject();
      jsonObject.put("action", "evalJavascript");
      jsonObject.put("data", javascriptString);
      jsonObject.put("id", id);
      Log.e("evalJavascript:", jsonObject.toString());
      mPort.postMessage(jsonObject);
    } catch (Exception e) {
      e.printStackTrace();
    }

  }
}
