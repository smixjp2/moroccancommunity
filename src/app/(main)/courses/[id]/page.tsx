import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourseById, videoCourses } from '@/lib/video-courses-data';
import { isCourseAccessGranted } from '@/lib/course-access';
import { ArrowLeft, BookOpen, Clock, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return videoCourses.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return {
      title: 'Cours non trouvé',
    };
  }

  return {
    title: `${course.title} | The Moroccan Community`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  if (!isCourseAccessGranted()) {
    redirect(`/courses?redirect=${encodeURIComponent(`/courses/${id}`)}`);
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '🟢 Débutant';
      case 'intermediate':
        return '🟡 Intermédiaire';
      case 'advanced':
        return '🔴 Avancé';
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link href="/courses" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Retour aux cours
          </Link>
        </div>
      </div>

      {/* Course Header */}
      <section className="bg-white border-b px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(course.level)}>
                {getLevelLabel(course.level)}
              </Badge>
              {course.premium && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold">
              {course.icon} {course.title}
            </h1>
            <p className="text-xl text-gray-600">{course.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {course.lessons.length}
                </div>
                <div className="text-sm text-gray-600">Leçons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {course.totalDuration}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm font-semibold text-primary">
                  {course.instructor}
                </div>
                <div className="text-sm text-gray-600">Instructeur</div>
              </CardContent>
            </Card>
            {course.prerequisites && course.prerequisites.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm font-semibold text-primary">
                    {course.prerequisites.length}
                  </div>
                  <div className="text-sm text-gray-600">Prérequis</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Programme du cours</h2>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${course.id}/lessons/${lesson.id}`}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-lg font-semibold">{lesson.title}</h3>
                          {lesson.locked && (
                            <Lock className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap">
                        <Clock className="h-4 w-4" />
                        {lesson.duration} min
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
