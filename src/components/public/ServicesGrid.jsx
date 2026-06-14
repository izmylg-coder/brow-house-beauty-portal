import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ServiceCard = ({ service, index }) => (
  <AnimatedSection delay={index * 0.05}>
    <div className="group bg-[#EDE3D0] border border-[#C4A882]/30 rounded-xl p-6 hover:border-[#B8861B]/50 transition-all duration-500 hover:shadow-lg hover:shadow-[#B8861B]/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#B8861B]/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative">
        <h3 className="font-display text-lg font-semibold text-[#231108] mb-3">{service.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#3B1F0D]/60 text-sm font-body">
            <Clock className="w-3.5 h-3.5" />
            <span>{service.duration}</span>
          </div>
          <span className="font-heading text-2xl font-bold text-[#B8861B]">{service.price}</span>
        </div>
        
        <a
          href="https://thebrowstu.as.me/schedule/387b306f"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 text-[#B8861B] text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Reserve <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </AnimatedSection>
);

export default function ServicesGrid({ services = [] }) {
  const sorted = [...services].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F7F1E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              Our Services
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#231108] leading-tight">
              The Service Menu
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <a
              href="https://thebrowstu.as.me/schedule/387b306f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#231108] hover:bg-[#3B1F0D] text-[#F7F1E6] font-body font-semibold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full transition-all duration-300"
            >
              View Full Menu & Book <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}