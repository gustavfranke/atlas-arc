import React, { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, X, Quote } from "lucide-react";

function TestimonialForm({ initial, onSave, onCancel, isPending }) {
  const [quote, setQuote] = useState(initial.quote || "");
  const [author, setAuthor] = useState(initial.author || "");
  const [company, setCompany] = useState(initial.company || "");

  const handleSave = () => {
    onSave({ ...initial, quote, author, company });
  };

  return (
    <div className="space-y-4">
      <textarea
        placeholder="Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        rows={3}
        style={{
          width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb",
          borderRadius: "6px", fontSize: "14px", resize: "vertical",
          outline: "none", fontFamily: "inherit", boxSizing: "border-box"
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            padding: "8px 12px", border: "1px solid #e5e7eb",
            borderRadius: "6px", fontSize: "14px", outline: "none", fontFamily: "inherit"
          }}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            padding: "8px 12px", border: "1px solid #e5e7eb",
            borderRadius: "6px", fontSize: "14px", outline: "none", fontFamily: "inherit"
          }}
        />
      </div>
      <Button onClick={handleSave} disabled={isPending}>
        <Save className="w-4 h-4 mr-1" /> Save
      </Button>
    </div>
  );
}

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const { data: testimonials = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => base44.entities.Testimonial.list("order", 50),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Testimonial.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }); setEditing(null); setEditTarget(null); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Testimonial.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }); setEditing(null); setEditTarget(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Testimonial.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  const handleSave = useCallback((formData) => {
    if (editing === "new") {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: editing, data: formData });
    }
  }, [editing]);

  const startNew = () => {
    setEditTarget({ quote: "", author: "", company: "", order: testimonials.length });
    setEditing("new");
  };

  const startEdit = (t) => {
    setEditTarget({ ...t });
    setEditing(t.id);
  };

  const cancel = () => { setEditing(null); setEditTarget(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Testimonials</h2>
        <Button onClick={startNew} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      {editing && editTarget && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center justify-between">
              {editing === "new" ? "New Testimonial" : "Edit Testimonial"}
              <Button variant="ghost" size="icon" onClick={cancel}><X className="w-4 h-4" /></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TestimonialForm
              key={editing}
              initial={editTarget}
              onSave={handleSave}
              onCancel={cancel}
              isPending={createMutation.isPending || updateMutation.isPending}
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border">
            <Quote className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-700 italic">"{t.quote}"</p>
              <p className="text-xs text-gray-500 mt-1">— {t.author}{t.company ? `, ${t.company}` : ""}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => startEdit(t)}>Edit</Button>
              <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteMutation.mutate(t.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}