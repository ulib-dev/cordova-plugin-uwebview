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
    Context context = cordova.getActivity().getApplicationContext();
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("loadUrlWithGeckoView")) {
            callback = callbackContext;
            this.openGeckoViewActivity(context);
            return true;
        }
        return false;
    }

    private void openGeckoViewActivity(Context context) {
        Intent intent = new Intent(context, GeckoViewActivity.class);
        this.cordova.getActivity().startActivity(intent);
    }
  
}
