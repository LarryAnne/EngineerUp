import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vgrahupbmefvithfvpdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ERfQ6rC77LE59TZf53CcxA_REB9dsJ-";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
