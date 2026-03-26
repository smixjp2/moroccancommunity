# Configuration YouTube API

Pour activer la récupération automatique des vidéos YouTube, vous devez :

1. Créer une clé API YouTube Data API v3 :
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un nouveau projet ou sélectionnez un projet existant
   - Activez l'API YouTube Data API v3
   - Créez des identifiants (clé API)

2. Ajouter la clé API dans votre fichier `.env.local` :
   ```
   YOUTUBE_API_KEY=votre_clé_api_ici
   ```

3. Trouver les IDs des chaînes YouTube :
   - Pour @The_Moroccan_Analyst : remplacez `UC1234567890` dans `/api/youtube/videos/route.ts`
   - Pour @TheMoroccanCFO : remplacez `UC0987654321` dans `/api/youtube/videos/route.ts`

   Pour trouver l'ID d'une chaîne :
   - Allez sur la chaîne YouTube
   - Cliquez sur "À propos"
   - L'ID est dans l'URL de partage ou dans les détails de la chaîne

4. Les vidéos se mettent à jour automatiquement à chaque visite de la page `/videos`.

## Fonctionnalités

- Récupération automatique des 10 dernières vidéos de chaque chaîne
- Tri par date de publication (plus récent en premier)
- Affichage des vues et dates
- Liens directs vers YouTube
- Design responsive avec animations