'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';

const userCourses = [
    {
        id: "dca-strategie",
        title: "La Stratégie DCA : Investir Simplement et Efficacement",
        description: "Accédez aux 5 vidéos et aux ressources de la formation.",
        href: "https://drive.google.com/drive/folders/17RZCsZxcYzKefhFPapH9naeJKkKVAbBT?usp=drive_link"
    }
]

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (isUserLoading || !user) {
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
                    <a href="/courses">Découvrir nos formations</a>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
