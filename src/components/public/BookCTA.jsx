import React from "react";
import { Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function BookCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#231108] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B1F0D]/40 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
            Ready?
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#F7F1E6] mb-4 leading-tight">
            Your Best Brows<br />
            <span className="italic text-[#D4A832]">Await</span>
          </h2>
          <p className="text-[#C4A882]/80 font-body text-lg mb-10 max-w-md mx-auto">
            Book your appointment today and experience the artistry of Brow House & Beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}