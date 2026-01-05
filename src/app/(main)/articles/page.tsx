import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/article-data";
import type { Article } from "@/lib/types";

export default function ArticlesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Aperçus et Analyses du Marché</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Restez informé grâce à nos analyses d'experts sur le marché boursier marocain, les actions individuelles et les secteurs clés.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: Article) => (
          <Link href={`/articles/${article.id}`} key={article.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                <h2 className="font-headline text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  Publié le {new Date(article.date).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
