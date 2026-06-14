import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function PromosEditor({ data, onSaved }) {
  const [form, setForm] = useState({ ticker_text: "", marquee_text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({ ticker_text: data.ticker_text || "", marquee_text: data.marquee_text || "" });
    }
  }, [data]);

  const handleSave = async () => {
    if (!data?.id) return;
    setSaving(true);
    await base44.entities.SiteContent.update(data.id, form);
    setSaving(false);
    toast.success("Promos updated!");
    onSaved?.();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Edit Promos & Marquee</h2>

      {/* Live preview */}
      <div className="bg-[#231108] rounded-xl overflow-hidden mb-6">
        <div className="py-2 overflow-hidden">
          <div className="animate-ticker whitespace-nowrap flex">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-[#F7F1E6] text-xs tracking-[0.2em] uppercase font-body font-medium px-8">
                {form.ticker_text || "Preview ticker text..."}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <Label className="text-sm font-medium text-gray-700">Ticker Text (top scrolling bar)</Label>
          <Textarea value={form.ticker_text} onChange={(e) => setForm({ ...form, ticker_text: e.target.value })} rows={3} className="mt-1" />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Gold Marquee Strip Text</Label>
          <Textarea value={form.marquee_text} onChange={(e) => setForm({ ...form, marquee_text: e.target.value })} rows={2} className="mt-1" />
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}