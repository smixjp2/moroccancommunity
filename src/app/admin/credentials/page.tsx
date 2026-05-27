import Link from 'next/link';
import { getCourseAccessCredentials } from '@/lib/course-access';
import { isSiteAdminAuthenticated } from '@/lib/site-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { CredentialManager } from './CredentialManager';
import { saveCredential, removeCredential, logoutAdmin, loginAdmin } from './actions';

export const dynamic = 'force-dynamic';

interface AdminCredentialsPageProps {
  searchParams?: { success?: string; error?: string };
}

function formatMessage(key?: string) {
  switch (key) {
    case 'saved':
      return { tone: 'success', text: 'Identifiant enregistré avec succès.' };
    case 'deleted':
      return { tone: 'success', text: 'Identifiant supprimé.' };
    case 'invalid':
      return { tone: 'error', text: 'Le nom d’utilisateur et le code sont requis.' };
    default:
      return null;
  }
}

export default function AdminCredentialsPage({ searchParams }: AdminCredentialsPageProps) {
  const isAuthenticated = isSiteAdminAuthenticated();
  const credentials = isAuthenticated ? getCourseAccessCredentials() : [];
  const message = formatMessage(searchParams?.success ?? searchParams?.error);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Connexion administrateur</h1>
            <p className="mt-2 text-sm text-slate-600">Accès réservé à l’administrateur du site.</p>
          </div>

          {message && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              E-mail ou mot de passe incorrect.
            </div>
          )}

          <form action={loginAdmin} className="space-y-5">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required placeholder="serrou.mohammed@outlook.com" />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
      <div className="container py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des accès aux cours</h1>
            <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez les utilisateurs autorisés à voir les cours.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">
              <span className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Retour au dashboard</span>
            </Link>
          </Button>
        </div>

        {message && (
          <div
            className={
              message.tone === 'success'
                ? 'rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800'
                : 'rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800'
            }
          >
            {message.text}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section>
            <CredentialManager credentials={credentials} deleteAction={removeCredential} />
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Ajouter / Mettre à jour</CardTitle>
                <CardDescription>Enregistrer un nouvel utilisateur ou changer le code d’un utilisateur existant.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={saveCredential} className="space-y-5">
                  <div>
                    <Label htmlFor="username">Nom d’utilisateur</Label>
                    <Input id="username" name="username" type="text" required placeholder="ex: masi" />
                  </div>
                  <div>
                    <Label htmlFor="code">Code d’accès</Label>
                    <Input id="code" name="code" type="text" required placeholder="ex: masi123" />
                  </div>
                  <Button type="submit" className="w-full inline-flex items-center justify-center gap-2">
                    <PlusCircle className="h-4 w-4" /> Enregistrer
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6 border border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle>Note</CardTitle>
                <CardDescription>Les entrées sont stockées dans <code className="rounded bg-slate-100 px-1 py-0.5">course-access.csv</code>.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700">
                  Utilisez le même nom d’utilisateur pour mettre à jour le code d’accès existant. Les noms d’utilisateur sont stockés en minuscules.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent>
                <form action={logoutAdmin}>
                  <Button type="submit" variant="outline" className="w-full">
                    Se déconnecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
  );
}
