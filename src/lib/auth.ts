/**
 * Authentication utility functions
 */

import { createHash } from 'crypto';

/**
 * Hash a password using SHA256 (simple implementation)
 * For production, use bcryptjs or similar
 */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Verify a password against a hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Generate a random session token
 */
export function generateSessionToken(): string {
  return createHash('sha256')
    .update(Date.now().toString() + Math.random().toString())
    .digest('hex');
}

/**
 * Parse session token from cookies
 */
export function getSessionToken(cookieString: string): string | null {
  if (!cookieString) return null;
  const match = cookieString.match(/sessionToken=([^;]+)/);
  return match ? match[1] : null;
}
