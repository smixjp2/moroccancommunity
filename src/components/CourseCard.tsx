'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Lock } from 'lucide-react';
import { VideoCourse } from '@/lib/video-courses-data';

interface CourseCardProps {
  course: VideoCourse;
  isPremium?: boolean;
}

export function CourseCard({ course, isPremium = false }: CourseCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative w-full h-40 bg-gray-200">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {course.premium && !isPremium && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-white" />
              <span className="text-white text-sm font-semibold">Premium</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
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
        <CardTitle className="text-lg">{course.icon} {course.title}</CardTitle>
        <CardDescription className="text-sm">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons.length} leçons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.totalDuration} minutes</span>
          </div>
          <div className="text-xs text-gray-500">
            Par: {course.instructor}
          </div>
        </div>

        <Link href={`/courses/${course.id}`} className="w-full">
          <Button variant="default" className="w-full">
            Voir le cours
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
