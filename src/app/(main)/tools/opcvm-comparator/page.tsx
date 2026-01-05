import { opcvmCategories } from '@/lib/opcvm-data';
import type { Opcvm, OpcvmCategory } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const PerformanceBadge = ({ ytd }: { ytd: number }) => {
  const isPositive = ytd >= 0;
  const colorClass = isPositive ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/80" : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/80";

  return (
    <Badge className={`text-base font-bold ${colorClass}`}>
      {ytd.toFixed(2)}%
      <span className="ml-1.5 text-xs font-normal opacity-80">YTD</span>
    </Badge>
  );
};

const FundCard = ({ fund }: { fund: Opcvm }) => (
  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-start justify-between gap-4">
      <div>
        <CardTitle className="text-xl font-headline">{fund.name}</CardTitle>
      </div>
      <PerformanceBadge ytd={fund.ytd} />
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{fund.description}</p>
    </CardContent>
  </Card>
);

const CategorySection = ({ category }: { category: OpcvmCategory }) => (
  <section className="mb-16">
    <div className="flex items-center justify-between mb-6">
      <h2 className="flex items-center gap-3 text-2xl font-bold font-headline">
        <category.icon className="h-7 w-7 text-primary" />
        {category.title}
      </h2>
      <Button variant="link" asChild>
        <Link href="#">
          Voir tous les fonds <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.funds.map(fund => (
        <FundCard key={fund.id} fund={fund} />
      ))}
    </div>
  </section>
);

export default function OpcvmComparatorPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-card text-card-foreground py-16">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
            Comparatif des OPCVMs au Maroc
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Découvrez une large gamme de fonds OPCVMs pour vous aider à atteindre vos objectifs financiers.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="outline">
              <HelpCircle className="mr-2" />
              Qu'est-ce qu'un OPCVM?
            </Button>
            <Button size="lg">
              Aidez-moi à choisir
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Funds Sections */}
      <div className="container py-16">
        {opcvmCategories.map(category => (
          <CategorySection key={category.title} category={category} />
        ))}
         <div className="text-center text-muted-foreground text-sm">
            <p>▲ Version Beta: Les données sont fournies à titre indicatif. Veuillez signaler tout problème de données.</p>
        </div>
      </div>
    </div>
  );
}
