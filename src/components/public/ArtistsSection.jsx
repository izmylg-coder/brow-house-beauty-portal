import React from "react";
import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ArtistCard = ({ artist, index }) => (
  <AnimatedSection delay={index * 0.1}>
    <div className="group text-center">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-5">
        <div className="absolute inset-0 rounded-full border-2 border-[#B8861B]/40 group-hover:border-[#D4A832] group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-1 rounded-full overflow-hidden bg-[#3B1F0D]">
          {artist.image_url ? (
            <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-[#C4A882]/50" />
            </div>
          )}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-[#F7F1E6] mb-1">{artist.name}</h3>
      <p className="text-[#C4A882]/80 text-sm font-body">{artist.title}</p>
    </div>
  </AnimatedSection>
);

export default function ArtistsSection({ artists = [] }) {
  const sorted = [...artists].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section id="artists" className="py-24 lg:py-32 bg-[#231108] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#3B1F0D] rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#3B1F0D] rounded-full blur-[80px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              Our Team
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#F7F1E6] leading-tight">
              Meet Your{" "}
              <span className="italic text-[#D4A832]">Artists</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
          {sorted.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}