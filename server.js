const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "model-data.json");
const LOGIN_USERNAME = "SATS";
const LOGIN_PASSWORD = "SATS1";
const SESSION_COOKIE = "membership_session";
const activeSessions = new Set();

const DEFAULT_MODEL = {
  goal: 270000,
  tiers: [
    { id: 1, name: "Adult Men", members: 49, dues: 450, ticketsPerMonth: 6, centuries: 12, miscExpenses: 0, hasTickets: true, hasCenturies: true, hasMisc: true },
    { id: 2, name: "Adult Women", members: 40, dues: 800, ticketsPerMonth: 0, centuries: 6, miscExpenses: 0, hasTickets: false, hasCenturies: true, hasMisc: false },
    { id: 3, name: "Student (14–17)", members: 0, dues: 150, ticketsPerMonth: 3, centuries: 4, miscExpenses: 0, hasTickets: true, hasCenturies: true, hasMisc: false },
    { id: 4, name: "Sponsor (60+ / 25+ yrs)", members: 10, dues: 1200, ticketsPerMonth: 0, centuries: 0, miscExpenses: 0, hasTickets: false, hasCenturies: false, hasMisc: false }
  ],
  budget: [
    {
      id: "show",
      label: "Show",
      color: "#1a1a2e",
      accent: "#e8a838",
      items: [
        { id: 1, name: "Suits", qty: 100, unit: 1100 },
        { id: 2, name: "Jacklin", qty: 30, unit: 233 },
        { id: 3, name: "Designer", qty: 1, unit: 5500 },
        { id: 4, name: "Painter", qty: 1, unit: 12000 },
        { id: 5, name: "Garage", qty: 12, unit: 833.33 },
        { id: 6, name: "Hillman", qty: 1, unit: 2900 },
        { id: 7, name: "Foam", qty: 1, unit: 2000 },
        { id: 8, name: "Light Action", qty: 12, unit: 3000 }
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
        { id: 3, name: "DJ", qty: 1, unit: 2000 },
        { id: 4, name: "Speakers", qty: 2, unit: 500 },
        { id: 5, name: "Trucks", qty: 2, unit: 500 },
        { id: 6, name: "Floor", qty: 1, unit: 3500 },
        { id: 7, name: "New Years Day of Food", qty: 1, unit: 2000 }
      ]
    },
    {
      id: "misc",
      label: "Misc",
      color: "#3d2d1e",
      accent: "#d9855b",
      items: [
        { id: 1, name: "Garage", qty: 12, unit: 2000 },
        { id: 2, name: "Association Dues", qty: 12, unit: 833.33 }
      ]
    }
  ],
  fundraisers: [
    { id: 1, name: "Eagles Blocks", cost: 10, profit: 300, estSold: 1 },
    { id: 2, name: "King of Hearts", cost: 0, profit: 30000, estSold: 1 }
  ],
  members: []
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(DEFAULT_MODEL, null, 2), "utf8");
  }
}

function sanitizeModel(payload) {
  if (!payload || typeof payload !== "object") {
    return DEFAULT_MODEL;
  }

  return {
    goal: Number.isFinite(payload.goal) ? payload.goal : DEFAULT_MODEL.goal,
    tiers: Array.isArray(payload.tiers) ? payload.tiers : DEFAULT_MODEL.tiers,
    budget: Array.isArray(payload.budget) ? payload.budget : DEFAULT_MODEL.budget,
    fundraisers: Array.isArray(payload.fundraisers) ? payload.fundraisers : DEFAULT_MODEL.fundraisers,
    members: Array.isArray(payload.members) ? payload.members : DEFAULT_MODEL.members
  };
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) {
    return {};
  }

  return header.split(";").reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) {
      return acc;
    }
    acc[rawKey] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

function createSessionToken() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function requireAuth(req, res, next) {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE];

  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
}

app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

app.get("/api/session", (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE];
  res.json({ authenticated: Boolean(token && activeSessions.has(token)) });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username !== LOGIN_USERNAME || password !== LOGIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = createSessionToken();
  activeSessions.add(token);

  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax`);
  return res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE];
  if (token) {
    activeSessions.delete(token);
  }

  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
  return res.json({ ok: true });
});

app.get("/api/model", requireAuth, async (req, res) => {
  try {
    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    res.json(sanitizeModel(parsed));
  } catch (error) {
    res.status(500).json({ error: "Unable to load saved model data." });
  }
});

app.put("/api/model", requireAuth, async (req, res) => {
  try {
    await ensureDataFile();
    const cleanModel = sanitizeModel(req.body);
    await fs.writeFile(DATA_FILE, JSON.stringify(cleanModel, null, 2), "utf8");
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Unable to save model data." });
  }
});

app.listen(PORT, async () => {
  await ensureDataFile();
  console.log(`Membership Model server running at http://localhost:${PORT}`);
});
