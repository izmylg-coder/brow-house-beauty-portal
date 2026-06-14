import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { X } from "lucide-react";

const GalleryImage = ({ src, alt, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true, margin: "-60px" }}
        className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
        onClick={() => setExpanded(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-[#231108]/0 group-hover:bg-[#231108]/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={src} alt={alt} className="w-full h-full object-contain rounded-xl" />
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function GallerySection({ images = [] }) {
  const galleryImages = [
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/4a3dd916f_generated_image.png", alt: "Perfect Eyebrows" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/ac82b3cd4_generated_image.png", alt: "Lash Extensions" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/1eb4b7198_generated_image.png", alt: "Lash Lift" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/4a0c26fad_generated_image.png", alt: "Waxing Treatment" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/b361ea44c_generated_image.png", alt: "Brow Transformation" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/292fe941f_generated_image.png", alt: "Professional Artistry" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/2ca77c37b_generated_image.png", alt: "Beauty Details" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/1bff4bce8_generated_image.png", alt: "Salon Work" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/38be33eb8_generated_image.png", alt: "Treatment Details" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/53a89c2cb_generated_image.png", alt: "Lash Application" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/70d2b39a5_generated_image.png", alt: "Brow Lamination" },
    { src: "https://media.base44.com/images/public/6a2e61f6742da0538b30e6b4/8ba9860b7_generated_image.png", alt: "Beauty Portrait" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F7F1E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              Our Work
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-[#231108] leading-tight">
              Beauty in<br />
              <span className="italic">Every Detail</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((img, i) => (
            <GalleryImage key={i} src={img.src} alt={img.alt} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}