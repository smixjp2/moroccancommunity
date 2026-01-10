import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
            </div>
            <CardTitle className="font-headline text-3xl">Nous Contacter</CardTitle>
            <CardDescription className="pt-2">
                Pour toute question, partenariat ou suggestion, n'hésitez pas à nous envoyer un e-mail. Nous vous répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-2xl font-semibold font-mono p-4 border rounded-lg bg-muted">
                themoroccancommunity@gmail.com
            </div>
            <Button asChild size="lg">
                <Link href="mailto:themoroccancommunity@gmail.com">
                    <Send className="mr-2" /> Envoyer un E-mail
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
