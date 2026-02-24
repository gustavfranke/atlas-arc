import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function TestimonialForm({ initial, onSave }) {
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const companyRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...initial,
      quote: quoteRef.current?.value || "",
      author: authorRef.current?.value || "",
      company: companyRef.current?.value || "",
    });
    setSaving(false);
  };

  const fieldStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  };

  return (
    <div className="space-y-4">
      <textarea
        ref={quoteRef}
        placeholder="Quote"
        defaultValue={initial?.quote || ""}
        rows={3}
        style={{ ...fieldStyle, resize: "vertical" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <input
          ref={authorRef}
          placeholder="Author"
          defaultValue={initial?.author || ""}
          style={fieldStyle}
        />
        <input
          ref={companyRef}
          placeholder="Company"
          defaultValue={initial?.company || ""}
          style={fieldStyle}
        />
      </div>
      <Button onClick={handleSave} disabled={saving}>
        <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}