
import { articles } from '@/lib/article-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Suspense } from 'react';

async function ArticleContent({ id }: { id: string }) {
  const article = articles.find((a) => a.id === id);

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

        <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={article.imageHint}
                priority
            />
        </div>

        {article.content ? (
            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        ) : (
             <div className="prose prose-lg dark:prose-invert max-w-none">
                <blockquote className="border-l-4 border-primary pl-6 text-xl italic text-foreground">
                  {article.excerpt}
                </blockquote>
                <p className="mt-6">Le contenu détaillé de cet article est en cours de rédaction et sera disponible prochainement.</p>
            </div>
        )}
      </article>
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="container py-12">Chargement...</div>}>
      <ArticleContent id={id} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}
