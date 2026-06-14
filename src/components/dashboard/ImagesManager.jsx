import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, User } from "lucide-react";

const ImageUploadCard = ({ label, currentUrl, onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await onUpload(file_url);
    setUploading(false);
    toast.success(`${label} updated!`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <Label className="text-sm font-medium text-gray-700 mb-3 block">{label}</Label>
      <div className="aspect-square w-full max-w-[200px] rounded-xl bg-gray-100 overflow-hidden mb-3 border border-gray-200">
        {currentUrl ? (
          <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <User className="w-10 h-10" />
          </div>
        )}
      </div>
      <label className={`inline-flex items-center gap-2 text-sm font-body font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors ${uploading ? "bg-gray-100 text-gray-400" : "bg-[#B8861B]/10 text-[#B8861B] hover:bg-[#B8861B]/20"}`}>
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading..." : "Upload"}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  );
};

export default function ImagesManager({ siteContent, artists, onSaved }) {
  const about = siteContent.find((s) => s.section === "about");
  const hero = siteContent.find((s) => s.section === "hero");

  const updateSiteImage = async (id, url) => {
    await base44.entities.SiteContent.update(id, { image_url: url });
    onSaved?.();
  };

  const updateArtistImage = async (artistId, url) => {
    await base44.entities.Artist.update(artistId, { image_url: url });
    onSaved?.();
  };

  const sortedArtists = [...artists].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Manage Images</h2>

      <div className="mb-8">
        <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wide mb-4">Site Images</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {about && (
            <ImageUploadCard label="About Section Photo" currentUrl={about.image_url} onUpload={(url) => updateSiteImage(about.id, url)} />
          )}
          {hero && (
            <ImageUploadCard label="Hero Background" currentUrl={hero.image_url} onUpload={(url) => updateSiteImage(hero.id, url)} />
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wide mb-4">Artist Headshots</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {sortedArtists.map((artist) => (
            <ImageUploadCard
              key={artist.id}
              label={artist.name}
              currentUrl={artist.image_url}
              onUpload={(url) => updateArtistImage(artist.id, url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}