// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewMarketOverview() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (currentContainer && !currentContainer.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "light",
        "dateRange": "12M",
        "showChart": true,
        "locale": "fr",
        "width": "100%",
        "height": "100%",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(120, 123, 134, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Les Plus Actives",
            "symbols": [
              { "s": "CSE:ATW", "d": "Attijariwafa Bank" },
              { "s": "CSE:BCP", "d": "BCP" },
              { "s": "CSE:BOA", "d": "Bank Of Africa" },
              { "s": "CSE:IAM", "d": "Maroc Telecom" },
              { "s": "CSE:TQM", "d": "Taqa Morocco" },
              { "s": "CSE:AKD", "d": "Akdital" }
            ],
            "originalTitle": "Les Plus Actives"
          },
          {
            "title": "Hausses %",
            "symbols": [
              { "s": "CSE:MNG", "d": "Managem" },
              { "s": "CSE:GAZ", "d": "Afriquia Gaz" },
              { "s": "CSE:SNA", "d": "Sanlam Maroc" },
              { "s": "CSE:WAA", "d": "Wafa Assurance" },
              { "s": "CSE:ADI", "d": "Aradei Capital" },
              { "s": "CSE:LBV", "d": "Label Vie" }
            ],
            "originalTitle": "Hausses %"
          },
          {
            "title": "Baisses %",
            "symbols": [
              { "s": "CSE:ALL", "d": "Alliances" },
              { "s": "CSE:DHO", "d": "Addoha" },
              { "s": "CSE:TGC", "d": "TGCC" },
              { "s": "CSE:JET", "d": "Jet Contractors" },
              { "s": "CSE:RIS", "d": "Risma" },
              { "s": "CSE:HPS", "d": "HPS" }
            ],
            "originalTitle": "Baisses %"
          }
        ]
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
    <div className="tradingview-widget-container" ref={container} style={{ height: "450px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewMarketOverview);