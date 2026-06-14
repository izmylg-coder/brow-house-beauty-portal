import React from "react";
import { Scissors, Users, Star, Eye } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 font-body">{label}</p>
  </div>
);

export default function OverviewPanel({ services, artists, reviews }) {
  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={Scissors} label="Services" value={services.length} color="bg-[#B8861B]/10 text-[#B8861B]" />
        <StatCard icon={Users} label="Artists" value={artists.length} color="bg-blue-50 text-blue-600" />
        <StatCard icon={Star} label="Reviews" value={reviews.length} color="bg-amber-50 text-amber-600" />
        <StatCard icon={Eye} label="Sections" value="8" color="bg-green-50 text-green-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-display font-semibold text-gray-900 mb-3">Quick Tips</h3>
        <ul className="text-sm text-gray-600 font-body space-y-2">
          <li>• Use the <strong>Images</strong> tab to upload artist headshots and site photos</li>
          <li>• Edit <strong>Promos</strong> to update the scrolling ticker and gold marquee strip</li>
          <li>• All changes save instantly and reflect on the live site</li>
          <li>• Click <strong>View Live Site</strong> in the sidebar to preview changes</li>
        </ul>
      </div>
    </div>
  );
}