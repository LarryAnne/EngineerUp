import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { QuoteCard } from '@/components/QuoteCard';
import { useQuoteFeed } from '@/hooks/useContent';

const CATEGORIES = ['All', 'Discipline', 'Failure', 'Exams', 'Consistency', 'Stress', 'Family', 'Focus', 'Resilience', 'Burnout', 'Hope'];

export function Quotes() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: quotes = [], isLoading } = useQuoteFeed(60);

  const filteredQuotes = useMemo(
    () =>
      quotes.filter((quote) => {
        const matchesCategory =
          selectedCategory === 'All' || quote.category.includes(selectedCategory);
        const matchesSearch =
          quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quote.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [quotes, selectedCategory, searchQuery],
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Motivational Quotes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Fresh, AI-curated quotes for African students. New ones appear as you read.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
        )}

        {!isLoading && filteredQuotes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No quotes found. New ones are being generated — try again in a moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
