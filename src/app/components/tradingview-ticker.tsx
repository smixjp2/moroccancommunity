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
          { "description": "Attijariwafa Bank", "proName": "CSE:ATW" },
          { "description": "BCP", "proName": "CSE:BCP" },
          { "description": "Bank of Africa", "proName": "CSE:BOA" },
          { "description": "Maroc Telecom", "proName": "CSE:IAM" },
          { "description": "LafargeHolcim Maroc", "proName": "CSE:LHM" },
          { "description": "Cosumar", "proName": "CSE:CSR" },
          { "description": "Taqa Morocco", "proName": "CSE:TQM" },
          { "description": "Marsa Maroc", "proName": "CSE:MSA" },
          { "description": "Label'Vie", "proName": "CSE:LBV" },
          { "description": "HPS", "proName": "CSE:HPS" },
          { "description": "Wafa Assurance", "proName": "CSE:WAA" },
          { "description": "Akdital", "proName": "CSE:AKD" },
          { "description": "Afriquia Gaz", "proName": "CSE:GAZ" },
          { "description": "Aradei Capital", "proName": "CSE:ADI" },
          { "description": "Sanlam Maroc", "proName": "CSE:SNA" },
          { "description": "TGCC", "proName": "CSE:TGC" },
          { "description": "Managem", "proName": "CSE:MNG" },
          { "description": "CIH Bank", "proName": "CSE:CIH" },
          { "description": "Crédit du Maroc", "proName": "CSE:CDM" }
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
