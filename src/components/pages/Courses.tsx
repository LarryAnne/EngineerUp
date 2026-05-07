import { motion } from 'motion/react';
import { Code, Calculator, Zap, Network, Box, Database, Cpu, Binary, ExternalLink } from 'lucide-react';
import { courses } from '@/data/courses';

const iconMap: Record<string, any> = {
  Code, Calculator, Zap, Network, Box, Database, Cpu, Binary
};

export function Courses() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Course Support Hub
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Navigate your Year One courses with practical tips, common mistakes to avoid,
            and curated resources to help you succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => {
            const Icon = iconMap[course.icon] || Code;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400" />
                      Common Mistakes
                    </h3>
                    <ul className="space-y-2">
                      {course.commonMistakes.map((mistake, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-4">
                          • {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                      Quick Tips
                    </h3>
                    <ul className="space-y-2">
                      {course.quickTips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-4">
                          ✓ {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      Recommended Resources
                    </h3>
                    <ul className="space-y-2">
                      {course.resources.map((resource, i) => (
                        <li key={i} className="text-sm text-blue-600 dark:text-blue-400 pl-4 flex items-center gap-2">
                          <ExternalLink className="w-3 h-3"/>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Still Struggling?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Remember: Understanding doesn't come all at once. It builds with consistent effort,
            asking questions, and refusing to give up.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
