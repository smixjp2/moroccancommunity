
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calculator, Percent, ShieldCheck, UserCheck, BarChart3, Wallet, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const simulators = [
    {
    href: "/tools/monthly-budget-simulator",
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: "Simulateur de Budget Mensuel",
    description: "Analysez vos revenus, charges et calculez votre capacité d'épargne.",
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
    href: "/tools/opcvm-comparator",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Comparateur d'OPCVM",
    description: "Comparez les fonds OPCVM marocains par catégorie et performance.",
    isMemberOnly: true,
  },
  {
    href: "/dashboard/stock-analyzer",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Analyseur d'Actions",
    description: "Obtenez une analyse financière pour les actions marocaines.",
    isMemberOnly: true,
  },
];

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils Financiers et Simulateurs</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Prenez des décisions basées sur les données. Explorez nos outils pour analyser, comparer et planifier vos investissements au Maroc.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {simulators.map((tool) => {
          const isClickable = !tool.isMemberOnly; // OPCVM is now clickable
          const Wrapper = isClickable ? Link : 'div';
          return (
            <Wrapper href={isClickable ? tool.href : ''} key={tool.href} className={isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}>
              <Card className={`h-full hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col relative ${!isClickable ? 'opacity-60' : ''}`}>
                {(tool.isMemberOnly) && (
                    <Badge variant={"secondary"} className="absolute top-4 right-4 z-10">
                        {tool.isMemberOnly ? "Membre Uniquement" : ""}
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
            </Wrapper>
          )
        })}
      </div>
    </div>
  );
}
