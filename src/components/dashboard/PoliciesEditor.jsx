import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

const PolicyForm = ({ policy, onSaved }) => {
  const [form, setForm] = useState({ headline: "", body: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (policy) {
      setForm({ headline: policy.headline || "", body: policy.body || "" });
    }
  }, [policy]);

  const handleSave = async () => {
    if (!policy?.id) return;
    setSaving(true);
    await base44.entities.SiteContent.update(policy.id, form);
    setSaving(false);
    toast.success(`${form.headline} updated!`);
    onSaved?.();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="space-y-3">
        <div>
          <Label className="text-sm text-gray-700">Title</Label>
          <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label className="text-sm text-gray-700">Policy Text</Label>
          <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={6} className="mt-1" />
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Save className="w-3.5 h-3.5 mr-1.5" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default function PoliciesEditor({ policies, onSaved }) {
  return (
    <div>
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">Edit Booking Policies</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {policies.map((policy) => (
          <PolicyForm key={policy.id} policy={policy} onSaved={onSaved} />
        ))}
      </div>
    </div>
  );
}