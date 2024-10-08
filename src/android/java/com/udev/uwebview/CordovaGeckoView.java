package com.udev.uwebview;

import android.content.Context;
import android.content.Intent;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.widget.FrameLayout;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.json.JSONException;

import java.io.IOException;

public class CordovaGeckoView extends CordovaPlugin {
  private static final String TAG = "CordovaGeckoView"; // 日志标签
  public CallbackContext callback = null;
  private GeckoViewRemoteVideoPlayer remoteVideoPlayer = null;

  @Override
  public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
    LOG.v(TAG, "CordovaGeckoView: initialization");
    super.initialize(cordova, webView);

    //this.cordova.getActivity().runOnUiThread(new Runnable() {
    //@Override
    //public void run() {
    // Clear flag FLAG_FORCE_NOT_FULLSCREEN which is set initially
    // by the Cordova.
    //Window window = cordova.getActivity().getWindow();
    //window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
    // Read 'StatusBarBackgroundColor' from config.xml, default is #000000.
    //setStatusBarBackgroundColor(preferences.getString("StatusBarBackgroundColor", "#000000"));
    // Read 'StatusBarStyle' from config.xml, default is 'lightcontent'.
    //setStatusBarStyle(preferences.getString("StatusBarStyle", "lightcontent"));
    //}
    //});
  }

  @Override
  public boolean execute(final String action, final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
    Log.d(TAG, "GeckoView execute");
    Context context = this.cordova.getActivity();
    if (action.equals("loadUrlWithGeckoView")) {
      callback = callbackContext;
      String url = args.getString(0);
      this.openGeckoViewActivity(context, url);
      return true;
    } else if (action.equals("initVideoPlayer")) {
      callback = callbackContext;
      this.playRemoteVideo(true, context, args);
      return true;
    } else if (action.equals("playRemoteVideo")) {
      callback = callbackContext;
      this.playRemoteVideo(false, context, args);
      return true;
    } else if (action.equals("closePlayer")) {
      callback = callbackContext;
      this.closePlayer();
      return true;
    } else if (action.equals("destroyRemoteVideo") || action.equals("destroyVideoPlayer")) {
      callback = callbackContext;
      this.destroyVideoPlayer();
      return true;
    }
    return false;
  }

  private void openGeckoViewActivity(Context context, String url) {
    Log.d(TAG, "GeckoView openGeckoViewActivity");
    Intent intent = new Intent(context, GeckoViewActivity.class);
    intent.putExtra("URL", url);
    this.cordova.getActivity().startActivity(intent);
  }

  private void playRemoteVideo(boolean isInit, Context context, final CordovaArgs args) {
    try {

      String url = args.getString(0);
      DisplayMetrics metrics = cordova.getActivity().getResources().getDisplayMetrics();
      int width = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, args.getInt(1), metrics);
      int height = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, args.getInt(2), metrics);
      final int x = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, args.getInt(3), metrics);
      final int y = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, args.getInt(4), metrics);
      DisplayMetrics displayMetrics = new DisplayMetrics();
      int deviceWidth = displayMetrics.widthPixels;
      int deviceHeight = displayMetrics.heightPixels;
      // 如果 width 为 0，设置为最大宽度
      if (width == 0) {
        width = FrameLayout.LayoutParams.MATCH_PARENT;
      }

      // 如果 height 为 0，根据分辨率调整高度
      if (height == 0) {
        height = (int) (width * ((float) deviceHeight / deviceWidth));
      }

      final int finalWidth = width;
      final int finalHeight = height;
      if (this.remoteVideoPlayer == null) {
        cordova.getActivity().runOnUiThread(() -> {
          try {
            this.remoteVideoPlayer = new GeckoViewRemoteVideoPlayer(this.cordova, finalWidth, finalHeight, x, y);
          } catch (IOException e) {
            throw new RuntimeException(e);
          }
          if (!isInit) this.remoteVideoPlayer.Play(url);
        });
      } else {
        cordova.getActivity().runOnUiThread(() -> {
          this.remoteVideoPlayer.updateLayout(finalWidth, finalHeight, x, y);
          if (!isInit) this.remoteVideoPlayer.Play(url);
        });
      }
      //webView.getView().setBackgroundColor(Color.TRANSPARENT);
      //webView.getView().bringToFront();
      //FragmentManager fragmentManager = cordova.getActivity().getFragmentManager();
      //FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
      //fragmentTransaction.add(containerView.getId(), dhActivity);
      //fragmentTransaction.commit();

    } catch (Exception e) {
      e.printStackTrace();
    }
  }


  private boolean destroyVideoPlayer() {
    if (this.remoteVideoPlayer != null) {
      this.remoteVideoPlayer.destroy();
      this.remoteVideoPlayer = null;
    }
    return true;
  }

  private boolean closePlayer() {
    if (this.remoteVideoPlayer != null) {
      this.remoteVideoPlayer.closePlayer();
    }
    return true;
  }


}
