'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter }s from 'next/navigation';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide.'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      // We don't await this, the state change will be handled by the auth listener
      initiateEmailSignIn(auth, values.email, values.password);
      toast({
        title: 'Connexion en cours...',
        description: 'Vous allez être redirigé vers votre tableau de bord.',
      });
      // The redirect will be handled by a protected route layout or a hook watching user state
      // For now, we'll optimistically push to the dashboard.
       router.push('/dashboard');
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: error.message || 'Une erreur inconnue est survenue.',
      });
    }
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          <CardDescription>
            Accédez à votre espace personnel pour suivre vos formations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Se Connecter
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas de compte ?{' '}
            <Link href="#" className="underline">
              Contactez-nous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
