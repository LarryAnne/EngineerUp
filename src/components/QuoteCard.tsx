import { Heart, Copy, Share2, Check } from 'lucide-react';
import { Quote } from '../data/quotes';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuoteCardProps {
  quote: Quote;
  index?: number;
}

export function QuoteCard({ quote, index = 0 }: QuoteCardProps) {
  const { toggleFavorite, isFavorite } = useApp();
  const [copied, setCopied] = useState(false);
  const favorited = isFavorite(quote.id);

  const handleCopy = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Quote copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy quote');
    }
  };

  const handleShare = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={quote.image}
          alt={quote.author}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {quote.category.map(cat => (
              <span
                key={cat}
                className="px-2 py-1 bg-blue-600/90 text-white text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <blockquote className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
          "{quote.text}"
        </blockquote>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          — {quote.author}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(quote.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              favorited
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            <span className="text-sm">{favorited ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Copy quote"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Share quote"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
