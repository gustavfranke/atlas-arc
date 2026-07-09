import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";

// Inline isolated form — no shared state, no re-renders from parent
function TestimonialForm({ initial, onSave, onCancel }) {
  const quoteRef = React.useRef(null);
  const authorRef = React.useRef(null);
  const companyRef = React.useRef(null);
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...initial,
      quote: quoteRef.current?.value ?? "",
      author: authorRef.current?.value ?? "",
      company: companyRef.current?.value ?? "",
    });
    setSaving(false);
  };

  return (
    <div style={{ padding: "16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontWeight: 600, fontSize: "14px" }}>{initial?.id ? "Edit Testimonial" : "New Testimonial"}</span>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>×</button>
      </div>
      <textarea
        ref={quoteRef}
        defaultValue={initial?.quote ?? ""}
        placeholder="Quote"
        rows={3}
        style={{ display: "block", width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", marginBottom: "12px", boxSizing: "border-box" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <input ref={authorRef} defaultValue={initial?.author ?? ""} placeholder="Author" style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit" }} />
        <input ref={companyRef} defaultValue={initial?.company ?? ""} placeholder="Company" style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit" }} />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        style={{ background: "#1f2937", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "13px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null); // null | "new" | testimonial object

  const { data: testimonials = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => base44.entities.Testimonial.list("order", 50),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleSave = async (formData) => {
    if (!formData.id) {
      await base44.entities.Testimonial.create(formData);
    } else {
      await base44.entities.Testimonial.update(formData.id, formData);
    }
    await queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await base44.entities.Testimonial.delete(id);
    queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Testimonials</h2>
        <Button size="sm" onClick={() => setEditing({ quote: "", author: "", company: "", order: testimonials.length })}>
          <Plus className="w-4 h-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      {editing && (
        <TestimonialForm
          key={editing.id ?? "new"}
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {testimonials.map((t) => (
          <div key={t.id} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", color: "#374151", fontStyle: "italic", margin: "0 0 4px 0" }}>"{t.quote}"</p>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{t.author}{t.company ? `, ${t.company}` : ""}</p>
            </div>
            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
              <Button variant="ghost" size="sm" onClick={() => setEditing(t)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} style={{ color: "#ef4444" }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}