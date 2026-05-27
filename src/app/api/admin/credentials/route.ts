import { NextRequest, NextResponse } from 'next/server';
import {
  deleteCourseAccessCredential,
  getCourseAccessCredentials,
  upsertCourseAccessCredential,
} from '@/lib/course-access';
import { COOKIE_NAME, isSiteAdminAuthenticatedToken } from '@/lib/site-admin';

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return isSiteAdminAuthenticatedToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json(getCourseAccessCredentials());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const body = await req.json();
  const username = typeof body.username === 'string' ? body.username : '';
  const code = typeof body.code === 'string' ? body.code : '';

  if (!username || !code) {
    return NextResponse.json({ success: false, message: 'username and code are required' }, { status: 400 });
  }

  upsertCourseAccessCredential({ username, code });
  return NextResponse.json(getCourseAccessCredentials());
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const body = await req.json();
  const username = typeof body.username === 'string' ? body.username : '';

  if (!username) {
    return NextResponse.json({ success: false, message: 'username is required' }, { status: 400 });
  }

  deleteCourseAccessCredential(username);
  return NextResponse.json(getCourseAccessCredentials());
}
