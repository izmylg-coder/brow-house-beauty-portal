import React from "react";

export default function Ticker({ text }) {
  const content = text || "✦ WAX WEDNESDAYS — 15% OFF ALL BODY WAXING ✦ UNION, NJ ✦ @BROWHOUSE.BEAUTY ✦ BOOK ONLINE NOW ✦";
  
  return (
    <div className="bg-[#231108] text-[#F7F1E6] py-2 overflow-hidden relative z-50">
      <div className="animate-ticker whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-xs tracking-[0.2em] uppercase font-body font-medium px-8">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}