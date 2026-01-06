'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import type { UserCourse } from '@/lib/types';

// Define a type for the user profile data from Firestore
interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = getAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const userDocRef = useMemoFirebase(() => {
    if (user && firestore) {
      return doc(firestore, 'users', user.uid);
    }
    return null;
  }, [user, firestore]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (user && firestore && userDocRef) {
      const setupUserAndCourses = async () => {
        setLoadingData(true);
        try {
          // 1. Fetch or create user document
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) {
            const newUserProfile: UserProfile = {
              id: user.uid,
              email: user.email || 'inconnu',
              role: 'user', // default role
              firstName: user.displayName?.split(' ')[0] || '',
              lastName: user.displayName?.split(' ')[1] || '',
            };
            await setDoc(userDocRef, newUserProfile);
            setUserProfile(newUserProfile);
          } else {
            setUserProfile(userDocSnap.data() as UserProfile);
          }

          // 2. Fetch user's enrolled courses from Firestore
          const userCoursesColRef = collection(firestore, `users/${user.uid}/userCourses`);
          const querySnapshot = await getDocs(userCoursesColRef);
          
          const coursesFromDb: UserCourse[] = [];
          querySnapshot.forEach(doc => {
            const data = doc.data() as Omit<UserCourse, 'id'>;
            coursesFromDb.push({ ...data, id: doc.id });
          });
          setUserCourses(coursesFromDb);

        } catch (error) {
          console.error("Erreur lors de la configuration de l'utilisateur ou de la récupération des formations:", error);
        } finally {
          setLoadingData(false);
        }
      };
      setupUserAndCourses();
    }
  }, [user, firestore, userDocRef]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isLoading = isUserLoading || loadingData;

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="container py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Mon Espace</h1>
            <p className="text-muted-foreground">Bienvenue, {userProfile?.firstName || user.email || 'Investisseur'} !</p>
        </div>
        <div className="flex items-center gap-2">
            {isAdmin && (
                 <Button variant="destructive" asChild>
                    <Link href="/admin/dashboard">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Dashboard Admin
                    </Link>
                </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/">Accueil</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
        </div>
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
