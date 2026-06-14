import React from "react";
import { AlertCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const PolicyCard = ({ policy, index }) => (
  <AnimatedSection delay={index * 0.1}>
    <div className="bg-[#EDE3D0] rounded-xl p-6 border border-[#C4A882]/30 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-[#B8861B]/10 rounded-lg p-1.5">
          <AlertCircle className="w-4 h-4 text-[#B8861B]" />
        </div>
        <h3 className="font-display text-base font-semibold text-[#231108]">{policy.headline}</h3>
      </div>
      <div className="text-[#3B1F0D]/70 text-sm leading-relaxed font-body space-y-2">
        {policy.body?.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default function PoliciesSection({ policies = [] }) {
  return (
    <section className="py-24 lg:py-32 bg-[#F7F1E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              Important Info
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#231108] leading-tight">
              Booking Policies
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {policies.map((policy, i) => (
            <PolicyCard key={policy.id || i} policy={policy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}