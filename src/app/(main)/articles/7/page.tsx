
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/article-data';
import { TrendingUp, Globe, FileText, Banknote, BookOpen, LineChart } from 'lucide-react';

export default function ArticlePage() {
    const articleId = "7";
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
                        L’entrée en vigueur de la loi 03-25 représente une étape importante dans l’évolution du cadre réglementaire des Organismes de Placement Collectif en Valeurs Mobilières (OPCVM) au Maroc.
                    </blockquote>

                    <p className="mt-6">
                        Cette réforme vise à diversifier l’offre de produits financiers, renforcer l’attractivité du marché et favoriser l’intégration de nouvelles catégories d’actifs et d’épargnants.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8">Une industrie des OPCVM qui évolue</h2>
                    <p>
                        Le marché marocain des OPCVM s’est développé régulièrement, avec des encours importants principalement concentrés dans des fonds obligataires et monétaires. Cependant, l’exposition aux actions reste relativement faible. La loi 03-25 répond à ce besoin de diversification en introduisant de nouveaux véhicules d’investissement plus flexibles et adaptés aux standards internationaux.
                    </p>

                    <Card className="my-8 bg-muted/50">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-4 flex items-center gap-2"><FileText className="text-primary"/>Nouveaux produits : élargir l’univers d’investissement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold">OPCVM indiciels cotés (ETF)</h4>
                                <p className="text-muted-foreground">Ces fonds répliquent un indice boursier et sont négociés en continu, facilitant l'investissement indiciel pour tous.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">OPCVM libellés en devises</h4>
                                <p className="text-muted-foreground">Permet aux MRE d'investir sans risque de change et attire les flux internationaux, renforçant la liquidité.</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">OPCVM à compartiments et participatifs</h4>
                                <p className="text-muted-foreground">Offre plus de flexibilité de gestion et ouvre la voie à des fonds conformes à la finance islamique.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <h2 className="font-headline text-2xl font-bold">Une réforme conditionnée par la mise en œuvre réglementaire</h2>
                    <p>
                        L'impact réel de la loi 03-25 dépendra de la mise en œuvre des textes d’application par les autorités de régulation comme l’AMMC. Ces règles définiront le fonctionnement, la concentration, la liquidité et la diversification de ces nouveaux OPCVM, qui sont essentiels pour garantir la transparence et la sécurité des investisseurs.
                    </p>
                    
                    <div className="my-8 p-6 rounded-lg border grid md:grid-cols-2 gap-8">
                         <div>
                            <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><LineChart className="text-primary"/>Implications pour la Bourse</h3>
                             <p>La réforme peut favoriser :</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>une participation accrue des particuliers,</li>
                                <li>une meilleure liquidité des titres,</li>
                                <li>un alignement sur les pratiques internationales.</li>
                            </ul>
                        </div>
                         <div>
                             <h3 className="font-headline text-xl font-bold flex items-center gap-3 mb-4"><Globe className="text-primary"/>Opportunité pour l'Écosystème</h3>
                            <p>Cette réforme a aussi des implications économiques plus larges :</p>
                             <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>pousse à l'innovation des sociétés de gestion,</li>
                                <li>renforce les infrastructures financières,</li>
                                <li>offre plus de choix aux épargnants.</li>
                            </ul>
                        </div>
                    </div>

                    <Card className="mt-12 bg-primary/10 border-primary">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl font-semibold mb-2 flex items-center gap-2"><BookOpen/>Conclusion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                La loi 03-25 est une avancée structurante pour l'industrie des OPCVM au Maroc. En élargissant l'offre et en s'harmonisant avec les standards internationaux, elle crée des conditions favorables pour une plus grande intégration des marchés financiers marocains, une participation accrue des investisseurs et une meilleure liquidité globale.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </article>
        </div>
    );
}
