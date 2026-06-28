// auth-wrapper.js — Login instantané, auth obligatoire
(function() {
  var h = React.createElement;

  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];

    React.useEffect(function() {
      var attempts = 0;
      function tryAuto() {
        attempts++;
        if (!window.ZTLAuth || typeof window.ZTLAuth.getUser !== 'function') {
          if (attempts < 40) { setTimeout(tryAuto, 250); return; }
          return;
        }
        window.ZTLAuth.getUser().then(function(u) {
          if (u) {
            window._ztlUser = u;
            setUser(u);
            if (window.store && window.store.syncFromCloud) {
              window.store.syncFromCloud().then(function() {
                // Charger la clé DeepSeek depuis le cloud
                if (window.store) {
                  window.store.get("_ztlDeepSeekKey").then(function(v) {
                    if (v) { window._ztlDeepSeekKey = v; try { localStorage.setItem("_ztlDeepSeekKey", v); } catch {} }
                  }).catch(function(){});
                }
              });
            }
          }
        }).catch(function(){});
      }
      tryAuto();
    }, []);

    function onLogin(u) {
      window._ztlUser = u;
      setUser(u);
      if (window.store && window.store.syncFromCloud) {
        window.store.syncFromCloud().then(function() {
          if (window.store && window.store.pushToCloud) window.store.pushToCloud();
        });
      }
    }

    function onLogout() {
      window.ZTLAuth.signOut().catch(function(){});
      delete window._ztlUser;
      setUser(null);
    }

    // Exposer la déconnexion pour l'app
    window._ztlLogout = onLogout;

    if (user) return h(window.ZTL.default, null);
    return h(window.AuthScreen, { onLogin: onLogin });
  }

  function mount() {
    var rootEl = document.getElementById('root');
    if (rootEl && window.ReactDOM && window.React) {
      window.ReactDOM.createRoot(rootEl).render(h(Root));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
