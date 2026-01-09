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
          { "description": "Akdital", "proName": "CSE:AKD" },
          { "description": "Afriquia Gaz", "proName": "CSE:GAZ" },
          { "description": "Aradei Capital", "proName": "CSE:ADI" },
          { "description": "Sanlam Maroc", "proName": "CSE:SNA" },
          { "description": "TGCC", "proName": "CSE:TGC" },
          { "description": "Aluminium du Maroc", "proName": "CSE:ALM" },
          { "description": "Sonasid", "proName": "CSE:SND" },
          { "description": "Douja Prom Addoha", "proName": "CSE:DHI" },
          { "description": "CTM", "proName": "CSE:CTM" },
          { "description": "Mutandis", "proName": "CSE:MUT" },
          { "description": "SMI", "proName": "CSE:SMI" },
          { "description": "Disway", "proName": "CSE:DWY" },
          { "description": "TotalEnergies Maroc", "proName": "CSE:TMA" },
          { "description": "Auto Hall", "proName": "CSE:AUT" },
          { "description": "Managem", "proName": "CSE:MNG" },
          { "description": "CIH Bank", "proName": "CSE:CIH" },
          { "description": "Crédit du Maroc", "proName": "CSE:CDM" },
          { "description": "Sothema", "proName": "CSE:SOT" },
          { "description": "Alliances", "proName": "CSE:ALL" },
          { "description": "Jet Contractors", "proName": "CSE:JET" },
          { "description": "Risma", "proName": "CSE:RIS" },
          { "description": "Colorado", "proName": "CSE:COL" },
          { "description": "Salafin", "proName": "CSE:SLF" }
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
