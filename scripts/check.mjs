// Lädt das OpenAI-Skript, vergleicht es mit dem letzten Stand und legt
// bei Änderungen eine lesbare Version, eine Liste aller Strings und
// eine Commit-Message an. Ohne Änderung wird nichts angefasst.
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import * as acorn from "acorn";
import * as walk from "acorn-walk";
import prettier from "prettier";

const URL_ = process.env.SCRIPT_URL ?? "https://bzrcdn.openai.com/sdk/oaiq.min.js";
const DIR = "data";

const readOr = (p, fallback) => readFile(p, "utf8").catch(() => fallback);
const sha256 = (s) => createHash("sha256").update(s).digest("hex");

const res = await fetch(URL_, { headers: { "cache-control": "no-cache" } });
if (!res.ok) {
  console.error(`Download fehlgeschlagen: HTTP ${res.status}`);
  process.exit(1);
}
const raw = await res.text();
if (raw.length < 1000) {
  console.error(`Antwort verdächtig klein (${raw.length} Bytes), breche ab.`);
  process.exit(1);
}

const oldRaw = await readOr(`${DIR}/oaiq.min.js`, "");
if (sha256(raw) === sha256(oldRaw)) {
  console.log("Keine Änderung.");
  process.exit(0);
}

// Alle String-Literale sammeln. Die Variablennamen im minifizierten Code
// ändern sich bei jedem Build, die Strings (Endpunkte, Events, Parameter)
// dagegen nur, wenn sich wirklich etwas tut. Darum ist strings.txt die
// wichtigste Datei für den Vergleich.
const ast = acorn.parse(raw, { ecmaVersion: "latest", sourceType: "script" });
const found = new Set();
walk.full(ast, (n) => {
  if (n.type === "Literal" && typeof n.value === "string") found.add(n.value);
  if (n.type === "TemplateElement" && n.value.cooked) found.add(n.value.cooked);
});
const strings = [...found]
  .map((s) => s.replace(/\n/g, "\\n"))
  .filter((s) => s.trim().length > 1)
  .sort();

const pretty = await prettier.format(raw, { parser: "babel", printWidth: 100 });

const oldStrings = (await readOr(`${DIR}/strings.txt`, "")).split("\n").filter(Boolean);
const added = strings.filter((s) => !oldStrings.includes(s));
const removed = oldStrings.filter((s) => !strings.includes(s));

const meta = {
  url: URL_,
  checked_at: new Date().toISOString(),
  last_modified: res.headers.get("last-modified"),
  etag: res.headers.get("etag"),
  bytes: Buffer.byteLength(raw),
  sha256: sha256(raw),
  string_count: strings.length,
};

await mkdir(DIR, { recursive: true });
await writeFile(`${DIR}/oaiq.min.js`, raw);
await writeFile(`${DIR}/oaiq.pretty.js`, pretty);
await writeFile(`${DIR}/strings.txt`, strings.join("\n") + "\n");
await writeFile(`${DIR}/meta.json`, JSON.stringify(meta, null, 2) + "\n");

const oldBytes = Buffer.byteLength(oldRaw);
const list = (title, arr) =>
  arr.length ? `\n${title} (${arr.length}):\n` + arr.slice(0, 50).map((s) => `+ ${s}`).join("\n") : "";
const msg =
  (oldRaw ? `oaiq.min.js geändert (${oldBytes} -> ${meta.bytes} Bytes)` : "Erster Stand von oaiq.min.js") +
  `\n\nLast-Modified: ${meta.last_modified}\nSHA256: ${meta.sha256}\n` +
  list("Neue Strings", added) +
  list("Entfernte Strings", removed).replace(/^\+ /gm, "- ") +
  "\n";
await writeFile(".commit-msg", msg);
console.log(msg);
