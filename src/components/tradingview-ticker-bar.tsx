'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView?: {
      widget?: any;
    };
  }
}

export default function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nettoyer le conteneur avant de charger
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Charger le script TradingView
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView?.widget && containerRef.current) {
        try {
          new window.TradingView.widget({
            symbols: [
              { proName: 'CASABLANCA:ITISSAKA', title: 'Maroc Telecom' },
              { proName: 'CASABLANCA:BMCE', title: 'BMCE Bank' },
              { proName: 'CASABLANCA:ATTIJARI', title: 'Attijari Wafa' },
              { proName: 'CASABLANCA:CIMENTS', title: 'Ciments du Maroc' },
              { proName: 'CASABLANCA:DOUJA', title: 'Douja Addoha' },
              { proName: 'CASABLANCA:OCP', title: 'OCP' },
              { proName: 'CASABLANCA:WAFAASSURE', title: 'Wafa Assurance' },
              { proName: 'CASABLANCA:MANAGEM', title: 'Managem' },
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: 'adaptive',
            colorTheme: 'dark',
            locale: 'fr',
            container_id: 'tradingview-widget-container',
          });
        } catch (error) {
          console.error('Error loading TradingView widget:', error);
        }
      }
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-slate-900 border-b border-slate-700 overflow-hidden"
    >
      <div id="tradingview-widget-container" className="w-full" />
    </div>
  );
}
