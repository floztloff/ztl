// auth-wrapper.js — Login immédiat, auto-login si session trouvée
(function() {
  var h = React.createElement;
  var C = { bg: "#FBF4EC", card: "#FFFFFF", line: "#EFE6DB", text: "#241712", mut: "#9A8C7E", teal: "#0E9C78", ember: "#F2543D" };

  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];
    var _a = React.useState(false), autoDone = _a[0], setAutoDone = _a[1];

    // Auto-login silencieux si une session existe déjà
    React.useEffect(function() {
      window.ZTLAuth.getUser().then(function(u) {
        if (u) {
          window._ztlUser = u;
          setUser(u);
          if (window.store && window.store.syncFromCloud) window.store.syncFromCloud();
        }
      }).catch(function(){}).finally(function() {
        setAutoDone(true);
      });
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

    // Déjà connecté → app direct
    if (user) return h(window.ZTL.default, null);

    // Affiche l'auth tout de suite, sans attendre la vérif
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
