package cordova.plugins;

import android.app.Activity;
import android.app.Application;
import android.content.res.Resources;
import android.os.Bundle;

import android.util.Log;

import org.mozilla.geckoview.GeckoRuntime;
import org.mozilla.geckoview.GeckoSession;
import org.mozilla.geckoview.GeckoView;

public class GeckoViewActivity extends Activity {
  private static final String TAG = "GeckoViewActivity"; // 日志标签

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    Log.d(TAG, "GeckoView onCreate");
        super.onCreate(savedInstanceState);
        Application app = getApplication();
        String package_name = app.getPackageName();
        Resources resources = app.getResources();
        int layout = resources.getIdentifier("geckoview_layout", "layout", package_name);
        setContentView(layout);

        
        int gecko_view = resources.getIdentifier("geckoview", "id", package_name);
        GeckoView view = findViewById(gecko_view);
        GeckoSession session = new GeckoSession();
        GeckoRuntime runtime = GeckoRuntime.create(this);

        session.open(runtime);
        view.setSession(session);

        String url = getIntent().getStringExtra("URL");
        session.loadUri(url);
    }
}
