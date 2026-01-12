
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/article-data';
import { BookOpen, TrendingUp, BarChart, Globe, Target, Building } from 'lucide-react';

export default function ArticlePage() {
    const articleId = "6";
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
                     <p className="text-muted-foreground">Analyse fondamentale et perspectives après l’IPO</p>
                    <p className="text-sm text-muted-foreground mt-2">
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
                        Peu après son introduction en Bourse, Cash Plus entre dans une phase où le comportement de son action se détache progressivement de l’effet d’introduction pour se reconnecter aux fondamentaux économiques et financiers de son modèle d’activité.
                    </blockquote>

                    <p className="mt-6">
                        L’article publié par ID Bourse propose une analyse des principaux leviers susceptibles d’influencer la trajectoire du titre dans les prochains trimestres.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8">Une phase post-IPO davantage axée sur la création de valeur</h2>
                    <p>
                        L’introduction en Bourse d’une société provoque souvent une forte volatilité initiale. Cette phase est généralement marquée par des mouvements de prix liés à l’actualité de la cotation elle-même plutôt qu’à la performance opérationnelle réelle. Pour Cash Plus, c’est désormais la capacité du groupe à traduire ses fondamentaux économiques en croissance durable qui devient déterminante pour la trajectoire du cours de l’action.
                    </p>

                    <Card className="my-8 bg-muted/50">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><Building className="text-primary"/>Activité de transfert d’argent : le cœur du modèle</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-muted-foreground">L’activité historique de Cash Plus — le transfert d’argent national et international — constitue encore le socle du modèle économique, représentant environ 63 % du chiffre d’affaires. Elle reste fortement corrélée aux flux domestiques et à ceux de la diaspora marocaine.</p>
                            <p>Cette activité a montré une croissance régulière des volumes traités ces dernières années, portée par l’élargissement du réseau d’agences, un maillage territorial étendu et des partenariats internationaux structurants. Sur la base des données historiques, ce segment continue de générer des flux de trésorerie significatifs et offre une bonne visibilité sur les revenus à court terme.</p>
                        </CardContent>
                    </Card>

                     <h2 className="font-headline text-2xl font-bold">Comptes de paiement : un relais de croissance stratégique</h2>
                    <p>
                        Un des éléments les plus intéressant dans le modèle de Cash Plus est la montée en puissance des comptes de paiement, un segment qui était inexistant il y a quelques années mais qui a déjà atteint environ 16 % du chiffre d’affaires à fin 2024.
                    </p>
                    <p>Ce développement traduit deux dynamiques :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>une digitalisation progressive des services financiers,</li>
                        <li>un élargissement de la base clients grâce à des services à forte fréquence d’usage.</li>
                    </ul>
                     <p className="mt-4">Si ce segment continue de croître, il peut devenir un moteur de valorisation essentiel pour Cash Plus, en modifiant la perception du marché sur la capacité du groupe à générer des revenus récurrents dans un secteur où l’usage des services digitaux s’impose progressivement.</p>
                    
                    
                    <div className="my-8 p-6 rounded-lg border">
                         <h2 className="font-headline text-2xl font-bold flex items-center gap-3 mb-4"><TrendingUp className="text-primary"/>Ressources financières : levier pour la feuille de route</h2>
                        <p className="mb-4">Un autre levier identifié par ID Bourse est la structure financière renforcée de l’entreprise. Cash Plus a levé environ 200 millions de dirhams (MDH) lors de sa préparation à l’IPO, puis environ 400 MDH supplémentaires au moment de l’introduction.</p>
                        <p>Ces ressources offrent à l’entreprise une flexibilité stratégique importante, notamment pour :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>accélérer l’ouverture de nouvelles agences,</li>
                            <li>intensifier les investissements en technologies et services digitaux,</li>
                            <li>envisager des opérations de croissance externe ciblées.</li>
                        </ul>
                         <p className="mt-4">La capacité à convertir ces moyens financiers en croissance opérationnelle reste un point à suivre de près.</p>
                    </div>

                    <div className="my-8 p-6 rounded-lg bg-card grid md:grid-cols-2 gap-8">
                         <div>
                            <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><Target className="text-primary"/>Lecture boursière</h3>
                            <p>L’évolution du cours du titre Cash Plus dépendra désormais de facteurs fondamentaux. Pour les investisseurs, les principaux éléments à surveiller sont :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>la régularité de la croissance des revenus,</li>
                                <li>la montée en puissance des comptes de paiement,</li>
                                <li>la rentabilité opérationnelle,</li>
                                <li>la capacité à générer des flux de trésorerie stables.</li>
                            </ul>
                        </div>
                         <div>
                             <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><Globe className="text-primary"/>Lecture économique</h3>
                             <p>L’analyse de Cash Plus doit être replacée dans le contexte économique marocain et mondial :</p>
                             <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Évolution des flux de transfert,</li>
                                <li>Digitalisation des services financiers,</li>
                                <li>Concurrence et innovation.</li>
                            </ul>
                        </div>
                    </div>

                    <Card className="mt-12 bg-primary/10 border-primary">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><BookOpen/>Conclusion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                L'évolution du cours de Cash Plus sera un baromètre de sa capacité à exécuter sa stratégie de diversification tout en consolidant son activité historique. La Bourse valorisera la création de valeur durable, bien au-delà de l'effet initial de l'IPO.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </article>
        </div>
    );
}

    