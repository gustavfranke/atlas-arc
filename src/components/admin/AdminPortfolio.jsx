import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, X, GripVertical, Upload, Loader2 } from "lucide-react";

const categories = ["Hotels & Lodges", "Retreats & Wellness", "Lifestyle Brands", "Short Form Reels", "Photography"];

export default function AdminPortfolio() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: () => base44.entities.PortfolioProject.list("order", 50),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.PortfolioProject.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.PortfolioProject.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.PortfolioProject.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] }),
  });

  const resetForm = () => { setEditing(null); setForm({}); };

  const startEdit = (project) => {
    setEditing(project.id);
    setForm({ ...project });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ title: "", category: "", location: "", description: "", deliverables: [], cover_image: "", video_url: "", order: projects.length });
  };

  const handleSave = () => {
    const data = { ...form };
    if (typeof data.deliverables === "string") {
      data.deliverables = data.deliverables.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (editing === "new") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: editing, data });
    }
  };

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, cover_image: file_url }));
    setUploadingCover(false);
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingMedia(true);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    setForm(prev => ({ ...prev, media_urls: [...(prev.media_urls || []), ...urls] }));
    setUploadingMedia(false);
    e.target.value = "";
  };

  const removeMediaUrl = (index) => {
    setForm(prev => ({ ...prev, media_urls: prev.media_urls.filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Portfolio Projects</h2>
        <Button onClick={startNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
      </div>

      {editing && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center justify-between">
              {editing === "new" ? "New Project" : "Edit Project"}
              <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Select value={form.category || ""} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Location" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Input placeholder="Video URL (YouTube/Vimeo)" value={form.video_url || ""} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            <Input placeholder="Deliverables (comma separated)" value={Array.isArray(form.deliverables) ? form.deliverables.join(", ") : form.deliverables || ""} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} />
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
              </div>
              {form.cover_image && <img src={form.cover_image} alt="" className="w-16 h-16 object-cover rounded" />}
            </div>
            <Input type="number" placeholder="Order" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
            <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
              <Save className="w-4 h-4 mr-1" /> {editing === "new" ? "Create" : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 text-sm">No portfolio projects yet. Click "Add Project" to create one.</p>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
              <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
              {p.cover_image && <img src={p.cover_image} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.title}</p>
                <p className="text-xs text-gray-500">{p.category} · {p.location}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(p)}>Edit</Button>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteMutation.mutate(p.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}