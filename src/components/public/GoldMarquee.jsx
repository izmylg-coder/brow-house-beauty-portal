import React from "react";

export default function GoldMarquee({ text }) {
  const content = text || "BROW WAX · TINT · HYBRID TINT · BROW LAMINATION · LUXE KOREAN LASH LIFT · LASH EXTENSIONS · BODY WAXING";

  return (
    <div className="bg-gradient-to-r from-[#B8861B] via-[#D4A832] to-[#B8861B] py-4 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-[#231108] text-sm tracking-[0.25em] uppercase font-body font-semibold px-12">
            {content} ✦
          </span>
        ))}
      </div>
    </div>
  );
}