import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function Hero({ data }) {
  const headline = data?.headline || "Brow House & Beauty";
  const subheadline = data?.subheadline || "Elevated Beauty Starts Here";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#231108]">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B1F0D] rounded-full blur-[120px] animate-glow opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3B1F0D] rounded-full blur-[100px] animate-glow opacity-30" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B1F0D]/30 rounded-full blur-[150px] animate-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.5%22/%3E%3C/svg%3E')" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase font-body font-medium mb-6">
            Union, NJ · Est. 2020
          </p>
          <h1 className="font-heading font-bold text-[#F7F1E6] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] mb-6">
            {headline}
          </h1>
          <p className="font-heading italic text-[#C4A882] text-xl sm:text-2xl lg:text-3xl font-light mb-12">
            {subheadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://thebrowstu.as.me/schedule/387b306f"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#B8861B] hover:bg-[#D4A832] text-white font-body font-semibold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,134,27,0.5)] w-full sm:w-auto"
          >
            Book Online
          </a>
          <a
            href="tel:8484331390"
            className="border border-[#C4A882]/40 hover:border-[#C4A882] text-[#F7F1E6] font-body font-medium text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4" /> Call (848) 433-1390
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F1E6] to-transparent" />
    </section>
  );
}