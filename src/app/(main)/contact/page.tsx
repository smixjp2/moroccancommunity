
'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import { useLocale } from '@/hooks/use-locale';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, Loader2 } from "lucide-react";
import { sendContactEmail } from '@/app/actions/contact';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  subject: z.string({ required_error: "Veuillez sélectionner un sujet." }).min(1, "Le sujet est requis."),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const locale = useLocale();
  const t = locale === 'en' ? en : fr;
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [state, formAction, isPending] = useActionState(sendContactEmail, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast({
        title: "Message envoyé !",
        description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: state.message || "Une erreur est survenue.",
      });
    }
  }, [state, form, toast]);
  
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    formAction(formData);
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="font-headline text-3xl">{t.contact.title}</CardTitle>
            <CardDescription className="pt-2">
              {t.contact.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>{t.contact.fields.name}</FormLabel><FormControl><Input {...field} placeholder={locale === 'en' ? 'Your name' : 'Votre nom'} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{t.contact.fields.email}</FormLabel><FormControl><Input {...field} type="email" placeholder={locale === 'en' ? 'you@example.com' : 'votre@email.com'} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.fields.subject}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Sélectionnez un sujet" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Informations Formations">Informations sur les formations</SelectItem>
                        <SelectItem value="Demande de Collaboration">Demande de collaboration</SelectItem>
                        <SelectItem value="Support Technique">Support technique</SelectItem>
                        <SelectItem value="Suggestion">Suggestion / Feedback</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>{t.contact.fields.message}</FormLabel><FormControl><Textarea {...field} placeholder={locale === 'en' ? 'Write your message here...' : 'Écrivez votre message ici...'} className="min-h-[120px]" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                   {isPending ? <Loader2 className="mr-2 animate-spin" /> : <Send className="mr-2" />}
                  {isPending ? t.contact.sending : t.contact.submit}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
