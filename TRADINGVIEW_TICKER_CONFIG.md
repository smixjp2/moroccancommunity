# 📊 TradingView Ticker Bar - Configuration

## Vue d'Ensemble

La barre de ticker utilise désormais le **widget officiel TradingView Ticker Tape**, qui offre:

✅ **Données en temps réel** depuis TradingView  
✅ **Symboles du MASI** (Bourse de Casablanca)  
✅ **Interface professionnelle** et fiable  
✅ **Mise à jour automatique** du marché  
✅ **Support complet** pour les actions marocaines  

## 📍 Composant

**Fichier**: `src/components/tradingview-ticker-bar.tsx`

Le composant charge automatiquement le widget TradingView et l'affiche avec les symboles du MASI.

## 🏪 Symboles du MASI Configurés

```
CASABLANCA:ITISSAKA   → Itissalat Al-Maghrib (Maroc Telecom)
CASABLANCA:BMCE       → BMCE Bank
CASABLANCA:ATTIJARI   → Attijari Wafa Bank
CASABLANCA:CIMENTS    → Ciments du Maroc
CASABLANCA:DOUJA      → Douja Promotion Addoha
CASABLANCA:OCP        → OCP (Phosphates)
CASABLANCA:WAFAASSURE → Wafa Assurance
CASABLANCA:MANAGEM    → Managem
```

## 🔧 Personnalisation

Pour modifier les symboles affichés, éditez le tableau `symbols` dans `tradingview-ticker-bar.tsx`:

```tsx
symbols: [
  { proName: 'CASABLANCA:ITISSAKA', title: 'Maroc Telecom' },
  { proName: 'CASABLANCA:BMCE', title: 'BMCE Bank' },
  // Ajouter ou retirer des symboles ici
],
```

## 📡 Options de Configuration

### Thème
```tsx
colorTheme: 'dark',  // ou 'light'
```

### Affichage des Logos
```tsx
showSymbolLogo: true,  // Affiche les logos des compagnies
```

### Langue
```tsx
locale: 'fr',  // Français (ou 'en' pour anglais)
```

### Mode d'affichage
```tsx
displayMode: 'adaptive',  // S'adapte à la largeur de l'écran
```

## 🌐 Plus de Symboles du MASI

Pour ajouter d'autres actions, trouvez les symboles sur:
- TradingView: https://www.tradingview.com/markets/
- Bourse de Casablanca: https://www.bmce.ma/en/Market

Format standard: `CASABLANCA:SYMBOLE`

## 📊 Données Affichées

Le widget montre automatiquement:
- 📈 **Prix actuel** de l'action
- 📊 **Variation du jour** (en %)
- 🔄 **Mise à jour en temps réel**
- 📉 **Historique court terme**

## ⚙️ Configuration Avancée

Pour accéder à toutes les options TradingView, consultez:
https://www.tradingview.com/pine-script-docs/en/v5/concepts/Widgets.html

## 🚀 Déploiement

Le widget fonctionne directement après le build:
```bash
npm run build
npm start
```

**Aucune clé API requise** - TradingView gère tout automatiquement.

## 🐛 Troubleshooting

### Le widget ne s'affiche pas
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que le script TradingView se charge
3. Vérifiez la connexion internet

### Les symboles ne sont pas trouvés
1. Vérifiez le format: `CASABLANCA:SYMBOLE`
2. Assurez-vous que le symbole existe sur TradingView
3. Vérifiez l'orthographe du symbole

### Le widget est lent
1. C'est normal au premier chargement (script externe)
2. Après le cache, les performances s'améliorent
3. N'empile pas trop de symboles (max 10-15 recommandé)

## 📱 Responsive

Le widget s'adapte automatiquement à:
- ✅ Écrans mobiles
- ✅ Tablettes
- ✅ Écrans de bureau
- ✅ Différentes résolutions

## 💡 Conseils

1. **Garder moins de 15 symboles** pour la performance
2. **Utiliser des symboles populaires** pour une meilleure liquidité
3. **Tester sur mobile** avant le déploiement
4. **Actualiser la page** après les modifications

## 🔗 Ressources

- **TradingView Widgets**: https://www.tradingview.com/widget/
- **MASI Stocks**: https://www.bmce.ma/en/Market/
- **Stock Symbols**: https://www.tradingview.com/markets/

---

**État**: ✅ En production  
**Mise à jour**: Temps réel (données de TradingView)  
**Besoin d'API Key**: ❌ Non
