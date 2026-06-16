// auth-ui.js — Login/Signup screen for ZTL (React component)
(function(){
var h = React.createElement;

function AuthScreen({ onLogin }) {
  var _s = React.useState("login"), mode = _s[0], setMode = _s[1];
  var _e = React.useState(""), email = _e[0], setEmail = _e[1];
  var _p = React.useState(""), pass = _p[0], setPass = _p[1];
  var _er = React.useState(null), err = _er[0], setErr = _er[1];
  var _lo = React.useState(false), loading = _lo[0], setLoading = _lo[1];
  var _ok = React.useState(null), success = _ok[0], setSuccess = _ok[1];

  var C = { bg: "#13151A", card: "#1E222B", line: "#2C323D", text: "#ECEEF2", mut: "#8B94A4", teal: "#56C7BE", ember: "#FF7A3D" };

  var submit = async function(e) {
    e.preventDefault();
    setErr(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await window.ZTLAuth.signUp(email, pass);
        setSuccess("Compte créé ! Vérifie tes emails pour confirmer ton compte, puis connecte-toi.");
        setMode("login");
      } else {
        var data = await window.ZTLAuth.signIn(email, pass);
        if (data.user) onLogin(data.user);
      }
    } catch (ex) {
      var msg = ex.message || "Erreur inconnue";
      if (msg.includes("Invalid login")) msg = "Email ou mot de passe incorrect";
      if (msg.includes("Email not confirmed")) msg = "Vérifie tes emails pour confirmer ton compte";
      if (msg.includes("already registered")) msg = "Un compte existe déjà avec cet email";
      if (msg.includes("least 6")) msg = "Le mot de passe doit faire au moins 6 caractères";
      setErr(msg);
    }
    setLoading(false);
  };

  var inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 15,
    background: C.bg, border: "1px solid " + C.line, borderRadius: 12, color: C.text,
    outline: "none"
  };
  var btnStyle = {
    width: "100%", padding: "15px", fontSize: 15, fontWeight: 800, border: "none",
    borderRadius: 12, cursor: loading ? "default" : "pointer",
    background: loading ? C.line : C.teal, color: C.bg
  };

  return h("div", { style: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
    h("div", { style: { width: "100%", maxWidth: 380 } },
      // Logo
      h("div", { style: { textAlign: "center", marginBottom: 32 } },
        h("h1", { style: { fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: -2, margin: 0 } }, "ZTL"),
        h("p", { style: { color: C.mut, fontSize: 14, margin: "8px 0 0" } }, "Ta routine quotidienne")
      ),
      // Card
      h("div", { style: { background: C.card, borderRadius: 20, padding: "28px 24px", border: "1px solid " + C.line } },
        // Tabs
        h("div", { style: { display: "flex", gap: 6, background: C.bg, borderRadius: 12, padding: 4, marginBottom: 20 } },
          ["login", "signup"].map(function(m) {
            return h("button", {
              key: m, onClick: function() { setMode(m); setErr(null); setSuccess(null); },
              style: { flex: 1, padding: "10px 0", borderRadius: 9, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 700, background: mode === m ? C.teal : "transparent",
                color: mode === m ? C.bg : C.mut }
            }, m === "login" ? "Connexion" : "Créer un compte");
          })
        ),
        // Form
        h("form", { onSubmit: submit },
          h("input", {
            type: "email", placeholder: "Email", value: email,
            onChange: function(e) { setEmail(e.target.value); },
            style: Object.assign({}, inputStyle, { marginBottom: 12 }),
            required: true, autoComplete: "email"
          }),
          h("input", {
            type: "password", placeholder: "Mot de passe", value: pass,
            onChange: function(e) { setPass(e.target.value); },
            style: Object.assign({}, inputStyle, { marginBottom: 16 }),
            required: true, minLength: 6, autoComplete: mode === "signup" ? "new-password" : "current-password"
          }),
          err && h("div", { style: { color: C.ember, fontSize: 13, marginBottom: 12, textAlign: "center" } }, err),
          success && h("div", { style: { color: C.teal, fontSize: 13, marginBottom: 12, textAlign: "center" } }, success),
          h("button", { type: "submit", disabled: loading, style: btnStyle },
            loading ? "Chargement..." : mode === "login" ? "Se connecter" : "S'inscrire")
        )
      ),
      h("p", { style: { color: C.mut, fontSize: 11.5, textAlign: "center", marginTop: 16, lineHeight: 1.5 } },
        "Tes données sont chiffrées et sauvegardées dans le cloud.")
    )
  );
}

window.AuthScreen = AuthScreen;
})();
