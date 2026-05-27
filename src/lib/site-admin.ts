import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_EMAIL = process.env.SITE_ADMIN_EMAIL || 'serrou.mohammed@outlook.com';
const ADMIN_PASSWORD = process.env.SITE_ADMIN_PASSWORD || 'Serroumed50@';
const ADMIN_SECRET = process.env.SITE_ADMIN_SECRET || 'site-admin-secret-change-me';
export const COOKIE_NAME = 'siteAdminAuth';
export const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function createSignature(email: string, password: string) {
  return crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(`${email}:${password}`)
    .digest('hex');
}

function buildToken(email: string, password: string) {
  const signature = createSignature(email, password);
  return Buffer.from(`${email}:${signature}`).toString('base64');
}

function parseToken(token: string) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [email, signature] = decoded.split(':');
    if (!email || !signature) {
      return null;
    }
    return { email, signature };
  } catch {
    return null;
  }
}

export function validateSiteAdmin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}

export function buildSiteAdminToken(): string {
  return buildToken(ADMIN_EMAIL, ADMIN_PASSWORD);
}

export function getSiteAdminCookieName(): string {
  return COOKIE_NAME;
}

export function clearSiteAdminCookie() {
  cookies().delete(COOKIE_NAME, { path: '/' });
}

export function isSiteAdminAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return isSiteAdminAuthenticatedToken(token);
}

export function isSiteAdminAuthenticatedToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const parsed = parseToken(token);
  if (!parsed) {
    return false;
  }

  const expectedSignature = createSignature(ADMIN_EMAIL, ADMIN_PASSWORD);
  return (
    parsed.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    parsed.signature === expectedSignature
  );
}
