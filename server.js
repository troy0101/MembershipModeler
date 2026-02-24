require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_ROOT = process.env.DATA_ROOT || __dirname;
const DATA_DIR = path.join(DATA_ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "model-data.json");

const LOGIN_USERNAME = "SATS";
const LOGIN_PASSWORD = "SATS1";
const SESSION_COOKIE = "membership_session";
const AUTH_SECRET = process.env.AUTH_SECRET || "change-this-auth-secret";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";

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
        { id: 2, name: "Association Dues", qty: 12, unit: 833.33 },
        { id: 3, name: "Building Maintenance", qty: 1, unit: 10000 }
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
        { id: 3, name: "New Item", qty: 1, unit: 6000 }
      ]
    },
    {
      id: "utilities",
      label: "Utilities",
      color: "#2d1e3d",
      accent: "#a85bd9",
      items: [
        { id: 1, name: "Electric", qty: 1, unit: 10000 },
        { id: 2, name: "Gas", qty: 1, unit: 3000 },
        { id: 3, name: "Exterminator", qty: 1, unit: 500 },
        { id: 4, name: "Water", qty: 1, unit: 1800 },
        { id: 5, name: "Club Insurance", qty: 1, unit: 7600 }
      ]
    }
  ],
  fundraisers: [
    { id: 1, name: "Eagles Blocks", cost: 0, profit: 3000, estSold: 1 },
    { id: 2, name: "King of Hearts", cost: 0, profit: 30000, estSold: 1 },
    { id: 3, name: "Eagles Frenzy", cost: 0, profit: 7500, estSold: 1 },
    { id: 4, name: "Phillies Front Row Frenzy", cost: 0, profit: 7500, estSold: 1 },
    { id: 5, name: "Super Bowl", cost: 0, profit: 100, estSold: 1 },
    { id: 6, name: "50/50 Kazoo Day", cost: 0, profit: 7500, estSold: 1 },
    { id: 7, name: "NCAA Block", cost: 0, profit: 3500, estSold: 1 },
    { id: 8, name: "Thanksgiving Block", cost: 0, profit: 2500, estSold: 1 },
    { id: 9, name: "Christmas Block", cost: 0, profit: 2500, estSold: 1 },
    { id: 10, name: "Peel Tickets", cost: 0, profit: 5000, estSold: 1 },
    { id: 11, name: "Rentals", cost: 0, profit: 11400, estSold: 1 },
    { id: 12, name: "Small Business", cost: 0, profit: 5000, estSold: 1 },
    { id: 13, name: "Kazoo Day", cost: 0, profit: 5000, estSold: 1 },
    { id: 14, name: "Slot", cost: 0, profit: 1500, estSold: 1 },
    { id: 15, name: "Ham Block", cost: 0, profit: 2000, estSold: 1 },
    { id: 16, name: "Family Day Phillies Block", cost: 0, profit: 1000, estSold: 1 },
    { id: 17, name: "NCAA Brackets", cost: 0, profit: 1000, estSold: 1 },
    { id: 18, name: "Giveback", cost: 0, profit: 1000, estSold: 1 },
    { id: 19, name: "Kazoo Day Shirts", cost: 0, profit: 2000, estSold: 1 },
    { id: 20, name: "Cow Chip", cost: 0, profit: 2000, estSold: 1 },
    { id: 21, name: "EOM", cost: 0, profit: 3500, estSold: 1 }
  ],
  members: []
};

async function readModel() {
  await ensureLocalFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return sanitizeModel(JSON.parse(raw));
}

async function writeModel(model) {
  await ensureLocalFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(model, null, 2), "utf8");
}

async function ensureLocalFile() {
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

function createSessionToken(username) {
  const payload = {
    u: username,
    exp: Date.now() + SESSION_TTL_MS,
    n: crypto.randomBytes(12).toString("hex")
  };

  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return false;
  }

  const expected = crypto.createHmac("sha256", AUTH_SECRET).update(encoded).digest("base64url");
  if (signature !== expected) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload && payload.u === LOGIN_USERNAME && Number.isFinite(payload.exp) && payload.exp > Date.now();
  } catch {
    return false;
  }
}

function requireAuth(req, res, next) {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE];

  if (!verifySessionToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
}

app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/api/session", (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE];
  res.json({ authenticated: verifySessionToken(token) });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username !== LOGIN_USERNAME || password !== LOGIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = createSessionToken(username);

  const secure = COOKIE_SECURE ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax${secure}`);
  return res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  const secure = COOKIE_SECURE ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`);
  return res.json({ ok: true });
});

app.get("/api/model", requireAuth, async (req, res) => {
  try {
    res.json(await readModel());
  } catch (error) {
    console.error("GET /api/model error:", error.message);
    res.status(500).json({ error: "Unable to load saved model data." });
  }
});

app.put("/api/model", requireAuth, async (req, res) => {
  try {
    await writeModel(sanitizeModel(req.body));
    res.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/model error:", error.message);
    res.status(500).json({ error: "Unable to save model data." });
  }
});

app.listen(PORT, async () => {
  await ensureLocalFile();
  console.log(`Membership Model server running at http://localhost:${PORT} [storage: ${DATA_FILE}]`);
});
