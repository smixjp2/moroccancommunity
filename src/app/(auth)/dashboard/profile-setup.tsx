
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User } from 'firebase/auth';
import type { UserProfile } from './page';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface ProfileSetupProps {
  user: User;
  userProfile: UserProfile;
  onProfileUpdate: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères."),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  objective: z.string({ required_error: "Veuillez sélectionner un objectif." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileSetup({ user, userProfile, onProfileUpdate }: ProfileSetupProps) {
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();
  const auth = getAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userProfile?.firstName || user.displayName?.split(' ')[0] || '',
      lastName: userProfile?.lastName || user.displayName?.split(' ')[1] || '',
      objective: userProfile?.objective || '',
    },
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const updatedProfile: UserProfile = {
        ...userProfile,
        id: user.uid,
        email: user.email || 'inconnu',
        role: userProfile.role || 'user',
        ...values,
      };

      await setDoc(userDocRef, updatedProfile, { merge: true });

      toast({
        title: "Profil mis à jour !",
        description: "Votre profil a été sauvegardé avec succès.",
      });
      onProfileUpdate(); // Callback to refetch data in the parent component
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la mise à jour.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Complétez votre profil</CardTitle>
          <CardDescription>
            Aidez-nous à personnaliser votre expérience. Ces informations s'afficheront sur votre tableau de bord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quel est votre objectif d'investissement principal ?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un objectif" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Préparer ma retraite">Préparer ma retraite</SelectItem>
                                <SelectItem value="Générer un revenu passif">Générer un revenu passif</SelectItem>
                                <SelectItem value="Acheter un bien immobilier">Acheter un bien immobilier</SelectItem>
                                <SelectItem value="Financer les études de mes enfants">Financer les études de mes enfants</SelectItem>
                                <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer et Continuer
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
             <Button variant="link" onClick={handleLogout}>Se déconnecter</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
