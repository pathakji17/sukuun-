'use client';

const AUTH_KEY = 'sukuun_authed';
const SECRET_PASSWORD = '11juneshaluji';

export function checkPassword(password: string): boolean {
  return password === SECRET_PASSWORD;
}

export function setAuthenticated(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, 'true');
  }
}

export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}
