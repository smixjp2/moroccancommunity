
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Download, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const products = [
  {
    id: "ebook-bourse-maroc",
    title: "E-book : Réussir son investissement en Bourse au Maroc",
    description: "Le guide ultime pour comprendre les spécificités du marché marocain et bâtir une stratégie gagnante.",
    price: "199 MAD",
    imageUrl: PlaceHolderImages.find(p => p.id === 'shop-ebook')?.imageUrl || '',
    imageHint: "book finance",
    gumroadUrl: "https://themacommunity.gumroad.com/l/DCA",
    isBestSeller: true
  },
  {
    id: "excel-template-portfolio",
    title: "Master Template Excel : Suivi de Portefeuille Pro",
    description: "Automatisez le suivi de vos actions, calculez vos rendements nets et gérez vos dividendes comme un pro.",
    price: "149 MAD",
    imageUrl: PlaceHolderImages.find(p => p.id === 'shop-excel-template')?.imageUrl || '',
    imageHint: "dashboard excel",
    gumroadUrl: "https://gumroad.com" // Remplacez par votre lien réel
  },
  {
    id: "checklist-analyse-fondamentale",
    title: "Checklist : 50 points d'Analyse Fondamentale",
    description: "Ne manquez aucun détail lors de l'analyse d'une action de la Bourse de Casablanca avec cette checklist exhaustive.",
    price: "99 MAD",
    imageUrl: PlaceHolderImages.find(p => p.id === 'shop-checklist')?.imageUrl || '',
    imageHint: "checklist paper",
    gumroadUrl: "https://gumroad.com" // Remplacez par votre lien réel
  }
];

export default function ShopPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Boutique Numérique</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Accélérez votre maîtrise de la finance marocaine avec nos guides pratiques, modèles Excel et outils exclusifs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group">
            {product.isBestSeller && (
                <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground font-bold">
                    <Star className="h-3 w-3 mr-1 fill-current" /> BEST-SELLER
                </Badge>
            )}
            <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        data-ai-hint={product.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
                <CardTitle className="font-headline text-2xl mb-3">{product.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                    {product.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-primary font-bold text-3xl font-headline">
                    {product.price}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full font-bold py-6 text-lg" size="lg">
                    <a href={product.gumroadUrl} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Acheter sur Gumroad
                    </a>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 bg-muted/30 rounded-2xl p-8 md:p-12 text-center border">
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                    <ShieldCheck className="h-12 w-12 text-primary" />
                </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Paiement Sécurisé & Accès Immédiat</h2>
            <p className="text-muted-foreground text-lg">
                Tous nos produits sont vendus via <strong>Gumroad</strong>, garantissant une transaction sécurisée. Une fois le paiement validé, vous recevrez un lien de téléchargement instantané dans votre boîte mail.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                <span className="flex items-center gap-1"><Download className="h-4 w-4" /> Téléchargement direct</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4" /> Qualité TMC certifiée</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Support inclus</span>
            </div>
        </div>
      </div>
    </div>
  );
}
