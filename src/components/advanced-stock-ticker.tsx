'use client';

import { useState, useEffect } from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp } from 'lucide-react';
import { Stock } from './stock-ticker';

interface AdvancedStockTickerProps {
  stocks?: Stock[];
  showDetails?: boolean;
  animated?: boolean;
}

export function AdvancedStockTicker({ 
  stocks,
  showDetails = true,
  animated = true 
}: AdvancedStockTickerProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  return (
    <div className="space-y-2">
      {/* Main ticker */}
      <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-bold text-slate-200">Principaux Indices</h3>
            <span className="ml-auto text-xs text-slate-400">Mise à jour en temps réel</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stocks?.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className={`flex-shrink-0 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedStock?.symbol === stock.symbol
                    ? 'bg-primary/20 border border-primary'
                    : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm text-white">{stock.symbol}</div>
                <div className="text-lg font-bold text-white mt-1">
                  {stock.price.toFixed(2)}
                </div>
                <div className={`text-xs font-semibold flex items-center gap-1 mt-1 ${
                  stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change >= 0 ? (
                    <ArrowUpIcon size={12} />
                  ) : (
                    <ArrowDownIcon size={12} />
                  )}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails du stock sélectionné */}
      {showDetails && selectedStock && (
        <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <t className="text-xs text-slate-400 uppercase">Symbole</t>
              <div className="text-lg font-bold text-white">{selectedStock.symbol}</div>
            </div>
            <div>
              <t className="text-xs text-slate-400 uppercase">Prix Actuel</t>
              <div className="text-lg font-bold text-white">{selectedStock.price.toFixed(2)} DH</div>
            </div>
            <div>
              <t className="text-xs text-slate-400 uppercase">Variation</t>
              <div className={`text-lg font-bold ${
                selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
