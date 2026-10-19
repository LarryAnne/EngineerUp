import { useQuery } from "@tanstack/react-query";
import { cachedRead } from "@/lib/content-cache";
import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

interface Notification {
  id: string;
  title: string;
  body: string | null;
  country: string | null;
  created_at: string;
}

export function Notifications() {
  const { user, profile } = useAuth();
  const { data: items = [], isLoading: loading } = useQuery({
    queryKey: ['notifications', user?.id, profile?.country], enabled: !!user,
    networkMode: 'always', refetchInterval: 30_000,
    queryFn: () => cachedRead<Notification[]>(`notifications:${user?.id}:${profile?.country ?? ''}`, async signal => {
      const { data, error } = await supabase.from('notifications').select('*')
        .order('created_at', { ascending: false }).limit(50).abortSignal(signal);
      if (error) throw error;
      return ((data ?? []) as Notification[]).filter(n => !n.country || n.country === profile?.country);
    }, []),
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-4">Sign in to see your notifications.</p>
          <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((n, i) => (
              <motion.div key={n.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{n.title}</h3>
                {n.body && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{n.body}</p>}
                <p className="text-xs text-gray-400 mt-2">{new Date(n.created_at).toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
