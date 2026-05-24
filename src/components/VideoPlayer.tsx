'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  locked?: boolean;
  onUnlock?: () => void;
}

export function VideoPlayer({
  videoUrl,
  title,
  locked = false,
  onUnlock,
}: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-slate-400">Chargement...</div>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video flex flex-col items-center justify-center gap-4 p-4">
        <Lock className="h-16 w-16 text-slate-400" />
        <p className="text-slate-300 text-center">
          Cette vidéo est réservée aux membres premium
        </p>
        <Button onClick={onUnlock} variant="default" size="lg">
          Débloquer avec l'abonnement
        </Button>
      </div>
    );
  }

  // Security: Only allow YouTube and Vimeo embeds
  const isValidUrl = videoUrl.includes('youtube.com/embed') || 
                     videoUrl.includes('vimeo.com') ||
                     videoUrl.includes('youtube-nocookie.com/embed');

  if (!isValidUrl) {
    return (
      <Alert variant="destructive" className="bg-red-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          URL vidéo invalide. Utilisez YouTube ou Vimeo uniquement.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden aspect-video bg-black">
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
