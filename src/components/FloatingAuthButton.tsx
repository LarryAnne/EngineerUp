import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function FloatingAuthButton() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading || user) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2 min-w-[180px]"
          >
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-lg text-gray-900 dark:text-white text-sm font-medium hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-white/30 shadow-lg text-white text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Create account
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Sign in or sign up"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 pl-4 pr-5 py-3 rounded-full backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.25)] text-gray-900 dark:text-white font-medium overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-70 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="w-4 h-4 relative z-10 text-amber-500" />
        <span className="relative z-10 text-sm">Join EngineerUp</span>
        <span className="absolute -inset-px rounded-full ring-1 ring-white/40 dark:ring-white/20 pointer-events-none" />
      </motion.button>
    </div>
  );
}
