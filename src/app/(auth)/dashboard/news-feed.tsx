
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, ExternalLink } from 'lucide-react';
import { newsItems } from '@/lib/dashboard-news-data';
import Link from 'next/link';

export default function NewsFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline">
          <Newspaper className="text-primary" />
          Actualités du Marché
        </CardTitle>
        <CardDescription>
          Les dernières informations pouvant impacter la Bourse de Casablanca et
          vos investissements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-primary">{item.source}</p>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.excerpt}
                  </p>
                </div>
                <ExternalLink className="ml-4 h-5 w-5 flex-shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
