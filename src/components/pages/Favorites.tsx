import { motion } from 'motion/react';
import { Heart, BookmarkX, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { QuoteCard } from '@/components/QuoteCard';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getFavoriteQuotes } from '@/services/content';

export function Favorites() {
  const { favorites } = useApp();

  const { data: favoriteQuotes = [], isLoading } = useQuery({
    queryKey: ['favorite-quotes', favorites],
    queryFn: () => getFavoriteQuotes(favorites),
    networkMode: 'always',
    refetchInterval: 30_000,
    staleTime: 30_000,
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-600 dark:text-red-400 fill-current" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Saved Quotes
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your collection of motivation and inspiration
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : favoriteQuotes.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {favoriteQuotes.length} {favoriteQuotes.length === 1 ? 'quote' : 'quotes'} saved
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteQuotes.map((quote, index) => (
                <QuoteCard key={quote.id} quote={quote} index={index} />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700"
          >
            <BookmarkX className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              No Saved Quotes Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start building your collection of inspiration. Save quotes that resonate with you
              and come back to them whenever you need motivation.
            </p>
            <Link
              to="/quotes"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Quotes
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
