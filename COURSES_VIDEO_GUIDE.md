# 🎓 Guide : Ajouter des Vidéos de Cours

## 📺 Recommandations de plateforme

### 1. **YouTube (Recommandé - Gratuit, Illimité)**

**Avantages :**
- ✅ Stockage illimité
- ✅ Bande passante illimité
- ✅ Sécurisé contre le téléchargement
- ✅ Lecteur fiable et performant
- ✅ Analytics détaillés
- ✅ Gratuit

**Configuration :**
1. Créez un compte YouTube professionnel
2. Uploader vos vidéos
3. Mettez les vidéos en **"Non listée"** (pas visible publiquement, mais accessible via le lien)
4. Copiez le code d'intégration (embed)

**URL d'intégration YouTube :**
```
https://www.youtube.com/embed/VIDEO_ID
```

### 2. **Vimeo (Premium - Plus de contrôle)**

**Avantages :**
- ✅ Contrôle total du téléchargement
- ✅ Meilleure qualité vidéo
- ✅ Playlist personnalisées
- ✅ Plus professionnel

**Tarifs :**
- Gratuit : 500MB/semaine (limité)
- Premium : À partir de $75/an

---

## 📝 Comment ajouter vos vidéos

### Étape 1: Préparer votre vidéo

```bash
# Vérifiez la qualité
ffmpeg -i votre-video.mp4 -c:v libx264 -preset medium -crf 28 output.mp4
```

### Étape 2: Upload sur YouTube

1. Allez sur [youtube.com](https://www.youtube.com)
2. Cliquez sur l'icône caméra → **Créer une vidéo**
3. Uploadez votre fichier
4. Remplissez les informations :
   - **Titre** : Ex. "Introduction au MASI"
   - **Description** : Description complète
   - **Tags** : maroc, investissement, bourse, masi
5. Confidentialité → **Non listée**
6. **Publier**

### Étape 3: Récupérer l'URL d'intégration

1. Ouvrez la vidéo
2. Cliquez sur **"Partager"** → **"Intégrer"**
3. Copiez le code HTML
4. Extrayez l'URL (doit être dans ce format) :
   ```
   https://www.youtube.com/embed/xxxxxXXXXX
   ```

### Étape 4: Ajouter à votre cours

Modifiez le fichier `src/lib/video-courses-data.ts` :

```typescript
{
  id: 'lesson-1-1',
  title: 'Qu\'est-ce que le MASI ?',
  description: 'Comprendre l\'indice principal du marché boursier marocain',
  videoUrl: 'https://www.youtube.com/embed/xxxxxXXXXX',  // ← Votre URL
  duration: 8,
  difficulty: 'beginner',
  order: 1,
}
```

---

## 🔐 Sécurité : Empêcher le téléchargement

### YouTube (Non listée)
- ✅ **Protégé par défaut** - Impossible de télécharger directement
- ✅ Les utilisateurs ne peuvent que regarder en ligne
- ✅ Aucune configuration supplémentaire

### Vimeo
1. Allez dans **Paramètres vidéo**
2. Décochez : **"Autoriser le téléchargement"**
3. Enregistrez

---

## 🎬 Exemple complet

```typescript
// src/lib/video-courses-data.ts

export const videoCourses: VideoCourse[] = [
  {
    id: 'mon-premier-cours',
    title: 'Mon Premier Cours',
    description: 'Description de mon cours',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Leçon 1',
        videoUrl: 'https://www.youtube.com/embed/aBcDeFgHiJk',
        duration: 10,
        difficulty: 'beginner',
        order: 1,
      },
      {
        id: 'lesson-2',
        title: 'Leçon 2',
        videoUrl: 'https://www.youtube.com/embed/LmNoPqRsT_U',
        duration: 15,
        difficulty: 'beginner',
        order: 2,
      },
    ],
  },
];
```

---

## 📊 Structure des routes

```
/courses                           # Tous les cours
/courses/intro-stock-market        # Détail d'un cours
/courses/intro-stock-market/lessons/lesson-1-1  # Une leçon
```

---

## 💡 Conseils

1. **Qualité vidéo** : Minimum 720p (HD)
2. **Longueur** : 5-20 minutes par leçon (optimal)
3. **Audio** : Clair et sans bruit de fond
4. **Sous-titres** : Activez les sous-titres (FR/EN)
5. **Structure** : Numérotez vos vidéos pour l'ordre
6. **Analytics** : Suivez l'engagement sur YouTube
7. **Mise à jour** : Facilement remplaçable en changeant juste l'URL

---

## 🚀 Intégrations futures

- [ ] Certificat de completion
- [ ] Tableau de bord de progression
- [ ] Quiz après chaque leçon
- [ ] Téléchargement de ressources PDF
- [ ] Système de commentaires

---

## ❓ FAQ

**Q: Puis-je utiliser d'autres plateformes ?**
A: Oui, tant que vous avez une URL d'intégration. Nous supportons YouTube et Vimeo nativement.

**Q: Comment sécuriser les vidéos premium ?**
A: Utilisez le composant `VideoPlayer` qui affiche un cadenas si `locked={true}`.

**Q: Combien de vidéos puis-je ajouter ?**
A: Illimité avec YouTube, jusqu'à 10GB/mois avec Vimeo gratuit.

**Q: Comment tracker la progression ?**
A: Voir la section "Intégrations futures" - À venir.
