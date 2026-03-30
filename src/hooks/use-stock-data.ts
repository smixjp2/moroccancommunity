import { useState, useEffect, useCallback } from 'react';
import { Stock } from '@/components/stock-ticker';

interface UseStockDataOptions {
  symbols?: string[];
  refreshInterval?: number;
  apiKey?: string;
  apiProvider?: 'finnhub' | 'alpha-vantage' | 'mock';
}

// Mock data for development
const MOCK_STOCKS: Stock[] = [
  { symbol: 'ITISSAKA', name: 'Itissalat Al-Maghrib', price: 127.50, change: 1.25, changePercent: 0.99 },
  { symbol: 'BMCE', name: 'BMCE Bank', price: 28.15, change: -0.35, changePercent: -1.23 },
  { symbol: 'ATTIJARI', name: 'Attijari Wafa Bank', price: 562.00, change: 2.50, changePercent: 0.45 },
  { symbol: 'CIMENTS', name: 'Ciments du Maroc', price: 84.50, change: 0.50, changePercent: 0.60 },
  { symbol: 'DOUJA', name: 'Douja Promotion Addoha', price: 19.25, change: -0.75, changePercent: -3.75 },
  { symbol: 'MAROC_TE', name: 'Maroc Telecom', price: 115.00, change: 1.85, changePercent: 1.63 },
  { symbol: 'OCP', name: 'OCP', price: 42.80, change: 0.20, changePercent: 0.47 },
  { symbol: 'WAFAASSURE', name: 'Wafa Assurance', price: 185.50, change: -1.50, changePercent: -0.80 },
];

/**
 * Hook pour récupérer les données boursières
 * @param options Configuration du hook
 * @returns {stocks, loading, error}
 */
export function useStockData({
  symbols = MOCK_STOCKS.map(s => s.symbol),
  refreshInterval = 5000,
  apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY,
  apiProvider = 'mock',
}: UseStockDataOptions = {}) {
  const [stocks, setStocks] = useState<Stock[]>(MOCK_STOCKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les données depuis Finnhub
  const fetchFromFinnhub = useCallback(async (symbols: string[]) => {
    if (!apiKey) {
      setError('API key not configured for Finnhub');
      return;
    }

    try {
      setLoading(true);
      const promises = symbols.map(symbol =>
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
        ).then(res => res.json())
      );

      const results = await Promise.all(promises);
      
      const newStocks = results.map((data, index) => ({
        symbol: symbols[index],
        name: symbols[index],
        price: data.c || 0,
        change: data.d || 0,
        changePercent: data.dp || 0,
      }));

      setStocks(newStocks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  // Récupérer les données depuis Alpha Vantage
  const fetchFromAlphaVantage = useCallback(async (symbols: string[]) => {
    if (!apiKey) {
      setError('API key not configured for Alpha Vantage');
      return;
    }

    try {
      setLoading(true);
      const promises = symbols.map(symbol =>
        fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        ).then(res => res.json())
      );

      const results = await Promise.all(promises);

      const newStocks = results.map((data, index) => {
        const quote = data['Global Quote'];
        return {
          symbol: symbols[index],
          name: symbols[index],
          price: parseFloat(quote['05. price']) || 0,
          change: parseFloat(quote['09. change']) || 0,
          changePercent: parseFloat(quote['10. change percent']?.replace('%', '')) || 0,
        };
      });

      setStocks(newStocks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  // Mettre à jour les données en temps réel avec un petit décalage
  const updateWithMockData = useCallback(() => {
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        const priceChange = (Math.random() - 0.5) * 0.02;
        const newPrice = Math.max(stock.price * (1 + priceChange), 0);
        const change = newPrice - stock.price;
        
        return {
          ...stock,
          price: newPrice,
          change,
          changePercent: (change / stock.price) * 100,
        };
      })
    );
  }, []);

  // Configurer l'intervalle de mise à jour
  useEffect(() => {
    // Récupérer les données initiales
    if (apiProvider === 'finnhub') {
      fetchFromFinnhub(symbols);
    } else if (apiProvider === 'alpha-vantage') {
      fetchFromAlphaVantage(symbols);
    }

    // Configurer l'intervalle de mise à jour
    const interval = setInterval(() => {
      if (apiProvider === 'mock') {
        updateWithMockData();
      } else if (apiProvider === 'finnhub') {
        fetchFromFinnhub(symbols);
      } else if (apiProvider === 'alpha-vantage') {
        fetchFromAlphaVantage(symbols);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [symbols, refreshInterval, apiProvider, fetchFromFinnhub, fetchFromAlphaVantage, updateWithMockData]);

  return { stocks, loading, error };
}

// Re-export des types
export type { Stock } from '@/components/stock-ticker';
