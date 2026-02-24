import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Trash2, Copy, Check, ImageIcon, Loader2 } from "lucide-react";

export default function AdminMedia() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(null);
  const fileInputRef = useRef(null);

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["media-library"],
    queryFn: () => base44.entities.MediaLibrary.list("-created_date", 100),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.MediaLibrary.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media-library"] }),
  });

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.MediaLibrary.create({
        file_url,
        file_name: file.name,
        file_type: "image",
      });
    }
    queryClient.invalidateQueries({ queryKey: ["media-library"] });
    setUploading(false);
    e.target.value = "";
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Media Library</h2>
          <p className="text-sm text-gray-500 mt-0.5">{media.length} file{media.length !== 1 ? "s" : ""} uploaded</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all select-none ${uploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"}`}
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
      </div>

      {isLoading ? (
        <div className="text-sm text-gray-400 py-12 text-center">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No media uploaded yet.</p>
          <p className="text-gray-400 text-xs mt-1">Click "Upload Images" above to add files from your device.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={item.file_url}
                alt={item.file_name || "Media"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-xs text-center truncate w-full px-1">{item.file_name}</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyUrl(item.file_url, item.id)}
                    className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white transition-colors"
                    title="Copy URL"
                  >
                    {copied === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="p-1.5 bg-red-500/70 hover:bg-red-500 rounded text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}