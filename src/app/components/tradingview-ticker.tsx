// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewTicker() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (container.current && container.current.children.length === 0) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "symbols": [
              {
                "description": "MASI",
                "proName": "CSE:MASI"
              },
              {
                "description": "Attijariwafa Bank",
                "proName": "CSE:ATW"
              },
              {
                "description": "BCP",
                "proName": "CSE:BCP"
              },
              {
                "description": "Maroc Telecom",
                "proName": "CSE:IAM"
              },
              {
                "description": "LafargeHolcim",
                "proName": "CSE:LHM"
              },
              {
                "description": "Cosumar",
                "proName": "CSE:CSR"
              }
            ],
            "showSymbolLogo": true,
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "adaptive",
            "locale": "fr"
          }`;
        container.current.appendChild(script);
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewTicker);
