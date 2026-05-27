import Link from 'next/link';
import { getCourseAccessCredentials } from '@/lib/course-access';
import { isSiteAdminAuthenticated } from '@/lib/site-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { CredentialManager } from './CredentialManager';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function AdminCredentialsPage() {
  const isAuthenticated = isSiteAdminAuthenticated();
  const credentials = isAuthenticated ? getCourseAccessCredentials() : [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Connexion administrateur</h1>
            <p className="mt-2 text-sm text-slate-600">Accès réservé à l’administrateur du site.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des accès aux cours</h1>
          <p className="text-slate-600">Ajoutez, modifiez ou supprimez les utilisateurs autorisés à voir les cours.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard">
            <span className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Retour au dashboard</span>
          </Link>
        </Button>
      </div>

      <CredentialManager credentials={credentials} />
    </div>
  );
}
