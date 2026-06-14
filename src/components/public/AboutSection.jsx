import React from "react";
import { Clock, MapPin, Phone, Mail, Instagram } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ABOUT_IMAGE = "/__generated_images__/img_928bbfd12b76.png";

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-[#EDE3D0] rounded-xl p-5 border border-[#C4A882]/30">
    <div className="flex items-start gap-3">
      <div className="bg-[#B8861B]/10 rounded-lg p-2 shrink-0">
        <Icon className="w-4 h-4 text-[#B8861B]" />
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold text-[#231108] mb-1">{title}</h4>
        <div className="text-[#3B1F0D]/70 text-sm leading-relaxed font-body">{children}</div>
      </div>
    </div>
  </div>
);

export default function AboutSection({ data, info }) {
  const body = data?.body || "";
  const imageUrl = data?.image_url || ABOUT_IMAGE;
  const hours = info?.hours || "Mon–Fri: 10:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM\nSun: Closed";
  const address = info?.address || "1358 Morris Avenue\nUnion, NJ 07083";
  const phone = info?.phone || "(848) 433-1390";
  const email = info?.email || "browhouseandbeauty@gmail.com";
  const instagram = info?.instagram || "@browhouse.beauty";

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#F7F1E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={imageUrl || ABOUT_IMAGE}
                  alt="Brow House & Beauty studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#B8861B]/30 rounded-2xl" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-[#B8861B] text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
              About Us
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#231108] mb-8 leading-tight">
              Where Artistry<br />Meets Precision
            </h2>
            <div className="text-[#3B1F0D]/80 text-base leading-relaxed font-body space-y-4 mb-10">
              {body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon={Clock} title="Hours">
                {hours.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </InfoCard>
              <InfoCard icon={MapPin} title="Location">
                {address.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </InfoCard>
              <InfoCard icon={Phone} title="Contact">
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-[#B8861B] transition-colors">{phone}</a>
                <br />
                <a href={`mailto:${email}`} className="hover:text-[#B8861B] transition-colors text-xs">{email}</a>
              </InfoCard>
              <InfoCard icon={Instagram} title="Social">
                <a href="https://instagram.com/browhouse.beauty" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8861B] transition-colors">
                  {instagram}
                </a>
              </InfoCard>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}