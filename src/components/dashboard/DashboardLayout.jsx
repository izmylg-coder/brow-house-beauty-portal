import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ImageIcon,
  Scissors,
  Users,
  Star,
  Megaphone,
  FileText,
  Info,
  LogOut,
  Menu,
  X,
  Eye,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, id: "overview" },
  { label: "Hero", icon: LayoutDashboard, id: "hero" },
  { label: "Images", icon: ImageIcon, id: "images" },
  { label: "Services", icon: Scissors, id: "services" },
  { label: "Artists", icon: Users, id: "artists" },
  { label: "Reviews", icon: Star, id: "reviews" },
  { label: "Promos", icon: Megaphone, id: "promos" },
  { label: "Info", icon: Info, id: "info" },
  { label: "Policies", icon: FileText, id: "policies" },
];

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#231108] transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#3B1F0D]">
          <span className="font-heading text-xl font-bold text-[#F7F1E6]">BH&B</span>
          <button className="lg:hidden text-[#C4A882]" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-body transition-colors ${
                activeTab === item.id
                  ? "bg-[#B8861B]/20 text-[#D4A832]"
                  : "text-[#C4A882]/70 hover:text-[#F7F1E6] hover:bg-[#3B1F0D]/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3B1F0D] space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-[#C4A882]/70 hover:text-[#F7F1E6] text-sm font-body rounded-lg hover:bg-[#3B1F0D]/50 transition-colors">
            <Eye className="w-4 h-4" /> View Live Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-display font-semibold text-gray-900 capitalize">{activeTab}</h1>
          <Link to="/" target="_blank" className="hidden sm:flex items-center gap-1.5 text-sm text-[#B8861B] hover:text-[#D4A832] font-body font-medium transition-colors">
            <Eye className="w-4 h-4" /> Preview
          </Link>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}