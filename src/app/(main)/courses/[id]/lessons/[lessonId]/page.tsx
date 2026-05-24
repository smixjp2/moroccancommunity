import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourseById, getLessonById, getCourseLessonIndex } from '@/lib/video-courses-data';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface LessonPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { id, lessonId } = await params;
  const course = getCourseById(id);
  const lesson = getLessonById(id, lessonId);

  if (!course || !lesson) {
    return {
      title: 'Leçon non trouvée',
    };
  }

  return {
    title: `${lesson.title} | ${course.title} | The Moroccan Community`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id, lessonId } = await params;
  const course = getCourseById(id);
  const lesson = getLessonById(id, lessonId);

  if (!course || !lesson) {
    notFound();
  }

  const lessonIndex = getCourseLessonIndex(id, lessonId);
  const previousLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/courses" className="text-primary hover:underline">
            Cours
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/courses/${course.id}`} className="text-primary hover:underline">
            {course.title}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{lesson.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video and Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {/* Video Player */}
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                title={lesson.title}
                locked={lesson.locked}
                onUnlock={() => {
                  // TODO: Redirect to premium subscription
                  console.log('Unlock premium');
                }}
              />

              {/* Lesson Info */}
              <div className="p-6 border-b">
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.duration} minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Leçon {lessonIndex + 1} sur {course.lessons.length}
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">À propos de cette leçon</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    Cette leçon est une partie du cours <strong>{course.title}</strong>.
                    Vous apprendrez les concepts clés nécessaires pour progresser dans votre
                    apprentissage en investissement.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Conseil :</strong> Prenez des notes pendant la vidéo et revoyez-la
                      si quelque chose n'est pas clair.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {previousLesson ? (
                <Link
                  href={`/courses/${course.id}/lessons/${previousLesson.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Leçon précédente
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextLesson ? (
                <Link
                  href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                  className="flex-1"
                >
                  <Button className="w-full">
                    Prochaine leçon
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${course.id}`} className="flex-1">
                  <Button className="w-full">
                    Retour au cours
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar: Course Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  {course.icon} {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((l, idx) => (
                    <Link
                      key={l.id}
                      href={`/courses/${course.id}/lessons/${l.id}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        l.id === lesson.id
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <div className="font-medium text-sm">{idx + 1}. {l.title}</div>
                      <div className={`text-xs ${
                        l.id === lesson.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {l.duration} min
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      Leçon {lessonIndex + 1} sur {course.lessons.length}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${((lessonIndex + 1) / course.lessons.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(((lessonIndex + 1) / course.lessons.length) * 100)}% complété
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
