
'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight, User, Target, BarChart, GraduationCap, Briefcase } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { UserCourse } from '@/lib/types';
import ProfileSetup from './profile-setup';
import { Badge } from '@/components/ui/badge';

// Define a type for the user profile data from Firestore
export interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  objective?: string;
  investorProfile?: string;
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

  const refetchUserProfile = async () => {
     if (userDocRef) {
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data() as UserProfile);
      }
    }
  }

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
          await refetchUserProfile();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (isLoading || !user || !userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If user profile is not complete, show the setup form
  if (!userProfile.firstName || !userProfile.objective) {
      return <ProfileSetup user={user} userProfile={userProfile} onProfileUpdate={refetchUserProfile} />;
  }

  return (
    <div className="container py-12">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Mon Espace</h1>
            <p className="text-muted-foreground">Bienvenue, {userProfile.firstName} !</p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
            <Button asChild>
                <Link href="/">Retour à l'accueil</Link>
            </Button>
        </div>
      </header>

      {/* Profile and Objective Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <User className="h-8 w-8 text-primary"/>
            <CardTitle>Mon Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
             <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => setUserProfile(prev => ({...prev!, firstName: ''}))}>Modifier</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <Target className="h-8 w-8 text-primary"/>
            <CardTitle>Mon Objectif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{userProfile.objective}</p>
             <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => setUserProfile(prev => ({...prev!, objective: ''}))}>Modifier</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <BarChart className="h-8 w-8 text-primary"/>
            <CardTitle>Profil d'Investisseur</CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.investorProfile ? (
                <>
                    <Badge variant="secondary" className="text-base">{userProfile.investorProfile}</Badge>
                    <Button variant="link" className="p-0 h-auto text-xs mt-2 block" asChild>
                        <Link href="/tools/investor-profile-quiz">Refaire le quiz</Link>
                    </Button>
                </>
            ) : (
                 <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-muted-foreground">Définissez votre profil pour des conseils adaptés.</p>
                    <Button asChild size="sm">
                        <Link href="/tools/investor-profile-quiz">Faire le quiz</Link>
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* AI Tools Section */}
      <section className="mb-8">
        <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3"><Briefcase /> Outils Exclusifs</CardTitle>
                <CardDescription>Accédez à nos outils d'analyse avancés.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Card className="flex flex-col sm:flex-row items-start justify-between p-6">
                    <div>
                        <h3 className="text-xl font-bold font-headline">Analyseur d'Actions</h3>
                        <p className="text-muted-foreground mt-1">Obtenez une analyse financière détaillée d'une action de la Bourse de Casablanca.</p>
                    </div>
                    <Button asChild className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                        <Link href="/dashboard/stock-analyzer">
                            Lancer l'Analyse
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </Card>
            </CardContent>
        </Card>
      </section>

      {/* Courses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><GraduationCap />Mes Formations</CardTitle>
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
