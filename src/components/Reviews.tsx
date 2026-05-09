import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Review {
  id: string;
  user_id: string | null;
  rating: number;
  comment: string | null;
  author_name: string | null;
  created_at: string;
}

export function Reviews() {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    setReviews((data as Review[]) || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be 1-5");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      rating,
      comment,
      author_name: profile?.username || user.email,
    });
    setSubmitting(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Thanks for your review!");
      setComment("");
      setRating(5);
      load();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What students say</h2>
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex items-center gap-2">
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" onClick={() => setRating(n)}>
              <Star className={`w-6 h-6 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </button>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required
          placeholder="Share your experience..." rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <button type="submit" disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {submitting ? "Submitting..." : "Submit review"}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            {r.comment && <p className="text-gray-700 dark:text-gray-300">{r.comment}</p>}
            <p className="text-xs text-gray-500 mt-2">{r.author_name || "Anonymous"} · {new Date(r.created_at).toLocaleDateString()}</p>
          </motion.div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500">Be the first to leave a review.</p>}
      </div>
    </div>
  );
}
