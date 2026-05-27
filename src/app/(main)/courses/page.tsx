import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CourseCard } from '@/components/CourseCard';
import { videoCourses } from '@/lib/video-courses-data';
import { validateCourseAccess, isCourseAccessGranted } from '@/lib/course-access';
import { BookOpen, Play } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cours Vidéo | The Moroccan Community',
  description: 'Formez-vous aux investissements avec nos cours vidéo complets sur le MASI et le marché boursier marocain.',
};

interface CoursesPageProps {
  searchParams?: { redirect?: string; error?: string };
}

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const beginnerCourses = videoCourses.filter(c => c.level === 'beginner');
  const intermediateCourses = videoCourses.filter(c => c.level === 'intermediate');
  const advancedCourses = videoCourses.filter(c => c.level === 'advanced');

  const redirectTarget =
    searchParams?.redirect && searchParams.redirect.startsWith('/courses')
      ? searchParams.redirect
      : '/courses';

  const isAuthorized = isCourseAccessGranted();

  if (isAuthorized && redirectTarget !== '/courses') {
    redirect(redirectTarget);
  }

  const showInvalidCredentials = searchParams?.error === 'invalid';

  async function grantCourseAccess(formData: FormData) {
    'use server';

    const username = (formData.get('username') as string | null)?.trim().toLowerCase() ?? '';
    const code = (formData.get('code') as string | null)?.trim() ?? '';
    const redirectUrl = (formData.get('redirect') as string | null) ?? '/courses';

    if (validateCourseAccess(username, code)) {
      cookies().set({
        name: 'courseAccess',
        value: `${username}:${code}`,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
      });

      redirect(redirectUrl.startsWith('/courses') ? redirectUrl : '/courses');
    }

    redirect(
      `/courses?error=invalid&redirect=${encodeURIComponent(
        redirectUrl.startsWith('/courses') ? redirectUrl : '/courses',
      )}`,
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-white border-b py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Accès réservé aux cours vidéo</h1>
            <p className="text-gray-600 mb-8">
              Cette section est accessible uniquement avec un nom d'utilisateur et un code autorisés.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <form action={grantCourseAccess} className="space-y-5">
                {showInvalidCredentials && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                    Nom d'utilisateur ou code incorrect. Réessayez.
                  </div>
                )}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                    Nom d'utilisateur
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-2">
                    Code d'accès
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="password"
                    required
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Code d'accès"
                  />
                </div>
                <input type="hidden" name="redirect" value={redirectTarget} />
                <Button type="submit" className="w-full">
                  Se connecter et accéder aux cours
                </Button>
              </form>
              <p className="mt-6 text-sm text-gray-500">
                Les identifiants sont gérés dans le fichier <code className="rounded bg-slate-100 px-1 py-0.5">course-access.csv</code>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Play className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Cours Vidéo</h1>
          </div>
          <p className="text-lg text-blue-100 mb-6">
            Apprenez l'investissement à votre rythme avec nos formations vidéo complètes
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="#beginner">
              <Button variant="secondary" size="lg">
                Voir les cours débutants
              </Button>
            </Link>
            <a href="#premium">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                Débloquer les cours premium
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{videoCourses.length}</div>
            <div className="text-gray-600">Cours disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {videoCourses.reduce((sum, c) => sum + c.lessons.length, 0)}
            </div>
            <div className="text-gray-600">Leçons en total</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {videoCourses.reduce((sum, c) => sum + c.totalDuration, 0)}
            </div>
            <div className="text-gray-600">Minutes de contenu</div>
          </div>
        </div>
      </section>

      {/* Beginner Courses */}
      <section id="beginner" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            🟢 Cours pour débutants
          </h2>
          <p className="text-gray-600 mb-8">
            Commencez votre apprentissage en investissement sans prérequis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerCourses.map(course => (
              <CourseCard key={course.id} course={course} isPremium={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Intermediate Courses */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            🟡 Cours intermédiaires
          </h2>
          <p className="text-gray-600 mb-8">
            Approfondissez vos connaissances et maîtrisez des stratégies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateCourses.map(course => (
              <CourseCard key={course.id} course={course} isPremium={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Courses */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            🔴 Cours avancés
          </h2>
          <p className="text-gray-600 mb-8">
            Maîtrisez l'analyse technique et les stratégies professionnelles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedCourses.map(course => (
              <CourseCard key={course.id} course={course} isPremium={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section id="premium" className="bg-gradient-to-r from-primary to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Débloquez tous les cours premium</h2>
          <p className="text-lg text-blue-100 mb-8">
            Accédez à tous les cours avancés, les stratégies exclusives et le support prioritaire
          </p>
          <Button variant="secondary" size="lg" className="px-8">
            Démarrer l'essai gratuit
          </Button>
        </div>
      </section>
    </div>
  );
}
