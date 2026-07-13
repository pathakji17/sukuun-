import { z } from 'zod';

// ============================================================================
// User Table Schema
// ============================================================================

export const UserSchema = z.object({
  id: z.string(),
  passwordHash: z.string(),
  createdAt: z.string(),
  lastLogin: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// ============================================================================
// Session Table Schema
// ============================================================================

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.string(),
  createdAt: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

// ============================================================================
// Config Table Schema (for runtime configuration)
// ============================================================================

export const ConfigEntrySchema = z.object({
  key: z.string(),
  value: z.string(), // JSON stringified
  updatedAt: z.string(),
});

export type ConfigEntry = z.infer<typeof ConfigEntrySchema>;

// ============================================================================
// SQL Initialization
// ============================================================================

export const DATABASE_SCHEMA = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_login TEXT
    );
  `,
  sessions: `
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `,
  config: `
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `,
};

export const DATABASE_INDEXES = {
  sessionUserId: `
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
  `,
  sessionToken: `
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
  `,
  sessionExpiry: `
    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
  `,
};
