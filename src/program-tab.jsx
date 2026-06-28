/* ---------- Programme ---------- */
function ProgramTab() {
  const [recipes, setRecipes] = useState(null);
  const [progSessions, setProgSessions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [plans, setPlans] = useState({});
  const [pickFor, setPickFor] = useState(null);

  useEffect(() => { (async () => { let r = await store.get("recipes"); if (!Array.isArray(r) || !r.length) r = RECIPES; setRecipes(r); let ss = await store.get("sessions"); if (!Array.isArray(ss) || !ss.length) ss = SESSIONS.map(normalizeSession); setProgSessions(ss); })(); }, []);

  const days = weekDaysFrom(offset);
  useEffect(() => {
    (async () => { var map = {}; for (const dk of days) { var p = await store.get("plan:" + dk); map[dk] = p || { meals: [], session: null }; } setPlans(map); })();
  }, [offset]);

  var savePlan = (dk, next) => { setPlans(p => ({ ...p, [dk]: next })); store.set("plan:" + dk, next); };
  var setSession = (dk, sid) => savePlan(dk, { meals: (plans[dk]?.meals) || [], session: sid || null });
  var addMeal = (dk, rid) => { var cur = plans[dk] || { meals: [] }; if ((cur.meals || []).includes(rid)) return; savePlan(dk, { ...cur, meals: [...(cur.meals || []), rid] }); };
  var removeMeal = (dk, rid) => { var cur = plans[dk] || { meals: [] }; var jul = { ...(cur.juliette || {}) }; delete jul[rid]; savePlan(dk, { ...cur, meals: (cur.meals || []).filter(x => x !== rid), juliette: jul }); };
  var recById = (id) => (recipes || []).find(r => r.id === id);
  var dayTotals = (meals) => { var p = 0, c = 0, f = 0; (meals || []).forEach(rid => { var r = recById(rid); if (r) { p += +r.protein || 0; c += +r.carbs || 0; f += +r.fat || 0; } }); return { p, c, f, kcal: Math.round((p + c) * 4 + f * 9) }; };
  var miniGauge = (label, val, target) => { var z = zone(val, target); var pct = Math.min(100, target ? (val / target) * 100 : 0); return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: C.mut }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: z.color }}>{val} / {target}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: C.line, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: z.color, borderRadius: 99 }} />
      </div>
    </div>
  ); };
  var rangeLabel = `${new Date(days[0] + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} – ${new Date(days[6] + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
  var sel = { width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 9, padding: "8px 10px", fontSize: 13 };

  if (!recipes) return <div style={{ color: C.mut, fontSize: 13, paddingTop: 8 }}>Chargement…</div>;

  return (
    <>
      <Eyebrow color={C.ember}>Programme</Eyebrow>
      <h1 style={h1}>Ta semaine</h1>
      <p style={{ color: C.mut, margin: "0 0 14px", fontSize: 13.5 }}>Planifie séances et repas. Navigue sur autant de semaines que tu veux.</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "8px 10px", marginBottom: 14 }}>
        <button onClick={() => setOffset(offset - 1)} style={navBtn}><ChevronLeft size={18} /></button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{offset === 0 ? "Cette semaine" : offset === 1 ? "Semaine prochaine" : offset === -1 ? "Semaine dernière" : rangeLabel}</div>
          <div style={{ fontSize: 11, color: C.mut }}>{rangeLabel}</div>
        </div>
        <button onClick={() => setOffset(offset + 1)} style={navBtn}><ChevronRight size={18} /></button>
      </div>
      {days.map(dk => {
        var pl = plans[dk] || { meals: [], session: null };
        var isToday = dk === dateKey();
        return (
          <div key={dk} style={{ background: C.card, border: `1px solid ${isToday ? C.ember : C.line}`, borderRadius: 16, padding: 14, marginBottom: 11 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 800, textTransform: "capitalize", flex: 1 }}>{new Date(dk + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}{isToday ? " · aujourd'hui" : ""}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Dumbbell size={15} color={C.ember} />
              <select value={pl.session || ""} onChange={e => setSession(dk, e.target.value)} style={sel}>
                <option value="">Repos / aucune séance</option>
                {[...new Set(progSessions.map(s => s.group))].map(g => (
                  <optgroup key={g} label={g}>
                    {progSessions.filter(s => s.group === g).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><ChefHat size={15} color={C.teal} /><span style={{ fontSize: 12.5, fontWeight: 700, color: C.mut }}>Repas</span></div>
            {(pl.meals || []).length === 0 && <div style={{ fontSize: 12, color: C.mut, marginBottom: 8 }}>Aucun repas prévu.</div>}
            {(pl.meals || []).map(rid => {
              var r = recById(rid);
              return (
                <div key={rid} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, marginBottom: 6 }}>
                  <RecipeThumb recipe={r} size={34} radius={9} />
                  <span style={{ fontSize: 13, flex: 1 }}>{r ? r.title : "Recette supprimée"}</span>
                  <button onClick={() => removeMeal(dk, rid)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 2 }}><X size={15} /></button>
                </div>
              );
            })}
            <button onClick={() => setPickFor(dk)} style={{ marginTop: 4, background: "none", border: `1px dashed ${C.line}`, color: C.coral, borderRadius: 10, padding: "9px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Plus size={14} /> Ajouter une recette</button>
            {(pl.meals || []).length > 0 && (() => {
              var t = dayTotals(pl.meals);
              return (<div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase", letterSpacing: 1, marginBottom: 9 }}>Apport des repas / objectif</div>
                {miniGauge("Calories", t.kcal, TARGETS.kcal)}
                {miniGauge("Protéines", Math.round(t.p), TARGETS.protein)}
                {miniGauge("Glucides", Math.round(t.c), TARGETS.carbs)}
                {miniGauge("Lipides", Math.round(t.f), TARGETS.fat)}</div>);
            })()}
          </div>);
      })}
      {pickFor && <RecipePicker recipes={recipes} dayLabel={new Date(pickFor + "T00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} added={(plans[pickFor]?.meals) || []} onAdd={(rid) => addMeal(pickFor, rid)} onClose={() => setPickFor(null)} />}
      <div style={{ height: 12 }} />
    </>
  );
}
