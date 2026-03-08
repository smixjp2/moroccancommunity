
'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight, User, Target, BarChart, GraduationCap, Briefcase, Users, PieChart as PieChartIcon, Settings } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { collection, getDocs, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import type { UserCourse } from '@/lib/types';
import { ALL_COURSES } from '@/lib/course-data';
import ProfileSetup from './profile-setup';
import { Badge } from '@/components/ui/badge';
import TradingViewSymbolOverview from '@/app/components/tradingview-symbol-overview';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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

          const userCoursesColRef = collection(firestore, `users/${user.uid}/userCourses`);
          const querySnapshot = await getDocs(userCoursesColRef);
          
          const enrolledCourseIds = querySnapshot.docs.map(doc => doc.id);

          const coursesFromDb = enrolledCourseIds
            .map(id => ALL_COURSES.find(course => course.id === id))
            .filter((course): course is UserCourse => !!course);

          setUserCourses(coursesFromDb);

        } catch (error) {
          console.error("Erreur:", error);
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

  // Fonction pour tester l'onboarding "comme la première fois"
  const resetProfileForTesting = async () => {
    if (!userDocRef) return;
    setLoadingData(true);
    try {
        await updateDoc(userDocRef, {
            firstName: deleteField(),
            objective: deleteField(),
            investorProfile: deleteField()
        });
        toast({ title: "Reset réussi", description: "Rechargez la page pour revoir l'onboarding." });
        window.location.reload();
    } catch (e) {
        console.error(e);
    } finally {
        setLoadingData(false);
    }
  }

  const isLoading = isUserLoading || loadingData;

  if (isLoading || !user || !userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!userProfile.firstName || !userProfile.objective) {
      return <ProfileSetup user={user} userProfile={userProfile} onProfileUpdate={refetchUserProfile} />;
  }

  return (
    <div className="container py-12">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Mon Espace</h1>
            <p className="text-muted-foreground">Ravi de vous revoir, {userProfile.firstName} !</p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="ghost" size="icon" title="Réinitialiser pour test" onClick={resetProfileForTesting}>
                <Settings className="h-4 w-4" />
            </Button>
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
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <div className="p-2 bg-primary/10 rounded-full"><User className="h-6 w-6 text-primary"/></div>
            <CardTitle className="text-xl">Mon Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
             <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => resetProfileForTesting()}>Modifier (Reset)</Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <div className="p-2 bg-primary/10 rounded-full"><Target className="h-6 w-6 text-primary"/></div>
            <CardTitle className="text-xl">Mon Objectif</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{userProfile.objective}</p>
             <Button variant="link" className="p-0 h-auto text-xs mt-2" onClick={() => resetProfileForTesting()}>Modifier</Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <div className="p-2 bg-primary/10 rounded-full"><BarChart className="h-6 w-6 text-primary"/></div>
            <CardTitle className="text-xl">Profil d'Investisseur</CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.investorProfile ? (
                <>
                    <Badge variant="secondary" className="text-base px-3 py-1">{userProfile.investorProfile}</Badge>
                    <Button variant="link" className="p-0 h-auto text-xs mt-2 block" asChild>
                        <Link href="/tools/investor-profile-quiz">Refaire le quiz</Link>
                    </Button>
                </>
            ) : (
                 <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-muted-foreground">Définissez votre profil pour des conseils adaptés.</p>
                    <Button asChild size="sm">
                        <Link href="/tools/investor-profile-quiz">Découvrir mon profil</Link>
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <TradingViewSymbolOverview />
      </section>

      <section className="mb-8">
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3">Fonctionnalités Exclusives</CardTitle>
                <CardDescription>Accédez à nos outils d'analyse avancés.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <Card className="flex flex-col items-start p-6 hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-background rounded-lg mb-4 shadow-sm"><Briefcase className="text-primary"/></div>
                    <h3 className="text-lg font-bold font-headline mb-1">Analyseur d'Actions</h3>
                    <p className="text-sm text-muted-foreground mb-4">Analyse financière détaillée des sociétés cotées.</p>
                    <Button asChild variant="secondary" className="w-full mt-auto">
                        <Link href="/dashboard/stock-analyzer">Lancer l'outil</Link>
                    </Button>
                </Card>
                <Card className="flex flex-col items-start p-6 hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-background rounded-lg mb-4 shadow-sm"><Users className="text-primary"/></div>
                    <h3 className="text-lg font-bold font-headline mb-1">Communauté</h3>
                    <p className="text-sm text-muted-foreground mb-4">Échangez avec les autres membres sur vos formations.</p>
                    <Button asChild variant="secondary" className="w-full mt-auto">
                        <Link href="/dashboard/community">Rejoindre</Link>
                    </Button>
                </Card>
                 <Card className="flex flex-col items-start p-6 hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-background rounded-lg mb-4 shadow-sm"><PieChartIcon className="text-primary"/></div>
                    <h3 className="text-lg font-bold font-headline mb-1">Simulateur d'Allocation</h3>
                    <p className="text-sm text-muted-foreground mb-4">Générez un portefeuille adapté à votre profil.</p>
                    <Button asChild variant="secondary" className="w-full mt-auto">
                        <Link href="/dashboard/portfolio-allocator">Lancer l'outil</Link>
                    </Button>
                </Card>
            </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><GraduationCap />Mes Formations</CardTitle>
          <CardDescription>
            Accédez à votre contenu éducatif.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {userCourses.length > 0 ? (
                <div className="grid gap-4">
                    {userCourses.map(course => (
                        <Card key={course.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-muted/30">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="text-lg font-bold">{course.title}</h3>
                                <p className="text-xs text-muted-foreground">{course.description}</p>
                            </div>
                            <Button asChild size="sm">
                                <Link href={course.href} target="_blank" rel="noopener noreferrer">
                                    Voir le cours <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-12">
                    <p className="mb-4">Vous n'avez pas encore de formation active.</p>
                    <Button asChild>
                        <Link href="/courses">Explorer le catalogue</Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
