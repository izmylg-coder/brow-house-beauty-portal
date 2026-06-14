import React from "react";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer({ info }) {
  const phone = info?.phone || "(848) 433-1390";
  const email = info?.email || "browhouseandbeauty@gmail.com";
  const address = info?.address || "1358 Morris Avenue\nUnion, NJ 07083";
  const instagram = info?.instagram || "@browhouse.beauty";

  return (
    <footer className="bg-[#231108] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-3xl font-bold text-[#F7F1E6] mb-4">BH&B</h3>
            <p className="text-[#C4A882]/70 text-sm font-body leading-relaxed">
              Elevated beauty starts here. Precision brow artistry and luxe lash services in Union, New Jersey.
            </p>
          </div>

          <div>
            <h4 className="text-[#F7F1E6] font-display font-semibold text-sm tracking-[0.15em] uppercase mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Services", "Artists", "Reviews"].map((link) => (
                <button
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-[#C4A882]/70 hover:text-[#D4A832] text-sm font-body transition-colors"
                >
                  {link}
                </button>
              ))}
              <a
                href="https://thebrowstu.as.me/schedule/387b306f"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#B8861B] hover:text-[#D4A832] text-sm font-body font-semibold transition-colors"
              >
                Book Now →
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#F7F1E6] font-display font-semibold text-sm tracking-[0.15em] uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-[#C4A882]/70 hover:text-[#D4A832] text-sm font-body transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-[#C4A882]/70 hover:text-[#D4A832] text-sm font-body transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> {email}
              </a>
              <div className="flex items-start gap-2 text-[#C4A882]/70 text-sm font-body">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{address.replace("\n", ", ")}</span>
              </div>
              <a href="https://instagram.com/browhouse.beauty" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#C4A882]/70 hover:text-[#D4A832] text-sm font-body transition-colors">
                <Instagram className="w-4 h-4 shrink-0" /> {instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3B1F0D] pt-8 text-center">
          <p className="text-[#C4A882]/40 text-xs font-body">
            © {new Date().getFullYear()} Brow House & Beauty. All rights reserved. · 15% off for veterans, nurses, and students.
          </p>
        </div>
      </div>
    </footer>
  );
}