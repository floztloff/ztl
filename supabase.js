// supabase.js — Supabase client + auth helpers
(function(){
  const SUPABASE_URL = "https://qjgtoscewolzgfnsammc.supabase.co";
  const SUPABASE_KEY = "sb_publishable_O1HG5Y2pfeRV_pMVyg2U2w_FcV6Vmcd";

  // Charger le SDK Supabase depuis CDN
  // window.supabase est défini par le script supabase-js chargé dans index.html

  let client = null;
  function getClient() {
    if (!client) {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return client;
  }

  // Auth helpers
  async function signUp(email, password) {
    const { data, error } = await getClient().auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await getClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await getClient().auth.signOut();
    if (error) throw error;
  }

  async function getUser() {
    const { data: { user } } = await getClient().auth.getUser();
    return user;
  }

  async function getSession() {
    const { data: { session } } = await getClient().auth.getSession();
    return session;
  }

  function onAuthChange(callback) {
    return getClient().auth.onAuthStateChange(callback);
  }

  // DB helpers — daily logs
  async function saveDailyLog(userId, date, data) {
    const { error } = await getClient()
      .from("daily_logs")
      .upsert({ user_id: userId, date: date, data: data, updated_at: new Date().toISOString() },
              { onConflict: "user_id,date" });
    if (error) console.warn("saveDailyLog error:", error);
  }

  async function getDailyLog(userId, date) {
    const { data, error } = await getClient()
      .from("daily_logs")
      .select("data")
      .eq("user_id", userId)
      .eq("date", date)
      .maybeSingle();
    if (error) { console.warn("getDailyLog error:", error); return null; }
    return data ? data.data : null;
  }

  async function getDailyLogs(userId, limit) {
    const { data, error } = await getClient()
      .from("daily_logs")
      .select("date, data")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(limit || 30);
    if (error) { console.warn("getDailyLogs error:", error); return []; }
    return data || [];
  }

  // DB helpers — user data (preferences, exlast, checks, etc.)
  async function saveUserData(userId, key, value) {
    const { error } = await getClient()
      .from("user_data")
      .upsert({ user_id: userId, key: key, value: value, updated_at: new Date().toISOString() },
              { onConflict: "user_id,key" });
    if (error) console.warn("saveUserData error:", error);
  }

  async function getUserData(userId, key) {
    const { data, error } = await getClient()
      .from("user_data")
      .select("value")
      .eq("user_id", userId)
      .eq("key", key)
      .maybeSingle();
    if (error) { console.warn("getUserData error:", error); return null; }
    return data ? data.value : null;
  }

  async function listUserDataKeys(userId, prefix) {
    const { data, error } = await getClient()
      .from("user_data")
      .select("key")
      .eq("user_id", userId)
      .like("key", (prefix || "") + "%");
    if (error) { console.warn("listUserDataKeys error:", error); return []; }
    return (data || []).map(r => r.key);
  }

  // Expose globally
  window.ZTLAuth = { signUp, signIn, signOut, getUser, getSession, onAuthChange };
  window.ZTLDb = { saveDailyLog, getDailyLog, getDailyLogs, saveUserData, getUserData, listUserDataKeys };
  window.ZTLSupabase = { getClient };
})();
