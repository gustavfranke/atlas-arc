import React, { useState, useRef } from "react";
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
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const coverInputRef = useRef(null);
  const mediaInputRef = useRef(null);

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
    setForm({ title: "", category: "", location: "", description: "", deliverables: [], cover_image: "", video_url: "", media_urls: [], order: projects.length });
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

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, cover_image: file_url }));
    setUploadingCover(false);
    e.target.value = "";
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

            {/* Cover Image Upload */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cover Image</p>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current && coverInputRef.current.click()}
                  disabled={uploadingCover}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", background: uploadingCover ? "#f3f4f6" : "white", color: uploadingCover ? "#9ca3af" : "#374151", cursor: uploadingCover ? "not-allowed" : "pointer" }}
                >
                  {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingCover ? "Uploading..." : "Upload from device"}
                </button>
                {form.cover_image && (
                  <div style={{ position: "relative" }}>
                    <img src={form.cover_image} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb" }} />
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, cover_image: "" }))}
                      style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "none", cursor: "pointer" }}
                    >×</button>
                  </div>
                )}
              </div>
            </div>

            {/* Media Gallery Upload */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Gallery Images</p>
              {(form.media_urls || []).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  {(form.media_urls || []).map((url, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img src={url} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      <button
                        type="button"
                        onClick={() => removeMediaUrl(i)}
                        style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "none", cursor: "pointer" }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
              <input
                ref={mediaInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleMediaUpload}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => mediaInputRef.current && mediaInputRef.current.click()}
                disabled={uploadingMedia}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", background: uploadingMedia ? "#f3f4f6" : "white", color: uploadingMedia ? "#9ca3af" : "#374151", cursor: uploadingMedia ? "not-allowed" : "pointer" }}
              >
                {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploadingMedia ? "Uploading..." : "Upload gallery images"}
              </button>
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