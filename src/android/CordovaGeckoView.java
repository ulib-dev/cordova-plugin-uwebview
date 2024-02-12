package cordova.plugins;

import android.app.Activity;
import android.app.Application;
import android.app.PendingIntent;
import android.content.Context;

import android.content.Intent;
import android.content.IntentSender;
import android.content.res.Resources;
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
    public CallbackContext callback = null;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("loadUrlWithGeckoView")) {
            callback = callbackContext;
            cordova.setActivityResultCallback(this);
            String url = args.getString(0);
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Application app = cordova.getActivity().getApplication();
                    String package_name = app.getPackageName();
                    Resources resources = app.getResources();

                    int layout = resources.getIdentifier("geckoview_layout", "layout", package_name);
                    cordova.getActivity().setContentView(layout);
                    
                    int gecko_view = resources.getIdentifier("geckoview", "id", package_name);
                    GeckoView view = cordova.getActivity().findViewById(gecko_view);
                    GeckoSession session = new GeckoSession();
                    GeckoRuntime runtime = GeckoRuntime.create(cordova.getActivity());

                    session.open(runtime);
                    view.setSession(session);
                    session.loadUri(url);
                }
            });

            return true;
        }
        return false;
    }
  
}
