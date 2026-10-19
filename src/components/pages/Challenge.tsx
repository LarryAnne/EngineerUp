import { motion } from 'motion/react';
import { RefreshCw, CheckCircle, Target, Calendar, Upload, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import { useTodayTask } from '@/hooks/useContent';
import { markTaskViewed } from '@/services/content';

export function Challenge() {
  const { data: dailyChallenge, isLoading } = useTodayTask();
  const { markTaskComplete, completedTasks } = useApp();
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user && dailyChallenge) void markTaskViewed(user.id, dailyChallenge.id);
  }, [user, dailyChallenge]);

  const isCompleted = dailyChallenge ? completedTasks.includes(dailyChallenge.id) : false;

  const difficultyColors = {
    Easy: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    Medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    Hard: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  } as const;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !dailyChallenge) return;
    setUploading(true);
    const path = `${user.id}/${dailyChallenge.id}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('task-proofs').upload(path, file, {
      upsert: false,
    });
    if (error) {
      toast.error('Upload failed: ' + error.message);
    } else {
      setProofUrl(path);
      toast.success('Proof uploaded');
    }
    setUploading(false);
  };

  const handleComplete = async () => {
    if (!dailyChallenge || isCompleted) return;
    if (!user) {
      toast.error('Please sign in to complete challenges');
      return;
    }
    if (!proofUrl) {
      toast.error('Please upload a proof image first');
      return;
    }
    try {
      await markTaskComplete(dailyChallenge.id, proofUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Your task could not be saved. Please try again when the service returns.');
      return;
    }
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (isLoading || !dailyChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const canComplete = !!user && !!proofUrl && !uploading;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <Calendar className="w-5 h-5" />
            <span>{date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Today's Challenge
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Small, consistent actions lead to massive results. Start now.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dailyChallenge.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${difficultyColors[dailyChallenge.difficulty]}`}
                  >
                    {dailyChallenge.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {dailyChallenge.category}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    ~{dailyChallenge.minutes} min
                  </span>
                </div>
              </div>
            </div>
            {isCompleted && (
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
            )}
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {dailyChallenge.description}
          </p>

          {!isCompleted ? (
            <div className="space-y-3">
              {user ? (
                <label
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    proofUrl
                      ? 'border-green-500 text-green-700 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span>
                    {uploading
                      ? 'Uploading...'
                      : proofUrl
                      ? 'Proof uploaded ✓ (tap to replace)'
                      : 'Upload proof image (required)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                </label>
              ) : (
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
                    Sign in
                  </Link>{' '}
                  to upload proof and track challenges.
                </p>
              )}
              <button
                onClick={handleComplete}
                disabled={!canComplete}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark as Complete</span>
              </button>
              {user && !proofUrl && (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Upload a proof image to enable completion.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200 text-center">
                🎉 Challenge completed! Great work! Come back tomorrow for a new challenge.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white"
        >
          <div className="flex items-start gap-4">
            <RefreshCw className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Why Daily Challenges?</h3>
              <p className="text-gray-100 mb-4">
                Consistency beats intensity. Doing something small every single day builds
                habits, discipline, and momentum.
              </p>
              <ul className="space-y-2 text-gray-100">
                <li>• Builds discipline through repetition</li>
                <li>• Makes progress visible and tangible</li>
                <li>• Reduces overwhelm by focusing on one task</li>
                <li>• Creates momentum that carries into other areas</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-8xl"
          >
            🎉
          </motion.div>
        </div>
      )}
    </div>
  );
}
