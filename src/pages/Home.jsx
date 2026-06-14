import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import Ticker from "../components/public/Ticker";
import Navbar from "../components/public/Navbar";
import Hero from "../components/public/Hero";
import GoldMarquee from "../components/public/GoldMarquee";
import AboutSection from "../components/public/AboutSection";
import ServicesGrid from "../components/public/ServicesGrid";
import ArtistsSection from "../components/public/ArtistsSection";
import ReviewsSection from "../components/public/ReviewsSection";
import BookCTA from "../components/public/BookCTA";
import PoliciesSection from "../components/public/PoliciesSection";
import Footer from "../components/public/Footer";

export default function Home() {
  const { data: siteContent = [] } = useQuery({
    queryKey: ["siteContent"],
    queryFn: () => base44.entities.SiteContent.list(),
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => base44.entities.Service.list(),
  });

  const { data: artists = [] } = useQuery({
    queryKey: ["artists"],
    queryFn: () => base44.entities.Artist.list(),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => base44.entities.Review.list(),
  });

  const getSection = (name) => siteContent.find((s) => s.section === name);
  const hero = getSection("hero");
  const about = getSection("about");
  const promos = getSection("promos");
  const info = getSection("info");
  const policies = ["policies_brow", "policies_lash", "policies_wax", "policies_cancellation"]
    .map(getSection)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F7F1E6]">
      <Ticker text={promos?.ticker_text} />
      <Navbar />
      <Hero data={hero} />
      <GoldMarquee text={promos?.marquee_text} />
      <AboutSection data={about} info={info} />
      <ServicesGrid services={services} />
      <ArtistsSection artists={artists} />
      <ReviewsSection reviews={reviews} />
      <BookCTA />
      <PoliciesSection policies={policies} />
      <Footer info={info} />
    </div>
  );
}