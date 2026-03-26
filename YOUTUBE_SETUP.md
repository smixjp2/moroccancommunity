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

- **Lecteur intégré** : Les vidéos se lisent directement sur votre site web
- Récupération automatique des 10 dernières vidéos de chaque chaîne
- Tri par date de publication (plus récent en premier)
- Affichage des vues et dates
- Design responsive avec animations
- Indicateur visuel pour la vidéo en cours de lecture
- Bouton pour fermer le lecteur

## Comment ça marche

1. Cliquez sur une miniature de vidéo pour l'ouvrir dans le lecteur intégré
2. La vidéo commence automatiquement
3. Un indicateur rouge "LECTURE" apparaît sur la miniature de la vidéo en cours
4. Cliquez sur le X pour fermer le lecteur
5. Vous pouvez changer de vidéo en cliquant sur une autre miniature