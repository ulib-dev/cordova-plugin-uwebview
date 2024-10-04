package cordova.plugins;

import android.content.Context;
import android.content.Intent;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.widget.FrameLayout;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class CordovaGeckoView extends CordovaPlugin {
  private static final String TAG = "CordovaGeckoView"; // 日志标签
  public CallbackContext callback = null;
  private Context context = cordova.getActivity().getApplicationContext();

  private GeckoViewRemoteVideoPlayer remoteVideoPlayer = null;
  private FrameLayout geckoViewContainer;

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    Log.d(TAG, "GeckoView execute");
    if (action.equals("loadUrlWithGeckoView")) {
      callback = callbackContext;
      String url = args.getString(0);
      this.openGeckoViewActivity(context, url);
      return true;
    } else if (action.equals("playRemoteVideo")) {
      callback = callbackContext;
      this.playRemoteVideo(context, args);
      return true;
    } else if (action.equals("destroyRemoteVideo")) {
      callback = callbackContext;
      this.destroyRemoteVideo();
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

  private void playRemoteVideo(Context context, final JSONArray args) {

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
      } else if (width > deviceWidth) {
        width = deviceWidth;
      }

      // 如果 height 为 0，根据分辨率调整高度
      if (height == 0) {
        height = (int) (width * ((float) deviceHeight / deviceWidth));
      } else if (width > deviceHeight) {
        height = deviceHeight;
      }

      final int finalWidth = width;
      final int finalHeight = height;
      if (this.remoteVideoPlayer == null) {
        cordova.getActivity().runOnUiThread(() -> {
          this.remoteVideoPlayer = new GeckoViewRemoteVideoPlayer(this.cordova, finalWidth, finalHeight, x, y);
          this.remoteVideoPlayer.Play(url);
        });
      } else {
        cordova.getActivity().runOnUiThread(() -> {
          this.remoteVideoPlayer.updateLayout(finalWidth, finalHeight, x, y);
          this.remoteVideoPlayer.Play(url);
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


  private boolean destroyRemoteVideo() {
    if (this.remoteVideoPlayer != null) {
      this.remoteVideoPlayer.destroy();
      this.remoteVideoPlayer = null;
    }
    return true;
  }
}
