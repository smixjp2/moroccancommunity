// TradingViewWidget.tsx
'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewSymbolOverview() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (currentContainer && !currentContainer.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          ["MASI", "MASI|1D"],
          ["EURMAD", "FX_IDC:EURMAD|1D"],
          ["USDMAD", "FX_IDC:USDMAD|1D"]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "fr",
        "colorTheme": "light",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineType": 2,
        "dateRanges": ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
        "lineWidth": 2,
        "lineColor": "rgba(67, 72, 41, 1)",
        "isTransparent": true
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

export default memo(TradingViewSymbolOverview);
