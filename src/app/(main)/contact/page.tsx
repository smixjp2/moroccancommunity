
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from "lucide-react";

export default function ContactPage() {

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
            <CardTitle className="font-headline text-3xl">Nous Contacter</CardTitle>
            <CardDescription className="pt-2">
              Remplissez le formulaire ci-dessous. Nous lirons votre message avec attention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="https://formsubmit.co/themoroccananalyst@gmail.com" method="POST" className="space-y-6">
                {/* FormSubmit specific hidden inputs */}
                <input type="hidden" name="_subject" value="Nouveau message depuis TheMoroccan.Community !" />
                <input type="hidden" name="_next" value="https://masi-insights-backup-366-74d81.web.app/contact" />
                <input type="hidden" name="_captcha" value="false" />
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom Complet</label>
                    <Input id="name" name="name" type="text" placeholder="Votre nom complet" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Votre E-mail</label>
                    <Input id="email" name="email" type="email" placeholder="votre.email@exemple.com" required />
                  </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet de votre demande</label>
                    <select name="subject" id="subject" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled selected>Sélectionnez un sujet</option>
                        <option value="Informations Formations">Informations sur les formations</option>
                        <option value="Demande de Collaboration">Demande de collaboration</option>
                        <option value="Support Technique">Support technique</option>
                        <option value="Suggestion">Suggestion / Feedback</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                <div>
                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Votre Message</label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Écrivez votre message ici..."
                        className="min-h-[120px]"
                        required
                        minLength={10}
                    />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2" />
                  Envoyer le message
                </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
