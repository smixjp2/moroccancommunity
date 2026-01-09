// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the script is already added to avoid duplicates
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "description": "MASI", "name": "CSE:MASI" },
          { "description": "Attijariwafa Bank", "name": "CSE:ATW" },
          { "description": "BCP", "name": "CSE:BCP" },
          { "description": "Bank of Africa", "name": "CSE:BOA" },
          { "description": "Maroc Telecom", "name": "CSE:IAM" },
          { "description": "LafargeHolcim Maroc", "name": "CSE:LHM" },
          { "description": "Cosumar", "name": "CSE:CSR" },
          { "description": "Taqa Morocco", "name": "CSE:TQM" },
          { "description": "Marsa Maroc", "name": "CSE:MSA" },
          { "description": "Label'Vie", "name": "CSE:LBV" },
          { "description": "HPS", "name": "CSE:HPS" },
          { "description": "Wafa Assurance", "name": "CSE:WAA" },
          { "description": "Akdital", "name": "CSE:AKD" },
          { "description": "Afriquia Gaz", "name": "CSE:GAZ" },
          { "description": "Aradei Capital", "name": "CSE:ADI" },
          { "description": "Sanlam Maroc", "name": "CSE:SNA" },
          { "description": "TGCC", "name": "CSE:TGC" },
          { "description": "Managem", "name": "CSE:MNG" },
          { "description": "CIH Bank", "name": "CSE:CIH" },
          { "description": "Crédit du Maroc", "name": "CSE:CDM" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "fr"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "46px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewTicker);
