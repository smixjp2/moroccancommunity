"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Eye, ExternalLink } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  channelTitle: string;
  channelId: string;
}

const CHANNELS = [
  {
    id: "UC1234567890", // Remplacer par l'ID réel de @The_Moroccan_Analyst
    name: "The Moroccan Analyst",
    handle: "@The_Moroccan_Analyst",
    url: "https://www.youtube.com/@The_Moroccan_Analyst"
  },
  {
    id: "UC0987654321", // Remplacer par l'ID réel de @TheMoroccanCFO
    name: "The Moroccan CFO",
    handle: "@TheMoroccanCFO",
    url: "https://www.youtube.com/@TheMoroccanCFO/videos"
  }
];

export function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube/videos');
        const data = await response.json();

        if (data.videos) {
          setVideos(data.videos);
        } else {
          // Fallback vers des données mockées si l'API échoue
          setVideos([
            {
              id: "demo1",
              title: "Analyse du Marché Boursier Marocain - Mise à jour",
              description: "Découvrez les dernières tendances et analyses du marché marocain.",
              thumbnail: "https://via.placeholder.com/480x360/1a1a1a/ffffff?text=YouTube+Video",
              publishedAt: new Date().toISOString(),
              viewCount: "15000",
              channelTitle: "The Moroccan Analyst",
              channelId: CHANNELS[0].id
            },
            {
              id: "demo2",
              title: "Guide d'Investissement pour Débutants 2025",
              description: "Apprenez les bases de l'investissement au Maroc avec nos experts.",
              thumbnail: "https://via.placeholder.com/480x360/1a1a1a/ffffff?text=YouTube+Video",
              publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 jour avant
              viewCount: "12500",
              channelTitle: "The Moroccan CFO",
              channelId: CHANNELS[1].id
            }
          ]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError("Erreur lors du chargement des vidéos");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-1"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Chaînes YouTube */}
      <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {CHANNELS.map((channel) => (
          <Card key={channel.id} className="text-center">
            <CardContent className="p-6">
              <h3 className="font-headline text-xl font-bold mb-2">{channel.name}</h3>
              <p className="text-muted-foreground mb-4">{channel.handle}</p>
              <Button asChild variant="outline">
                <a href={channel.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir la chaîne
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vidéos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">
                {video.channelTitle}
              </Badge>
              <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {video.title}
                </a>
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(video.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {formatViews(video.viewCount)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}