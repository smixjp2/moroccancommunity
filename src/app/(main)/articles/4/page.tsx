import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { articles } from '@/lib/article-data';
import { AlertTriangle, BookOpen, Globe, Activity } from 'lucide-react';

export default function ArticlePage() {
    const articleId = "4";
    const article = articles.find((a) => a.id === articleId);

    if (!article) {
        notFound();
    }

    return (
        <div className="container py-12 md:py-16">
            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
                        {article.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Publié le {new Date(article.date).toLocaleDateString('fr-FR')} par {article.author}
                    </p>
                </header>

                <Card className="overflow-hidden mb-8">
                    <div className="relative aspect-video">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            data-ai-hint={article.imageHint}
                            priority
                        />
                    </div>
                </Card>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground">
                        Après plusieurs mois d’attente et de procédures administratives, le complexe hospitalier Akdital de Rabat a officiellement obtenu l’ensemble des autorisations nécessaires à sa réouverture. Cette validation marque une étape clé pour le groupe, mais aussi pour le secteur de la santé privée au Maroc.
                    </blockquote>

                    <p className="mt-6">
                        Situé dans un emplacement stratégique de la capitale, l’établissement s’apprête à reprendre son activité après une période de suspension liée à des ajustements réglementaires et techniques exigés par les autorités compétentes.
                    </p>

                    <Card className="my-8 bg-muted/50">
                        <CardContent className="p-6">
                            <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="text-primary"/>Pourquoi l’hôpital avait été temporairement fermé ?</h3>
                            <p className="mb-4 text-muted-foreground">La fermeture provisoire du complexe n’était pas liée à un incident médical ou à un problème de sécurité majeur, mais plutôt à des non-conformités administratives et techniques relevées lors des contrôles.</p>
                            <p>Ces observations ont nécessité :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>des réaménagements internes,</li>
                                <li>des mises à niveau techniques,</li>
                                <li>et une validation finale des autorités sanitaires.</li>
                            </ul>
                            <p className="mt-4">Une fois ces exigences satisfaites, toutes les autorisations de réouverture ont été officiellement délivrées.</p>
                        </CardContent>
                    </Card>

                    <h2 className="font-headline text-2xl font-bold">Un établissement stratégique dans l’offre de soins à Rabat</h2>
                    <p>
                        Le complexe hospitalier Akdital de Rabat s’inscrit dans la stratégie du groupe visant à développer des hôpitaux multidisciplinaires modernes, un plateau technique de haut niveau, et une prise en charge spécialisée, notamment en oncologie, cardiologie et chirurgie. Cette réouverture intervient dans un contexte où la pression sur le système de santé reste élevée, renforçant le rôle du secteur privé comme complément au secteur public.
                    </p>
                    
                    <div className="my-8 p-6 rounded-lg border">
                         <h2 className="font-headline text-2xl font-bold flex items-center gap-3 mb-4"><Activity className="text-primary"/>Lecture boursière : quel impact pour Akdital en Bourse ?</h2>
                        <p className="mb-4">Le point clé pour les investisseurs est que Akdital est une société cotée à la Bourse de Casablanca. À ce titre, la réouverture du complexe hospitalier de Rabat revêt une importance particulière sur plusieurs plans :</p>
                        
                        <h4 className="font-semibold text-lg mt-4">📈 Visibilité et crédibilité</h4>
                        <p>La résolution rapide des blocages administratifs réduit le risque réglementaire perçu. Elle renforce la crédibilité du management et la capacité du groupe à gérer ses projets à grande échelle.</p>

                        <h4 className="font-semibold text-lg mt-4">💰 Impact sur les fondamentaux</h4>
                        <p>La mise en exploitation effective de l’hôpital permet la génération de nouveaux revenus, une meilleure absorption des investissements déjà engagés, et une amélioration progressive de la rentabilité des actifs.</p>
                        
                        <h4 className="font-semibold text-lg mt-4">🧠 Message envoyé au marché</h4>
                        <p>Pour le marché boursier, cette réouverture est interprétée comme un signal positif sur la continuité du plan de développement du groupe et une confirmation de sa stratégie d’expansion nationale.</p>
                    </div>

                    <div className="my-8 p-6 rounded-lg bg-card">
                         <h2 className="font-headline text-2xl font-bold flex items-center gap-3 mb-4"><Globe className="text-primary"/>Lecture économique : un enjeu au-delà d’Akdital</h2>
                        <p>Au-delà de la Bourse, cette réouverture a également une portée économique plus large :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Création d’emplois directs et indirects (personnel médical, paramédical, services).</li>
                            <li>Renforcement de l’attractivité sanitaire de Rabat.</li>
                            <li>Allègement partiel de la pression sur les hôpitaux publics.</li>
                            <li>Illustration du rôle croissant de l’investissement privé dans les infrastructures sociales.</li>
                        </ul>
                        <p className="mt-4">Elle s’inscrit aussi dans la dynamique nationale de modernisation du système de santé, encouragée par les réformes en cours et l’extension de la couverture médicale.</p>
                    </div>

                    <Card className="mt-12 bg-primary/10 border-primary">
                        <CardContent className="p-6">
                            <h4 className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><BookOpen/>En résumé</h4>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                                <li>Le complexe hospitalier Akdital de Rabat a obtenu toutes les autorisations nécessaires à sa réouverture.</li>
                                <li>L’événement est positif sur le plan opérationnel et réglementaire.</li>
                                <li>Pour les investisseurs, il s’agit d’un signal rassurant pour une société cotée en Bourse.</li>
                                <li>Sur le plan économique, il confirme la montée en puissance du secteur privé dans la santé au Maroc.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </article>
        </div>
    );
}
