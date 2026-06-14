import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function InfoEditor({ data, onSaved }) {
  const [form, setForm] = useState({ hours: "", address: "", phone: "", email: "", instagram: "", tiktok: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        hours: data.hours || "",
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        instagram: data.instagram || "",
        tiktok: data.tiktok || "",
      });
    }
  }, [data]);

  const handleSave = async () => {
    if (!data?.id) return;
    setSaving(true);
    await base44.entities.SiteContent.update(data.id, form);
    setSaving(false);
    toast.success("Info updated!");
    onSaved?.();
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Edit Business Info</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <Label className="text-sm text-gray-700">Hours</Label>
          <Textarea value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} rows={3} className="mt-1" placeholder="Mon-Fri: 10AM - 6PM" />
        </div>
        <div>
          <Label className="text-sm text-gray-700">Address</Label>
          <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="mt-1" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-700">Phone</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label className="text-sm text-gray-700">Email</Label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-700">Instagram Handle</Label>
            <Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label className="text-sm text-gray-700">TikTok Handle</Label>
            <Input value={form.tiktok} onChange={(e) => setForm({ ...form, tiktok: e.target.value })} className="mt-1" />
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}