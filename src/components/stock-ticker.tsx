'use client';

import { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockTickerProps {
  stocks?: Stock[];
  refreshInterval?: number; // en millisecondes
  speed?: number; // vitesse du défilement
}

const DEFAULT_STOCKS: Stock[] = [
  { symbol: 'ITISSAKA', name: 'Itissalat Al-Maghrib', price: 127.50, change: 1.25, changePercent: 0.99 },
  { symbol: 'BMCE', name: 'BMCE Bank', price: 28.15, change: -0.35, changePercent: -1.23 },
  { symbol: 'ATTIJARI', name: 'Attijari Wafa Bank', price: 562.00, change: 2.50, changePercent: 0.45 },
  { symbol: 'CIMENTS', name: 'Ciments du Maroc', price: 84.50, change: 0.50, changePercent: 0.60 },
  { symbol: 'DOUJA', name: 'Douja Promotion Addoha', price: 19.25, change: -0.75, changePercent: -3.75 },
  { symbol: 'MAROC_TE', name: 'Maroc Telecom', price: 115.00, change: 1.85, changePercent: 1.63 },
  { symbol: 'OCP', name: 'OCP', price: 42.80, change: 0.20, changePercent: 0.47 },
  { symbol: 'WAFAASSURE', name: 'Wafa Assurance', price: 185.50, change: -1.50, changePercent: -0.80 },
];

export default function StockTicker({ 
  stocks = DEFAULT_STOCKS, 
  refreshInterval = 5000,
  speed = 50 
}: StockTickerProps) {
  const [displayStocks, setDisplayStocks] = useState<Stock[]>(stocks);
  const [animationDuration, setAnimationDuration] = useState<number>(40);

  // Simuler les mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.01), // ±0.5% aléatoire
          change: (stock.price * (1 + (Math.random() - 0.5) * 0.01)) - stock.price,
          changePercent: ((Math.random() - 0.5) * 2) // ±1% aléatoire
        }))
      );
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Dupliquer les stocks pour créer un défilement infini
  const doubledStocks = [...displayStocks, ...displayStocks];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 overflow-hidden">
      <div className="flex items-center h-14">
        {/* Label */}
        <div className="flex-shrink-0 px-4 bg-primary text-primary-foreground font-bold text-sm whitespace-nowrap">
          📈 BOURSE CASABLANCA
        </div>

        {/* Ticker content */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-8 py-3"
            style={{
              animation: `scroll ${animationDuration}s linear infinite`,
            }}
          >
            {doubledStocks.map((stock, index) => (
              <div
                key={`${stock.symbol}-${index}`}
                className="flex items-center gap-3 px-4 flex-shrink-0 hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-300 min-w-fit">
                  {stock.symbol}
                </div>
                <div className="text-sm font-semibold text-white">
                  {stock.price.toFixed(2)} DH
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold min-w-fit ${
                  stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change >= 0 ? (
                    <ArrowUpIcon size={14} />
                  ) : (
                    <ArrowDownIcon size={14} />
                  )}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 32px));
          }
        }
      `}</style>
    </div>
  );
}
