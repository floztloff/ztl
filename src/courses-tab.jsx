/* ---------- Courses ---------- */
function CoursesTab() {
  const [recipes, setRecipes] = useState(null);
  const [items, setItems] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const uid = () => "i" + Math.random().toString(36).slice(2, 9);
  const persist = (list) => { setItems(list); store.set("shopping", list); };

  const collectLines = async (recs) => {
    const keys = await store.list("plan:");
    const td = dateKey();
    const lines = [];
    for (const k of keys) { const date = k.slice(5); if (date < td) continue; const pl = await store.get(k); if (!pl || !pl.meals) continue; if (pl.shop === false) continue; for (const rid of pl.meals) { const r = (recs || []).find(x => x.id === rid); if (!r) continue; const factor = (pl.juliette && pl.juliette[rid]) ? 1.75 : 1; for (const line of (r.ing || [])) if (line && line.trim()) lines.push(scaleLine(line.trim(), factor)); } }
    return lines;
  };

  const generate = async (recs, existing) => {
    setBusy(true); setErr("");
    const lines = await collectLines(recs || recipes);
    const base = existing || items || [];
    const prevChecked = {}; base.forEach(it => { if (it.checked && it.name) prevChecked[it.name] = true; });
    const manual = base.filter(it => it.manual);
    let consolidated = [];
    if (lines.length > 0) { try { consolidated = await aiShoppingList(lines); } catch (e) { consolidated = localAggregate(lines); setErr("IA indisponible, quantités additionnées localement."); } }
    const generated = consolidated.map(c => { const name = norm(c.item); const text = c.qty ? c.qty + " " + c.item : c.item; return { id: uid(), name, text, checked: !!prevChecked[name], manual: false }; });
    persist([...generated, ...manual]); setBusy(false);
  };

  useEffect(() => { (async () => { let r = await store.get("recipes"); if (!Array.isArray(r) || !r.length) r = RECIPES; setRecipes(r); const s = await store.get("shopping"); const stored = Array.isArray(s) ? s : []; setItems(stored); if (stored.length === 0) generate(r, stored); })(); }, []);

  const toggle = (id) => persist((items || []).map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  const del = (id) => persist((items || []).filter(it => it.id !== id));
  const startEdit = (it) => { setEditId(it.id); setEditText(it.text); };
  const saveEdit = () => { const t = editText.trim(); if (t) persist((items || []).map(it => it.id === editId ? { ...it, text: t, name: norm(t) } : it)); setEditId(null); setEditText(""); };
  const addManual = () => { const t = newItem.trim(); if (!t) return; persist([...(items || []), { id: uid(), name: norm(t), text: t, checked: false, manual: true }]); setNewItem(""); };
  const clearChecked = () => persist((items || []).filter(it => !it.checked));

  if (!items) return <div style={{ color: C.mut, fontSize: 13, paddingTop: 8 }}>Chargement…</div>;
  const sorted = [...items].sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1));
  const remaining = items.filter(it => !it.checked).length;

  return (
    <>
      <Eyebrow color={C.ember}>Courses</Eyebrow>
      <h1 style={h1}>Ta liste</h1>
      <p style={{ color: C.mut, margin: "0 0 14px", fontSize: 13.5 }}>Générée depuis toutes les recettes planifiées à venir, avec les quantités additionnées.</p>
      <button onClick={() => generate()} disabled={busy} style={{ width: "100%", background: busy ? C.tealSoft : C.teal, color: busy ? C.teal : C.bg, border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}><Sparkles size={16} /> {busy ? "Calcul de la liste…" : "Actualiser depuis le programme"}</button>
      {err && <div style={{ fontSize: 11.5, color: C.mut, marginBottom: 12, lineHeight: 1.45 }}>{err}</div>}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addManual(); }} placeholder="Ajouter un article…" style={{ flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.line}`, color: C.text, borderRadius: 10, padding: "11px 12px", fontSize: 14 }} />
        <button onClick={addManual} style={{ background: C.ember, color: "#1b1205", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 18, fontWeight: 800, cursor: "pointer" }}>+</button>
      </div>
      {items.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.line}`, borderRadius: 14, padding: 22, textAlign: "center", color: C.mut, fontSize: 13 }}>Aucune recette planifiée. Ajoute des repas dans l'onglet Programme, puis actualise.</div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 2px 8px" }}>
            <span style={{ fontSize: 12.5, color: C.mut }}>{remaining} article{remaining > 1 ? "s" : ""}</span>
            <button onClick={clearChecked} style={{ background: "none", border: "none", color: C.mut, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Retirer les cochés</button>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "2px 14px" }}>
            {sorted.map((it, i) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <button onClick={() => toggle(it.id)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${it.checked ? C.good : C.line}`, background: it.checked ? C.good : "transparent", cursor: "pointer", flexShrink: 0 }}>
                  {it.checked && <Check size={13} color={C.bg} strokeWidth={3} />}
                </button>
                {editId === it.id ? (
                  <>
                    <input autoFocus value={editText} onChange={e => setEditText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") { setEditId(null); setEditText(""); } }} style={{ flex: 1, boxSizing: "border-box", background: C.bg, border: `1px solid ${C.teal}`, color: C.text, borderRadius: 8, padding: "7px 9px", fontSize: 14 }} />
                    <button onClick={saveEdit} style={{ background: C.coral, color: "#fff", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer" }}><Check size={15} strokeWidth={3} /></button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 14, color: it.checked ? C.mut : C.text, textDecoration: it.checked ? "line-through" : "none" }}>{it.text}</span>
                    <button onClick={() => startEdit(it)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 }}><Pencil size={15} /></button>
                    <button onClick={() => del(it.id)} style={{ background: "none", border: "none", color: C.mut, cursor: "pointer", padding: 4 }}><Trash2 size={15} /></button>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height: 12 }} />
    </>
  );
}
