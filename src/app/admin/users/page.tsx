
'use client';

import { useEffect } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { UserProfile } from '@/app/(auth)/dashboard/page';
import AdminAuthGuard from '@/app/components/admin-auth-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Users, Edit } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

function UserManagementPage() {
  const firestore = useFirestore();
  const usersColRef = collection(firestore, 'users');
  const { data: users, isLoading, error } = useCollection<UserProfile>(usersColRef);

  return (
    <div className="container py-12">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3"><Users />Gestion des Utilisateurs</h1>
                <p className="text-muted-foreground">Consultez et gérez les profils des utilisateurs de la plateforme.</p>
            </div>
             <Button asChild>
                <Link href="/admin/dashboard">Retour au tableau de bord</Link>
            </Button>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Liste des Utilisateurs</CardTitle>
                <CardDescription>Cliquez sur "Gérer" pour assigner des formations à un utilisateur.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                     <div className="flex h-48 items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                )}
                {error && <p className="text-destructive">Erreur: {error.message}</p>}
                {!isLoading && users && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom Complet</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rôle</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild size="sm">
                                            <Link href={`/admin/users/${user.id}`}>
                                                <Edit className="mr-2 h-4 w-4" /> Gérer
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                 {!isLoading && users?.length === 0 && (
                    <p className="text-center text-muted-foreground py-16">Aucun utilisateur trouvé.</p>
                 )}
            </CardContent>
        </Card>
    </div>
  );
}

export default function ProtectedUserManagementPage() {
    return (
        <AdminAuthGuard>
            <UserManagementPage />
        </AdminAuthGuard>
    )
}
