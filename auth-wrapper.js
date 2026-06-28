// auth-wrapper.js — Login instantané, auth obligatoire, bouton déconnexion
(function() {
  var h = React.createElement;

  var styleBtn = {
    position: "fixed", top: 12, right: 12, zIndex: 999,
    background: "#FFFFFF", border: "1px solid #EFE6DB", borderRadius: 10,
    padding: "8px 14px", fontSize: 12, fontWeight: 700,
    color: "#F2543D", cursor: "pointer",
    fontFamily: "Onest, system-ui, sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,.06)"
  };

  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];

    // Auto-login silencieux
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
            if (window.store && window.store.syncFromCloud) window.store.syncFromCloud();
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

    if (user) {
      return h("div", null,
        h("button", { onClick: onLogout, style: styleBtn, title: "Se déconnecter" },
          "Déconnexion"
        ),
        h(window.ZTL.default, null)
      );
    }

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
