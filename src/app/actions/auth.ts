'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'sukuun-auth';
const AUTH_COOKIE_VALUE = 'authenticated';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Login with password — sets httpOnly cookie on success
 */
export async function login(
  _prevState: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const password = formData.get('password') as string;

  if (!password) {
    return { success: false, error: 'Please enter the password' };
  }

  const appPassword = process.env.APP_PASSWORD;

  if (!appPassword) {
    console.error('APP_PASSWORD environment variable is not set');
    return { success: false, error: 'Server configuration error' };
  }

  if (password !== appPassword) {
    return { success: false, error: 'Incorrect password, try again ♡' };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return { success: true };
}

/**
 * Logout — clears auth cookie
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Check if user is authenticated (for server components)
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  return authCookie?.value === AUTH_COOKIE_VALUE;
}
