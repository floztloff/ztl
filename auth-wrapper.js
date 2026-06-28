// auth-wrapper.js — Login instantané, auth obligatoire
(function() {
  var h = React.createElement;

  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];
    var _b = React.useState(false), busy = _b[0], setBusy = _b[1];

    // Auto-login silencieux si déjà connecté
    React.useEffect(function() {
      var attempts = 0;
      function tryAuto() {
        attempts++;
        if (!window.ZTLAuth || typeof window.ZTLAuth.getUser !== 'function') {
          if (attempts < 40) { setTimeout(tryAuto, 250); return; }
          return; // abandon après 10s
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
      setBusy(false);
      if (window.store && window.store.syncFromCloud) {
        window.store.syncFromCloud().then(function() {
          if (window.store && window.store.pushToCloud) window.store.pushToCloud();
        });
      }
    }

    // Déjà connecté → app
    if (user) return h(window.ZTL.default, null);

    // Spinner discret en overlay si un appel auth est en cours
    var spinner = busy ? h("div", {
      style: {
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(251,244,236,0.7)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
        fontFamily: "Onest, system-ui, sans-serif", fontSize: 14, color: "#0E9C78"
      }
    },
      h("div", { style: { width: 28, height: 28, border: "3px solid #EFE6DB", borderTopColor: "#0E9C78", borderRadius: "50%", animation: "spin .8s linear infinite" } }),
      h("div", null, "Connexion au serveur...")
    ) : null;

    return h("div", null,
      spinner,
      h(window.AuthScreen, { onLogin: onLogin })
    );
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
