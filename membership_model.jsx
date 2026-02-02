// ─── CONSTANTS ───────────────────────────────────────────────
const TIER_COLORS = [
  { bg: "#1a1a2e", accent: "#e8a838", light: "#fef3d0" },
  { bg: "#1e2d3d", accent: "#5ba3d9", light: "#d6eaf5" },
  { bg: "#2d1e3d", accent: "#a85bd9", light: "#f0d6f5" },
  { bg: "#1e3d2d", accent: "#5bd98a", light: "#d6f5e4" },
  { bg: "#3d2d1e", accent: "#d9855b", light: "#f5e0d6" },
  { bg: "#2d3d1e", accent: "#8ad95b", light: "#e4f5d6" },
];
// Club-wide pricing
const TICKET_MEMBER_COST = 20;   // member pays $20 per ticket
const TICKET_REVENUE = 8;        // club keeps $8 of that
const CENTURY_MEMBER_COST = 200; // member pays $200 per century
const CENTURY_REVENUE = 82;      // club keeps $82 of that
const defaultTiers = [
  { id: 1, name: "Adult Men",            members: 49, dues: 450, ticketsPerMonth: 6,  centuries: 12, miscExpenses: 0, hasTickets: true,  hasCenturies: true,  hasMisc: true },
  { id: 2, name: "Adult Women",          members: 40, dues: 800, ticketsPerMonth: 0,  centuries: 6,  miscExpenses: 0, hasTickets: false, hasCenturies: true,  hasMisc: false },
  { id: 3, name: "Student (14–17)",      members: 0,  dues: 150, ticketsPerMonth: 3,  centuries: 4,  miscExpenses: 0, hasTickets: true,  hasCenturies: true,  hasMisc: false },
  { id: 4, name: "Sponsor (60+ / 25+ yrs)", members: 10, dues: 1200, ticketsPerMonth: 0, centuries: 0, miscExpenses: 0, hasTickets: false, hasCenturies: false, hasMisc: false },
];
const defaultBudget = [
  {
    id: "show", label: "Show", color: "#1a1a2e", accent: "#e8a838",
    items: [
      { id: 1, name: "Suits",        qty: 100, unit: 1100   },
      { id: 2, name: "Jacklin",      qty: 30,  unit: 233    },
      { id: 3, name: "Designer",     qty: 1,   unit: 5500   },
      { id: 4, name: "Painter",      qty: 1,   unit: 12000  },
      { id: 5, name: "Garage",       qty: 12,  unit: 833.33 },
      { id: 6, name: "Hillman",      qty: 1,   unit: 2900   },
      { id: 7, name: "Foam",         qty: 1,   unit: 2000   },
      { id: 8, name: "Light Action", qty: 12,  unit: 3000   },
    ],
  },
  {
    id: "dayof", label: "Day Of", color: "#1e2d3d", accent: "#5ba3d9",
    items: [
      { id: 1, name: "Busses",                  qty: 4, unit: 775  },
      { id: 2, name: "Rentals",                 qty: 1, unit: 1500 },
      { id: 3, name: "DJ",                      qty: 1, unit: 2000 },
      { id: 4, name: "Speakers",                qty: 2, unit: 500  },
      { id: 5, name: "Trucks",                  qty: 2, unit: 500  },
      { id: 6, name: "Floor",                   qty: 1, unit: 3500 },
      { id: 7, name: "New Years Day of Food",   qty: 1, unit: 2000 },
    ],
  },
  {
    id: "misc", label: "Misc", color: "#3d2d1e", accent: "#d9855b",
    items: [
      { id: 1, name: "Garage",           qty: 12, unit: 2000   },
      { id: 2, name: "Association Dues", qty: 12, unit: 833.33 },
    ],
  },
];
// Each fundraiser: what members pay per unit, what the club keeps, and how many we expect to sell
const defaultFundraisers = [
  { id: 1, name: "Eagles Blocks",   cost: 10,  profit: 300,  estSold: 1  },
  { id: 2, name: "King of Hearts",  cost: 0,   profit: 30000,estSold: 1  },
];
const fmt = (n) => "$" + Math.round(n).toLocaleString();
function calcTier(t) {
  const dues     = t.members * t.dues;
  const tickets  = t.hasTickets   ? t.members * t.ticketsPerMonth * TICKET_REVENUE * 12 : 0;
  const centuries = t.hasCenturies ? t.members * t.centuries * CENTURY_REVENUE : 0;
  const misc     = t.hasMisc      ? t.members * t.miscExpenses : 0;
  return { dues, tickets, centuries, misc, total: dues + tickets + centuries + misc };
}
function calcSingleMember(t) {
  const dues     = t.dues;
  const tickets  = t.hasTickets   ? t.ticketsPerMonth * TICKET_REVENUE * 12 : 0;
  const centuries = t.hasCenturies ? t.centuries * CENTURY_REVENUE : 0;
  const misc     = t.hasMisc      ? t.miscExpenses : 0;
  return { dues, tickets, centuries, misc, total: dues + tickets + centuries + misc };
}
// ─── STEPPER ─────────────────────────────────────────────────
function Stepper({ value, min = 0, max = 9999, step = 1, onChange, prefix = "", width = 120 }) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    if (raw === "" || raw === ".") { onChange(0); return; }
    onChange(Math.min(max, Math.max(min, Number(raw))));
  };
  return (
    <div style={{ display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 7, border: "1px solid #e0e0e0", overflow: "hidden", width }}>
      <button onClick={dec} style={{ width: 26, height: 32, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        onMouseEnter={e => e.currentTarget.style.background = "#eee"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >−</button>
      <div style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center", minWidth: 0 }}>
        {prefix && <span style={{ fontSize: 11.5, color: "#999", flexShrink: 0 }}>{prefix}</span>}
        <input type="text" inputMode="numeric" value={value} onChange={handleChange}
          style={{ width: "100%", textAlign: "center", border: "none", background: "transparent", fontSize: 13, fontWeight: 700, color: "#1a1a1a", outline: "none", fontFamily: "inherit" }}
        />
      </div>
      <button onClick={inc} style={{ width: 26, height: 32, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        onMouseEnter={e => e.currentTarget.style.background = "#eee"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >+</button>
    </div>
  );
}
function LabeledStepper({ label, value, min, max, step, onChange, prefix, suffix }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ fontSize: 11.5, color: "#666", width: 112, flexShrink: 0 }}>{label}</div>
      <Stepper value={value} min={min} max={max} step={step} onChange={onChange} prefix={prefix} width={160} />
      {suffix && <span style={{ fontSize: 11, color: "#999" }}>{suffix}</span>}
    </div>
  );
}
// ─── MEMBERSHIP TIER PANEL ───────────────────────────────────
function TierPanel({ tier, colorIdx, onUpdate, onRemove, canRemove }) {
  const col  = TIER_COLORS[colorIdx % TIER_COLORS.length];
  const calc = calcTier(tier);
  const upd  = (k) => (v) => onUpdate({ ...tier, [k]: v });
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ background: col.bg, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input value={tier.name} onChange={(e) => upd("name")(e.target.value)}
          style={{ background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 200 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>Tier Total</div>
            <div style={{ color: col.accent, fontSize: 16, fontWeight: 700 }}>{fmt(calc.total)}</div>
          </div>
          {canRemove && (
            <button onClick={onRemove} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          )}
        </div>
      </div>
      <div style={{ padding: "14px 16px 12px" }}>
        <LabeledStepper label="Members"     value={tier.members} min={0} max={500}  step={1}  onChange={upd("members")}  suffix="ppl" />
        <LabeledStepper label="Annual Dues" value={tier.dues}    min={0} max={5000} step={25} onChange={upd("dues")}      prefix="$"   />
        {/* toggles */}
        <div style={{ display: "flex", gap: 14, marginTop: 12, marginBottom: 8, flexWrap: "wrap" }}>
          {[{ key: "hasTickets", label: "Tickets" }, { key: "hasCenturies", label: "Centuries" }, { key: "hasMisc", label: "Misc" }].map(({ key, label }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }} onClick={() => upd(key)(!tier[key])}>
              <div style={{ width: 32, height: 18, borderRadius: 9, background: tier[key] ? col.accent : "#ccc", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: tier[key] ? 16 : 2, transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
              </div>
              <span style={{ fontSize: 11.5, color: "#777" }}>{label}</span>
            </div>
          ))}
        </div>
        {tier.hasTickets && (
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 }}>
            <LabeledStepper label="Tickets / mo" value={tier.ticketsPerMonth} min={0} max={30} step={1} onChange={upd("ticketsPerMonth")} />
            <div style={{ fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 }}>Club earns ${TICKET_REVENUE} per ticket</div>
          </div>
        )}
        {tier.hasMisc && (
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 }}>
            <LabeledStepper label="Misc / yr" value={tier.miscExpenses} min={0} max={9999} step={25} onChange={upd("miscExpenses")} prefix="$" />
            <div style={{ fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 }}>Annual misc expenses per member</div>
          </div>
        )}
        {tier.hasCenturies && (
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 }}>
            <LabeledStepper label="Centuries / yr" value={tier.centuries} min={0} max={24} step={1} onChange={upd("centuries")} />
            <div style={{ fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 }}>Club earns ${CENTURY_REVENUE} per century</div>
          </div>
        )}
        {/* mini summary pills */}
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #eee", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { label: "Dues",     val: calc.dues     },
            ...(tier.hasTickets   ? [{ label: "Tickets",   val: calc.tickets   }] : []),
            ...(tier.hasCenturies ? [{ label: "Centuries", val: calc.centuries }] : []),
            ...(tier.hasMisc      ? [{ label: "Misc",      val: calc.misc      }] : []),
          ].map((item) => (
            <div key={item.label} style={{ flex: 1, minWidth: 68, background: col.light, borderRadius: 6, padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: col.bg, marginTop: 1 }}>{fmt(item.val)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── BUDGET CATEGORY SECTION ─────────────────────────────────
function BudgetSection({ section, onUpdate, onRemove }) {
  const subtotal   = section.items.reduce((s, i) => s + i.qty * i.unit, 0);
  const nextItemId = Math.max(...section.items.map((i) => i.id), 0) + 1;
  const updateItem = (id, updated) => onUpdate({ ...section, items: section.items.map((i) => (i.id === id ? updated : i)) });
  const removeItem = (id) => onUpdate({ ...section, items: section.items.filter((i) => i.id !== id) });
  const addItem    = () => onUpdate({ ...section, items: [...section.items, { id: nextItemId, name: "New Item", qty: 1, unit: 0 }] });
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ background: section.color, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input value={section.label} onChange={(e) => onUpdate({ ...section, label: e.target.value })}
          style={{ background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 160 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: section.accent, fontSize: 16, fontWeight: 700 }}>{fmt(subtotal)}</div>
          <button onClick={onRemove} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 96px 108px 108px 26px", gap: 6, padding: "7px 14px 5px", borderBottom: "1px solid #eee" }}>
        {["Item", "Qty", "Unit Cost", "Subtotal", ""].map((h) => (
          <div key={h} style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600, textAlign: h === "Item" || h === "" ? "left" : "right" }}>{h}</div>
        ))}
      </div>
      <div style={{ padding: "5px 14px 10px" }}>
        {section.items.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 96px 108px 108px 26px", gap: 6, alignItems: "center", padding: "4px 0", borderBottom: "1px solid #f4f4f4" }}>
            <input value={item.name} onChange={(e) => updateItem(item.id, { ...item, name: e.target.value })}
              style={{ border: "none", fontSize: 13, color: "#1a1a1a", fontWeight: 500, outline: "none", fontFamily: "inherit", background: "transparent", minWidth: 0 }} />
            <div style={{ justifySelf: "end" }}>
              <Stepper value={item.qty} min={0} max={9999} step={1} onChange={(v) => updateItem(item.id, { ...item, qty: v })} width={96} />
            </div>
            <div style={{ justifySelf: "end" }}>
              <Stepper value={item.unit} min={0} max={999999} step={100} onChange={(v) => updateItem(item.id, { ...item, unit: v })} prefix="$" width={108} />
            </div>
            <div style={{ textAlign: "right", fontSize: 13, fontWeight: 700, color: section.color }}>{fmt(item.qty * item.unit)}</div>
            <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c0392b"} onMouseLeave={e => e.currentTarget.style.color = "#ccc"}
            >×</button>
          </div>
        ))}
        <button onClick={addItem} style={{ marginTop: 8, background: "none", border: "none", color: section.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "4px 0", fontFamily: "inherit" }}>
          + Add Item
        </button>
      </div>
    </div>
  );
}
// ─── MEMBER VIEW ─────────────────────────────────────────────
function MemberView({ tiers, totals }) {
  const [selectedTier, setSelectedTier] = useState(0);
  const tier = tiers[Math.min(selectedTier, tiers.length - 1)];
  const col  = TIER_COLORS[Math.min(selectedTier, tiers.length - 1) % TIER_COLORS.length];
  const totalMembers = tiers.reduce((s, t) => s + t.members, 0);
  const m = calcSingleMember(tier);
  // What the member actually pays out of pocket per year
  const memberPays = {
    dues:       tier.dues,
    tickets:    tier.hasTickets   ? tier.ticketsPerMonth * TICKET_MEMBER_COST * 12 : 0,
    centuries:  tier.hasCenturies ? tier.centuries * CENTURY_MEMBER_COST : 0,
    misc:       tier.hasMisc      ? tier.miscExpenses : 0,
  };
  memberPays.total = memberPays.dues + memberPays.tickets + memberPays.centuries + memberPays.misc;
  const budgetPerMember = totalMembers > 0 ? totals.budgetTotal / totalMembers : 0;
  const netPerMember    = m.total - budgetPerMember;
  // Monthly equivalents — club revenue side
  const monthly = {
    dues:      m.dues / 12,
    tickets:   tier.hasTickets   ? tier.ticketsPerMonth * TICKET_REVENUE : 0,
    centuries: tier.hasCenturies ? (tier.centuries * CENTURY_REVENUE) / 12 : 0,
    misc:      tier.hasMisc      ? tier.miscExpenses / 12 : 0,
  };
  monthly.total = monthly.dues + monthly.tickets + monthly.centuries + monthly.misc;
  // Monthly equivalents — member pays side
  const monthlyPays = {
    dues:      memberPays.dues / 12,
    tickets:   tier.hasTickets   ? tier.ticketsPerMonth * TICKET_MEMBER_COST : 0,
    centuries: tier.hasCenturies ? (tier.centuries * CENTURY_MEMBER_COST) / 12 : 0,
    misc:      tier.hasMisc      ? tier.miscExpenses / 12 : 0,
  };
  monthlyPays.total = monthlyPays.dues + monthlyPays.tickets + monthlyPays.centuries + monthlyPays.misc;
  const maxVal = Math.max(memberPays.dues, memberPays.tickets, memberPays.centuries, memberPays.misc, 1);
  return (
    <>
      {/* Tier selector pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {tiers.map((t, idx) => {
          const c   = TIER_COLORS[idx % TIER_COLORS.length];
          const sel = idx === selectedTier;
          return (
            <button key={t.id} onClick={() => setSelectedTier(idx)}
              style={{
                background: sel ? c.bg : "#fff", color: sel ? "#fff" : "#555",
                border: "1px solid " + (sel ? c.bg : "#ddd"),
                borderRadius: 8, padding: "8px 16px", fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent }} />
              {t.name}
              <span style={{ color: sel ? "rgba(255,255,255,0.5)" : "#bbb", fontSize: 11, fontWeight: 400 }}>({t.members})</span>
            </button>
          );
        })}
      </div>
      {/* Hero card */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ background: col.bg, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5 }}>One Member</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginTop: 2 }}>{tier.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5 }}>Pays / Year</div>
            <div style={{ color: col.accent, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>{fmt(memberPays.total)}</div>
          </div>
        </div>
        <div style={{ padding: "20px 20px 8px" }}>
          {[
            { label: "Annual Dues", pays: memberPays.dues,      keeps: m.dues,      show: true,              split: false, detail: null },
            { label: "Tickets",     pays: memberPays.tickets,   keeps: m.tickets,   show: tier.hasTickets,   split: true,  detail: `${tier.ticketsPerMonth}/mo × $${TICKET_MEMBER_COST} × 12`,  unitPays: TICKET_MEMBER_COST,  unitKeeps: TICKET_REVENUE  },
            { label: "Centuries",   pays: memberPays.centuries, keeps: m.centuries, show: tier.hasCenturies, split: true,  detail: `${tier.centuries}/yr × $${CENTURY_MEMBER_COST}`,            unitPays: CENTURY_MEMBER_COST, unitKeeps: CENTURY_REVENUE },
            { label: "Misc",        pays: memberPays.misc,      keeps: m.misc,      show: tier.hasMisc,      split: false, detail: `$${tier.miscExpenses}/yr` },
          ].filter(r => r.show).map((row) => {
            const keepsPct = row.pays > 0 ? (row.keeps / row.pays) * 100 : 100;
            return (
              <div key={row.label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1a1a1a" }}>{row.label}</span>
                    {row.detail && <span style={{ fontSize: 10.5, color: "#aaa", fontStyle: "italic" }}>{row.detail}</span>}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: col.bg }}>{fmt(row.pays)}</span>
                </div>
                <div style={{ background: "#eee", borderRadius: 5, height: 11, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${(row.pays / maxVal) * 100}%`, borderRadius: 5,
                    transition: "width 0.35s ease", minWidth: row.pays > 0 ? 6 : 0,
                    background: row.split
                      ? `linear-gradient(90deg, ${col.accent} 0%, ${col.accent} ${keepsPct}%, #c8c8c8 ${keepsPct}%, #c8c8c8 100%)`
                      : col.accent,
                  }} />
                </div>
                {row.split && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 2, background: col.accent }} />
                      <span style={{ fontSize: 10.5, color: "#777" }}>Club keeps ${row.unitKeeps} = {fmt(row.keeps)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 2, background: "#c8c8c8" }} />
                      <span style={{ fontSize: 10.5, color: "#777" }}>Passes thru ${row.unitPays - row.unitKeeps} = {fmt(row.pays - row.keeps)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid #eee", paddingTop: 10, marginTop: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: "#666" }}>Club actually keeps</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: col.bg }}>{fmt(m.total)}</span>
          </div>
        </div>
      </div>
      {/* Two-col: Monthly | Budget share */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        {/* Monthly */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ background: col.bg, padding: "11px 16px" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1.2 }}>Member Pays / Mo</div>
            <div style={{ color: col.accent, fontSize: 22, fontWeight: 700, marginTop: 3 }}>
              {fmt(monthlyPays.total)}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/mo</span>
            </div>
          </div>
          <div style={{ padding: "10px 16px 12px" }}>
            {[
              { label: "Dues",      pays: monthlyPays.dues,      keeps: monthly.dues,      split: false },
              ...(tier.hasTickets   ? [{ label: "Tickets",   pays: monthlyPays.tickets,   keeps: monthly.tickets,   split: true  }] : []),
              ...(tier.hasCenturies ? [{ label: "Centuries", pays: monthlyPays.centuries, keeps: monthly.centuries, split: true  }] : []),
              ...(tier.hasMisc      ? [{ label: "Misc",      pays: monthlyPays.misc,      keeps: monthly.misc,      split: false }] : []),
            ].map((r) => (
              <div key={r.label}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: r.split ? "none" : "1px solid #f2f2f2" }}>
                  <span style={{ fontSize: 12.5, color: "#666" }}>{r.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#333" }}>{fmt(r.pays)}</span>
                </div>
                {r.split && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0 6px", borderBottom: "1px solid #f2f2f2" }}>
                    <span style={{ fontSize: 10.5, color: "#aaa", paddingLeft: 10 }}>↳ club keeps</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: col.bg }}>{fmt(r.keeps)}</span>
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0 2px" }}>
              <span style={{ fontSize: 11.5, color: "#999" }}>Club keeps total</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: col.bg }}>{fmt(monthly.total)}/mo</span>
            </div>
          </div>
        </div>
        {/* Budget share */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ background: "#c0392b", padding: "11px 16px" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1.2 }}>Their Share of Budget</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 3 }}>
              {fmt(budgetPerMember)}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/member</span>
            </div>
          </div>
          <div style={{ padding: "10px 16px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f2f2f2" }}>
              <span style={{ fontSize: 12.5, color: "#666" }}>Total Budget</span>
              <span style={{ fontSize: 12.5, color: "#999" }}>{fmt(totals.budgetTotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f2f2f2" }}>
              <span style={{ fontSize: 12.5, color: "#666" }}>Total Members</span>
              <span style={{ fontSize: 12.5, color: "#999" }}>{totalMembers}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span style={{ fontSize: 12.5, color: "#666" }}>Per Member</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#c0392b" }}>{fmt(budgetPerMember)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Net per member banner */}
      <div style={{
        background: netPerMember >= 0 ? "#eaf7ee" : "#fdf0ef",
        borderRadius: 12,
        border: "1px solid " + (netPerMember >= 0 ? "#c8e6d4" : "#f5c5c0"),
        padding: "18px 22px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <div>
          <div style={{ fontSize: 11, color: netPerMember >= 0 ? "#2e7d52" : "#c0392b", textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 600, marginBottom: 4 }}>
            {netPerMember >= 0 ? "✓ Net Positive" : "✗ Net Negative"} — Per Member
          </div>
          <div style={{ fontSize: 13.5, color: "#555" }}>
            <span style={{ color: col.bg, fontWeight: 600 }}>{fmt(m.total)}</span> brought in
            <span style={{ color: "#aaa", margin: "0 6px" }}>−</span>
            <span style={{ color: "#c0392b", fontWeight: 600 }}>{fmt(budgetPerMember)}</span> budget share
          </div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: netPerMember >= 0 ? "#2e7d52" : "#c0392b", letterSpacing: -1 }}>
          {netPerMember >= 0 ? "+" : "−"}{fmt(Math.abs(netPerMember))}
        </div>
      </div>
    </>
  );
}
// ─── MAIN APP ────────────────────────────────────────────────
function App() {
  const [goal, setGoal]             = useState(270000);
  const [activeTab, setActiveTab]   = useState("membership");
  const [tiers, setTiers]           = useState(defaultTiers);
  const [budget, setBudget]         = useState(defaultBudget);
  const [fundraisers, setFundraisers] = useState(defaultFundraisers);
  // ── tier CRUD ──
  const nextTierId  = Math.max(...tiers.map((t) => t.id), 0) + 1;
  const updateTier  = (id, updated) => setTiers((prev) => prev.map((t) => (t.id === id ? updated : t)));
  const removeTier  = (id) => setTiers((prev) => prev.filter((t) => t.id !== id));
  const addTier     = () => setTiers((prev) => [...prev, {
    id: nextTierId, name: "New Tier", members: 10, dues: 300, ticketsPerMonth: 4,
    centuries: 6, miscExpenses: 0, hasTickets: true, hasCenturies: true, hasMisc: false,
  }]);
  // ── budget CRUD ──
  const updateSection = (id, updated) => setBudget((prev) => prev.map((s) => (s.id === id ? updated : s)));
  const removeSection = (id) => setBudget((prev) => prev.filter((s) => s.id !== id));
  const addSection    = () => {
    const colors  = ["#2d1e3d", "#1e3d2d", "#3d1e2d", "#1a2e3d"];
    const accents = ["#a85bd9", "#5bd98a", "#d95b7a", "#5ba3d9"];
    const idx = budget.length % colors.length;
    setBudget((prev) => [...prev, { id: "section_" + Date.now(), label: "New Category", color: colors[idx], accent: accents[idx], items: [] }]);
  };
  // ── fundraiser CRUD ──
  const nextFundId       = Math.max(...fundraisers.map((f) => f.id), 0) + 1;
  const updateFundraiser = (id, updated) => setFundraisers((prev) => prev.map((f) => (f.id === id ? updated : f)));
  const removeFundraiser = (id) => setFundraisers((prev) => prev.filter((f) => f.id !== id));
  const addFundraiser    = () => setFundraisers((prev) => [...prev, { id: nextFundId, name: "New Fundraiser", cost: 10, profit: 100, estSold: 1 }]);
  // ── totals ──
  const totals = useMemo(() => {
    const membershipTotal  = tiers.reduce((sum, t) => sum + calcTier(t).total, 0);
    const budgetTotal      = budget.reduce((sum, s) => sum + s.items.reduce((ss, i) => ss + i.qty * i.unit, 0), 0);
    const fundraiserProfit = fundraisers.reduce((sum, f) => sum + f.profit * f.estSold, 0);
    const totalIncome      = membershipTotal + fundraiserProfit;
    return { membershipTotal, budgetTotal, fundraiserProfit, totalIncome, net: totalIncome - budgetTotal };
  }, [tiers, budget, fundraisers]);
  const surplus  = totals.net - goal;
  const onTarget = totals.totalIncome >= goal;
  const pct      = goal > 0 ? Math.min((totals.totalIncome / goal) * 100, 100) : 100;
  const tabs = [
    { id: "membership",  label: "Membership"  },
    { id: "budget",      label: "Budget"      },
    { id: "fundraisers", label: "Fundraisers" },
    { id: "member",      label: "Member View" },
  ];
  // ── fundraiser color palette (green family) ──
  const FUND_BG     = "#1e3d2d";
  const FUND_ACCENT = "#5bd98a";
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f4f5f7", minHeight: "100vh", padding: "28px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#999", marginBottom: 4 }}>Social Club</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: "#1a1a1a", letterSpacing: 0.5 }}>Membership & Revenue Model</h1>
        </div>
        {/* ── Goal / Summary Card ── */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", padding: "18px 22px", marginBottom: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>Total Income</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: -0.5 }}>{fmt(totals.totalIncome)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", marginBottom: 4 }}>Goal</div>
              <div style={{ display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 8, border: "1px solid #e0e0e0", overflow: "hidden" }}>
                <button onClick={() => setGoal((g) => Math.max(0, g - 5000))} style={{ width: 28, height: 30, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#eee"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >−</button>
                <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: 13, color: "#999" }}>$</span>
                  <input type="text" inputMode="numeric" value={goal}
                    onChange={(e) => { const r = e.target.value.replace(/[^0-9]/g, ""); setGoal(r === "" ? 0 : Number(r)); }}
                    style={{ width: 72, textAlign: "center", border: "none", background: "transparent", fontSize: 15, fontWeight: 700, color: "#1a1a1a", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <button onClick={() => setGoal((g) => g + 5000)} style={{ width: 28, height: 30, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#eee"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >+</button>
              </div>
            </div>
          </div>
          <div style={{ background: "#eee", borderRadius: 4, height: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "linear-gradient(90deg, #2e7d52, #4caf7a)" : "linear-gradient(90deg, #c0392b, #e74c3c)", borderRadius: 4, transition: "width 0.3s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: onTarget ? "#2e7d52" : "#c0392b" }}>
              {onTarget ? `✓ On target — ${fmt(totals.totalIncome - goal)} surplus` : `✗ ${fmt(goal - totals.totalIncome)} short of goal`}
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Membership</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{fmt(totals.membershipTotal)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Fundraisers</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: FUND_BG }}>{fmt(totals.fundraiserProfit)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Budget</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#c0392b" }}>−{fmt(totals.budgetTotal)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Net</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: totals.net >= 0 ? "#2e7d52" : "#c0392b" }}>{fmt(totals.net)}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "#1a1a2e" : "#fff",
                color:      activeTab === tab.id ? "#fff"    : "#666",
                border: "1px solid " + (activeTab === tab.id ? "#1a1a2e" : "#ddd"),
                borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              }}
            >{tab.label}</button>
          ))}
        </div>
        {/* ══════════ MEMBERSHIP TAB ══════════ */}
        {activeTab === "membership" && (
          <>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f8f8" }}>
                    {["Tier", "Members", "Dues", "Tickets", "Centuries", "Misc", "Total"].map((h, i) => (
                      <th key={h} style={{ padding: "9px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((t, idx) => {
                    const col = TIER_COLORS[idx % TIER_COLORS.length];
                    const c   = calcTier(t);
                    return (
                      <tr key={t.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: col.bg }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: col.accent, flexShrink: 0 }} />
                            {t.name}
                          </div>
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" }}>{t.members}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" }}>{fmt(c.dues)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasTickets   ? "#444" : "#bbb" }}>{t.hasTickets   ? fmt(c.tickets)   : "—"}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasCenturies ? "#444" : "#bbb" }}>{t.hasCenturies ? fmt(c.centuries) : "—"}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasMisc      ? "#444" : "#bbb" }}>{t.hasMisc      ? fmt(c.misc)      : "—"}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: col.accent }}>{fmt(c.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#f4f5f7", borderTop: "2px solid #e0e0e0" }}>
                    <td colSpan={6} style={{ padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Membership Total</td>
                    <td style={{ padding: "11px 12px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{fmt(totals.membershipTotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Adjust Tiers</div>
              <button onClick={addTier} style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Tier</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {tiers.map((tier, idx) => (
                <TierPanel key={tier.id} tier={tier} colorIdx={idx} onUpdate={(u) => updateTier(tier.id, u)} onRemove={() => removeTier(tier.id)} canRemove={tiers.length > 1} />
              ))}
            </div>
          </>
        )}
        {/* ══════════ BUDGET TAB ══════════ */}
        {activeTab === "budget" && (
          <>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f8f8" }}>
                    {["Category", "Items", "Subtotal"].map((h, i) => (
                      <th key={h} style={{ padding: "9px 14px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budget.map((s) => {
                    const sub = s.items.reduce((sum, i) => sum + i.qty * i.unit, 0);
                    return (
                      <tr key={s.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: s.color }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.accent, flexShrink: 0 }} />
                            {s.label}
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 12.5, color: "#888" }}>{s.items.length} item{s.items.length !== 1 ? "s" : ""}</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: s.accent }}>{fmt(sub)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#f4f5f7", borderTop: "2px solid #e0e0e0" }}>
                    <td colSpan={2} style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Total Budget</td>
                    <td style={{ padding: "11px 14px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#c0392b" }}>{fmt(totals.budgetTotal)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e4e4e4", padding: "14px 18px", marginBottom: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10.5, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Income − Budget = Net</div>
                <div style={{ fontSize: 14, color: "#555", marginTop: 3 }}>
                  {fmt(totals.totalIncome)} − {fmt(totals.budgetTotal)} = <span style={{ fontWeight: 700, color: totals.net >= 0 ? "#2e7d52" : "#c0392b" }}>{fmt(totals.net)}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>vs Goal</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: surplus >= 0 ? "#2e7d52" : "#c0392b" }}>{surplus >= 0 ? "+" : "−"}{fmt(Math.abs(surplus))}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Budget Categories</div>
              <button onClick={addSection} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Category</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {budget.map((s) => (
                <BudgetSection key={s.id} section={s} onUpdate={(u) => updateSection(s.id, u)} onRemove={() => removeSection(s.id)} />
              ))}
            </div>
          </>
        )}
        {/* ══════════ FUNDRAISERS TAB ══════════ */}
        {activeTab === "fundraisers" && (
          <>
            {/* Summary table */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f8f8" }}>
                    {["Fundraiser", "Member Cost", "Club Profit", "Est. Sold", "Total Profit"].map((h, i) => (
                      <th key={h} style={{ padding: "9px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fundraisers.map((f) => (
                    <tr key={f.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: FUND_BG }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: FUND_ACCENT, flexShrink: 0 }} />
                          {f.name}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: f.cost > 0 ? "#444" : "#bbb" }}>{f.cost > 0 ? fmt(f.cost) : "—"}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" }}>{fmt(f.profit)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" }}>{f.estSold}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: FUND_ACCENT }}>{fmt(f.profit * f.estSold)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#f4f5f7", borderTop: "2px solid #e0e0e0" }}>
                    <td colSpan={4} style={{ padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Total Fundraiser Profit</td>
                    <td style={{ padding: "11px 12px", textAlign: "right", fontSize: 15, fontWeight: 700, color: FUND_BG }}>{fmt(totals.fundraiserProfit)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Editable cards */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Manage Fundraisers</div>
              <button onClick={addFundraiser} style={{ background: FUND_BG, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Fundraiser</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {fundraisers.map((f) => {
                const upd = (k) => (v) => updateFundraiser(f.id, { ...f, [k]: v });
                return (
                  <div key={f.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    {/* card header */}
                    <div style={{ background: FUND_BG, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <input value={f.name} onChange={(e) => upd("name")(e.target.value)}
                        style={{ background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 240 }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>Total Profit</div>
                          <div style={{ color: FUND_ACCENT, fontSize: 16, fontWeight: 700 }}>{fmt(f.profit * f.estSold)}</div>
                        </div>
                        {fundraisers.length > 1 && (
                          <button onClick={() => removeFundraiser(f.id)} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                        )}
                      </div>
                    </div>
                    {/* card body */}
                    <div style={{ padding: "14px 16px 12px" }}>
                      <LabeledStepper label="Member Cost" value={f.cost}    min={0} max={9999}  step={1}   onChange={upd("cost")}    prefix="$" />
                      <LabeledStepper label="Club Profit" value={f.profit}  min={0} max={999999} step={100} onChange={upd("profit")}  prefix="$" />
                      <LabeledStepper label="Est. Sold"   value={f.estSold} min={0} max={9999}  step={1}   onChange={upd("estSold")} />
                      {/* margin note */}
                      {f.cost > 0 && (
                        <div style={{ marginTop: 10, fontSize: 11, color: "#aaa", paddingLeft: 120 }}>
                          Margin: {fmt(f.profit)} kept of {fmt(f.cost)} charged ({Math.round((f.profit / f.cost) * 100)}%)
                        </div>
                      )}
                      {f.cost === 0 && (
                        <div style={{ marginTop: 10, fontSize: 11, color: "#aaa", paddingLeft: 120 }}>
                          No member cost — pure club profit (e.g. sponsorship, game)
                        </div>
                      )}
                      {/* mini summary pills */}
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #eee", display: "flex", gap: 6 }}>
                        <div style={{ flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Per Unit</div>
                          <div style={{ fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 }}>{fmt(f.profit)}</div>
                        </div>
                        <div style={{ flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Est. Sold</div>
                          <div style={{ fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 }}>{f.estSold}</div>
                        </div>
                        <div style={{ flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Total</div>
                          <div style={{ fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 }}>{fmt(f.profit * f.estSold)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* ══════════ MEMBER VIEW TAB ══════════ */}
        {activeTab === "member" && (
          <MemberView tiers={tiers} totals={totals} />
        )}
      </div>
    </div>
  );
}
