import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X, User } from "lucide-react";

export default function ArtistsEditor({ artists, onSaved }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", title: "", sort_order: 0 });

  const sorted = [...artists].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const startEdit = (a) => {
    setEditing(a.id);
    setForm({ name: a.name, title: a.title || "", sort_order: a.sort_order || 0 });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ name: "", title: "", sort_order: sorted.length + 1 });
  };

  const handleSave = async () => {
    if (editing === "new") {
      await base44.entities.Artist.create(form);
      toast.success("Artist added!");
    } else {
      await base44.entities.Artist.update(editing, form);
      toast.success("Artist updated!");
    }
    setEditing(null);
    onSaved?.();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this artist?")) return;
    await base44.entities.Artist.delete(id);
    toast.success("Artist deleted!");
    onSaved?.();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">Manage Artists</h2>
        <Button onClick={startNew} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Artist
        </Button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-700">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Title / Specialty</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="mt-1 w-24" />
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

      <div className="space-y-3">
        {sorted.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                {a.image_url ? (
                  <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-display font-semibold text-gray-900">{a.name}</p>
                <p className="text-gray-500 text-sm">{a.title}</p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(a)} className="text-gray-400 hover:text-[#B8861B] p-1">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}