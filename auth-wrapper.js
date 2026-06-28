// auth-wrapper.js — Gère l'affichage de l'auth ou de l'app
(function() {
  var h = React.createElement;
  var C = { bg: "#FBF4EC", card: "#FFFFFF", line: "#EFE6DB", text: "#241712", mut: "#9A8C7E", teal: "#0E9C78", ember: "#F2543D" };

  // Composant racine : auth ou app
  function Root() {
    var _u = React.useState(null), user = _u[0], setUser = _u[1];
    var _l = React.useState(true), loading = _l[0], setLoading = _l[1];

    React.useEffect(function() {
      // Vérifier si déjà connecté (session persistée)
      window.ZTLAuth.getUser().then(function(u) {
        if (u) {
          window._ztlUser = u;
          setUser(u);
          // Sync cloud vers localStorage
          if (window.store && window.store.syncFromCloud) window.store.syncFromCloud();
        }
        setLoading(false);
      }).catch(function() {
        setLoading(false);
      });
    }, []);

    function onLogin(u) {
      window._ztlUser = u;
      setUser(u);
      // Sync cloud → localStorage
      if (window.store && window.store.syncFromCloud) {
        window.store.syncFromCloud().then(function() {
          // Une fois le cloud sync, on push le local
          if (window.store && window.store.pushToCloud) window.store.pushToCloud();
        });
      }
    }

    function onLogout() {
      window.ZTLAuth.signOut().catch(function(){});
      delete window._ztlUser;
      setUser(null);
    }

    if (loading) {
      return h("div", {
        style: {
          minHeight: "100vh", background: C.bg, color: C.mut,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "system-ui"
        }
      }, "Vérification de ta session...");
    }

    if (!user) {
      return h(window.AuthScreen, { onLogin: onLogin });
    }

    return h(window.ZTL.default, null);
  }

  // Montage
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
