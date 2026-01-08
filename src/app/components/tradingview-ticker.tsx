// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && container.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "description": "MASI", "proName": "CSE:MASI" },
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
          { "description": "Akdital", "proName": "CSE:ACI" },
          { "description": "Afriquia Gaz", "proName": "CSE:GAZ" },
          { "description": "Aradei Capital", "proName": "CSE:ADI" },
          { "description": "Sanlam Maroc", "proName": "CSE:SNA" },
          { "description": "TGCC", "proName": "CSE:TGC" },
          { "description": "Aluminium du Maroc", "proName": "CSE:ALU" },
          { "description": "Sonasid", "proname": "CSE:SID"},
          { "description": "Douja Prom Addoha", "proName": "CSE:DHO" },
          { "description": "CTM", "proName": "CSE:CTM" },
          { "description": "Mutandis", "proName": "CSE:MUT" },
          { "description": "SMI", "proName": "CSE:SMI" },
          { "description": "Disway", "proName": "CSE:DSW" }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
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
