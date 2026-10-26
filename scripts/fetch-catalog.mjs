// Pulls the live Xoxoday catalogue into src/data/live/*.json.
// Credentials come from .env.local (git-ignored). Run: npm run fetch:catalog
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ENV_FILE = ".env.local";
if (!existsSync(ENV_FILE)) {
  console.error("Missing .env.local");
  process.exit(1);
}
process.loadEnvFile(ENV_FILE);

// Production by default. For a sandbox token set XOXODAY_BASE=https://stagingstores.xoxoday.com/chef in .env.local
const HOST = (process.env.XOXODAY_BASE || "https://accounts.xoxoday.com/chef").replace(/\/$/, "");
const BASE = `${HOST}/v1/oauth`;
console.log(`Using ${HOST}`);
const POINTS_PER_UNIT = Number(process.env.POINTS_PER_UNIT) || 10;
const LIMIT = 100;

// key → categoryType sent to the API (gift cards use no categoryType)
const CATEGORIES = {
  giftcards: undefined,
  merchandise: "merchandise",
  charity: "charity",
  topup: "topup",
  lounge: "lounge",
};

let accessToken = process.env.XOXODAY_ACCESS_TOKEN?.trim();
if (!accessToken) console.log("XOXODAY_ACCESS_TOKEN is empty in .env.local");

const saveEnv = (patch) => {
  let text = readFileSync(ENV_FILE, "utf8");
  for (const [k, v] of Object.entries(patch)) {
    text = new RegExp(`^${k}=.*$`, "m").test(text) ? text.replace(new RegExp(`^${k}=.*$`, "m"), `${k}=${v}`) : `${text.trimEnd()}\n${k}=${v}\n`;
  }
  writeFileSync(ENV_FILE, text);
};

const refresh = async () => {
  const missing = ["XOXODAY_REFRESH_TOKEN", "XOXODAY_CLIENT_ID", "XOXODAY_CLIENT_SECRET"].filter((k) => !process.env[k]?.trim());
  if (missing.length) throw new Error(`cannot refresh, empty in .env.local: ${missing.join(", ")}`);
  const res = await fetch(`${BASE}/token/user`, {
    signal: AbortSignal.timeout(20000),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.XOXODAY_REFRESH_TOKEN,
      client_id: process.env.XOXODAY_CLIENT_ID,
      client_secret: process.env.XOXODAY_CLIENT_SECRET,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error(`Token refresh failed (${res.status}) ${json.error_description || json.error || ""}`.trim());
  accessToken = json.access_token;
  saveEnv({ XOXODAY_ACCESS_TOKEN: json.access_token, XOXODAY_REFRESH_TOKEN: json.refresh_token });
  console.log("Access token refreshed and saved to .env.local");
};

const call = async (data, retried = false) => {
  const res = await fetch(`${BASE}/api/`, {
    signal: AbortSignal.timeout(20000),
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ query: "plumProAPI.mutation.getVouchers", tag: "plumProAPI", variables: { data } }),
  });
  const json = await res.json().catch(() => ({}));
  if ((res.status === 401 || res.status === 400) && !retried) {
    console.log(`  API said ${res.status}: ${json.errorInfo || json.error_description || json.error || json.error_message_id || "no message"} — trying token refresh`);
    await refresh();
    return call(data, true);
  }
  if (!res.ok) throw new Error(`${res.status} ${json.errorInfo || json.error_description || json.error || json.error_message_id || ""}`.trim());
  return json?.data?.getVouchers;
};

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const normalise = (p) => {
  const denoms = String(p.valueDenominations || "").split(",").map(Number).filter((n) => n > 0);
  const open = p.valueType === "open_value";
  const from = open ? p.minValue : denoms[0] ?? 0;
  return {
    id: p.productId,
    name: p.name,
    description: stripHtml(p.description),
    image: p.imageUrl || p.productImages?.[0] || "",
    category: p.categories || "",
    country: p.countryName || "",
    currency: p.currencyCode,
    valueType: p.valueType,
    denominations: denoms,
    min: p.minValue,
    max: p.maxValue,
    points: Math.round(from * POINTS_PER_UNIT),
    pointsOptions: denoms.map((d) => Math.round(d * POINTS_PER_UNIT)),
    pointsMax: open ? Math.round(p.maxValue * POINTS_PER_UNIT) : undefined,
    delivery: p.deliveryType || "",
    deliveryDays: p.tatInDays || "",
    terms: stripHtml(p.termsAndConditionsInstructions),
    redemption: stripHtml(p.redemptionInstructions),
    parentProductId: p.parentProductId ?? null,
  };
};

for (const [key, categoryType] of Object.entries(CATEGORIES)) {
  try {
    const items = [];
    for (let page = 1; ; page++) {
      const r = await call({ ...(categoryType && { categoryType }), limit: LIMIT, page, exchangeRate: 1 });
      const batch = r?.data ?? [];
      items.push(...batch);
      if (batch.length < LIMIT || (r.totalCount && items.length >= r.totalCount)) break;
    }
    writeFileSync(`src/data/live/${key}.json`, JSON.stringify(items.map(normalise), null, 2));
    console.log(`✔ ${key}: ${items.length} products`);
  } catch (e) {
    console.log(`✘ ${key}: ${e.message} (kept existing data)`);
  }
}
