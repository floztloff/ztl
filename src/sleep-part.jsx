/* ---------- Sommeil ---------- */
function SleepTab({ day, saveDay, hist, onSleepSaved, onDeleteSleep, saveSleepForDate }) {
  const s = day.sleep || {};
  const [mode, setMode] = useState("live");
  const [active, setActive] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [bed, setBed] = useState(s.bed || "23:00");
  const [wake, setWake] = useState(s.wake || "07:00");
  const [q, setQ] = useState(s.quality || 0);
  const [justEnded, setJustEnded] = useState(false);
  const [manualDate, setManualDate] = useState(dateKey());

  useEffect(() => {
    (async () => {
      const act = await store.get("sleepActive");
      if (act && act.startedAt && day.sleep && day.sleep.endedAt && day.sleep.endedAt >= act.startedAt) {
        store.del("sleepActive"); setActive(null);
      } else {
        setActive(act);
      }
    })();
    const id = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(id);
  }, []);

  const today = dateKey();
  const hhmm = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const calcHours = (b, w) => {
    const [bh, bm] = b.split(":").map(Number), [wh, wm] = w.split(":").map(Number);
    let mins = (wh * 60 + wm) - (bh * 60 + bm); if (mins <= 0) mins += 1440;
    return Math.round((mins / 60) * 10) / 10;
  };
  const startNight = () => {
    const a = { startedAt: new Date().toISOString() };
    store.set("sleepActive", a); setActive(a); setNow(Date.now()); setJustEnded(false);
  };
  const endNight = () => {
    if (!active) return;
    const start = new Date(active.startedAt), end = new Date();
    const b = hhmm(start), w = hhmm(end);
    const hours = Math.round(((end - start) / 3600000) * 10) / 10;
    setBed(b); setWake(w);
    saveDay({ ...day, sleep: { bed: b, wake: w, quality: q, hours, endedAt: end.toISOString() } });
    onSleepSaved(today, hours, q);
    store.del("sleepActive"); setActive(null); setJustEnded(true);
  };
  const saveManual = () => {
    const hours = calcHours(bed, wake);
    const d = manualDate || today;
    saveSleepForDate(d, { bed, wake, quality: q, hours, endedAt: new Date().toISOString() });
    setJustEnded(true);
  };
  const pickResave = (n) => {
    setQ(n);
    const sl = { ...(day.sleep || {}), quality: n };
    saveDay({ ...day, sleep: sl });
    onSleepSaved(today, sl.hours, n);
  };

  const elapsed = Math.max(0, active ? now - new Date(active.startedAt).getTime() : 0);
  const eh = Math.floor(elapsed / 3600000), em = Math.floor((elapsed % 3600000) / 60000);

  const data = hist.filter(h => h.sleepH != null).sort((a, b) => (a.date < b.date ? -1 : 1));
  const lastN = (n) => data.slice(-n);
  const avgOf = (arr) => arr.length ? Math.round((arr.reduce((s, d) => s + d.sleepH, 0) / arr.length) * 10) / 10 : null;
  const avg7 = avgOf(lastN(7));
  const avg30 = avgOf(lastN(30));
  const maxH = Math.max(9, ...data.map(d => d.sleepH));

  const cardBox = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 18 };
  const btnTeal = { width: "100%", background: C.coral, color: "#fff", border: "none", borderRadius: 999, padding: "15px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };
  const qRow = (onPick) => (
    <>
      <div style={{ fontSize: 12, color: C.mut, margin: "0 0 8px" }}>Qualité ressentie</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => onPick(n)}
            style={{ flex: 1, padding: "10px 0", borderRadius: 11, border: `1px solid ${q >= n ? C.teal : C.line}`, background: q >= n ? C.tealSoft : C.bg, color: q >= n ? C.teal : C.mut, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>{n}</button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Eyebrow color={C.teal}>Sommeil</Eyebrow>
      <h1 style={h1}>Récupérer, c'est progresser</h1>
      <p style={{ color: C.mut, margin: "0 0 16px", fontSize: 14, lineHeight: 1.5 }}>Vise 7 h 30–8 h, et surtout des horaires réguliers.</p>

      <div style={{ display: "flex", gap: 6, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 4, marginBottom: 14 }}>
        {[["live", "Démarrer / terminer"], ["manual", "Saisir à la main"]].map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)}
            style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: mode === m ? C.teal : "transparent", color: mode === m ? C.bg : C.mut }}>{l}</button>
        ))}
      </div>

      {mode === "live" ? (
        active ? (
          <div style={cardBox}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
              <Moon size={20} color={C.teal} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Nuit en cours</div>
                <div style={{ fontSize: 12, color: C.mut }}>démarrée à {hhmm(new Date(active.startedAt))}</div>
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "12px 0 16px" }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: C.teal }}>{eh} h {String(em).padStart(2, "0")}</span>
              <div style={{ fontSize: 12, color: C.mut }}>de repos écoulées</div>
            </div>
            <button onClick={endNight} style={btnTeal}><Sunrise size={18} /> Je me réveille</button>
          </div>
        ) : (
          <>
            <button onClick={startNight} style={{ ...btnTeal, padding: "18px", fontSize: 16 }}><Moon size={19} /> Démarrer la nuit</button>
            <p style={{ fontSize: 12.5, color: C.mut, textAlign: "center", margin: "11px 0 0", lineHeight: 1.5 }}>
              Appuie quand tu te couches. Au réveil, tu termines et l'heure est prise toute seule.
            </p>
            {justEnded && day.sleep && (
              <div style={{ ...cardBox, marginTop: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Check size={16} color={C.good} strokeWidth={3} />
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Nuit enregistrée</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.mut, margin: "0 0 14px" }}>{day.sleep.bed} → {day.sleep.wake} · {hToHM(day.sleep.hours)} de sommeil</div>
                {qRow(pickResave)}
              </div>
            )}
          </>
        )
      ) : (
        <div style={cardBox}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: C.mut, marginBottom: 6 }}>Date de la nuit <span style={{ color: C.mut }}>(au réveil)</span></div>
            <input type="date" value={manualDate} max={dateKey()} onChange={e => { setManualDate(e.target.value); setJustEnded(false); }}
              style={{ width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 15, textAlign: "center" }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Coucher", bed, setBed], ["Lever", wake, setWake]].map(([l, val, set]) => (
              <div key={l} style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.mut, marginBottom: 6 }}>{l}</div>
                <input type="time" value={val} onChange={e => set(e.target.value)}
                  style={{ width: "100%", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 11, padding: "11px", fontSize: 16, textAlign: "center" }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", margin: "16px 0 14px" }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: C.teal }}>{hToHM(calcHours(bed, wake))}</span>
            <span style={{ fontSize: 13, color: C.mut }}> de sommeil</span>
          </div>
          {qRow(setQ)}
          <button onClick={saveManual} style={{ ...btnTeal, marginTop: 14 }}>Enregistrer la nuit</button>
          {justEnded && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, color: C.good, fontSize: 13, fontWeight: 700 }}>
              <Check size={15} strokeWidth={3} /> Nuit du {fmtShort(manualDate)} enregistrée
            </div>
          )}
        </div>
      )}

      <h3 style={sectionH}>Historique du sommeil</h3>
      {data.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 24, textAlign: "center", color: C.mut, fontSize: 13 }}>
          Enregistre ta première nuit, tes statistiques apparaîtront ici.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {[["7 jours", avg7, lastN(7).length], ["30 jours", avg30, lastN(30).length]].map(([label, val, n]) => (
              <div key={label} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 10.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Moyenne {label}</div>
                <div style={{ fontSize: 27, fontWeight: 800, color: C.teal, marginTop: 4, lineHeight: 1 }}>
                  {val != null ? hToHM(val) : "—"}
                </div>
                <div style={{ fontSize: 11, color: C.mut, marginTop: 3 }}>{n} nuit{n > 1 ? "s" : ""} enregistrée{n > 1 ? "s" : ""}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>14 dernières nuits</span>
              <span style={{ fontSize: 11, color: C.teal, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 14, borderTop: `1px dashed ${C.teal}`, display: "inline-block" }} /> cible 7 h 30
              </span>
            </div>
            <div style={{ position: "relative", height: 124, borderBottom: `1px solid ${C.line}` }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: `${(7.5 / maxH) * 90}%`, borderTop: `1px dashed ${C.teal}`, opacity: 0.45 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 4 }}>
                {lastN(14).map((d, i) => (
                  <div key={i} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
                    {d.sleepH != null && (
                      <span style={{ fontSize: 8.5, fontWeight: 800, color: d.sleepH >= 7.5 ? C.teal : C.mut, marginBottom: 2, lineHeight: 1, whiteSpace: "nowrap" }}>{hToHMc(d.sleepH)}</span>
                    )}
                    <div style={{ width: "100%", height: `${d.sleepH != null ? Math.max(3, (d.sleepH / maxH) * 90) : 0}%`, background: d.sleepH >= 7.5 ? C.teal : C.line, borderRadius: "5px 5px 0 0", transition: "height .4s" }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
              {lastN(14).map((d, i) => (
                <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: C.mut }}>{d.date.slice(8)}/{d.date.slice(5, 7)}</span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 11.5, color: C.mut, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "18px 4px 8px" }}>
            Détail · {data.length} nuit{data.length > 1 ? "s" : ""}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px", maxHeight: 320, overflowY: "auto" }}>
            {data.slice().reverse().map((d, i, arr) => (
              <div key={d.date} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: d.sleepH >= 7.5 ? C.teal : d.sleepH >= 6 ? C.amber : C.ember, flexShrink: 0 }} />
                <span style={{ fontSize: 13, textTransform: "capitalize" }}>
                  {new Date(d.date + "T00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                  {d.date === today ? " · auj." : ""}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: C.teal }}>{hToHM(d.sleepH)}</span>
                {d.quality ? <span style={{ fontSize: 11.5, color: C.mut }}>· {d.quality}/5</span> : null}
                <button onClick={() => onDeleteSleep(d.date)} aria-label="Supprimer la nuit"
                  style={{ marginLeft: "auto", background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 6, display: "flex" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height: 12 }} />
    </>
  );
}
