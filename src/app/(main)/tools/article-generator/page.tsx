import ArticleGenerator from "./article-generator";

export default function ArticleGeneratorPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Générateur d'Articles par IA</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Créez un article de qualité professionnelle en quelques secondes. Fournissez un titre et un résumé, et laissez l'IA faire le reste.
        </p>
      </div>
      <ArticleGenerator />
    </div>
  );
}
