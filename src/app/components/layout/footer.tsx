
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Facebook, Music } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import { useLocale } from "@/hooks/use-locale";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="default" disabled={pending}>
            {pending ? "Envoi..." : "S'abonner"}
        </Button>
    );
}

export function Footer() {
  const locale = useLocale();
  const t = locale === "en" ? en : fr;
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(subscribeToNewsletter, { success: false, message: "" });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: locale === "en" ? "Subscription successful!" : "Inscription réussie !",
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: "destructive",
          title: locale === "en" ? "Subscription error" : "Erreur d'inscription",
          description: state.message,
        });
      }
    }
  }, [state, toast, locale]);

  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span className="font-bold">The Moroccan Community</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {locale === "en"
                ? "Your go-to source for Moroccan market analysis and investment intelligence."
                : "Votre source de premier plan pour l'analyse du marché marocain et l'intelligence d'investissement."}
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.youtube.com/@The_Moroccan_Analyst" target="_blank" rel="noopener noreferrer" aria-label="The Moroccan Analyst YouTube"><Youtube className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.youtube.com/@TheMoroccanCFO" target="_blank" rel="noopener noreferrer" aria-label="The Moroccan CFO YouTube"><Youtube className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/the_moroccananalyst/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://web.facebook.com/themoroccananaly/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.tiktok.com/@themoroccananalyst" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Music className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
             <h3 className="font-headline font-semibold">{t.nav.about}</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/articles" className="hover:text-primary">{t.nav.articles}</Link></li>
                <li><Link href="/tools" className="hover:text-primary">{t.nav.tools}</Link></li>
                <li><Link href="/resources" className="hover:text-primary">{t.nav.resources}</Link></li>
                <li><Link href="/about" className="hover:text-primary">{t.nav.about}</Link></li>
                <li><Link href="/contact" className="hover:text-primary">{t.nav.contact}</Link></li>
             </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline font-semibold">{t.footer.newsletterTitle}</h3>
            <p className="text-muted-foreground text-sm">
                {t.footer.newsletterDescription}
            </p>
            <form action={formAction} ref={formRef} className="flex w-full items-center space-x-2">
              <Input name="email" type="email" placeholder={locale === 'en' ? 'Your email' : 'Votre email'} className="flex-1" required />
              <SubmitButton />
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t.footer.copyright.replace('{year}', `${new Date().getFullYear()}`) }} />
        </div>
      </div>
    </footer>
  );

}
