
'use client';

import AdminAuthGuard from '@/app/components/admin-auth-guard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit } from 'lucide-react';
import Link from 'next/link';

// Données statiques pour l'exemple
const courses = [
  { id: '1', name: 'Formation Bourse de Casablanca', status: 'Publié' },
  { id: '2', name: 'Stratégie DCA', status: 'Publié' },
  { id: '3', name: 'Excel & Power BI pour la Finance', status: 'Brouillon' },
];

function AdminDashboardPage() {
  return (
    <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Tableau de Bord Admin</h1>
                <p className="text-muted-foreground">Gérez le contenu de la plateforme.</p>
            </div>
             <Button asChild>
                <Link href="/dashboard">Retour à mon espace</Link>
            </Button>
        </header>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Gestion des Formations</CardTitle>
                    <CardDescription>Ajoutez, modifiez ou supprimez des formations.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une Formation
                </Button>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border">
                    {courses.map(course => (
                        <div key={course.id} className="flex items-center justify-between py-4">
                            <div>
                                <p className="font-semibold">{course.name}</p>
                                <p className={`text-sm ${course.status === 'Publié' ? 'text-green-600' : 'text-yellow-600'}`}>{course.status}</p>
                            </div>
                            <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        
        {/* Ajouter d'autres cartes de gestion ici (Utilisateurs, Articles, etc.) */}
    </div>
  );
}

// Enveloppez le composant de page avec le garde d'authentification
export default function ProtectedAdminDashboard() {
    return (
        <AdminAuthGuard>
            <AdminDashboardPage />
        </AdminAuthGuard>
    );
}
