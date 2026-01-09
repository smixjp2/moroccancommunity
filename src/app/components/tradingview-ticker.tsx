// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (currentContainer && !currentContainer.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "description": "MASI", "name": "MASI" },
          { "description": "Attijariwafa Bank", "name": "ATW" },
          { "description": "BCP", "name": "BCP" },
          { "description": "Bank of Africa", "name": "BOA" },
          { "description": "Maroc Telecom", "name": "IAM" },
          { "description": "LafargeHolcim Maroc", "name": "LHM" },
          { "description": "Cosumar", "name": "CSR" },
          { "description": "Taqa Morocco", "name": "TQM" },
          { "description": "Marsa Maroc", "name": "MSA" },
          { "description": "Label'Vie", "name": "LBV" },
          { "description": "HPS", "name": "HPS" },
          { "description": "Wafa Assurance", "name": "WAA" },
          { "description": "Akdital", "name": "AKD" },
          { "description": "Afriquia Gaz", "name": "GAZ" },
          { "description": "Aradei Capital", "name": "ADI" },
          { "description": "Sanlam Maroc", "name": "SNA" },
          { "description": "TGCC", "name": "TGC" },
          { "description": "Managem", "name": "MNG" },
          { "description": "CIH Bank", "name": "CIH" },
          { "description": "Crédit du Maroc", "name": "CDM" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "fr"
      });
      currentContainer.appendChild(script);

      return () => {
        if (currentContainer && currentContainer.contains(script)) {
            currentContainer.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "46px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewTicker);
