import { NextRequest, NextResponse } from 'next/server';
import { validateSiteAdmin, buildSiteAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/site-admin';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!validateSiteAdmin(email, password)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: buildSiteAdminToken(),
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
  });

  return response;
}
