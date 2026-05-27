'use server';

import { redirect } from 'next/navigation';
import { deleteCourseAccessCredential, upsertCourseAccessCredential } from '@/lib/course-access';

export async function loginAdmin(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null)?.trim() ?? '';
  const { validateSiteAdmin, createSiteAdminCookie } = await import('@/lib/site-admin');

  if (!validateSiteAdmin(email, password)) {
    redirect('/admin/credentials?error=invalid');
  }

  createSiteAdminCookie();
  redirect('/admin/credentials?success=loggedin');
}

export async function saveCredential(formData: FormData) {
  const username = (formData.get('username') as string | null)?.trim();
  const code = (formData.get('code') as string | null)?.trim();

  if (!username || !code) {
    redirect('/admin/credentials?error=invalid');
  }

  upsertCourseAccessCredential(username, code);
  redirect('/admin/credentials?success=saved');
}

export async function removeCredential(formData: FormData) {
  const username = (formData.get('username') as string | null)?.trim();
  if (username) {
    deleteCourseAccessCredential(username);
  }

  redirect('/admin/credentials?success=deleted');
}

export async function logoutAdmin(formData: FormData) {
  const { clearSiteAdminCookie } = await import('@/lib/site-admin');
  clearSiteAdminCookie();
  redirect('/admin/credentials');
}
