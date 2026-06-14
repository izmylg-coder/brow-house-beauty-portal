import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Artists", id: "artists" },
    { label: "Reviews", id: "reviews" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? "bg-[#231108]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-[#F7F1E6]">
            <span className="font-heading text-2xl font-bold tracking-wide">BH&B</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[#F7F1E6]/80 hover:text-[#D4A832] text-sm tracking-[0.15em] uppercase font-body font-medium transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://thebrowstu.as.me/schedule/387b306f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8861B] hover:bg-[#D4A832] text-white text-sm tracking-[0.15em] uppercase font-body font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,134,27,0.4)]"
            >
              Book Now
            </a>
          </div>

          <button
            className="md:hidden text-[#F7F1E6] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#231108]/98 backdrop-blur-md border-t border-[#3B1F0D]">
          <div className="px-6 py-6 space-y-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left text-[#F7F1E6]/80 hover:text-[#D4A832] text-sm tracking-[0.15em] uppercase font-body font-medium py-2 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://thebrowstu.as.me/schedule/387b306f"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#B8861B] text-white text-sm tracking-[0.15em] uppercase font-body font-semibold px-6 py-3 rounded-full mt-4"
            >
              Book Now
            </a>
            <a
              href="tel:8484331390"
              className="flex items-center justify-center gap-2 text-[#C4A882] text-sm py-2"
            >
              <Phone className="w-4 h-4" /> (848) 433-1390
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}