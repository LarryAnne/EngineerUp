import { motion } from 'motion/react';
import { Zap, ArrowRight, TrendingUp, Target, BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function Motivation() {
  const [showMessage, setShowMessage] = useState(false);

  const motivationalMessages = [
    {
      title: "You're Not Alone",
      message: "Every successful engineer struggled at first. The difference? They didn't quit. Your struggles are temporary. Your degree is permanent. Keep going.",
      action: "Study for 5 minutes right now"
    },
    {
      title: "This Feeling Will Pass",
      message: "The frustration you feel today will become the foundation of your expertise tomorrow. Every line of code you don't understand now is one step closer to mastery.",
      action: "Review one concept"
    },
    {
      title: "Your Family Believes in You",
      message: "Think about why you started. The sacrifices made to get you here. The expectations, yes—but also the faith they have in you. Prove them right.",
      action: "Call someone who supports you"
    },
    {
      title: "Progress Over Perfection",
      message: "You don't need to be the best in class. You just need to be better than you were yesterday. Small improvements compound into massive results.",
      action: "Complete one small task"
    },
    {
      title: "The Struggle Is the Training",
      message: "Companies don't hire people who found it easy. They hire people who persisted when it was hard. Your struggle is building the resilience you'll need in your career.",
      action: "Practice one problem"
    }
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Need a Boost?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Feeling overwhelmed? Want to quit? Click the button below for instant motivation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 rounded-2xl p-12 text-white text-center mb-12"
        >
          <Zap className="w-16 h-16 mx-auto mb-6 animate-pulse" />

          {!showMessage ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                I Feel Like Quitting
              </h2>
              <p className="text-lg text-gray-100 mb-8">
                When the pressure feels too much, click here
              </p>
              <button
                onClick={() => setShowMessage(true)}
                className="px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Motivation Now
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {randomMessage.title}
              </h2>
              <p className="text-lg text-gray-100 mb-8 leading-relaxed">
                {randomMessage.message}
              </p>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-sm mb-3">NEXT ACTION:</p>
                <p className="text-xl font-semibold">{randomMessage.action}</p>
              </div>
              <button
                onClick={() => setShowMessage(false)}
                className="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Get Another Message
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Track Progress',
              description: 'See how far you\'ve come',
              link: '/dashboard',
              color: 'blue'
            },
            {
              icon: Target,
              title: 'Take Challenge',
              description: 'Do something productive now',
              link: '/challenge',
              color: 'green'
            },
            {
              icon: BookOpen,
              title: 'Read Stories',
              description: 'Get inspired by others',
              link: '/stories',
              color: 'purple'
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={card.link}
                className="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <div className={`w-12 h-12 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center justify-between">
                  {card.title}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Remember This
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>✓ Feeling stuck is not the same as being incapable</p>
            <p>✓ Every expert was once a confused beginner</p>
            <p>✓ Your value isn't measured by one exam score</p>
            <p>✓ Consistency beats talent when talent doesn't work hard</p>
            <p>✓ You've overcome challenges before—you'll overcome this too</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
