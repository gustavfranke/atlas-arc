import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminTestimonials from "@/components/admin/AdminTestimonials.jsx";
import AdminSubmissions from "@/components/admin/AdminSubmissions";
import AdminMedia from "@/components/admin/AdminMedia";
import { Layers, MessageSquare, Inbox, ExternalLink, ImageIcon } from "lucide-react";

const tabs = [
  { key: "portfolio", label: "Portfolio", icon: Layers },
  { key: "media", label: "Media", icon: ImageIcon },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  { key: "submissions", label: "Submissions", icon: Inbox },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin("/Admin");
        return;
      }
      const me = await base44.auth.me();
      if (me.role !== "admin") {
        window.location.href = "/";
        return;
      }
      setUser(me);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Atlas & Arc — Admin</h1>
          <p className="text-xs text-gray-500">Manage your website content</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/Admin" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ExternalLink className="w-3 h-3" /> Admin Page
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ExternalLink className="w-3 h-3" /> View Site
          </a>
          <button onClick={() => base44.auth.logout()} className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 border w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "portfolio" && <AdminPortfolio />}
        {activeTab === "media" && <AdminMedia />}
        {activeTab === "testimonials" && <AdminTestimonials />}
        {activeTab === "submissions" && <AdminSubmissions />}
      </div>
    </div>
  );
}