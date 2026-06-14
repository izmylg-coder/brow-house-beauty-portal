import React from "react";
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";

const TEAM_PHOTO = "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/2d78544b1_Screenshot_20260613_190913_Instagram.jpg";

export default function Hero({ data }) {
  const headline = data?.headline || "Brow House";
  const subheadline = data?.subheadline || "& Beauty";
  const tagline = data?.tagline || "Elevated Beauty Starts Here";

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden bg-[#F7F1E6]">

      {/* Left — Text Content */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[55%] px-8 sm:px-14 lg:px-20 py-28 lg:py-0">

        {/* Subtle warm glow behind text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8861B]/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[#B8861B] text-xs tracking-[0.35em] uppercase font-body font-semibold mb-5">
            Union, NJ · Est. 2020
          </p>

          <h1 className="font-heading font-bold text-[#231108] leading-[0.9] mb-4">
            <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">{headline}</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl italic text-[#B8861B]">{subheadline}</span>
          </h1>

          <p className="font-body text-[#3B1F0D]/70 text-lg sm:text-xl mt-6 mb-4 max-w-md leading-relaxed">
            {tagline}
          </p>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B8861B] text-[#B8861B]" />
              ))}
            </div>
            <span className="text-[#3B1F0D]/60 text-sm font-body">5-star rated · Union, NJ</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://thebrowstu.as.me/schedule/387b306f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#231108] hover:bg-[#B8861B] text-[#F7F1E6] font-body font-semibold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full transition-all duration-300 text-center"
            >
              Book Online
            </a>
            <a
              href="tel:8484331390"
              className="border-2 border-[#231108]/20 hover:border-[#B8861B] hover:text-[#B8861B] text-[#231108] font-body font-medium text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> (848) 433-1390
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right — Team Photo */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="hidden lg:block absolute top-0 right-0 w-[50%] h-full"
      >
        {/* Warm overlay to blend with palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F1E6] via-[#F7F1E6]/10 to-transparent z-10" />
        <img
          src={TEAM_PHOTO}
          alt="Brow House & Beauty Team"
          className="w-full h-full object-cover object-top"
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F7F1E6] to-transparent z-10" />
      </motion.div>

      {/* Mobile team photo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="lg:hidden absolute inset-0 z-0"
      >
        <img src={TEAM_PHOTO} alt="Brow House & Beauty Team" className="w-full h-full object-cover object-top opacity-15" />
      </motion.div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B8861B] to-transparent" />
    </section>
  );
}