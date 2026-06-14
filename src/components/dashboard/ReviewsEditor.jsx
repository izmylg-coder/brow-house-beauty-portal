import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";

export default function ReviewsEditor({ reviews, onSaved }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, sort_order: 0 });

  const sorted = [...reviews].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const startEdit = (r) => {
    setEditing(r.id);
    setForm({ name: r.name, text: r.text, rating: r.rating || 5, sort_order: r.sort_order || 0 });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ name: "", text: "", rating: 5, sort_order: sorted.length + 1 });
  };

  const handleSave = async () => {
    if (editing === "new") {
      await base44.entities.Review.create(form);
      toast.success("Review added!");
    } else {
      await base44.entities.Review.update(editing, form);
      toast.success("Review updated!");
    }
    setEditing(null);
    onSaved?.();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    await base44.entities.Review.delete(id);
    toast.success("Review deleted!");
    onSaved?.();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">Manage Reviews</h2>
        <Button onClick={startNew} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Review
        </Button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700">Client Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Review Text</Label>
              <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} className="mt-1" />
            </div>
            <div className="flex gap-4">
              <div>
                <Label className="text-sm text-gray-700">Rating</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setForm({ ...form, rating: n })}>
                      <Star className={`w-5 h-5 ${n <= form.rating ? "fill-[#B8861B] text-[#B8861B]" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-700">Sort Order</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="mt-1 w-20" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sorted.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display font-semibold text-gray-900">{r.name}</span>
                <div className="flex gap-0.5">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#B8861B] text-[#B8861B]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">"{r.text}"</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(r)} className="text-gray-400 hover:text-[#B8861B] p-1">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(r.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}