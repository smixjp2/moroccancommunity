import { cookies } from 'next/headers';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface CourseAccessCredential {
  username: string;
  code: string;
}

const COURSE_ACCESS_FILE = path.join(process.cwd(), 'course-access.csv');

function parseCourseAccessCsv(): CourseAccessCredential[] {
  try {
    const rawCsv = readFileSync(COURSE_ACCESS_FILE, 'utf8');
    return rawCsv
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'))
      .map((line) => {
        const [username, code] = line.split(',').map((value) => value.trim());
        if (!username || !code) {
          return null;
        }

        return {
          username: username.toLowerCase(),
          code,
        };
      })
      .filter((entry): entry is CourseAccessCredential => entry !== null);
  } catch (error) {
    return [];
  }
}

function serializeCourseAccessCsv(credentials: CourseAccessCredential[]): string {
  const lines = ['username,code'];
  for (const credential of credentials) {
    lines.push(`${credential.username},${credential.code}`);
  }
  return lines.join('\n');
}

export function getCourseAccessCredentials(): CourseAccessCredential[] {
  return parseCourseAccessCsv();
}

export function saveCourseAccessCredentials(credentials: CourseAccessCredential[]): void {
  const csv = serializeCourseAccessCsv(credentials);
  writeFileSync(COURSE_ACCESS_FILE, csv, 'utf8');
}

export function validateCourseAccess(username: string, code: string): boolean {
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedCode = code.trim();

  return getCourseAccessCredentials().some(
    (credential) =>
      credential.username === normalizedUsername && credential.code === normalizedCode,
  );
}

export function isCourseAccessGranted(): boolean {
  const token = cookies().get('courseAccess')?.value;
  if (!token) {
    return false;
  }

  const [username, code] = token.split(':');
  if (!username || !code) {
    return false;
  }

  return validateCourseAccess(username, code);
}

export function upsertCourseAccessCredential(username: string, code: string): void {
  const normalizedUsername = username.trim().toLowerCase();
  const cleanedCode = code.trim();
  const credentials = getCourseAccessCredentials();
  const existing = credentials.find((entry) => entry.username === normalizedUsername);

  if (existing) {
    existing.code = cleanedCode;
  } else {
    credentials.push({ username: normalizedUsername, code: cleanedCode });
  }

  saveCourseAccessCredentials(credentials);
}

export function deleteCourseAccessCredential(username: string): void {
  const normalizedUsername = username.trim().toLowerCase();
  const credentials = getCourseAccessCredentials().filter(
    (entry) => entry.username !== normalizedUsername,
  );
  saveCourseAccessCredentials(credentials);
}
