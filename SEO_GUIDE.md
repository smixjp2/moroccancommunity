# Guide SEO - The Moroccan Community

## 📋 Configuration du SEO

Ce guide explique comment les éléments SEO ont été mis en place sur votre site Next.js 15.

## 🗺️ Sitemap XML

### Fichier: `src/app/sitemap.ts`

Le sitemap est généré dynamiquement et inclut:
- ✅ Toutes les routes principales (accueil, articles, outils, etc.)
- ✅ Tous les outils et simulateurs disponibles
- ✅ Support bilingue (FR/EN)
- ✅ Métadonnées `changeFrequency` et `priority`
- ✅ Alternates (hreflang) pour chaque locale

**Accessible à**: `https://votresite.com/sitemap.xml`

### Configuration requise:
- Définir `NEXT_PUBLIC_BASE_URL` dans `.env.local`

---

## 🤖 Robots.txt

### Fichier: `src/app/robots.ts`

Contrôle l'accès des moteurs de recherche:
- ✅ Permet l'indexation de tout le contenu public
- ✅ Bloque `/admin` et `/api` (protégé)
- ✅ Pointe vers le sitemap XML
- ✅ Définit le host canonique

**Accessible à**: `https://votresite.com/robots.txt`

---

## 🔗 Métadonnées OpenGraph

### Fichiers concernés:
- `src/app/layout.tsx` - Métadonnées globales
- `src/app/(main)/layout.tsx` - Métadonnées de la section principale
- `src/app/(main)/*/layout.tsx` - Pages spécifiques

### Implémentation:

Utiliser la fonction `generateOpenGraphMetadata()`:

```typescript
export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Titre de la Page",
  description: "Description courte de la page",
  imageUrl: `${baseUrl}/og-image-page.png`,
  imageAlt: "Alt text pour l'image",
  url: `${baseUrl}/page`,
  locale: 'fr', // ou 'en'
});
```

### Métadonnées incluses:
- ✅ Open Graph (titre, description, image, URL)
- ✅ Twitter Card (résumé avec grande image)
- ✅ Canonical Link
- ✅ Alternates hreflang (FR/EN)

### Images OG recommandées:
- Dimension: 1200x630px
- Format: PNG ou JPG
- Noms: `/og-image-*.png`

---

## 📊 Schémas Structurés JSON-LD

### Fichier: `src/lib/seo-metadata.ts`

Fournit des fonctions pour générer des schémas structurés pour Google:

#### 1. **Organization Schema**
```typescript
import { generateOrganizationSchema } from '@/lib/seo-metadata';

// Utilisé automatiquement dans le layout principal
const schema = generateOrganizationSchema();
```

#### 2. **WebPage Schema**
```typescript
import { generateWebpageSchema } from '@/lib/seo-metadata';

const schema = generateWebpageSchema({
  title: "Titre",
  description: "Description",
  url: "https://...",
  imageUrl: "https://...",
});
```

#### 3. **Article Schema**
```typescript
import { generateArticleSchema } from '@/lib/seo-metadata';

const schema = generateArticleSchema({
  title: "Titre de l'article",
  description: "Description",
  url: "https://...",
  datePublished: "2025-01-01T00:00:00Z",
  dateModified: "2025-01-15T00:00:00Z",
  authorName: "Auteur",
});
```

#### 4. **FAQ Schema**
```typescript
import { generateFAQSchema } from '@/lib/seo-metadata';

const schema = generateFAQSchema([
  { question: "Q1?", answer: "R1" },
  { question: "Q2?", answer: "R2" },
]);
```

#### 5. **BreadcrumbList Schema**
```typescript
import { generateBreadcrumbSchema } from '@/lib/seo-metadata';

const schema = generateBreadcrumbSchema([
  { name: "Accueil", url: "https://..." },
  { name: "Outils", url: "https://.../tools" },
  { name: "Simulateur", url: "https://.../tools/simulator" },
]);
```

### Utilisation du composant:
```typescript
import { JsonLd } from '@/components/JsonLd';

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      {/* Contenu de la page */}
    </>
  );
}
```

---

## ⚙️ Configuration d'Environnement

### Fichier: `.env.local`

```env
NEXT_PUBLIC_BASE_URL=https://themoroccancommuntiy.com
GOOGLE_SITE_VERIFICATION=google_verification_code
```

---

## 🔍 Validation et Testing

### 1. **Google Search Console**
- Vérifier le site: https://search.google.com/search-console
- Tester le sitemap: `https://yoursite.com/sitemap.xml`
- Tester les robots.txt: `https://yoursite.com/robots.txt`

### 2. **Validation des schémas**
- Utiliser: https://schema.org/validator/
- Google Rich Results: https://search.google.com/test/rich-results

### 3. **Test OpenGraph**
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

### 4. **Audit SEO**
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights: https://pagespeed.web.dev/

---

## 📝 Checklist de Configuration SEO

- [ ] Configurer `NEXT_PUBLIC_BASE_URL` dans `.env.local`
- [ ] Ajouter Google Search Console verification code
- [ ] Créer/optimiser les images OG (1200x630px)
- [ ] Valider les schémas structurés JSON-LD
- [ ] Tester les robots.txt et sitemap
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Ajouter les métadonnées à chaque nouvelle page
- [ ] Tester les Open Graph images sur les réseaux sociaux
- [ ] Configurer les hreflang pour FR/EN correctement
- [ ] Ajouter rel="canonical" si applicable

---

## 🚀 Prochaines Étapes

1. **Ajouter des contenus riches**: Articles avec datePublished/dateModified
2. **Implémenter le LocalBusiness Schema**: Pour améliorer la présence locale
3. **Ajouter les Product/Service Schemas**: Si commercialisation de produits
4. **Email Validation List**: Intégrer avec Brevo pour la soumission planifiée
5. **Analytics**: Ajouter Google Analytics 4 pour le suivi
6. **Tags et attributs**: Enrichir les données structurées avec plus de détails

---

## 📞 Support

Pour des questions sur l'implémentation SEO, consultez:
- [Next.js Metadata Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central Blog](https://developers.google.com/search/blog)
