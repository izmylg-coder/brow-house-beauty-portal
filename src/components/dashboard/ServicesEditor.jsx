import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

export default function ServicesEditor({ services, onSaved }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "brow", duration: "", price: "", sort_order: 0 });

  const sorted = [...services].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const startEdit = (service) => {
    setEditing(service.id);
    setForm({ name: service.name, category: service.category || "brow", duration: service.duration || "", price: service.price || "", sort_order: service.sort_order || 0 });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ name: "", category: "brow", duration: "", price: "", sort_order: sorted.length + 1 });
  };

  const handleSave = async () => {
    if (editing === "new") {
      await base44.entities.Service.create(form);
      toast.success("Service added!");
    } else {
      await base44.entities.Service.update(editing, form);
      toast.success("Service updated!");
    }
    setEditing(null);
    onSaved?.();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    await base44.entities.Service.delete(id);
    toast.success("Service deleted!");
    onSaved?.();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">Manage Services</h2>
        <Button onClick={startNew} className="bg-[#B8861B] hover:bg-[#D4A832] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-display font-semibold text-gray-900 mb-4">{editing === "new" ? "New Service" : "Edit Service"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-700">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="brow">Brow</SelectItem>
                  <SelectItem value="lash">Lash</SelectItem>
                  <SelectItem value="wax">Wax</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-700">Duration</Label>
              <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 30 min" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Price</Label>
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. $40" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="mt-1" />
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-body font-medium text-gray-500">#</th>
              <th className="text-left px-4 py-3 font-body font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 font-body font-medium text-gray-500 hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-body font-medium text-gray-500">Duration</th>
              <th className="text-left px-4 py-3 font-body font-medium text-gray-500">Price</th>
              <th className="text-right px-4 py-3 font-body font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{s.sort_order}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-gray-500 capitalize hidden sm:table-cell">{s.category}</td>
                <td className="px-4 py-3 text-gray-500">{s.duration}</td>
                <td className="px-4 py-3 font-semibold text-[#B8861B]">{s.price}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(s)} className="text-gray-400 hover:text-[#B8861B] mr-2">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}