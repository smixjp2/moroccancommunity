"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateArticle, type ArticleGeneratorOutput } from "@/ai/flows/article-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Clipboard, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(5, "Le titre doit comporter au moins 5 caractères."),
  excerpt: z.string().min(20, "Le résumé doit comporter au moins 20 caractères."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ArticleGenerator() {
  const [result, setResult] = useState<ArticleGeneratorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    try {
      const response = await generateArticle(values);
      setResult(response);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Erreur de Génération",
        description: "Une erreur est survenue lors de la création de l'article.",
      });
    } finally {
      setLoading(false);
    }
  }
  
  const renderMarkdown = (markdown: string) => {
    return markdown.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="font-headline text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="font-headline text-2xl font-bold mt-6 mb-3 border-b pb-2">{line.substring(3)}</h2>;
      }
      if (line.trim() === '') {
        return null;
      }
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  const copyToClipboard = () => {
    if (!result) return;
    const fullText = `
# ${form.getValues('title')}

**${result.introduction}**

${result.body}

**Conclusion**
${result.conclusion}
    `.trim();

    navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        toast({ title: "Copié !", description: "L'article a été copié dans le presse-papiers." });
        setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Sujet de l'Article</CardTitle>
          <CardDescription>Fournissez les informations de base pour la génération.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l'Article</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Analyse du secteur immobilier au Maroc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Résumé ou Idée Principale</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Un aperçu des tendances actuelles, des principaux acteurs et des perspectives d'investissement dans l'immobilier coté..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Générer l'Article"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Sparkles className="text-accent" />
                Article Généré
            </div>
            {result && (
                 <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="mr-2" /> : <Clipboard className="mr-2" />}
                    {copied ? "Copié" : "Copier"}
                </Button>
            )}
          </CardTitle>
          <CardDescription>Votre article généré par l'IA apparaîtra ici.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {result && (
            <article>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {result.introduction}
                </blockquote>
                <div className="mt-6">
                    {renderMarkdown(result.body)}
                </div>
                <Card className="mt-8 bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Conclusion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{result.conclusion}</p>
                    </CardContent>
                </Card>
            </article>
          )}

          {!result && !loading && (
            <div className="text-center text-muted-foreground h-64 flex items-center justify-center">
              <p>Votre article apparaîtra ici après génération.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
