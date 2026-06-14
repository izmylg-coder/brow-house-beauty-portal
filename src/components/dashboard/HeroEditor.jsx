import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function HeroEditor({ data, onSaved }) {
  const [form, setForm] = useState({ headline: "", subheadline: "", tagline: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({ headline: data.headline || "", subheadline: data.subheadline || "", tagline: data.tagline || "" });
    }
  }, [data]);

  const handleSave = async () => {
    if (!data?.id) return;
    setSaving(true);
    await base44.entities.SiteContent.update(data.id, form);
    setSaving(false);
    toast.success("Hero updated!");
    onSaved?.();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Edit Hero Section</h2>
      <div className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div>
          <Label className="text-sm font-medium text-gray-700">Headline</Label>
          <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Subheadline (italic)</Label>
          <Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Tagline</Label>
          <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="mt-1" />
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}