import { articles } from '@/lib/article-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { generateArticle } from '@/ai/flows/article-generator';
import { Card, CardContent } from '@/components/ui/card';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const generatedContent = await generateArticle({ title: article.title, excerpt: article.excerpt });

  const renderMarkdown = (markdown: string) => {
    return markdown
      .split(/(?=\n## |^## |^### )/g) // Split by headings
      .map((section, index) => {
        if (section.startsWith('## ')) {
          const title = section.replace('## ', '').trim();
          return (
            <div key={index}>
              <h2 className="font-headline text-3xl font-bold mt-8 mb-4 border-b pb-2">{title}</h2>
            </div>
          );
        }
        if (section.startsWith('### ')) {
          const title = section.replace('### ', '').trim();
          return <h3 key={index} className="font-headline text-2xl font-semibold mt-6 mb-3">{title}</h3>;
        }
        // Handle paragraphs within sections
        return section.split('\n').filter(p => p.trim() !== '').map((paragraph, pIndex) => (
          <p key={`${index}-${pIndex}`} className="mb-4 leading-relaxed">{paragraph}</p>
        ));
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
          <p className="text-sm text-muted-foreground">
             Publié le {new Date(article.date).toLocaleDateString('fr-FR')}
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
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-xl">
              {generatedContent.introduction}
            </blockquote>
            
            <div className="mt-8">{renderMarkdown(generatedContent.body)}</div>
            
            <Card className="mt-12 bg-muted/50">
              <CardContent className="p-6">
                <h4 className="font-headline font-semibold mb-2">Conclusion</h4>
                <p className="text-muted-foreground">{generatedContent.conclusion}</p>
              </CardContent>
            </Card>
        </div>
      </article>
    </div>
  );
}
