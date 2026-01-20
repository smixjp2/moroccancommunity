
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/article-data';
import { TrendingUp, BarChart, AlertTriangle, Shield, Building, Target, BookOpen, Scaling } from 'lucide-react';

export default function ArticlePage() {
    const articleId = "8";
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
                        Par {article.author}
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

                <div className="prose prose-lg dark:prose-invert max-w-none no-select">
                    <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground">
                        L’action LafargeHolcim Maroc, l’un des principaux piliers du marché de la Bourse de Casablanca, attire une attention particulière des investisseurs à l’aube de 2026. Après une année 2025 marquée par une légère correction du titre, les anticipations de marché permettent d’esquisser des trajectoires possibles pour le cours de l’action.
                    </blockquote>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8">Une valorisation sous surveillance</h2>
                    <p>
                        Au 19 janvier 2026, l’action LafargeHolcim Maroc se négociait autour de 1 807 dirhams (DH), ce qui place la capitalisation boursière du groupe à plus de 42 milliards de DH. En 2025, le titre avait reculé de près de 4,9 %, avant de reprendre près de 2 % au début de 2026, traduisant une phase de stabilisation.
                    </p>

                    <Card className="my-8 bg-muted/50">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><Target className="text-primary"/>Objectif de cours et potentiel d’appréciation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-muted-foreground">Les projections établies par certaines analyses de marché situent un objectif de cours à environ <strong className="text-foreground">2 419 DH pour 2026</strong>, ce qui représenterait un potentiel de hausse de l’ordre de <strong className="text-foreground">31,5 %</strong> par rapport à fin décembre 2025.</p>
                            <p>Cette estimation repose sur une lecture prudente mais positive des fondamentaux du secteur et du positionnement de LafargeHolcim au sein de l’économie marocaine.</p>
                        </CardContent>
                    </Card>

                    <h2 className="font-headline text-2xl font-bold">Facteurs macro-sectoriels favorables</h2>
                    <p>
                       Cette perspective s’inscrit dans la reprise du secteur cimentier national : les livraisons de ciment au Maroc ont atteint près de 14,8 millions de tonnes à fin 2025, affichant une croissance d’environ 8,2 %. Cette tendance reflète la demande soutenue du secteur de la construction.
                    </p>

                    <div className="my-8 p-6 rounded-lg border">
                         <h2 className="font-headline text-2xl font-bold flex items-center gap-3 mb-4"><BarChart className="text-primary"/>Analyse fondamentale du titre</h2>
                        
                        <h4 className="font-semibold text-lg mt-4">Valorisation et rendement</h4>
                        <p>Sur la base des anticipations 2026, l’action se négocierait à un PER (Price Earnings Ratio) autour de 19 fois les bénéfices, ce qui peut signifier un potentiel de rattrapage. Le rendement du dividende attendu est attractif, autour de 4,5 %.</p>

                        <h4 className="font-semibold text-lg mt-4">Points forts structurels</h4>
                        <p>Le groupe bénéficie d’un leadership territorial fort et se distingue par des efforts en matière de ciment vert et d'énergies renouvelables, préservant ainsi les marges. La visibilité sur la demande est soutenue par la reprise de l'immobilier et les projets d'infrastructures.</p>
                    </div>

                    <Card className="my-8 bg-destructive/10 border-destructive">
                        <CardHeader>
                             <CardTitle className="font-headline text-xl font-semibold flex items-center gap-2"><AlertTriangle className="text-destructive"/>Risques à considérer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Endettement élevé :</strong> Le groupe affichait un endettement net important à fin septembre 2025, ce qui peut limiter sa flexibilité financière.</li>
                                <li><strong className="text-foreground">Corrélation avec le cycle immobilier :</strong> La sensibilité du titre à l’évolution du secteur immobilier expose l’action aux retournements cycliques.</li>
                                <li><strong className="text-foreground">Concurrence et diversification limitée :</strong> Une présence modeste sur les granulats ou le béton prêt à l’emploi restreint la diversification des revenus.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <h2 className="font-headline text-2xl font-bold">Place de LafargeHolcim dans une allocation actions</h2>
                    <p>
                       LafargeHolcim Maroc est souvent perçue comme une valeur de référence sur le marché marocain grâce à sa taille, sa liquidité, la visibilité de ses activités, et son rendement dividende. Dans une logique d'allocation pour 2026, cette combinaison peut offrir un équilibre entre valorisation potentielle et rémunération régulière.
                    </p>

                    <Card className="mt-12 bg-primary/10 border-primary">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><BookOpen/>En résumé</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                                <li>L’action affiche une stabilité relative après un recul en 2025.</li>
                                <li>Les anticipations de marché placent un objectif de cours autour de 2 419 DH, suggérant un potentiel de hausse notable.</li>
                                <li>La croissance du secteur cimentier et un positionnement industriel fort soutiennent cette projection.</li>
                                <li>Les risques cycliques et l’endettement restent des éléments à surveiller.</li>
                                <li>LafargeHolcim Maroc demeure un titre de référence pour un portefeuille équilibré à moyen terme.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </article>
        </div>
    );
}
