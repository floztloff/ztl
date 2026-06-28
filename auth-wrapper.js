// auth-wrapper.js — Auth obligatoire, rapide
(function() {
  var h = React.createElement;

  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];
    var _r = React.useState(true), ready = _r[0], setReady = _r[1];

    React.useEffect(function() {
      // Attendre que Supabase soit prêt, puis vérifier la session
      function check() {
        if (!window.ZTLAuth || typeof window.ZTLAuth.getUser !== 'function') {
          setTimeout(check, 100);
          return;
        }
        window.ZTLAuth.getUser().then(function(u) {
          if (u) {
            window._ztlUser = u;
            setUser(u);
            if (window.store && window.store.syncFromCloud) window.store.syncFromCloud();
          }
        }).catch(function(){}).finally(function() {
          setReady(false);
        });
      }
      check();
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

    if (user) return h(window.ZTL.default, null);

    if (ready) {
      return h("div", {
        style: {
          minHeight: "100vh", background: "#FBF4EC", color: "#9A8C7E",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "Onest, system-ui, sans-serif", gap: 14, fontSize: 14
        }
      },
        h("div", { style: { width: 28, height: 28, border: "3px solid #EFE6DB", borderTopColor: "#0E9C78", borderRadius: "50%", animation: "spin .8s linear infinite" } }),
        h("div", null, "Chargement...")
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
