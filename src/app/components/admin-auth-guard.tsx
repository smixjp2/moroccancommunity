
'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Ce composant vérifie si l'utilisateur est connecté et a le rôle 'admin'.
 * Si ce n'est pas le cas, il redirige vers la page de connexion.
 * Il affiche un indicateur de chargement pendant la vérification.
 */
export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const userDocRef = useMemoFirebase(() => {
    if (user && firestore) {
      return doc(firestore, 'users', user.uid);
    }
    return null;
  }, [user, firestore]);


  useEffect(() => {
    // Si le chargement de l'utilisateur Firebase est terminé
    if (!isUserLoading) {
      // Si l'utilisateur n'est pas connecté, rediriger vers login
      if (!user) {
        router.replace('/login');
        return;
      }
      
      // Si l'utilisateur est connecté, vérifier son rôle dans Firestore
      if (userDocRef) {
        const checkAdminRole = async () => {
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              // Si l'utilisateur n'est pas admin, rediriger vers son tableau de bord normal
              router.replace('/dashboard');
            }
          } catch (error) {
            console.error("Erreur lors de la vérification du rôle de l'administrateur:", error);
            router.replace('/dashboard'); // Sécurité en cas d'erreur
          } finally {
            setIsVerifying(false);
          }
        };

        checkAdminRole();
      } else {
        // Gérer le cas où la référence au document n'est pas encore prête
        // et que l'utilisateur n'est pas en cours de chargement.
        // Cela peut arriver si l'utilisateur est `null`.
         setIsVerifying(false);
         if(!user) router.replace('/login');
      }
    }
  }, [user, isUserLoading, router, userDocRef]);

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Vérification des autorisations...</p>
      </div>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  // Affiche un écran de chargement par défaut pendant que la redirection s'effectue
  // pour éviter un flash de contenu non autorisé.
  return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
  );
}
