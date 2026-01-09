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
          { "description": "Crédit du Maroc", "proName": "CDM" },
          { "description": "Douja Prom Addoha", "proName": "DHO" },
          { "description": "Alliances", "proName": "ALL" },
          { "description": "Sonasid", "proName": "SND" },
          { "description": "CTM", "proName": "CTM" },
          { "description": "Mutandis", "proName": "MUT" },
          { "description": "SMI", "proName": "SMI" },
          { "description": "TotalEnergies Maroc", "proName": "TMA" },
          { "description": "Disway", "proName": "DWY" },
          { "description": "Auto Hall", "proName": "ATH" },
          { "description": "Salafin", "proName": "SLF" },
          { "description": "Stokvis Nord Afrique", "proName": "SNA" },
          { "description": "Microdata", "proName": "MIC" },
          { "description": "Risma", "proName": "RIS" },
          { "description": "Eqdom", "proName": "EQD" },
          { "description": "Dari Couspate", "proName": "DRI" },
          { "description": "Aluminium du Maroc", "proName": "ALM" },
          { "description": "Jet Contractors", "proName": "JET" },
          { "description": "Immorente Invest", "proName": "IMO" },
          { "description": "Sothema", "proName": "SOT" },
          { "description": "Oulmes", "proName": "OUL" },
          { "description": "Miniere Touissit", "proName": "CMT" },
          { "description": "Med Paper", "proName": "PAP" },
          { "description": "Maghrebail", "proName": "MAB" },
          { "description": "IB Maroc.com", "proName": "IBM" }
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
