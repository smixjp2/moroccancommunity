
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
import { Loader2, User as UserIcon, Target, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [step, setStep] = useState(1);
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
        description: "Bienvenue dans la communauté The Moroccan Community.",
      });
      onProfileUpdate();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue.',
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await form.trigger(['firstName', 'lastName']);
      if (isValid) setStep(2);
    }
  };

  const prevStep = () => setStep(1);

  return (
    <div className="container flex min-h-screen items-center justify-center py-12 bg-muted/30">
      <Card className="mx-auto w-full max-w-lg shadow-xl border-t-4 border-t-primary overflow-hidden">
        <div className="bg-primary/5 p-6 border-b">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Étape {step} sur 2</span>
                <Sparkles className="text-primary h-5 w-5" />
            </div>
            <Progress value={step === 1 ? 50 : 100} className="h-2" />
        </div>
        
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            {step === 1 ? "Enchanté !" : "Vos Objectifs"}
          </CardTitle>
          <CardDescription className="text-base">
            {step === 1 
              ? "Commençons par faire connaissance. Comment devons-nous vous appeler ?" 
              : "Parlez-nous de vos ambitions financières pour que nous puissions vous guider."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2"><UserIcon className="h-4 w-4"/> Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Amine" {...field} className="h-12" />
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
                              <Input placeholder="Alaoui" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="button" onClick={nextStep} className="w-full h-12 text-lg font-bold">
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="objective"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Target className="h-4 w-4"/> Votre priorité d'investissement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Choisissez votre objectif" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Préparer ma retraite">Préparer ma retraite</SelectItem>
                                    <SelectItem value="Générer un revenu passif">Générer un revenu passif (Dividendes)</SelectItem>
                                    <SelectItem value="Acheter un bien immobilier">Acheter un bien immobilier</SelectItem>
                                    <SelectItem value="Financer les études de mes enfants">Financer les études de mes enfants</SelectItem>
                                    <SelectItem value="Apprendre la bourse">Apprendre la Bourse de Casablanca</SelectItem>
                                    <SelectItem value="Autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12">
                            <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                        </Button>
                        <Button type="submit" className="flex-[2] h-12 text-lg font-bold" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Terminer l'installation"}
                        </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Form>
          
          <div className="mt-8 pt-6 border-t text-center text-sm">
             <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                Se déconnecter
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
