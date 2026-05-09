import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Profile() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setCountry(profile.country || "");
      setContact(profile.contact || "");
    }
  }, [profile]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username, country, contact })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  };

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your profile</h1>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
            <p className="text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Country</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Contact</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={save} disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
