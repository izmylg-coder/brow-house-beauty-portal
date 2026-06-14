import React from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const TEAM_PHOTO = "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/4639f41e8_Screenshot_20260613_190907_Instagram.jpg";

const ArtistCard = ({ artist, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group text-center"
  >
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-[#B8861B]/50 group-hover:border-[#D4A832] group-hover:scale-105 transition-all duration-500" />
      <div className="absolute inset-1 rounded-full overflow-hidden bg-[#3B1F0D]/40">
        {artist.image_url ? (
          <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#3B1F0D]/60">
            <User className="w-8 h-8 text-[#C4A882]/50" />
          </div>
        )}
      </div>
    </div>
    <h3 className="font-body text-sm font-bold text-[#231108] tracking-[0.1em] uppercase mb-0.5">{artist.name}</h3>
    <p className="text-[#3B1F0D]/60 text-xs font-body tracking-wide uppercase">{artist.title}</p>
  </motion.div>
);

export default function ArtistsSection({ artists = [] }) {
  const sorted = [...artists].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section id="artists" className="py-24 lg:py-32 bg-[#F0E8D8] relative overflow-hidden">
      {/* Warm texture glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8861B]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#B8861B]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Artists grid + label */}
          <AnimatedSection>
            <div>
              <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-10 text-center lg:text-left">
                BH&B Specialists
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {sorted.map((artist, i) => (
                  <ArtistCard key={artist.id} artist={artist} index={i} />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Team photo + copy */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col items-center lg:items-start">
              {/* Team photo */}
              <div className="relative w-full max-w-sm lg:max-w-none mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={TEAM_PHOTO}
                  alt="BH&B Team"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231108]/30 to-transparent" />
              </div>

              {/* Heading */}
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-[#231108] leading-tight mb-6 text-center lg:text-left">
                Meet Your{" "}
                <span className="italic text-[#B8861B] font-display">Artists</span>
              </h2>

              <div className="space-y-4 text-center lg:text-left">
                <p className="font-body text-[#3B1F0D]/75 text-base lg:text-lg leading-relaxed italic">
                  Our team is made up of highly skilled brow and lash artists with years of experience in mapping, shaping and enhancing brows/lashes to complement every unique face.
                </p>
                <p className="font-body text-[#3B1F0D]/75 text-base lg:text-lg leading-relaxed italic">
                  Each artist brings passion, creativity, and expert technique to every service, ensuring results that are both precise and beautifully tailored to each client.
                </p>
                <p className="font-body text-[#3B1F0D]/80 text-base lg:text-lg leading-relaxed font-medium italic">
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