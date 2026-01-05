
import { articles } from '@/lib/article-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { generateArticle } from '@/ai/flows/article-generator';
import { Card } from '@/components/ui/card';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const generatedContent = await generateArticle({ title: article.title, excerpt: article.excerpt });

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="font-headline text-2xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="font-headline text-3xl font-bold mt-8 mb-4 border-b pb-2">{paragraph.replace('## ', '')}</h2>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
    });
  };

  return (
    <div className="container py-12 md:py-16">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Badge variant="secondary" className="mb-2">{article.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            {article.title}
          </h1>
          <p className="text-muted-foreground">
            Par {article.author} le {new Date(article.date).toLocaleDateString('fr-FR')}
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
            <p className="text-xl leading-relaxed text-muted-foreground italic">{generatedContent.introduction}</p>
            <div>{renderContent(generatedContent.body)}</div>
            <p className="mt-8 border-t pt-4 text-sm text-muted-foreground">{generatedContent.conclusion}</p>
        </div>
      </article>
    </div>
  );
}
