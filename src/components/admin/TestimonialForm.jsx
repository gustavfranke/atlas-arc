import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function TestimonialForm({ initial, onSave }) {
  const [quote, setQuote] = useState(initial?.quote || "");
  const [author, setAuthor] = useState(initial?.author || "");
  const [company, setCompany] = useState(initial?.company || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({ ...initial, quote, author, company });
    setSaving(false);
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
      <Button onClick={handleSave} disabled={saving}>
        <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}