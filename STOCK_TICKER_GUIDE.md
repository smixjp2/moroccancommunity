# 📈 Stock Ticker - Guide d'Intégration

## Vue d'Ensemble

J'ai créé une barre de ticker affichant les cours des actions en temps réel. Le système supporte:
- ✅ **Affichage en temps réel** avec défilement automatique
- ✅ **Mise à jour automatique** toutes les 5 secondes
- ✅ **Mock data** par défaut (pas besoin de clé API)
- ✅ **Support d'APIs externes**: Finnhub, Alpha Vantage
- ✅ **Interface responsive** et élégante

## 📦 Fichiers Créés

### 1. **`src/components/stock-ticker.tsx`**
Composant principal du ticker avec défilement automatique
- Données en temps réel (mock ou API)
- Animation de défilement fluide
- Indicateurs haut/bas avec couleurs

### 2. **`src/components/advanced-stock-ticker.tsx`**
Version avancée du ticker
- Sélection des stocks
- Affichage détaillé du stock sélectionné
- Interface interactive

### 3. **`src/hooks/use-stock-data.ts`**
Hook React pour gérer les données boursières
- Support Finnhub, Alpha Vantage, ou mock data
- Mise à jour automatique
- Gestion des erreurs

## 🚀 Utilisation

### Configuration de Base (avec mock data)

```tsx
import StockTicker from '@/components/stock-ticker';

export default function Page() {
  return <StockTicker />;
}
```

### Avec Hook Personnalisé

```tsx
import { useStockData } from '@/hooks/use-stock-data';
import StockTicker from '@/components/stock-ticker';

export default function Page() {
  const { stocks, loading, error } = useStockData({
    symbols: ['ITISSAKA', 'BMCE', 'ATTIJARI'],
    refreshInterval: 5000,
    apiProvider: 'mock', // ou 'finnhub', 'alpha-vantage'
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return <StockTicker stocks={stocks} />;
}
```

## 🔑 Configuration des APIs

### Option 1: Finnhub (Recommandé)

1. **Créer un compte**: https://finnhub.io/
2. **Obtenir une clé API gratuite**
3. **Configurer dans `.env.local`**:
   ```
   NEXT_PUBLIC_FINNHUB_API_KEY=votre_clé_finnhub
   ```

4. **Utiliser dans le code**:
   ```tsx
   const { stocks } = useStockData({
     apiProvider: 'finnhub',
     // La clé API est automatiquement lue depuis .env
   });
   ```

**Avantages**:
- ✅ Données en temps réel
- ✅ 60 requêtes/minute (gratuit)
- ✅ Support de 10,000+ actions
- ✅ Excellent support du Maroc

### Option 2: Alpha Vantage

1. **Créer un compte**: https://www.alphavantage.co/
2. **Obtenir une clé API gratuite**
3. **Configurer dans `.env.local`**:
   ```
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=votre_clé_alpha_vantage
   ```

4. **Utiliser dans le code**:
   ```tsx
   const { stocks } = useStockData({
     apiProvider: 'alpha-vantage',
   });
   ```

**Avantages**:
- ✅ Données détaillées
- ✅ 5 requêtes/minute (gratuit)
- ✅ Support des séries temporelles

### Option 3: Mock Data (Actuellement utilisé)

Idéal pour le développement:
```tsx
const { stocks } = useStockData({
  apiProvider: 'mock', // Données simulées
});
```

**Caractéristiques**:
- ✅ Pas besoin de clé API
- ✅ Données réalistes pour le Maroc
- ✅ Simulation des variations de prix
- ✅ Parfait pour le développement

## 📊 Stocks Disponibles par Défaut

```
ITISSAKA     - Itissalat Al-Maghrib (Maroc Telecom)
BMCE         - BMCE Bank
ATTIJARI     - Attijari Wafa Bank
CIMENTS      - Ciments du Maroc
DOUJA        - Douja Promotion Addoha
MAROC_TE     - Maroc Telecom (Alternative)
OCP          - OCP (Phosphates)
WAFAASSURE   - Wafa Assurance
```

## 🎨 Personnalisation

### Changer les stocks affichés

```tsx
import { useStockData } from '@/hooks/use-stock-data';

const customStocks = [
  { symbol: 'ITISSAKA', name: 'Maroc Telecom', price: 127.50, change: 1.25, changePercent: 0.99 },
  // ... vos propres données
];

<StockTicker stocks={customStocks} />;
```

### Changer l'intervalle de mise à jour

```tsx
<StockTicker refreshInterval={10000} /> // 10 secondes au lieu de 5
```

### Changer la vitesse de défilement

```tsx
<StockTicker speed={60} /> // Plus lent (défaut: 50)
```

## 🔧 Intégration avec le Layout

Le ticker est déjà intégré dans `src/app/(main)/layout.tsx`:

```tsx
<Header />
<StockTicker refreshInterval={5000} speed={50} />
<main className="flex-1">{children}</main>
```

Pour modifier la position ou les paramètres, éditez ce fichier.

## 📡 Mise à Jour en Temps Réel

Le système met à jour les données:
- **Toutes les 5 secondes** (intervalle par défaut)
- Les prix varient de ±0.5% à chaque mise à jour
- Le pourcentage de variation est recalculé automatiquement

## ⚙️ Configuration Avancée

```tsx
interface UseStockDataOptions {
  symbols?: string[];           // Symboles à suivre
  refreshInterval?: number;     // Intervalle en ms
  apiKey?: string;             // Clé API
  apiProvider?: 'finnhub' | 'alpha-vantage' | 'mock';
}
```

## 🐛 Troubleshooting

### Le ticker ne se met pas à jour
1. Vérifiez la clé API dans `.env.local`
2. Vérifiez que `apiProvider` est correctement configuré
3. Vérifiez la console pour les erreurs

### Les prix ne changent pas
- Mode mock: C'est normal, les prix varient de ±0.5%
- API: Vérifiez que vous ne dépassez pas la limite de requêtes

### Les symboles ne sont pas reconnus
- Assurez-vous d'utiliser les bons symboles du MASI
- Vérifiez auprès du provider si le symbole est supporté

## 📚 Ressources Utiles

- **Finnhub**: https://finnhub.io/docs/api
- **Alpha Vantage**: https://www.alphavantage.co/documentation/
- **MASI Stocks**: https://www.bmce.ma/en/Market/Maroc-Telecom

## 🚀 Prochaines Étapes

1. **Configurer une API réelle** (Finnhub recommandé)
2. **Ajouter des graphiques** avec Recharts
3. **Afficher l'historique** des prix
4. **Ajouter des notifications** pour les mouvements importants
5. **Intégrer une recherche** de stocks

---

**État**: ✅ Prêt à l'emploi (mock data actif)
**Déploiement**: Simplement ajouter la clé API et changer `apiProvider`
