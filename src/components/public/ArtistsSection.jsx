import React from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";


const ArtistCircle = ({ artist, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center"
  >
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3">
      <div className="absolute inset-0 rounded-full border-2 border-[#B8861B]/50" />
      <div className="absolute inset-1 rounded-full overflow-hidden bg-[#C4A882]/30">
        {artist.image_url ? (
          <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#3B1F0D]/20">
            <User className="w-8 h-8 text-[#3B1F0D]/40" />
          </div>
        )}
      </div>
    </div>
    <h3 className="font-body text-sm font-bold text-[#231108] tracking-[0.12em] uppercase">{artist.name}</h3>
    <p className="text-[#3B1F0D]/55 text-xs font-body tracking-wider uppercase mt-0.5 leading-tight max-w-[120px]">{artist.title}</p>
  </motion.div>
);

export default function ArtistsSection({ artists = [] }) {
  const sorted = [...artists].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const row1 = sorted.slice(0, 2);
  const row2 = sorted.slice(2);

  return (
    <section id="artists" className="py-20 lg:py-28 bg-[#EDE3D0] relative overflow-hidden">
      {/* Subtle warm glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#B8861B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#B8861B]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Specialist circles */}
          <AnimatedSection>
            <div>
              <p className="text-[#231108] text-xs tracking-[0.35em] uppercase font-body font-bold mb-10 text-center">
                BH&B Specialists
              </p>

              {/* Row 1 — 2 artists */}
              <div className="flex justify-center gap-10 mb-10">
                {row1.map((artist, i) => (
                  <ArtistCircle key={artist.id} artist={artist} index={i} />
                ))}
              </div>

              {/* Row 2 — remaining artists */}
              <div className="flex justify-center gap-8 flex-wrap">
                {row2.map((artist, i) => (
                  <ArtistCircle key={artist.id} artist={artist} index={i + 2} />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT — Photo + heading + copy */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col items-center lg:items-start">

              {/* Heading */}
              <div className="mb-6 text-center lg:text-left">
                <h2 className="font-heading leading-tight text-[#231108]">
                  <span className="block text-4xl lg:text-5xl font-bold tracking-tight">Meet Your</span>
                  <span className="block text-5xl lg:text-6xl italic font-display text-[#B8861B]">Artists</span>
                </h2>
              </div>

              {/* Copy paragraphs */}
              <div className="space-y-3 text-center lg:text-left">
                <p className="font-body text-[#3B1F0D]/75 text-sm lg:text-base leading-relaxed italic">
                  Our team is made up of highly skilled brow and lash artists with years of experience in mapping, shaping and enhancing brows/lashes to complement every unique face.
                </p>
                <p className="font-body text-[#3B1F0D]/75 text-sm lg:text-base leading-relaxed italic">
                  Each artist brings passion, creativity, and expert technique to every service, ensuring results that are both precise and beautifully tailored to each client.
                </p>
                <p className="font-body text-[#3B1F0D]/80 text-sm lg:text-base leading-relaxed italic font-semibold">
                  At Brow House & Beauty, we believe great brows, lashes & beauty start with intention and expertise.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}