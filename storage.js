// storage.js — localStorage adapter compatible window.storage
(function(){
  const store = {
    async get(k) {
      try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      catch { return null; }
    },
    async set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.warn('Storage.save error:', e); }
    },
    async del(k) {
      try { localStorage.removeItem(k); } catch {}
    },
    async list(prefix) {
      try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) keys.push(key);
        }
        return keys.sort();
      } catch { return []; }
    },
  };
  window.store = store;
  window.storage = {
    get: (k) => store.get(k).then(r => r ? { value: JSON.stringify(r) } : null),
    set: (k, v) => store.set(k, typeof v === 'string' ? v : JSON.stringify(v)),
    delete: (k) => store.del(k),
    list: (prefix) => store.list(prefix).then(keys => ({ keys })),
  };
})();
