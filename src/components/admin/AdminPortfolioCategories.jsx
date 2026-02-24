import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, GripVertical, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_CATEGORIES = ["Hotels & Lodges", "Retreats & Wellness", "Lifestyle Brands", "Short Form Reels", "Photography"];

async function fetchCategories() {
  const records = await base44.entities.SiteContent.filter({ section_key: "portfolio_categories" });
  if (records.length > 0) return records[0];
  return null;
}

export default function AdminPortfolioCategories() {
  const queryClient = useQueryClient();
  const [newCat, setNewCat] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: record } = useQuery({
    queryKey: ["portfolio-categories-admin"],
    queryFn: fetchCategories,
  });

  const categories = record?.content?.categories ?? DEFAULT_CATEGORIES;

  const save = async (updated) => {
    setSaving(true);
    if (record?.id) {
      await base44.entities.SiteContent.update(record.id, { content: { categories: updated } });
    } else {
      await base44.entities.SiteContent.create({ section_key: "portfolio_categories", content: { categories: updated } });
    }
    await queryClient.invalidateQueries({ queryKey: ["portfolio-categories-admin"] });
    await queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
    setSaving(false);
  };

  const addCategory = async () => {
    const trimmed = newCat.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setNewCat("");
    await save([...categories, trimmed]);
  };

  const removeCategory = async (cat) => {
    await save(categories.filter((c) => c !== cat));
  };

  return (
    <div style={{ marginBottom: "28px", padding: "16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Tag style={{ width: 16, height: 16, color: "#6b7280" }} />
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#374151" }}>Portfolio Categories</span>
        {saving && <span style={{ fontSize: "12px", color: "#9ca3af" }}>Saving...</span>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        {categories.map((cat) => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", background: "#fff", border: "1px solid #d1d5db", borderRadius: "20px", fontSize: "13px" }}>
            <span>{cat}</span>
            <button
              onClick={() => removeCategory(cat)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", lineHeight: 1, padding: "0 2px", fontSize: "16px" }}
              title="Remove"
            >×</button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          placeholder="New category name..."
          style={{ flex: 1, padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "13px", fontFamily: "inherit" }}
        />
        <Button size="sm" onClick={addCategory} disabled={!newCat.trim() || saving}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
}