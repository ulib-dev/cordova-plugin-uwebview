package cordova.plugins;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;

import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.fragment.app.FragmentActivity;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;

import org.mozilla.geckoview.GeckoRuntime;
import org.mozilla.geckoview.GeckoSession;
import org.mozilla.geckoview.GeckoView;

public class CordovaGeckoView extends CordovaPlugin {

  @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("loadUrl")) {
            callback = callbackContext;
            cordova.setActivityResultCallback(this);
            String url = args.getString(0);
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                  GeckoView view = findViewById(R.id.geckoview);
                  GeckoSession session = new GeckoSession();
                  GeckoRuntime runtime = GeckoRuntime.create(this);
                  
                  session.open(runtime);
                  view.setSession(session);
                  session.loadUri(url);
                }
            }
                                                     
            return true;
        }
        return false;
    }
  
}




