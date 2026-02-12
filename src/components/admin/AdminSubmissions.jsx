import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export default function AdminSubmissions() {
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: () => base44.entities.ContactSubmission.list("-created_date", 50),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ContactSubmission.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-submissions"] }),
  });

  if (isLoading) return <p className="text-gray-500 text-sm">Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Contact Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500 text-sm">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className="p-5 bg-white rounded-lg border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{s.name}</p>
                  {s.brand_name && <p className="text-sm text-gray-500">{s.brand_name}</p>}
                </div>
                <Select value={s.status || "new"} onValueChange={(v) => updateMutation.mutate({ id: s.id, data: { status: v } })}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {s.email}</span>
                {s.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {s.phone}</span>}
                {s.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</span>}
                {s.shoot_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {s.shoot_date}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.service_needed && <Badge variant="secondary">{s.service_needed}</Badge>}
                {s.budget_range && <Badge variant="outline">{s.budget_range}</Badge>}
              </div>
              {s.message && <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{s.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}