import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/article-data';
import { BookOpen, TrendingUp, BarChart, Globe, Target } from 'lucide-react';

export default function ArticlePage() {
    const articleId = "5";
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
                        Le marché actions marocain poursuit une dynamique haussière engagée depuis la mi-2023. Après plusieurs années marquées par l’incertitude, les perspectives pour 2026 apparaissent plus lisibles, portées par un environnement macroéconomique plus stable et une amélioration progressive des fondamentaux des entreprises cotées.
                    </blockquote>

                    <p className="mt-6">
                       Notre analyse met en lumière les principaux moteurs susceptibles de soutenir cette dynamique à moyen terme.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8">Un cycle haussier désormais structurel</h2>
                    <p>
                        Depuis mi-2023, la Bourse de Casablanca évolue dans une tendance globalement haussière. Cette progression ne repose pas sur un simple effet technique ou spéculatif, mais sur des éléments plus profonds liés à l’économie réelle et à la performance des sociétés cotées. La hausse du marché reflète avant tout une amélioration des anticipations des investisseurs concernant la croissance future des bénéfices et la stabilité du cadre macroéconomique.
                    </p>

                    <Card className="my-8 bg-muted/50">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><TrendingUp className="text-primary"/>Le rôle central du contexte macroéconomique</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-muted-foreground">L’un des principaux soutiens du marché actions marocain réside dans l’évolution favorable de l’environnement macroéconomique. Les perspectives pour 2026 reposent notamment sur :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>une croissance économique portée par les secteurs non agricoles,</li>
                                <li>une inflation mieux maîtrisée qu’au cours des années précédentes,</li>
                                <li>des programmes d’investissement public structurants dans les infrastructures, l’énergie et les équipements sociaux.</li>
                            </ul>
                            <p className="mt-4">Ce contexte améliore la visibilité des entreprises et réduit l’incertitude, un élément clé pour les marchés financiers.</p>
                        </CardContent>
                    </Card>

                    <h2 className="font-headline text-2xl font-bold">La progression des bénéfices comme moteur principal</h2>
                    <p>
                        Au-delà de la macroéconomie, la dynamique boursière est étroitement liée à l’évolution des résultats des sociétés cotées. Selon notre analyse, la masse bénéficiaire globale des entreprises cotées a connu une forte progression entre 2022 et 2025, et cette tendance devrait se prolonger en 2026 et 2027. Sur le long terme, ce sont les bénéfices qui justifient la valorisation des actions. Tant que cette dynamique reste intacte, le marché conserve des bases solides.
                    </p>
                    
                    <div className="my-8 p-6 rounded-lg border">
                         <h2 className="font-headline text-2xl font-bold flex items-center gap-3 mb-4"><BarChart className="text-primary"/>Valorisation du marché : un niveau cohérent</h2>
                        <p className="mb-4">Après plusieurs années de hausse, la question de la valorisation devient centrale. Le PER moyen du marché marocain se situe autour de 19 fois les bénéfices attendus, un niveau jugé cohérent compte tenu :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>des perspectives de croissance bénéficiaire,</li>
                            <li>du niveau des taux d’intérêt,</li>
                            <li>et du contexte économique général.</li>
                        </ul>
                        <p className="mt-4">Ce niveau de valorisation ne traduit pas, à ce stade, une situation de surévaluation excessive du marché.</p>
                    </div>

                    <h2 className="font-headline text-2xl font-bold">Sélectivité et différenciation sectorielle</h2>
                    <p>
                        Même dans un marché globalement bien orienté, toutes les valeurs ne présentent pas les mêmes perspectives. Certaines sociétés bénéficient d’une forte croissance, d’autres offrent une meilleure visibilité ou des valorisations plus attractives. Notre analyse souligne ainsi l’importance de la sélectivité sectorielle et de l’étude des fondamentaux pour capter la performance à moyen et long terme.
                    </p>

                    <div className="my-8 p-6 rounded-lg bg-card grid md:grid-cols-2 gap-8">
                         <div>
                            <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><Target className="text-primary"/>Lecture boursière</h3>
                            <p>La Bourse de Casablanca joue un rôle central dans le financement de l’économie marocaine. La progression du MASI reflète non seulement la performance des entreprises cotées, mais aussi la confiance des investisseurs dans les perspectives économiques du pays.</p>
                            <p className="mt-2">Un marché actions bien orienté favorise :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>l’attractivité du marché pour les investisseurs institutionnels,</li>
                                <li>la capacité des entreprises à lever des fonds,</li>
                                <li>et le financement de projets de croissance à long terme.</li>
                            </ul>
                        </div>
                         <div>
                             <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><Globe className="text-primary"/>Lecture économique</h3>
                            <p>Un marché actions dynamique ne bénéficie pas uniquement aux investisseurs. Il constitue également un indicateur avancé de la santé économique globale :</p>
                             <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>meilleure allocation de l’épargne,</li>
                                <li>financement de l’investissement productif,</li>
                                <li>soutien à la croissance et à l’emploi.</li>
                            </ul>
                            <p className="mt-2">La Bourse devient ainsi un levier indirect mais essentiel du développement économique.</p>
                        </div>
                    </div>

                    <Card className="mt-12 bg-primary/10 border-primary">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><BookOpen/>Conclusion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Les perspectives du marché actions marocain pour 2026 reposent sur une combinaison favorable entre stabilité macroéconomique, progression des bénéfices et valorisations cohérentes. Si la dynamique reste positive, elle impose néanmoins rigueur et sélectivité aux investisseurs. Dans ce contexte, comprendre les liens entre économie réelle, résultats des entreprises et marché financier demeure indispensable pour une lecture pertinente de la Bourse de Casablanca.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </article>
        </div>
    );
}