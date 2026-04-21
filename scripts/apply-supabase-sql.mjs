/**
 * Applies local SQL to your Supabase Postgres database (migrations + seed).
 * Requires DATABASE_URL in .env.local — the URI from
 * Supabase Dashboard → Project Settings → Database → Connection string.
 *
 * Usage: npm run db:apply
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error(`
Missing DATABASE_URL in .env.local.

1. Open Supabase Dashboard → your project → Settings → Database.
2. Under "Connection string", choose URI and copy the connection string.
3. Replace [YOUR-PASSWORD] with your database password (set when you created the project).
4. Add a line to .env.local:

   DATABASE_URL=postgresql://postgres.oofqcbuamtqvsivorvld:YOUR_PASSWORD@aws-0-....pooler.supabase.com:6543/postgres

   (Use the exact host/port from the dashboard — region may differ.)

5. Run: npm run db:apply
`);
  process.exit(1);
}

const files = [
  "supabase/migrations/20250409000000_initial.sql",
  "supabase/migrations/20250409000001_order_items_quantity.sql",
  "supabase/migrations/20250409120000_admin_rls.sql",
  "supabase/migrations/20250410120000_is_admin_jwt_robust.sql",
  "supabase/migrations/20260421023309_dashboard_schema_redesign.sql",
  "supabase/migrations/20260421024056_dashboard_storage_rls.sql",
  "supabase/seed.sql",
];

const useSsl =
  url.includes("supabase.com") ||
  url.includes("supabase.co") ||
  process.env.DATABASE_SSL !== "false";

const client = new pg.Client({
  connectionString: url,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});

await client.connect();

try {
  for (const rel of files) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) {
      console.error("Missing file:", full);
      process.exit(1);
    }
    const sql = fs.readFileSync(full, "utf8");
    console.log("Applying", rel, "...");
    await client.query(sql);
  }
  console.log("\nDone. All SQL files applied successfully.");
} catch (err) {
  console.error("\nError while applying SQL:\n", err.message);
  process.exit(1);
} finally {
  await client.end();
}
