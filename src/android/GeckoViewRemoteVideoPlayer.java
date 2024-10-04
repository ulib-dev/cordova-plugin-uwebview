package com.udev.uwebview;

import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import org.apache.cordova.CordovaInterface;
import org.mozilla.geckoview.GeckoRuntime;
import org.mozilla.geckoview.GeckoSession;
import org.mozilla.geckoview.GeckoView;

public class GeckoViewRemoteVideoPlayer extends FrameLayout {
  private static final String TAG = "GeckoViewRemoteVideoPlayer"; // 日志标签

  GeckoSession session;
  AppCompatActivity appCompatActivity;

  private GeckoView geckoView;

  public GeckoViewRemoteVideoPlayer(@NonNull CordovaInterface cordova, int width, int height, int x, int y) {
    this(cordova.getActivity(), width, height, x, y);
  }

  public GeckoViewRemoteVideoPlayer(@NonNull AppCompatActivity appCompatActivity, int width, int height, int x, int y) {

    super(appCompatActivity);
    this.appCompatActivity = appCompatActivity;
    // 设置 GeckoView 容器的布局参数
    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(width, height);
    params.leftMargin = x;
    params.topMargin = y;
    // 初始化 GeckoView
    geckoView = new GeckoView(appCompatActivity);
    GeckoSession session = new GeckoSession();
    GeckoRuntime runtime = GeckoRuntime.create(appCompatActivity);
    session.open(runtime);
    geckoView.setSession(session);
    // 将 GeckoView 添加到容器中
    this.addView(geckoView, params);
    // 使用 addContentView 动态将容器添加到 Activity 中
    appCompatActivity.addContentView(this, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
  }

  public void updateLayout(int width, int height, int x, int y) {
    // 更新 GeckoView 的布局参数
    if (geckoView != null) {
      FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) geckoView.getLayoutParams();
      params.width = width;
      params.height = height;
      params.leftMargin = x;
      params.topMargin = y;
      // 应用新的布局参数
      geckoView.setLayoutParams(params);
    }
  }

  public void Play(String url) {
    // 加载 HTML 内容
    String htmlContent = "<html><body><video id=\"myVideo\" style=\"background-color: gray;\" width=\"auto\"><source src=\"" + url + "\" type=\"video/mp4\"></video></body></html>";
    session.loadUri("data:text/html;charset=utf-8," + htmlContent);
  }

  public void destroy() {
    try {
      if (session != null) session.close();
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


}
