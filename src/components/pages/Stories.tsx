import { motion } from 'motion/react';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { StoryReader } from '@/components/StoryReader';
import { useStoryFeed, useTodayStory } from '@/hooks/useContent';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { markStoryViewed } from '@/services/content';

export function Stories() {
  const { user } = useAuth();
  const { data: todayStory, isLoading } = useTodayStory();
  const { data: feed = [] } = useStoryFeed(12);

  // Mark the surfaced story as viewed so the user doesn't see it again.
  useEffect(() => {
    if (user && todayStory) {
      void markStoryViewed(user.id, todayStory.id);
    }
  }, [user, todayStory]);

  const date = new Date();
  const formattedDate = date
    .toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    .toUpperCase();

  if (isLoading || !todayStory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${todayStory.image}')`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="w-5 h-5" />
              <p className="text-sm tracking-wide">{formattedDate}</p>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Your Fuel For Academic Fire
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Every day, a real story of struggle, persistence, and triumph from
              African students just like you.
            </p>

            <a
              href="#today-story"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <span>Read Today's Story</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="today-story" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm mb-4">
              {todayStory.category}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              {todayStory.title}
            </h2>
            {todayStory.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-400">{todayStory.subtitle}</p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              ~{todayStory.read_minutes} min read
            </p>
          </div>

          <div className="mb-8">
            <StoryReader title={todayStory.title} text={todayStory.content} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {todayStory.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              More Inspiring Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Read about other students who overcame their challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feed
              .filter((s) => s.id !== todayStory.id)
              .slice(0, 6)
              .map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-blue-600/90 text-white text-xs rounded-full">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {story.title}
                    </h3>
                    {story.subtitle && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{story.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-3">
                      {story.content.substring(0, 150)}...
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Story Could Be Next</h2>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Every success story starts with a struggle. What matters is what you do next.
            </p>
            <Link
              to="/challenge"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
