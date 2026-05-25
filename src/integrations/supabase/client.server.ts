import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://vgrahupbmefvithfvpdq.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
