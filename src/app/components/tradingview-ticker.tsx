// TradingViewWidget.tsx
'use client';

import React, { memo } from 'react';

function TradingViewTicker() {
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <script
        type="text/javascript"
        src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        async
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "symbols": [
              { "description": "MASI", "proName": "CSE:MASI" },
              { "description": "Attijariwafa Bank", "proName": "CSE:ATW" },
              { "description": "BCP", "proName": "CSE:BCP" },
              { "description": "Maroc Telecom", "proName": "CSE:IAM" },
              { "description": "LafargeHolcim", "proName": "CSE:LHM" },
              { "description": "Cosumar", "proName": "CSE:CSR" }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "fr"
          })
        }}
      />
    </div>
  );
}

export default memo(TradingViewTicker);
