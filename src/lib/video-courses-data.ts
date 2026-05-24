/**
 * Video courses data structure
 * Videos hosted on YouTube (unlisted) or similar secure platform
 */

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube embed URL or Vimeo URL
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  locked?: boolean; // Premium only
}

export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  thumbnail: string;
  lessons: VideoLesson[];
  level: 'beginner' | 'intermediate' | 'advanced';
  totalDuration: number; // in minutes
  instructor: string;
  premium?: boolean;
  prerequisites?: string[];
}

export const videoCourses: VideoCourse[] = [
  {
    id: 'intro-stock-market',
    title: 'Introduction au Marché Boursier Marocain',
    description: 'Apprenez les bases du marché boursier marocain, le MASI et comment commencer à investir.',
    category: 'Débutant',
    icon: '📈',
    thumbnail: 'https://images.unsplash.com/photo-1611432579699-484f7990f956?w=400&h=300&fit=crop',
    level: 'beginner',
    instructor: 'Équipe The Moroccan Community',
    premium: false,
    totalDuration: 45,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Qu\'est-ce que le MASI ?',
        description: 'Comprendre l\'indice principal du marché boursier marocain',
        videoUrl: 'https://www.youtube.com/embed/k9xtHs054IY',
        duration: 8,
        difficulty: 'beginner',
        order: 1,
      },
      {
        id: 'lesson-1-2',
        title: 'Comment ouvrir un compte chez un courtier',
        description: 'Guide complet pour ouvrir votre premier compte de trading',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 12,
        difficulty: 'beginner',
        order: 2,
      },
      {
        id: 'lesson-1-3',
        title: 'Les types d\'ordres de bourse',
        description: 'Maîtrisez les ordres market, limit, et other types',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 10,
        difficulty: 'beginner',
        order: 3,
      },
      {
        id: 'lesson-1-4',
        title: 'Gestion du risque pour débutants',
        description: 'Comment protéger votre capital en tant qu\'investisseur débutant',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 15,
        difficulty: 'beginner',
        order: 4,
      },
    ],
  },
  {
    id: 'dividend-investing',
    title: 'Investissement en Dividendes',
    description: 'Stratégie pour générer des revenus passifs via les dividendes marocains',
    category: 'Intermédiaire',
    icon: '💰',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-430f63602022?w=400&h=300&fit=crop',
    level: 'intermediate',
    instructor: 'Équipe The Moroccan Community',
    premium: true,
    totalDuration: 60,
    prerequisites: ['intro-stock-market'],
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Comprendre les dividendes',
        description: 'Fonctionnement des dividendes et leur importance',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 10,
        difficulty: 'intermediate',
        order: 1,
        locked: true,
      },
      {
        id: 'lesson-2-2',
        title: 'Sélectionner les meilleures actions à dividendes',
        description: 'Critères de sélection pour les meilleures valeurs',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 15,
        difficulty: 'intermediate',
        order: 2,
        locked: true,
      },
      {
        id: 'lesson-2-3',
        title: 'Stratégies de réinvestissement',
        description: 'Comment maximiser vos rendements avec la capitalisation',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 12,
        difficulty: 'intermediate',
        order: 3,
        locked: true,
      },
      {
        id: 'lesson-2-4',
        title: 'Cas d\'étude : Portefeuille réel de dividendes',
        description: 'Analyse d\'un portefeuille marocain réel',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 23,
        difficulty: 'intermediate',
        order: 4,
        locked: true,
      },
    ],
  },
  {
    id: 'technical-analysis',
    title: 'Analyse Technique Avancée',
    description: 'Maîtrisez l\'analyse technique pour trader le MASI',
    category: 'Avancé',
    icon: '📊',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-30bbc8d9c2e5?w=400&h=300&fit=crop',
    level: 'advanced',
    instructor: 'Équipe The Moroccan Community',
    premium: true,
    totalDuration: 90,
    prerequisites: ['intro-stock-market'],
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Fondamentaux des graphiques',
        description: 'Lectures de chandeliers et patterns',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 18,
        difficulty: 'advanced',
        order: 1,
        locked: true,
      },
      {
        id: 'lesson-3-2',
        title: 'Indicateurs techniques : RSI, MACD, Bandes Bollinger',
        description: 'Les indicateurs les plus utilisés expliqués',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 25,
        difficulty: 'advanced',
        order: 2,
        locked: true,
      },
      {
        id: 'lesson-3-3',
        title: 'Supports et Résistances',
        description: 'Comment identifier et trader avec les niveaux clés',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        difficulty: 'advanced',
        order: 3,
        locked: true,
      },
      {
        id: 'lesson-3-4',
        title: 'Stratégies de trading complets',
        description: 'Mise en place de stratégies complètes et testées',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 27,
        difficulty: 'advanced',
        order: 4,
        locked: true,
      },
    ],
  },
];

export function getCourseById(id: string): VideoCourse | undefined {
  return videoCourses.find(course => course.id === id);
}

export function getLessonById(courseId: string, lessonId: string): VideoLesson | undefined {
  const course = getCourseById(courseId);
  return course?.lessons.find(lesson => lesson.id === lessonId);
}

export function getCourseLessonIndex(courseId: string, lessonId: string): number {
  const course = getCourseById(courseId);
  return course?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1;
}
