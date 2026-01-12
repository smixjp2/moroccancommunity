
import { articles } from '@/lib/article-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  // Use the article excerpt for the content to make the page functional.
  const content = {
    introduction: article.excerpt,
    body: `L'analyse détaillée pour "${article.title}" est en cours de rédaction. Voici les points essentiels à retenir : ${article.excerpt}`,
    conclusion: `En résumé, les éléments clés à surveiller concernant "${article.title}" sont directement liés aux points soulevés dans l'introduction. Une analyse plus approfondie sera bientôt publiée.`,
  };

  const renderMarkdown = (markdown: string) => {
    // A simple renderer for the placeholder content.
    return markdown.split('\n').map((line, index) => <p key={index} className="mb-4 leading-relaxed">{line}</p>);
  };


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
            {/* Introduction */}
            <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground">
              {content.introduction}
            </blockquote>
            
            {/* Body */}
            <div className="mt-8">
                {renderMarkdown(content.body)}
            </div>
            
            {/* Conclusion */}
            <Card className="mt-12 bg-muted/50">
              <CardContent className="p-6">
                <h4 className="font-headline text-xl font-semibold mb-2">Conclusion</h4>
                <p className="text-muted-foreground">{content.conclusion}</p>
              </CardContent>
            </Card>
        </div>
      </article>
    </div>
  );
}
