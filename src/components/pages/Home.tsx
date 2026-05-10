import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { getTodayStory } from '@/data/stories';
const todayStory = getTodayStory();
import { ArrowRight, BookOpen, TrendingUp, Users, Zap, Target, Award } from 'lucide-react';
import { quotes } from '@/data/quotes';
import { QuoteCard } from '@/components/QuoteCard';

export function Home() {
  const featuredQuotes = quotes.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white h-screen min-h-[560px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80")`,
      }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Engineering is Hard.
              <br />
              <span className="text-yellow-300">Staying Motivated Shouldn't Be.</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-6 sm:mb-8">
              Built for Cameroonian Year One software engineering students who are struggling.
              Real stories, practical advice, and daily motivation to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/quotes"
                className="w-full sm:w-auto px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to="/stories"
                className="w-full sm:w-auto px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Read Student Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Why EngineerUp?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We understand your struggles because we've been there too.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: 'Real Stories',
              description: 'Read authentic stories from students who failed, struggled, and eventually succeeded.',
              color: 'blue'
            },
            {
              icon: Target,
              title: 'Daily Challenges',
              description: 'Small, achievable tasks that build discipline and consistency over time.',
              color: 'purple'
            },
            {
              icon: TrendingUp,
              title: 'Track Progress',
              description: 'Monitor your study streak, completed tasks, and academic growth journey.',
              color: 'pink'
            },
            {
              icon: Zap,
              title: 'Course Support',
              description: 'Get practical tips, common mistakes, and resources for every subject.',
              color: 'green'
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Connect with fellow students facing the same challenges and victories.',
              color: 'orange'
            },
            {
              icon: Award,
              title: 'Motivation Mode',
              description: 'Feeling like quitting? Get instant, powerful motivation when you need it most.',
              color: 'red'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
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
              Featured Motivation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start your day with powerful, relevant quotes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/quotes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>View All Quotes</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Cameroonian students who are building consistency,
              resilience, and success one day at a time.
            </p>
            <Link
              to="/challenge"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span>Take Today's Challenge</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
