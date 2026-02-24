(() => {
  const { useState, useEffect, useRef } = React;
  class AppErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    render() {
      var _a;
      if (this.state.hasError) {
        return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", background: "#f4f5f7", minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", padding: 32, maxWidth: 480, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, marginBottom: 12 } }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 } }, "Something went wrong"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#888", marginBottom: 20 } }, ((_a = this.state.error) == null ? void 0 : _a.message) || "Unknown error"), /* @__PURE__ */ React.createElement("button", { onClick: () => window.location.reload(), style: { background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" } }, "Reload page")));
      }
      return this.props.children;
    }
  }
  const TIER_COLORS = [
    { bg: "#1a1a2e", accent: "#e8a838", light: "#fef3d0" },
    { bg: "#1e2d3d", accent: "#5ba3d9", light: "#d6eaf5" },
    { bg: "#2d1e3d", accent: "#a85bd9", light: "#f0d6f5" },
    { bg: "#1e3d2d", accent: "#5bd98a", light: "#d6f5e4" },
    { bg: "#3d2d1e", accent: "#d9855b", light: "#f5e0d6" },
    { bg: "#2d3d1e", accent: "#8ad95b", light: "#e4f5d6" }
  ];
  const TICKET_MEMBER_COST = 20;
  const TICKET_REVENUE = 8;
  const CENTURY_MEMBER_COST = 200;
  const CENTURY_REVENUE = 82;
  const defaultTiers = [
    { id: 1, name: "Adult Men", members: 49, dues: 450, ticketsPerMonth: 6, centuries: 12, miscExpenses: 0, hasTickets: true, hasCenturies: true, hasMisc: true },
    { id: 2, name: "Adult Women", members: 40, dues: 800, ticketsPerMonth: 0, centuries: 6, miscExpenses: 0, hasTickets: false, hasCenturies: true, hasMisc: false },
    { id: 3, name: "Student (14\u201317)", members: 0, dues: 150, ticketsPerMonth: 3, centuries: 4, miscExpenses: 0, hasTickets: true, hasCenturies: true, hasMisc: false },
    { id: 4, name: "Sponsor (60+ / 25+ yrs)", members: 10, dues: 1200, ticketsPerMonth: 0, centuries: 0, miscExpenses: 0, hasTickets: false, hasCenturies: false, hasMisc: false }
  ];
  const defaultBudget = [
    {
      id: "show",
      label: "Show",
      color: "#1a1a2e",
      accent: "#e8a838",
      items: [
        { id: 1, name: "Suits", qty: 100, unit: 1100 },
        { id: 2, name: "Jacklin", qty: 30, unit: 233 },
        { id: 3, name: "Designer", qty: 1, unit: 5500 },
        { id: 4, name: "Painter", qty: 1, unit: 12e3 },
        { id: 5, name: "Garage", qty: 12, unit: 833.33 },
        { id: 6, name: "Hillman", qty: 1, unit: 2900 },
        { id: 7, name: "Foam", qty: 1, unit: 2e3 },
        { id: 8, name: "Light Action", qty: 12, unit: 3e3 }
      ]
    },
    {
      id: "dayof",
      label: "Day Of",
      color: "#1e2d3d",
      accent: "#5ba3d9",
      items: [
        { id: 1, name: "Busses", qty: 4, unit: 775 },
        { id: 2, name: "Rentals", qty: 1, unit: 1500 },
        { id: 3, name: "DJ", qty: 1, unit: 2e3 },
        { id: 4, name: "Speakers", qty: 2, unit: 500 },
        { id: 5, name: "Trucks", qty: 2, unit: 500 },
        { id: 6, name: "Floor", qty: 1, unit: 3500 },
        { id: 7, name: "New Years Day of Food", qty: 1, unit: 2e3 }
      ]
    },
    {
      id: "misc",
      label: "Misc",
      color: "#3d2d1e",
      accent: "#d9855b",
      items: [
        { id: 1, name: "Garage", qty: 12, unit: 2e3 },
        { id: 2, name: "Association Dues", qty: 12, unit: 833.33 },
        { id: 3, name: "Building Maintenance", qty: 1, unit: 1e4 }
      ]
    },
    {
      id: "taxesfees",
      label: "Taxes/Fees",
      color: "#2d3d1e",
      accent: "#8ad95b",
      items: [
        { id: 1, name: "Taxes/Fees", qty: 1, unit: 6600 },
        { id: 2, name: "Donations", qty: 1, unit: 4700 },
        { id: 3, name: "New Item", qty: 1, unit: 6e3 }
      ]
    },
    {
      id: "utilities",
      label: "Utilities",
      color: "#2d1e3d",
      accent: "#a85bd9",
      items: [
        { id: 1, name: "Electric", qty: 1, unit: 1e4 },
        { id: 2, name: "Gas", qty: 1, unit: 3e3 },
        { id: 3, name: "Exterminator", qty: 1, unit: 500 },
        { id: 4, name: "Water", qty: 1, unit: 1800 },
        { id: 5, name: "Club Insurance", qty: 1, unit: 7600 }
      ]
    }
  ];
  const defaultFundraisers = [
    { id: 1, name: "Eagles Blocks", cost: 0, profit: 3e3, estSold: 1 },
    { id: 2, name: "King of Hearts", cost: 0, profit: 3e4, estSold: 1 },
    { id: 3, name: "Eagles Frenzy", cost: 0, profit: 7500, estSold: 1 },
    { id: 4, name: "Phillies Front Row Frenzy", cost: 0, profit: 7500, estSold: 1 },
    { id: 5, name: "Super Bowl", cost: 0, profit: 100, estSold: 1 },
    { id: 6, name: "50/50 Kazoo Day", cost: 0, profit: 7500, estSold: 1 },
    { id: 7, name: "NCAA Block", cost: 0, profit: 3500, estSold: 1 },
    { id: 8, name: "Thanksgiving Block", cost: 0, profit: 2500, estSold: 1 },
    { id: 9, name: "Christmas Block", cost: 0, profit: 2500, estSold: 1 },
    { id: 10, name: "Peel Tickets", cost: 0, profit: 5e3, estSold: 1 },
    { id: 11, name: "Rentals", cost: 0, profit: 11400, estSold: 1 },
    { id: 12, name: "Small Business", cost: 0, profit: 5e3, estSold: 1 },
    { id: 13, name: "Kazoo Day", cost: 0, profit: 5e3, estSold: 1 },
    { id: 14, name: "Slot", cost: 0, profit: 1500, estSold: 1 },
    { id: 15, name: "Ham Block", cost: 0, profit: 2e3, estSold: 1 },
    { id: 16, name: "Family Day Phillies Block", cost: 0, profit: 1e3, estSold: 1 },
    { id: 17, name: "NCAA Brackets", cost: 0, profit: 1e3, estSold: 1 },
    { id: 18, name: "Giveback", cost: 0, profit: 1e3, estSold: 1 },
    { id: 19, name: "Kazoo Day Shirts", cost: 0, profit: 2e3, estSold: 1 },
    { id: 20, name: "Cow Chip", cost: 0, profit: 2e3, estSold: 1 },
    { id: 21, name: "EOM", cost: 0, profit: 3500, estSold: 1 }
  ];
  const defaultMembers = [
    // Example: { id: 1, tierId: 1, name: "John Smith", ticketsPerMonth: 10, centuries: 15 }
  ];
  const fmt = (n) => "$" + Math.round(n).toLocaleString();
  function calcTier(t) {
    const dues = t.members * t.dues;
    const tickets = t.hasTickets ? t.members * t.ticketsPerMonth * TICKET_REVENUE * 12 : 0;
    const centuries = t.hasCenturies ? t.members * t.centuries * CENTURY_REVENUE : 0;
    const misc = t.hasMisc ? t.members * t.miscExpenses : 0;
    return { dues, tickets, centuries, misc, total: dues + tickets + centuries + misc };
  }
  function calcSingleMember(t) {
    const dues = t.dues;
    const tickets = t.hasTickets ? t.ticketsPerMonth * TICKET_REVENUE * 12 : 0;
    const centuries = t.hasCenturies ? t.centuries * CENTURY_REVENUE : 0;
    const misc = t.hasMisc ? t.miscExpenses : 0;
    return { dues, tickets, centuries, misc, total: dues + tickets + centuries + misc };
  }
  function Stepper({ value, min = 0, max = 9999, step = 1, onChange, prefix = "", width = 120 }) {
    const dec = () => onChange(Math.max(min, value - step));
    const inc = () => onChange(Math.min(max, value + step));
    const handleChange = (e) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      if (raw === "" || raw === ".") {
        onChange(0);
        return;
      }
      onChange(Math.min(max, Math.max(min, Number(raw))));
    };
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 7, border: "1px solid #e0e0e0", overflow: "hidden", width } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: dec,
        style: { width: 26, height: 32, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
        onMouseEnter: (e) => e.currentTarget.style.background = "#eee",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      "\u2212"
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", flex: 1, justifyContent: "center", minWidth: 0 } }, prefix && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "#999", flexShrink: 0 } }, prefix), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        inputMode: "numeric",
        value,
        onChange: handleChange,
        style: { width: "100%", textAlign: "center", border: "none", background: "transparent", fontSize: 13, fontWeight: 700, color: "#1a1a1a", outline: "none", fontFamily: "inherit" }
      }
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: inc,
        style: { width: 26, height: 32, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
        onMouseEnter: (e) => e.currentTarget.style.background = "#eee",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      "+"
    ));
  }
  function LabeledStepper({ label, value, min, max, step, onChange, prefix, suffix }) {
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#666", width: 112, flexShrink: 0 } }, label), /* @__PURE__ */ React.createElement(Stepper, { value, min, max, step, onChange, prefix, width: 160 }), suffix && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#999" } }, suffix));
  }
  function TierPanel({ tier, colorIdx, onUpdate, onRemove, canRemove }) {
    const col = TIER_COLORS[colorIdx % TIER_COLORS.length];
    const calc = calcTier(tier);
    const upd = (k) => (v) => onUpdate({ ...tier, [k]: v });
    return /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: col.bg, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: tier.name,
        onChange: (e) => upd("name")(e.target.value),
        style: { background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 200 }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.45)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 } }, "Tier Total"), /* @__PURE__ */ React.createElement("div", { style: { color: col.accent, fontSize: 16, fontWeight: 700 } }, fmt(calc.total))), canRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: { background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" } }, "\xD7"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 12px" } }, /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Members", value: tier.members, min: 0, max: 500, step: 1, onChange: upd("members"), suffix: "ppl" }), /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Annual Dues", value: tier.dues, min: 0, max: 5e3, step: 25, onChange: upd("dues"), prefix: "$" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, marginTop: 12, marginBottom: 8, flexWrap: "wrap" } }, [{ key: "hasTickets", label: "Tickets" }, { key: "hasCenturies", label: "Centuries" }, { key: "hasMisc", label: "Misc" }].map(({ key, label }) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }, onClick: () => upd(key)(!tier[key]) }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 18, borderRadius: 9, background: tier[key] ? col.accent : "#ccc", position: "relative", transition: "background 0.2s" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: tier[key] ? 16 : 2, transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "#777" } }, label)))), tier.hasTickets && /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 } }, /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Tickets / mo", value: tier.ticketsPerMonth, min: 0, max: 30, step: 1, onChange: upd("ticketsPerMonth") }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 } }, "Club earns $", TICKET_REVENUE, " per ticket")), tier.hasMisc && /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 } }, /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Misc / yr", value: tier.miscExpenses, min: 0, max: 9999, step: 25, onChange: upd("miscExpenses"), prefix: "$" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 } }, "Annual misc expenses per member")), tier.hasCenturies && /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 6 } }, /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Centuries / yr", value: tier.centuries, min: 0, max: 24, step: 1, onChange: upd("centuries") }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#aaa", marginLeft: 120, marginTop: 2 } }, "Club earns $", CENTURY_REVENUE, " per century")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 10, borderTop: "1px solid #eee", display: "flex", gap: 6, flexWrap: "wrap" } }, [
      { label: "Dues", val: calc.dues },
      ...tier.hasTickets ? [{ label: "Tickets", val: calc.tickets }] : [],
      ...tier.hasCenturies ? [{ label: "Centuries", val: calc.centuries }] : [],
      ...tier.hasMisc ? [{ label: "Misc", val: calc.misc }] : []
    ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, style: { flex: 1, minWidth: 68, background: col.light, borderRadius: 6, padding: "5px 6px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 } }, item.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: col.bg, marginTop: 1 } }, fmt(item.val)))))));
  }
  function BudgetSection({ section, onUpdate, onRemove }) {
    const subtotal = section.items.reduce((s, i) => s + i.qty * i.unit, 0);
    const nextItemId = Math.max(...section.items.map((i) => i.id), 0) + 1;
    const updateItem = (id, updated) => onUpdate({ ...section, items: section.items.map((i) => i.id === id ? updated : i) });
    const removeItem = (id) => onUpdate({ ...section, items: section.items.filter((i) => i.id !== id) });
    const addItem = () => onUpdate({ ...section, items: [...section.items, { id: nextItemId, name: "New Item", qty: 1, unit: 0 }] });
    return /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: section.color, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: section.label,
        onChange: (e) => onUpdate({ ...section, label: e.target.value }),
        style: { background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 160 }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { color: section.accent, fontSize: 16, fontWeight: 700 } }, fmt(subtotal)), /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: { background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" } }, "\xD7"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 96px 108px 108px 26px", gap: 6, padding: "7px 14px 5px", borderBottom: "1px solid #eee" } }, ["Item", "Qty", "Unit Cost", "Subtotal", ""].map((h) => /* @__PURE__ */ React.createElement("div", { key: h, style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600, textAlign: h === "Item" || h === "" ? "left" : "right" } }, h))), /* @__PURE__ */ React.createElement("div", { style: { padding: "5px 14px 10px" } }, section.items.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, style: { display: "grid", gridTemplateColumns: "1fr 96px 108px 108px 26px", gap: 6, alignItems: "center", padding: "4px 0", borderBottom: "1px solid #f4f4f4" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: item.name,
        onChange: (e) => updateItem(item.id, { ...item, name: e.target.value }),
        style: { border: "none", fontSize: 13, color: "#1a1a1a", fontWeight: 500, outline: "none", fontFamily: "inherit", background: "transparent", minWidth: 0 }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { justifySelf: "end" } }, /* @__PURE__ */ React.createElement(Stepper, { value: item.qty, min: 0, max: 9999, step: 1, onChange: (v) => updateItem(item.id, { ...item, qty: v }), width: 96 })), /* @__PURE__ */ React.createElement("div", { style: { justifySelf: "end" } }, /* @__PURE__ */ React.createElement(Stepper, { value: item.unit, min: 0, max: 999999, step: 100, onChange: (v) => updateItem(item.id, { ...item, unit: v }), prefix: "$", width: 108 })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", fontSize: 13, fontWeight: 700, color: section.color } }, fmt(item.qty * item.unit)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => removeItem(item.id),
        style: { background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" },
        onMouseEnter: (e) => e.currentTarget.style.color = "#c0392b",
        onMouseLeave: (e) => e.currentTarget.style.color = "#ccc"
      },
      "\xD7"
    ))), /* @__PURE__ */ React.createElement("button", { onClick: addItem, style: { marginTop: 8, background: "none", border: "none", color: section.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "4px 0", fontFamily: "inherit" } }, "+ Add Item")));
  }
  function MemberView({ tiers, totals }) {
    const [selectedTier, setSelectedTier] = useState(0);
    const tier = tiers[Math.min(selectedTier, tiers.length - 1)];
    const col = TIER_COLORS[Math.min(selectedTier, tiers.length - 1) % TIER_COLORS.length];
    const totalMembers = tiers.reduce((s, t) => s + t.members, 0);
    const m = calcSingleMember(tier);
    const memberPays = {
      dues: tier.dues,
      tickets: tier.hasTickets ? tier.ticketsPerMonth * TICKET_MEMBER_COST * 12 : 0,
      centuries: tier.hasCenturies ? tier.centuries * CENTURY_MEMBER_COST : 0,
      misc: tier.hasMisc ? tier.miscExpenses : 0
    };
    memberPays.total = memberPays.dues + memberPays.tickets + memberPays.centuries + memberPays.misc;
    const budgetPerMember = totalMembers > 0 ? totals.budgetTotal / totalMembers : 0;
    const netPerMember = m.total - budgetPerMember;
    const monthly = {
      dues: m.dues / 12,
      tickets: tier.hasTickets ? tier.ticketsPerMonth * TICKET_REVENUE : 0,
      centuries: tier.hasCenturies ? tier.centuries * CENTURY_REVENUE / 12 : 0,
      misc: tier.hasMisc ? tier.miscExpenses / 12 : 0
    };
    monthly.total = monthly.dues + monthly.tickets + monthly.centuries + monthly.misc;
    const monthlyPays = {
      dues: memberPays.dues / 12,
      tickets: tier.hasTickets ? tier.ticketsPerMonth * TICKET_MEMBER_COST : 0,
      centuries: tier.hasCenturies ? tier.centuries * CENTURY_MEMBER_COST / 12 : 0,
      misc: tier.hasMisc ? tier.miscExpenses / 12 : 0
    };
    monthlyPays.total = monthlyPays.dues + monthlyPays.tickets + monthlyPays.centuries + monthlyPays.misc;
    const maxVal = Math.max(memberPays.dues, memberPays.tickets, memberPays.centuries, memberPays.misc, 1);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" } }, tiers.map((t, idx) => {
      const c = TIER_COLORS[idx % TIER_COLORS.length];
      const sel = idx === selectedTier;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: t.id,
          onClick: () => setSelectedTier(idx),
          style: {
            background: sel ? c.bg : "#fff",
            color: sel ? "#fff" : "#555",
            border: "1px solid " + (sel ? c.bg : "#ddd"),
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            gap: 7
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: c.accent } }),
        t.name,
        /* @__PURE__ */ React.createElement("span", { style: { color: sel ? "rgba(255,255,255,0.5)" : "#bbb", fontSize: 11, fontWeight: 400 } }, "(", t.members, ")")
      );
    })), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: col.bg, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5 } }, "One Member"), /* @__PURE__ */ React.createElement("div", { style: { color: "#fff", fontSize: 18, fontWeight: 600, marginTop: 2 } }, tier.name)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5 } }, "Pays / Year"), /* @__PURE__ */ React.createElement("div", { style: { color: col.accent, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 } }, fmt(memberPays.total)))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 20px 8px" } }, [
      { label: "Annual Dues", pays: memberPays.dues, keeps: m.dues, show: true, split: false, detail: null },
      { label: "Tickets", pays: memberPays.tickets, keeps: m.tickets, show: tier.hasTickets, split: true, detail: `${tier.ticketsPerMonth}/mo \xD7 $${TICKET_MEMBER_COST} \xD7 12`, unitPays: TICKET_MEMBER_COST, unitKeeps: TICKET_REVENUE },
      { label: "Centuries", pays: memberPays.centuries, keeps: m.centuries, show: tier.hasCenturies, split: true, detail: `${tier.centuries}/yr \xD7 $${CENTURY_MEMBER_COST}`, unitPays: CENTURY_MEMBER_COST, unitKeeps: CENTURY_REVENUE },
      { label: "Misc", pays: memberPays.misc, keeps: m.misc, show: tier.hasMisc, split: false, detail: `$${tier.miscExpenses}/yr` }
    ].filter((r) => r.show).map((row) => {
      const keepsPct = row.pays > 0 ? row.keeps / row.pays * 100 : 100;
      return /* @__PURE__ */ React.createElement("div", { key: row.label, style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, fontWeight: 600, color: "#1a1a1a" } }, row.label), row.detail && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, color: "#aaa", fontStyle: "italic" } }, row.detail)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 700, color: col.bg } }, fmt(row.pays))), /* @__PURE__ */ React.createElement("div", { style: { background: "#eee", borderRadius: 5, height: 11, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
        height: "100%",
        width: `${row.pays / maxVal * 100}%`,
        borderRadius: 5,
        transition: "width 0.35s ease",
        minWidth: row.pays > 0 ? 6 : 0,
        background: row.split ? `linear-gradient(90deg, ${col.accent} 0%, ${col.accent} ${keepsPct}%, #c8c8c8 ${keepsPct}%, #c8c8c8 100%)` : col.accent
      } })), row.split && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: 2, background: col.accent } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, color: "#777" } }, "Club keeps $", row.unitKeeps, " = ", fmt(row.keeps))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: 2, background: "#c8c8c8" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, color: "#777" } }, "Passes thru $", row.unitPays - row.unitKeeps, " = ", fmt(row.pays - row.keeps)))));
    }), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #eee", paddingTop: 10, marginTop: 2, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#666" } }, "Club actually keeps"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 700, color: col.bg } }, fmt(m.total))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: col.bg, padding: "11px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.5)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1.2 } }, "Member Pays / Mo"), /* @__PURE__ */ React.createElement("div", { style: { color: col.accent, fontSize: 22, fontWeight: 700, marginTop: 3 } }, fmt(monthlyPays.total), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400 } }, "/mo"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px 12px" } }, [
      { label: "Dues", pays: monthlyPays.dues, keeps: monthly.dues, split: false },
      ...tier.hasTickets ? [{ label: "Tickets", pays: monthlyPays.tickets, keeps: monthly.tickets, split: true }] : [],
      ...tier.hasCenturies ? [{ label: "Centuries", pays: monthlyPays.centuries, keeps: monthly.centuries, split: true }] : [],
      ...tier.hasMisc ? [{ label: "Misc", pays: monthlyPays.misc, keeps: monthly.misc, split: false }] : []
    ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.label }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: r.split ? "none" : "1px solid #f2f2f2" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#666" } }, r.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: "#333" } }, fmt(r.pays))), r.split && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "2px 0 6px", borderBottom: "1px solid #f2f2f2" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, color: "#aaa", paddingLeft: 10 } }, "\u21B3 club keeps"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 600, color: col.bg } }, fmt(r.keeps))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0 2px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "#999" } }, "Club keeps total"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: col.bg } }, fmt(monthly.total), "/mo")))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#c0392b", padding: "11px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.6)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1.2 } }, "Their Share of Budget"), /* @__PURE__ */ React.createElement("div", { style: { color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 3 } }, fmt(budgetPerMember), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 400 } }, "/member"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f2f2f2" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#666" } }, "Total Budget"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#999" } }, fmt(totals.budgetTotal))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f2f2f2" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#666" } }, "Total Members"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#999" } }, totalMembers)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "#666" } }, "Per Member"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: "#c0392b" } }, fmt(budgetPerMember)))))), /* @__PURE__ */ React.createElement("div", { style: {
      background: netPerMember >= 0 ? "#eaf7ee" : "#fdf0ef",
      borderRadius: 12,
      border: "1px solid " + (netPerMember >= 0 ? "#c8e6d4" : "#f5c5c0"),
      padding: "18px 22px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: netPerMember >= 0 ? "#2e7d52" : "#c0392b", textTransform: "uppercase", letterSpacing: 1.4, fontWeight: 600, marginBottom: 4 } }, netPerMember >= 0 ? "\u2713 Net Positive" : "\u2717 Net Negative", " \u2014 Per Member"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: "#555" } }, /* @__PURE__ */ React.createElement("span", { style: { color: col.bg, fontWeight: 600 } }, fmt(m.total)), " brought in", /* @__PURE__ */ React.createElement("span", { style: { color: "#aaa", margin: "0 6px" } }, "\u2212"), /* @__PURE__ */ React.createElement("span", { style: { color: "#c0392b", fontWeight: 600 } }, fmt(budgetPerMember)), " budget share")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, fontWeight: 700, color: netPerMember >= 0 ? "#2e7d52" : "#c0392b", letterSpacing: -1 } }, netPerMember >= 0 ? "+" : "\u2212", fmt(Math.abs(netPerMember)))));
  }
  function App() {
    var _a;
    const [goal, setGoal] = useState(27e4);
    const [activeTab, setActiveTab] = useState("membership");
    const [tiers, setTiers] = useState(defaultTiers);
    const [budget, setBudget] = useState(defaultBudget);
    const [fundraisers, setFundraisers] = useState(defaultFundraisers);
    const [members, setMembers] = useState(defaultMembers);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [saveError, setSaveError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isMobileTabs, setIsMobileTabs] = useState(typeof window !== "undefined" ? window.innerWidth < 760 : false);
    const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
    const hasInitializedSave = useRef(false);
    useEffect(() => {
      let active = true;
      const checkSession = async () => {
        try {
          const response = await fetch("/api/session", { credentials: "same-origin" });
          if (!response.ok) {
            throw new Error("Session check failed");
          }
          const data = await response.json();
          if (!active) {
            return;
          }
          setIsAuthenticated(Boolean(data.authenticated));
        } catch (error) {
          if (!active) {
            return;
          }
          setIsAuthenticated(false);
        } finally {
          if (active) {
            setIsCheckingAuth(false);
          }
        }
      };
      checkSession();
      return () => {
        active = false;
      };
    }, []);
    useEffect(() => {
      if (!isAuthenticated) {
        setIsLoadingData(false);
        return;
      }
      let active = true;
      setIsLoadingData(true);
      const loadSavedModel = async () => {
        try {
          const response = await fetch("/api/model", { credentials: "same-origin" });
          if (!response.ok) {
            if (response.status === 401) {
              setIsAuthenticated(false);
              setSaveError("Session expired. Please log in again.");
              return;
            }
            throw new Error("Failed to load model data");
          }
          const data = await response.json();
          if (!active) {
            return;
          }
          setGoal(Number.isFinite(data.goal) ? data.goal : 27e4);
          setTiers(Array.isArray(data.tiers) ? data.tiers : defaultTiers);
          setBudget(Array.isArray(data.budget) ? data.budget : defaultBudget);
          setFundraisers(Array.isArray(data.fundraisers) ? data.fundraisers : defaultFundraisers);
          setMembers(Array.isArray(data.members) ? data.members : defaultMembers);
          setSaveError("");
        } catch (error) {
          if (!active) {
            return;
          }
          setSaveError("Shared storage unavailable.");
        } finally {
          if (active) {
            setIsLoadingData(false);
          }
        }
      };
      loadSavedModel();
      return () => {
        active = false;
      };
    }, [isAuthenticated]);
    useEffect(() => {
      if (isLoadingData || !isAuthenticated) {
        return;
      }
      if (!hasInitializedSave.current) {
        hasInitializedSave.current = true;
        return;
      }
      const timer = setTimeout(async () => {
        try {
          setIsSaving(true);
          const response = await fetch("/api/model", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ goal, tiers, budget, fundraisers, members })
          });
          if (!response.ok) {
            if (response.status === 401) {
              setIsAuthenticated(false);
              setSaveError("Session expired. Please log in again.");
              return;
            }
            throw new Error("Failed to save model data");
          }
          setSaveError("");
        } catch (error) {
          setSaveError("Could not save changes to shared storage.");
        } finally {
          setIsSaving(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    }, [goal, tiers, budget, fundraisers, members, isLoadingData, isAuthenticated]);
    useEffect(() => {
      const onResize = () => {
        setIsMobileTabs(window.innerWidth < 760);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);
    useEffect(() => {
      setIsTabMenuOpen(false);
    }, [activeTab, isMobileTabs]);
    const submitLogin = async (e) => {
      e.preventDefault();
      setLoginError("");
      setIsLoggingIn(true);
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ username: loginUsername, password: loginPassword })
        });
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        setIsAuthenticated(true);
        setLoginPassword("");
        setSaveError("");
      } catch (error) {
        setLoginError("Invalid username or password.");
      } finally {
        setIsLoggingIn(false);
      }
    };
    const logout = async () => {
      try {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        });
      } finally {
        setIsAuthenticated(false);
        setLoginPassword("");
        setLoginError("");
      }
    };
    if (isCheckingAuth) {
      return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f4f5f7", minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { color: "#666", fontSize: 14 } }, "Checking login..."));
    }
    if (isAuthenticated && isLoadingData) {
      return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f4f5f7", minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#999", marginBottom: 8 } }, "Social Club"), /* @__PURE__ */ React.createElement("div", { style: { color: "#555", fontSize: 15 } }, "Loading shared data...")));
    }
    if (!isAuthenticated) {
      return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f4f5f7", minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("form", { onSubmit: submitLogin, style: { width: "100%", maxWidth: 380, background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#999", marginBottom: 4 } }, "Social Club"), /* @__PURE__ */ React.createElement("h1", { style: { margin: 0, fontSize: 22, fontWeight: 400, color: "#1a1a1a", letterSpacing: 0.5 } }, "Sign In")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#666", marginBottom: 5 } }, "Username"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          value: loginUsername,
          onChange: (e) => setLoginUsername(e.target.value),
          style: { width: "100%", border: "1px solid #d9d9d9", borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }
        }
      )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#666", marginBottom: 5 } }, "Password"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "password",
          value: loginPassword,
          onChange: (e) => setLoginPassword(e.target.value),
          style: { width: "100%", border: "1px solid #d9d9d9", borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }
        }
      )), loginError && /* @__PURE__ */ React.createElement("div", { style: { color: "#c0392b", fontSize: 12, marginBottom: 12 } }, loginError), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: isLoggingIn, style: { width: "100%", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 12px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: isLoggingIn ? 0.7 : 1 } }, isLoggingIn ? "Signing in..." : "Sign In")));
    }
    const nextTierId = Math.max(...tiers.map((t) => t.id), 0) + 1;
    const updateTier = (id, updated) => setTiers((prev) => prev.map((t) => t.id === id ? updated : t));
    const removeTier = (id) => setTiers((prev) => prev.filter((t) => t.id !== id));
    const addTier = () => setTiers((prev) => [...prev, {
      id: nextTierId,
      name: "New Tier",
      members: 10,
      dues: 300,
      ticketsPerMonth: 4,
      centuries: 6,
      miscExpenses: 0,
      hasTickets: true,
      hasCenturies: true,
      hasMisc: false
    }]);
    const updateSection = (id, updated) => setBudget((prev) => prev.map((s) => s.id === id ? updated : s));
    const removeSection = (id) => setBudget((prev) => prev.filter((s) => s.id !== id));
    const addSection = () => {
      const colors = ["#2d1e3d", "#1e3d2d", "#3d1e2d", "#1a2e3d"];
      const accents = ["#a85bd9", "#5bd98a", "#d95b7a", "#5ba3d9"];
      const idx = budget.length % colors.length;
      setBudget((prev) => [...prev, { id: "section_" + Date.now(), label: "New Category", color: colors[idx], accent: accents[idx], items: [] }]);
    };
    const nextFundId = Math.max(...fundraisers.map((f) => f.id), 0) + 1;
    const updateFundraiser = (id, updated) => setFundraisers((prev) => prev.map((f) => f.id === id ? updated : f));
    const removeFundraiser = (id) => setFundraisers((prev) => prev.filter((f) => f.id !== id));
    const addFundraiser = () => setFundraisers((prev) => [...prev, { id: nextFundId, name: "New Fundraiser", cost: 10, profit: 100, estSold: 1 }]);
    const nextMemberId = Math.max(...members.map((m) => m.id), 0) + 1;
    const updateMember = (id, updated) => setMembers((prev) => prev.map((m) => m.id === id ? updated : m));
    const removeMember = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));
    const addMember = (tierId) => setMembers((prev) => [...prev, { id: nextMemberId, tierId, name: "New Member", ticketsPerMonth: 0, centuries: 0 }]);
    const totals = (() => {
      const membershipTotal = tiers.reduce((sum, t) => sum + calcTier(t).total, 0);
      const memberOverages = members.reduce((sum, m) => {
        const tier = tiers.find((t) => t.id === m.tierId);
        if (!tier) return sum;
        const tierTickets = tier.hasTickets ? tier.ticketsPerMonth : 0;
        const tierCenturies = tier.hasCenturies ? tier.centuries : 0;
        const extraTickets = Math.max(0, m.ticketsPerMonth - tierTickets) * TICKET_REVENUE * 12;
        const extraCenturies = Math.max(0, m.centuries - tierCenturies) * CENTURY_REVENUE;
        return sum + extraTickets + extraCenturies;
      }, 0);
      const budgetTotal = budget.reduce((sum, s) => sum + s.items.reduce((ss, i) => ss + i.qty * i.unit, 0), 0);
      const fundraiserProfit = fundraisers.reduce((sum, f) => sum + f.profit * f.estSold, 0);
      const totalIncome = membershipTotal + memberOverages + fundraiserProfit;
      return { membershipTotal, memberOverages, budgetTotal, fundraiserProfit, totalIncome, net: totalIncome - budgetTotal };
    })();
    const surplus = totals.net - goal;
    const onTarget = totals.totalIncome >= goal;
    const pct = goal > 0 ? Math.min(totals.totalIncome / goal * 100, 100) : 100;
    const tabs = [
      { id: "membership", label: "Membership" },
      { id: "budget", label: "Budget" },
      { id: "fundraisers", label: "Fundraisers" },
      { id: "members", label: "Members" },
      { id: "member", label: "Member View" }
    ];
    const FUND_BG = "#1e3d2d";
    const FUND_ACCENT = "#5bd98a";
    return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f4f5f7", minHeight: "100vh", padding: "28px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 780, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#999", marginBottom: 4 } }, "Social Club"), /* @__PURE__ */ React.createElement("h1", { style: { margin: 0, fontSize: 24, fontWeight: 400, color: "#1a1a1a", letterSpacing: 0.5 } }, "Membership & Revenue Model"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11, color: saveError ? "#c0392b" : "#888" } }, saveError ? saveError : isLoadingData ? "Loading shared data..." : isSaving ? "Saving..." : "All changes saved"), /* @__PURE__ */ React.createElement("button", { onClick: logout, style: { marginTop: 10, background: "#fff", color: "#666", border: "1px solid #ddd", borderRadius: 6, padding: "5px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" } }, "Log out")), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", padding: "18px 22px", marginBottom: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", marginBottom: 3 } }, "Total Income"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: -0.5 } }, fmt(totals.totalIncome))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", marginBottom: 4 } }, "Goal"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 8, border: "1px solid #e0e0e0", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setGoal((g) => Math.max(0, g - 5e3)),
        style: { width: 28, height: 30, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
        onMouseEnter: (e) => e.currentTarget.style.background = "#eee",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      "\u2212"
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#999" } }, "$"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        inputMode: "numeric",
        value: goal,
        onChange: (e) => {
          const r = e.target.value.replace(/[^0-9]/g, "");
          setGoal(r === "" ? 0 : Number(r));
        },
        style: { width: 72, textAlign: "center", border: "none", background: "transparent", fontSize: 15, fontWeight: 700, color: "#1a1a1a", outline: "none", fontFamily: "inherit" }
      }
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setGoal((g) => g + 5e3),
        style: { width: 28, height: 30, border: "none", background: "transparent", color: "#999", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
        onMouseEnter: (e) => e.currentTarget.style.background = "#eee",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      "+"
    )))), /* @__PURE__ */ React.createElement("div", { style: { background: "#eee", borderRadius: 4, height: 8, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: pct >= 100 ? "linear-gradient(90deg, #2e7d52, #4caf7a)" : "linear-gradient(90deg, #c0392b, #e74c3c)", borderRadius: 4, transition: "width 0.3s ease" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: onTarget ? "#2e7d52" : "#c0392b" } }, onTarget ? `\u2713 On target \u2014 ${fmt(totals.totalIncome - goal)} surplus` : `\u2717 ${fmt(goal - totals.totalIncome)} short of goal`), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 } }, "Membership"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#1a1a2e" } }, fmt(totals.membershipTotal))), totals.memberOverages > 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 } }, "+ Overages"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#5ba3d9" } }, fmt(totals.memberOverages))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 } }, "Fundraisers"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: FUND_BG } }, fmt(totals.fundraiserProfit))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 } }, "Budget"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "#c0392b" } }, "\u2212", fmt(totals.budgetTotal))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 } }, "Net"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: totals.net >= 0 ? "#2e7d52" : "#c0392b" } }, fmt(totals.net)))))), isMobileTabs ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "#1a1a1a" } }, ((_a = tabs.find((t) => t.id === activeTab)) == null ? void 0 : _a.label) || "Select Tab"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIsTabMenuOpen((open) => !open),
        style: {
          background: "#fff",
          color: "#1a1a2e",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "7px 10px",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          lineHeight: 1
        },
        "aria-label": "Toggle tab menu"
      },
      "\u2630"
    )), isTabMenuOpen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, background: "#fff", border: "1px solid #ddd", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" } }, tabs.map((tab) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        style: {
          width: "100%",
          textAlign: "left",
          background: activeTab === tab.id ? "#1a1a2e" : "#fff",
          color: activeTab === tab.id ? "#fff" : "#444",
          border: "none",
          borderBottom: "1px solid #eee",
          padding: "10px 12px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      },
      tab.label
    )))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 18 } }, tabs.map((tab) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        style: {
          background: activeTab === tab.id ? "#1a1a2e" : "#fff",
          color: activeTab === tab.id ? "#fff" : "#666",
          border: "1px solid " + (activeTab === tab.id ? "#1a1a2e" : "#ddd"),
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.15s"
        }
      },
      tab.label
    ))), activeTab === "membership" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f8f8f8" } }, ["Tier", "Members", "Dues", "Tickets", "Centuries", "Misc", "Total"].map((h, i) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, tiers.map((t, idx) => {
      const col = TIER_COLORS[idx % TIER_COLORS.length];
      const c = calcTier(t);
      return /* @__PURE__ */ React.createElement("tr", { key: t.id, style: { borderBottom: "1px solid #f0f0f0" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", fontSize: 13, fontWeight: 600, color: col.bg } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: col.accent, flexShrink: 0 } }), t.name)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" } }, t.members), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" } }, fmt(c.dues)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasTickets ? "#444" : "#bbb" } }, t.hasTickets ? fmt(c.tickets) : "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasCenturies ? "#444" : "#bbb" } }, t.hasCenturies ? fmt(c.centuries) : "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: t.hasMisc ? "#444" : "#bbb" } }, t.hasMisc ? fmt(c.misc) : "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: col.accent } }, fmt(c.total)));
    })), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f4f5f7", borderTop: "2px solid #e0e0e0" } }, /* @__PURE__ */ React.createElement("td", { colSpan: 6, style: { padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" } }, "Membership Total"), /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 12px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#1a1a2e" } }, fmt(totals.membershipTotal)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 } }, "Adjust Tiers"), /* @__PURE__ */ React.createElement("button", { onClick: addTier, style: { background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "+ Add Tier")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, tiers.map((tier, idx) => /* @__PURE__ */ React.createElement(TierPanel, { key: tier.id, tier, colorIdx: idx, onUpdate: (u) => updateTier(tier.id, u), onRemove: () => removeTier(tier.id), canRemove: tiers.length > 1 })))), activeTab === "budget" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f8f8f8" } }, ["Category", "Items", "Subtotal"].map((h, i) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 14px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, budget.map((s) => {
      const sub = s.items.reduce((sum, i) => sum + i.qty * i.unit, 0);
      return /* @__PURE__ */ React.createElement("tr", { key: s.id, style: { borderBottom: "1px solid #f0f0f0" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 14px", fontSize: 13, fontWeight: 600, color: s.color } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: s.accent, flexShrink: 0 } }), s.label)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 14px", textAlign: "right", fontSize: 12.5, color: "#888" } }, s.items.length, " item", s.items.length !== 1 ? "s" : ""), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 14px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: s.accent } }, fmt(sub)));
    })), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f4f5f7", borderTop: "2px solid #e0e0e0" } }, /* @__PURE__ */ React.createElement("td", { colSpan: 2, style: { padding: "11px 14px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" } }, "Total Budget"), /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 14px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#c0392b" } }, fmt(totals.budgetTotal)))))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 10, border: "1px solid #e4e4e4", padding: "14px 18px", marginBottom: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#999", textTransform: "uppercase", letterSpacing: 1 } }, "Income \u2212 Budget = Net"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "#555", marginTop: 3 } }, fmt(totals.totalIncome), " \u2212 ", fmt(totals.budgetTotal), " = ", /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: totals.net >= 0 ? "#2e7d52" : "#c0392b" } }, fmt(totals.net)))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, color: "#999", textTransform: "uppercase", letterSpacing: 1 } }, "vs Goal"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: surplus >= 0 ? "#2e7d52" : "#c0392b" } }, surplus >= 0 ? "+" : "\u2212", fmt(Math.abs(surplus))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 } }, "Budget Categories"), /* @__PURE__ */ React.createElement("button", { onClick: addSection, style: { background: "#c0392b", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "+ Add Category")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, budget.map((s) => /* @__PURE__ */ React.createElement(BudgetSection, { key: s.id, section: s, onUpdate: (u) => updateSection(s.id, u), onRemove: () => removeSection(s.id) })))), activeTab === "fundraisers" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f8f8f8" } }, ["Fundraiser", "Member Cost", "Club Profit", "Est. Sold", "Total Profit"].map((h, i) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, fundraisers.map((f) => /* @__PURE__ */ React.createElement("tr", { key: f.id, style: { borderBottom: "1px solid #f0f0f0" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", fontSize: 13, fontWeight: 600, color: FUND_BG } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: FUND_ACCENT, flexShrink: 0 } }), f.name)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: f.cost > 0 ? "#444" : "#bbb" } }, f.cost > 0 ? fmt(f.cost) : "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" } }, fmt(f.profit)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" } }, f.estSold), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: FUND_ACCENT } }, fmt(f.profit * f.estSold))))), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f4f5f7", borderTop: "2px solid #e0e0e0" } }, /* @__PURE__ */ React.createElement("td", { colSpan: 4, style: { padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" } }, "Total Fundraiser Profit"), /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 12px", textAlign: "right", fontSize: 15, fontWeight: 700, color: FUND_BG } }, fmt(totals.fundraiserProfit)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 } }, "Manage Fundraisers"), /* @__PURE__ */ React.createElement("button", { onClick: addFundraiser, style: { background: FUND_BG, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "+ Add Fundraiser")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, fundraisers.map((f) => {
      const upd = (k) => (v) => updateFundraiser(f.id, { ...f, [k]: v });
      return /* @__PURE__ */ React.createElement("div", { key: f.id, style: { background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: FUND_BG, padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          value: f.name,
          onChange: (e) => upd("name")(e.target.value),
          style: { background: "transparent", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", width: 240 }
        }
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.45)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 } }, "Total Profit"), /* @__PURE__ */ React.createElement("div", { style: { color: FUND_ACCENT, fontSize: 16, fontWeight: 700 } }, fmt(f.profit * f.estSold))), fundraisers.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: () => removeFundraiser(f.id), style: { background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.6)", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" } }, "\xD7"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 12px" } }, /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Member Cost", value: f.cost, min: 0, max: 9999, step: 1, onChange: upd("cost"), prefix: "$" }), /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Club Profit", value: f.profit, min: 0, max: 999999, step: 100, onChange: upd("profit"), prefix: "$" }), /* @__PURE__ */ React.createElement(LabeledStepper, { label: "Est. Sold", value: f.estSold, min: 0, max: 9999, step: 1, onChange: upd("estSold") }), f.cost > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 11, color: "#aaa", paddingLeft: 120 } }, "Margin: ", fmt(f.profit), " kept of ", fmt(f.cost), " charged (", Math.round(f.profit / f.cost * 100), "%)"), f.cost === 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 11, color: "#aaa", paddingLeft: 120 } }, "No member cost \u2014 pure club profit (e.g. sponsorship, game)"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 10, borderTop: "1px solid #eee", display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 } }, "Per Unit"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 } }, fmt(f.profit))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 } }, "Est. Sold"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 } }, f.estSold)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "#d6f5e4", borderRadius: 6, padding: "5px 6px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 } }, "Total"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: FUND_BG, marginTop: 1 } }, fmt(f.profit * f.estSold))))));
    }))), activeTab === "members" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 12, border: "1px solid #e4e4e4", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f8f8f8" } }, ["Tier", "Individual Members", "Extra Revenue"].map((h, i) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "9px 12px", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 600, textAlign: i === 0 ? "left" : "right", borderBottom: "1px solid #eee" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, tiers.map((tier, idx) => {
      const tierMembers = members.filter((m) => m.tierId === tier.id);
      const tierOverage = tierMembers.reduce((sum, m) => {
        const tierTickets = tier.hasTickets ? tier.ticketsPerMonth : 0;
        const tierCenturies = tier.hasCenturies ? tier.centuries : 0;
        const extraTickets = Math.max(0, m.ticketsPerMonth - tierTickets) * TICKET_REVENUE * 12;
        const extraCenturies = Math.max(0, m.centuries - tierCenturies) * CENTURY_REVENUE;
        return sum + extraTickets + extraCenturies;
      }, 0);
      const col = TIER_COLORS[idx % TIER_COLORS.length];
      return /* @__PURE__ */ React.createElement("tr", { key: tier.id, style: { borderBottom: "1px solid #f0f0f0" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", fontSize: 13, fontWeight: 600, color: col.bg } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: col.accent, flexShrink: 0 } }), tier.name)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13, color: "#444" } }, tierMembers.length), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", fontSize: 13.5, fontWeight: 700, color: col.accent } }, tierMembers.length > 0 ? fmt(tierOverage) : "\u2014"));
    })), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "#f4f5f7", borderTop: "2px solid #e0e0e0" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" } }, "Total"), /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 12px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#1a1a1a" } }, members.length), /* @__PURE__ */ React.createElement("td", { style: { padding: "11px 12px", textAlign: "right", fontSize: 15, fontWeight: 700, color: "#5ba3d9" } }, fmt(totals.memberOverages)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 600 } }, "Individual Members")), tiers.map((tier, tidx) => {
      const tierMembers = members.filter((m) => m.tierId === tier.id);
      const col = TIER_COLORS[tidx % TIER_COLORS.length];
      return /* @__PURE__ */ React.createElement("div", { key: tier.id, style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: col.accent } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: col.bg } }, tier.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#999" } }, "(Min: ", tier.hasTickets ? `${tier.ticketsPerMonth} tickets/mo` : "no tickets", ", ", tier.hasCenturies ? `${tier.centuries} centuries/yr` : "no centuries", ")")), /* @__PURE__ */ React.createElement("button", { onClick: () => addMember(tier.id), style: { background: col.bg, color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" } }, "+ Add Member")), tierMembers.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: "#f8f8f8", borderRadius: 8, padding: "16px", textAlign: "center", color: "#999", fontSize: 12 } }, "No individual members tracked for this tier yet") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, tierMembers.map((member) => {
        const upd = (k) => (v) => updateMember(member.id, { ...member, [k]: v });
        const tierTickets = tier.hasTickets ? tier.ticketsPerMonth : 0;
        const tierCenturies = tier.hasCenturies ? tier.centuries : 0;
        const extraTickets = Math.max(0, member.ticketsPerMonth - tierTickets) * TICKET_REVENUE * 12;
        const extraCenturies = Math.max(0, member.centuries - tierCenturies) * CENTURY_REVENUE;
        const totalExtra = extraTickets + extraCenturies;
        return /* @__PURE__ */ React.createElement("div", { key: member.id, style: { background: "#fff", borderRadius: 10, border: "1px solid #e8e8e8", padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "200px 140px 140px 100px 32px", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            value: member.name,
            onChange: (e) => upd("name")(e.target.value),
            placeholder: "Member name",
            style: { border: "1px solid #ddd", borderRadius: 6, padding: "6px 10px", fontSize: 13, fontWeight: 500, outline: "none", fontFamily: "inherit" }
          }
        ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#999", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 } }, "Tickets / mo"), /* @__PURE__ */ React.createElement(Stepper, { value: member.ticketsPerMonth, min: 0, max: 30, step: 1, onChange: upd("ticketsPerMonth"), width: 140 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#999", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 } }, "Centuries / yr"), /* @__PURE__ */ React.createElement(Stepper, { value: member.centuries, min: 0, max: 30, step: 1, onChange: upd("centuries"), width: 140 })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 0.5 } }, "Extra"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: totalExtra > 0 ? col.accent : "#ccc", marginTop: 2 } }, totalExtra > 0 ? fmt(totalExtra) : "\u2014")), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => removeMember(member.id),
            style: { background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" },
            onMouseEnter: (e) => e.currentTarget.style.color = "#c0392b",
            onMouseLeave: (e) => e.currentTarget.style.color = "#ccc"
          },
          "\xD7"
        )), totalExtra > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, paddingTop: 8, borderTop: "1px solid #f0f0f0", fontSize: 11, color: "#666" } }, extraTickets > 0 && /* @__PURE__ */ React.createElement("span", null, "+", Math.max(0, member.ticketsPerMonth - tierTickets), " tickets/mo = ", fmt(extraTickets)), extraTickets > 0 && extraCenturies > 0 && /* @__PURE__ */ React.createElement("span", { style: { margin: "0 6px", color: "#ddd" } }, "\u2022"), extraCenturies > 0 && /* @__PURE__ */ React.createElement("span", null, "+", Math.max(0, member.centuries - tierCenturies), " centuries = ", fmt(extraCenturies))));
      })));
    })), activeTab === "member" && /* @__PURE__ */ React.createElement(MemberView, { tiers, totals })));
  }
  function RootApp() {
    return /* @__PURE__ */ React.createElement(AppErrorBoundary, null, /* @__PURE__ */ React.createElement(App, null));
  }
  window.App = RootApp;
})();
