import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const COUNTRIES = [
  "Cameroon", "Nigeria", "Ghana", "Kenya", "South Africa", "Senegal",
  "Ivory Coast", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Egypt",
  "Morocco", "Other",
];

export function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "Cameroon",
    contact: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(form.email, form.password, {
      username: form.username,
      country: form.country,
      contact: form.contact,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Check your email to confirm.");
    navigate({ to: "/login" });
  };

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Username" value={form.username} onChange={upd("username")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required type="email" placeholder="Email" value={form.email} onChange={upd("email")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required type="password" minLength={6} placeholder="Password (min 6 chars)" value={form.password} onChange={upd("password")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select value={form.country} onChange={upd("country")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Contact (optional)" value={form.contact} onChange={upd("contact")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
