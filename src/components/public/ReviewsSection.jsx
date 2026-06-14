import React from "react";
import { Star, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ReviewCard = ({ review, index }) => (
  <AnimatedSection delay={index * 0.15}>
    <div className="bg-[#EDE3D0] rounded-2xl p-8 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-4 right-6 font-heading text-8xl text-[#231108]/[0.06] leading-none select-none">
        "
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating || 5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#B8861B] text-[#B8861B]" />
        ))}
      </div>
      <p className="text-[#231108]/80 text-base leading-relaxed font-body flex-1 relative z-10">
        "{review.text}"
      </p>
      <p className="text-[#B8861B] font-display font-semibold text-sm mt-6 tracking-wide uppercase">
        — {review.name}
      </p>
    </div>
  </AnimatedSection>
);

export default function ReviewsSection({ reviews = [] }) {
  const sorted = [...reviews].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#F7F1E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              Testimonials
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#231108] leading-tight">
              Client{" "}
              <span className="italic">Reviews</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sorted.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center bg-gradient-to-r from-[#B8861B]/10 via-[#D4A832]/15 to-[#B8861B]/10 rounded-2xl p-8 border border-[#B8861B]/20">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#B8861B] text-[#B8861B]" />
              ))}
            </div>
            <p className="font-heading text-xl font-semibold text-[#231108] mb-2">
              Leave Us a Review & Get $5 Off!
            </p>
            <p className="text-[#3B1F0D]/70 text-sm font-body mb-5">
              Receive $5 off your next appointment when you leave a review on Google!
            </p>
            <a
              href="https://www.google.com/search?q=brow+house+beauty+union+nj+review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B8861B] hover:bg-[#D4A832] text-white font-body font-semibold text-sm tracking-[0.1em] uppercase px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,134,27,0.4)]"
            >
              Leave a Google Review <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}