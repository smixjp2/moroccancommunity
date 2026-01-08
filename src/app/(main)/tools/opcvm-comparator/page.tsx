
'use client';

import * as React from 'react';
import { opcvmCategories } from '@/lib/opcvm-data';
import type { Opcvm, OpcvmCategory } from '@/lib/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { HelpCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const PerformanceBadge = ({ perf }: { perf: number }) => {
  const isPositive = perf >= 0;
  const colorClass = isPositive
    ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/80'
    : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/80';

  return (
    <Badge
      className={`text-sm font-bold w-[80px] justify-center ${colorClass}`}
    >
      {perf.toFixed(2)}%
    </Badge>
  );
};

const CategorySection = ({ category }: { category: OpcvmCategory }) => {
  const chartData = category.funds.map((fund) => ({
    name: fund.name,
    ytd: fund.ytd,
    fill: fund.ytd >= 0 ? 'var(--color-positive)' : 'var(--color-negative)',
  }));

  const chartConfig = {
    ytd: {
      label: 'Performance YTD',
    },
    positive: {
      label: 'Positif',
      color: 'hsl(var(--chart-2))',
    },
    negative: {
      label: 'Négatif',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-headline">
          <category.icon className="h-7 w-7 text-primary" />
          {category.title}
        </CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Fonds</TableHead>
                <TableHead className="text-right">YTD</TableHead>
                <TableHead className="text-right hidden sm:table-cell">1 An</TableHead>
                <TableHead className="text-right hidden md:table-cell">3 Ans</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.funds.map((fund) => (
                <TableRow key={fund.id}>
                  <TableCell>
                    <div className="font-medium">{fund.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {fund.managementCompany}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <PerformanceBadge perf={fund.ytd} />
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    <PerformanceBadge perf={fund.perf1Y} />
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <PerformanceBadge perf={fund.perf3Y} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="lg:col-span-2">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 0, top: 0, right: 20, bottom: 0 }}
              >
                <XAxis type="number" dataKey="ytd" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={150}
                  className="text-xs"
                  interval={0}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="ytd" radius={4} />
              </BarChart>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OpcvmComparatorPage() {
  return (
    <div className="bg-background">
      <section className="bg-card text-card-foreground py-16">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
            Comparatif des OPCVM au Maroc
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Comparez les fonds d'investissement marocains par catégorie,
            analysez leurs performances et trouvez celui qui correspond à votre
            profil.
          </p>
        </div>
      </section>

      <div className="container py-16">
        {opcvmCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
        <div className="text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
          <p>
            Version Beta: Les données sont fournies à titre indicatif. Les
            performances passées ne préjugent pas des performances futures.
          </p>
        </div>
      </div>
    </div>
  );
}
