import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) {
    console.error("Missing .env file. Copy .env.example to .env first.");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return env;
}

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function initDatabase() {
  const env = loadEnv();
  const dbDir = join(root, "database");
  if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });

  const dbPath = join(dbDir, "sukuun.db");
  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, "");
    console.log("Created database file:", dbPath);
  }

  const sessionsPath = join(dbDir, "sessions.json");
  if (!existsSync(sessionsPath)) {
    writeFileSync(sessionsPath, "[]");
  }

  const passwordHash = hashPassword(env.APP_PASSWORD || "changeme");
  writeFileSync(
    join(dbDir, "users.json"),
    JSON.stringify(
      [
        {
          id: "default",
          passwordHash,
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
      ],
      null,
      2,
    ),
  );

  console.log("Database initialized.");
  console.log("Default user created with password from .env");
}

initDatabase();
