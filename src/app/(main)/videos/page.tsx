import { Suspense } from "react";
import { YouTubeVideos } from "@/components/youtube-videos";

export default function VideosPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Vidéos YouTube</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Découvrez nos dernières analyses et conseils d'investissement sur nos chaînes YouTube.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Chargement des vidéos...</div>}>
        <YouTubeVideos />
      </Suspense>
    </div>
  );
}