import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function ContactForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      user_id: user?.id ?? null,
      name: form.name,
      email: form.email,
      message: form.message,
    });
    setSending(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Message sent! We'll get back to you.");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-3">
      <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
      <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
      <textarea required rows={4} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
      <button type="submit" disabled={sending}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
        <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
