
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calculator, Percent, ShieldCheck, UserCheck, Wallet, Briefcase, Home, Ratio, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDictionary, getLocaleFromCookie } from "@/lib/i18n";

const simulators = [
    {
    href: "/tools/monthly-budget-simulator",
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: "Simulateur de Budget Mensuel",
    description: "Analysez vos revenus, charges et calculez votre capacité d'épargne.",
  },
   {
    href: "/tools/loan-simulator",
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Simulateur de Crédit Immobilier",
    description: "Calculez vos mensualités et le coût total de votre crédit immobilier.",
  },
  {
    href: "/tools/fee-simulator",
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Simulateur d'Impact des Frais",
    description: "Analysez l'impact des frais bancaires sur vos rendements.",
  },
  {
    href: "/tools/dividend-yield-calculator",
    icon: <Percent className="h-8 w-8 text-primary" />,
    title: "Calculateur de Rendement des Dividendes",
    description: "Calculez le rendement de vos investissements en dividendes.",
  },
  {
    href: "/tools/retirement-planner",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Planificateur de Retraite",
    description: "Simulez votre épargne retraite pour atteindre vos objectifs.",
  },
  {
    href: "/tools/investor-profile-quiz",
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: "Quiz Profil d'Investisseur",
    description: "Découvrez quel type d'investisseur vous êtes.",
  },
  {
    href: "/tools/pe-ratio-analyzer",
    icon: <Ratio className="h-8 w-8 text-primary" />,
    title: "Analyseur de Ratio P/E",
    description: "Évaluez si une action est chère en comparant son P/E à la moyenne de son secteur.",
    isNew: true,
  },
  {
    href: "/tools/personal-wealth-analyzer",
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: "Analyseur de Patrimoine",
    description: "Obtenez une analyse IA de votre situation financière.",
    isNew: true,
  },
  {
    href: "/tools/pe-ratio-analyzer",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Analyseur P/E Ratio",
    description: "Analysez les ratios de valorisation des actions marocaines.",
    isNew: true,
  },
  {
    href: "/tools/dividend-yield-calculator",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Calculateur de Rendement",
    description: "Calculez le rendement de vos dividendes et investissements.",
  },
];

export default function ToolsPage() {
  const locale = getLocaleFromCookie();
  const t = getDictionary(locale);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">{t.tools.pageTitle}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {t.tools.pageSubtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {simulators.map((tool) => {
          const isClickable = !tool.isMemberOnly;
          const Wrapper = isClickable ? Link : 'div';
          const finalHref = tool.href;
          
          return (
            <Link href={finalHref} key={tool.href} className={!isClickable ? 'cursor-not-allowed' : 'cursor-pointer'}>
              <Card className={`h-full hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col relative ${!isClickable ? 'opacity-60' : ''}`}>
                {(tool.isMemberOnly || tool.isNew) && (
                    <Badge variant={tool.isNew ? "default" : "secondary"} className="absolute top-4 right-4 z-10">
                        {tool.isMemberOnly ? "Membre" : "Nouveau"}
                    </Badge>
                )}
                <CardHeader className="p-6">
                    <div className="mb-4">{tool.icon}</div>
                    <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
