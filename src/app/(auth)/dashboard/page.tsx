'use client';

import { useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import type { UserCourse } from '@/lib/types';
import { ALL_COURSES } from '@/lib/course-data';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = getAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (user) {
      const setupUserAndCourses = async () => {
        setLoadingCourses(true);
        try {
          // 1. Check if user document exists, create if not
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
              id: user.uid,
              email: user.email,
              role: 'user', // default role
              firstName: '', // You can populate this from a profile page later
              lastName: '',
            });
          }

          // 2. Fetch user's enrolled courses
          const userCoursesColRef = collection(firestore, `users/${user.uid}/userCourses`);
          const querySnapshot = await getDocs(userCoursesColRef);
          
          const courses: UserCourse[] = [];
          querySnapshot.forEach(doc => {
            const courseId = doc.id;
            const courseData = ALL_COURSES.find(c => c.id === courseId);
            if (courseData) {
              courses.push(courseData);
            }
          });
          setUserCourses(courses);
        } catch (error) {
          console.error("Erreur lors de la configuration de l'utilisateur ou de la récupération des formations:", error);
        } finally {
          setLoadingCourses(false);
        }
      };
      setupUserAndCourses();
    }
  }, [user, firestore]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isLoading = isUserLoading || loadingCourses;

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Mon Espace</h1>
            <p className="text-muted-foreground">Bienvenue, {user.email || 'Investisseur'} !</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Déconnexion
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Mes Formations</CardTitle>
          <CardDescription>
            Accédez à toutes les formations que vous avez achetées.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {userCourses.length > 0 ? (
                <div className="grid gap-6">
                    {userCourses.map(course => (
                        <Card key={course.id} className="flex flex-col sm:flex-row items-start justify-between p-6">
                            <div>
                                <h3 className="text-xl font-bold font-headline">{course.title}</h3>
                                <p className="text-muted-foreground mt-1">{course.description}</p>
                            </div>
                            <Button asChild className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                                <Link href={course.href} target="_blank" rel="noopener noreferrer">
                                    Accéder au Contenu
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-16">
                    <p>Vous n'avez accès à aucune formation pour le moment.</p>
                    <Button asChild className="mt-4">
                    <Link href="/courses">Découvrir nos formations</Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
