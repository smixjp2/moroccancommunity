import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import { validateSiteAdmin, createSiteAdminCookie, isSiteAdminAuthenticated } from '@/lib/site-admin';
import { ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  searchParams?: { error?: string };
}

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (isSiteAdminAuthenticated()) {
    redirect('/admin/credentials');
  }

  const showError = searchParams?.error === 'invalid';

  async function loginAdmin(formData: FormData) {
    'use server';

    const email = (formData.get('email') as string | null)?.trim() ?? '';
    const password = (formData.get('password') as string | null)?.trim() ?? '';

    if (validateSiteAdmin(email, password)) {
      createSiteAdminCookie();
      redirect('/admin/credentials');
    }

    redirect('/admin/login?error=invalid');
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Connexion administrateur</h1>
          <p className="mt-2 text-sm text-slate-600">Accès réservé à l’administrateur du site.</p>
        </div>

        {showError && (
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

        <div className="mt-8 text-center text-sm text-slate-500">
          <Link href="/admin/credentials" className="text-primary hover:underline">
            Aller à la page de gestion des accès
          </Link>
        </div>
      </div>
    </div>
  );
}
