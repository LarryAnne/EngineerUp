import { motion } from 'motion/react';
import { TrendingUp, Award, CheckCircle, Flame, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { challenges } from '@/data/challenges';
import { Progress } from '@/components/ui/progress';

export function Dashboard() {
  const { streak, completedTasks, favorites } = useApp();

  const completedChallenges = challenges.filter(c => completedTasks.includes(c.id));
  const completionRate = Math.round((completedTasks.length / challenges.length) * 100);

  const stats = [
    {
      label: 'Study Streak',
      value: `${streak} days`,
      icon: Flame,
      color: 'orange',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      label: 'Completed Tasks',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Saved Quotes',
      value: favorites.length,
      icon: Award,
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Target,
      color: 'purple',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white">
            Progress Dashboard
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
            Track your journey and celebrate your wins
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="text-xl sm:text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Overall Progress
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Challenge Completion</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Study Consistency</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {streak >= 7 ? 'Excellent' : streak >= 3 ? 'Good' : 'Getting Started'}
                  </span>
                </div>
                <Progress value={Math.min(streak * 14, 100)} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Engagement Level</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {favorites.length >= 10 ? 'High' : favorites.length >= 5 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <Progress value={Math.min(favorites.length * 5, 100)} className="h-2" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Streak Milestones
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { days: 3, label: 'Getting Started', achieved: streak >= 3 },
                { days: 7, label: 'One Week', achieved: streak >= 7 },
                { days: 14, label: 'Two Weeks', achieved: streak >= 14 },
                { days: 30, label: 'One Month', achieved: streak >= 30 },
                { days: 60, label: 'Two Months', achieved: streak >= 60 },
                { days: 90, label: 'Three Months', achieved: streak >= 90 }
              ].map((milestone) => (
                <div
                  key={milestone.days}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    milestone.achieved
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {milestone.achieved ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                    <span className={milestone.achieved ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'}>
                      {milestone.label}
                    </span>
                  </div>
                  <span className={`text-sm ${milestone.achieved ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-500'}`}>
                    {milestone.days} days
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {completedChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Completed Challenges
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedChallenges.slice(0, 6).map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {challenge.title}
                    </h3>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {challenge.description.substring(0, 80)}...
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                      {challenge.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {completedChallenges.length > 6 && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                And {completedChallenges.length - 6} more completed challenges
              </p>
            )}
          </motion.div>
        )}

        {streak === 0 && completedTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center border border-blue-200 dark:border-blue-800"
          >
            <Target className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Start Your Journey Today
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete your first daily challenge to begin building your streak and tracking your progress.
            </p>
            <a
              href="/challenge"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Today's Challenge
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
