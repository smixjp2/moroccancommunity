'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

export default function DashboardPage() {
  const { user, isUserLoading, userError } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
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
          <div className="text-center text-muted-foreground py-16">
            <p>Vous n'avez accès à aucune formation pour le moment.</p>
            <Button asChild className="mt-4">
              <a href="/courses">Découvrir nos formations</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
