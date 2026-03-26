import { NextRequest, NextResponse } from 'next/server';

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
    channelTitle: string;
    channelId: string;
  };
  statistics?: {
    viewCount: string;
  };
}

interface ProcessedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  channelTitle: string;
  channelId: string;
}

// IDs des chaînes YouTube (à remplacer par les vrais IDs)
const CHANNEL_IDS = [
  'UC1234567890', // @The_Moroccan_Analyst
  'UC0987654321', // @TheMoroccanCFO
];

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: NextRequest) {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return NextResponse.json({ videos: [] });
  }

  try {
    const allVideos: ProcessedVideo[] = [];

    // Récupérer les vidéos de chaque chaîne
    for (const channelId of CHANNEL_IDS) {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`;

      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (searchData.items) {
        // Récupérer les statistiques pour chaque vidéo
        const videoIds = searchData.items.map((item: YouTubeVideo) => item.id.videoId).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics`;

        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        const videosWithStats = searchData.items.map((item: YouTubeVideo, index: number) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: statsData.items?.[index]?.statistics?.viewCount || '0',
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
        }));

        allVideos.push(...videosWithStats);
      }
    }

    // Trier par date de publication (plus récent en premier)
    allVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Limiter à 20 vidéos maximum
    const limitedVideos = allVideos.slice(0, 20);

    return NextResponse.json({ videos: limitedVideos });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}