import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import OverviewPanel from "../components/dashboard/OverviewPanel";
import HeroEditor from "../components/dashboard/HeroEditor";
import ImagesManager from "../components/dashboard/ImagesManager";
import ServicesEditor from "../components/dashboard/ServicesEditor";
import ArtistsEditor from "../components/dashboard/ArtistsEditor";
import ReviewsEditor from "../components/dashboard/ReviewsEditor";
import PromosEditor from "../components/dashboard/PromosEditor";
import InfoEditor from "../components/dashboard/InfoEditor";
import PoliciesEditor from "../components/dashboard/PoliciesEditor";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  const { data: siteContent = [] } = useQuery({
    queryKey: ["dash-siteContent"],
    queryFn: () => base44.entities.SiteContent.list(),
    enabled: authenticated,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["dash-services"],
    queryFn: () => base44.entities.Service.list(),
    enabled: authenticated,
  });

  const { data: artists = [] } = useQuery({
    queryKey: ["dash-artists"],
    queryFn: () => base44.entities.Artist.list(),
    enabled: authenticated,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["dash-reviews"],
    queryFn: () => base44.entities.Review.list(),
    enabled: authenticated,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["dash-siteContent"] });
    queryClient.invalidateQueries({ queryKey: ["dash-services"] });
    queryClient.invalidateQueries({ queryKey: ["dash-artists"] });
    queryClient.invalidateQueries({ queryKey: ["dash-reviews"] });
  };

  const getSection = (name) => siteContent.find((s) => s.section === name);
  const policies = ["policies_brow", "policies_lash", "policies_wax", "policies_cancellation"]
    .map(getSection)
    .filter(Boolean);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#231108] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-[#F7F1E6] mb-2">BH&B</h1>
            <p className="text-[#C4A882]/70 text-sm font-body">Owner Dashboard</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === "bhb2025") {
                setAuthenticated(true);
              } else {
                alert("Incorrect password");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter dashboard password"
              className="w-full bg-[#3B1F0D] border border-[#C4A882]/30 text-[#F7F1E6] rounded-lg px-4 py-3 text-sm font-body placeholder:text-[#C4A882]/40 focus:outline-none focus:border-[#B8861B]"
            />
            <button
              type="submit"
              className="w-full bg-[#B8861B] hover:bg-[#D4A832] text-white font-body font-semibold text-sm py-3 rounded-lg transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel services={services} artists={artists} reviews={reviews} />;
      case "hero":
        return <HeroEditor data={getSection("hero")} onSaved={invalidateAll} />;
      case "images":
        return <ImagesManager siteContent={siteContent} artists={artists} onSaved={invalidateAll} />;
      case "services":
        return <ServicesEditor services={services} onSaved={invalidateAll} />;
      case "artists":
        return <ArtistsEditor artists={artists} onSaved={invalidateAll} />;
      case "reviews":
        return <ReviewsEditor reviews={reviews} onSaved={invalidateAll} />;
      case "promos":
        return <PromosEditor data={getSection("promos")} onSaved={invalidateAll} />;
      case "info":
        return <InfoEditor data={getSection("info")} onSaved={invalidateAll} />;
      case "policies":
        return <PoliciesEditor policies={policies} onSaved={invalidateAll} />;
      default:
        return <OverviewPanel services={services} artists={artists} reviews={reviews} />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderTab()}
    </DashboardLayout>
  );
}