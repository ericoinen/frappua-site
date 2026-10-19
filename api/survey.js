// Stage zero questionnaire: receives one submission from /safeskillvr/study and
// writes it to Airtable. No names, e-mail, IP or user agent are stored.
// Env: AIRTABLE_TOKEN (data.records:write on the base), AIRTABLE_BASE, AIRTABLE_TABLE.

const AGE = ["under 20", "20-44", "45+"];
const GAMES = ["none", "under 2", "2-7", "8-15", "15+"];
const VR = ["never", "1-2", "3-10", "10+"];
const TOPICS = ["vest", "first aid kit", "both", "did not get going"];
const SCALES = {
  curious: "Curious", excited: "Excited", surprised: "Surprised", confused: "Confused",
  anxious: "Anxious", frustrated: "Frustrated", bored: "Bored",
  knew: "Knew what to do", useful: "Useful", like_someone: "Like someone", talk_again: "Talk again",
  eerie: "Eerie", movement: "Movement natural", face_speech: "Face speech natural", stopped_noticing: "Stopped noticing",
};

function pick(list, v) {
  return Number.isInteger(v) && v >= 0 && v < list.length ? list[v] : null;
}

export function toRecord(b) {
  if (!b || typeof b !== "object") return { error: "bad body" };
  if (b.website) return { error: "spam" };
  const pid = String(b.participant || "").trim().toUpperCase();
  if (!/^[A-Z][0-9]{2,3}$/.test(pid)) return { error: "participant" };
  const f = {
    Participant: pid,
    Venue: pid[0],
    Submitted: new Date().toISOString(),
    Language: ["en", "ru", "fi"].includes(b.lang) ? b.lang : "en",
    Age: pick(AGE, b.age),
    "Games h/week": pick(GAMES, b.games),
    "VR before": pick(VR, b.vr),
    Topics: pick(TOPICS, b.topics),
    "First spoke": String(b.first_spoke || "").slice(0, 1500),
    "In the way": String(b.in_the_way || "").slice(0, 1500),
  };
  if (!f.Age || !f["Games h/week"] || !f["VR before"] || !f.Topics) return { error: "choice" };
  for (const [k, name] of Object.entries(SCALES)) {
    const v = b[k];
    if (!Number.isInteger(v) || v < 1 || v > 5) return { error: "scale " + k };
    f[name] = v;
  }
  return { fields: f };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  const r = toRecord(body);
  if (r.error === "spam") return res.status(200).json({ ok: true });
  if (r.error) return res.status(400).json({ ok: false, error: r.error });

  const { AIRTABLE_TOKEN, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env;
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE || !AIRTABLE_TABLE) {
    console.error("survey: Airtable env missing");
    return res.status(503).json({ ok: false });
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  const up = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: r.fields }], typecast: true }),
  });
  if (!up.ok) {
    console.error("survey: Airtable", up.status, (await up.text()).slice(0, 300));
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
