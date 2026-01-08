
'use client';

import AdminAuthGuard from '@/app/components/admin-auth-guard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Users } from 'lucide-react';
import Link from 'next/link';

// Données statiques pour l'exemple
const features = [
  { 
    id: 'users', 
    name: 'Gestion des Utilisateurs', 
    description: 'Ajoutez, modifiez et assignez des formations aux utilisateurs.',
    icon: Users,
    href: '/admin/users'
  },
  { 
    id: 'courses', 
    name: 'Gestion des Formations', 
    description: 'Ajoutez ou modifiez les formations disponibles.',
    icon: Edit,
    href: '#'
  },
];

function AdminDashboardPage() {
  return (
    <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">Tableau de Bord Admin</h1>
                <p className="text-muted-foreground">Gérez le contenu et les utilisateurs de la plateforme.</p>
            </div>
             <Button asChild>
                <Link href="/dashboard">Retour à mon espace</Link>
            </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(feature => (
             <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <feature.icon className="h-6 w-6 text-primary" />
                        {feature.name}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href={feature.href}>Accéder</Link>
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>
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
