// storage.js — localStorage adapter with Supabase cloud sync
(function(){
  // Get current user ID (null if not logged in)
  function uid() {
    try { return window._ztlUser && window._ztlUser.id || null; } catch { return null; }
  }

  const store = {
    async get(k) {
      // Always read from localStorage first (fast, works offline)
      try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      catch { return null; }
    },
    async set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.warn('Storage.save error:', e); }
      // Sync to Supabase in background
      var u = uid();
      if (u && window.ZTLDb) {
        try {
          if (k.startsWith("log:")) {
            window.ZTLDb.saveDailyLog(u, k.slice(4), v);
          } else {
            window.ZTLDb.saveUserData(u, k, v);
          }
        } catch (e) { console.warn("Cloud sync error:", e); }
      }
    },
    async del(k) {
      try { localStorage.removeItem(k); } catch {}
      // Also remove from Supabase
      var u = uid();
      if (u && window.ZTLSupabase) {
        try {
          var client = window.ZTLSupabase.getClient();
          if (k.startsWith("log:")) {
            client.from("daily_logs").delete().eq("user_id", u).eq("date", k.slice(4));
          } else {
            client.from("user_data").delete().eq("user_id", u).eq("key", k);
          }
        } catch (e) { console.warn("Cloud delete error:", e); }
      }
    },
    async list(prefix) {
      try {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.startsWith(prefix)) keys.push(key);
        }
        return keys.sort();
      } catch { return []; }
    },
  };

  // Pull cloud data to localStorage on login
  store.syncFromCloud = async function() {
    var u = uid();
    if (!u || !window.ZTLDb) return;
    try {
      // Sync daily logs
      var logs = await window.ZTLDb.getDailyLogs(u, 60);
      for (var i = 0; i < logs.length; i++) {
        var log = logs[i];
        var localKey = "log:" + log.date;
        var local = localStorage.getItem(localKey);
        if (!local) {
          var d = log.data;
          if (typeof d === "string") { try { d = JSON.parse(d); } catch(e) { d = null; } }
          if (d) localStorage.setItem(localKey, JSON.stringify(d));
        }
      }
      // Sync user data
      var keys = await window.ZTLDb.listUserDataKeys(u, "");
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        var localVal = localStorage.getItem(k);
        if (!localVal) {
          var cloudVal = await window.ZTLDb.getUserData(u, k);
          if (cloudVal != null) {
            localStorage.setItem(k, JSON.stringify(cloudVal));
          }
        }
      }
      console.log("Cloud sync complete");
    } catch (e) { console.warn("syncFromCloud error:", e); }
  };

  // Push all local data to cloud (first login migration)
  store.pushToCloud = async function() {
    var u = uid();
    if (!u || !window.ZTLDb) return;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.startsWith("sb-") || k === "_ztlUser") continue;
        var v;
        try { v = JSON.parse(localStorage.getItem(k)); } catch { continue; }
        if (k.startsWith("log:")) {
          await window.ZTLDb.saveDailyLog(u, k.slice(4), v);
        } else {
          await window.ZTLDb.saveUserData(u, k, v);
        }
      }
      console.log("Push to cloud complete");
    } catch (e) { console.warn("pushToCloud error:", e); }
  };

  window.store = store;
  window.storage = {
    get: function(k) { return store.get(k).then(function(r) { return r ? { value: JSON.stringify(r) } : null; }); },
    set: function(k, v) { return store.set(k, typeof v === 'string' ? v : JSON.stringify(v)); },
    delete: function(k) { return store.del(k); },
    list: function(prefix) { return store.list(prefix).then(function(keys) { return { keys: keys }; }); },
  };
})();
