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
          { "description": "MASI", "proName": "MASI" },
          { "description": "Attijariwafa Bank", "proName": "ATW" },
          { "description": "BCP", "proName": "BCP" },
          { "description": "Bank of Africa", "proName": "BOA" },
          { "description": "Maroc Telecom", "proName": "IAM" },
          { "description": "LafargeHolcim Maroc", "proName": "LHM" },
          { "description": "Cosumar", "proName": "CSR" },
          { "description": "Taqa Morocco", "proName": "TQM" },
          { "description": "Marsa Maroc", "proName": "MSA" },
          { "description": "Label'Vie", "proName": "LBV" },
          { "description": "HPS", "proName": "HPS" },
          { "description": "Wafa Assurance", "proName": "WAA" },
          { "description": "Akdital", "proName": "AKD" },
          { "description": "Afriquia Gaz", "proName": "GAZ" },
          { "description": "Aradei Capital", "proName": "ADI" },
          { "description": "Sanlam Maroc", "proName": "SNA" },
          { "description": "TGCC", "proName": "TGC" },
          { "description": "Managem", "proName": "MNG" },
          { "description": "CIH Bank", "proName": "CIH" },
          { "description": "Crédit du Maroc", "proName": "CDM" }
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
