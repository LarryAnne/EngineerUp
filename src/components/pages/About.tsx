import { motion } from 'motion/react';
import { BookOpen, Heart, Target, Users, Mail, Phone } from 'lucide-react';
import larryPic from '@/assets/IMG.jpeg';
import joshuaPic from '@/assets/Joshua.jpg';
import { Reviews } from '@/components/Reviews';
import { ContactForm } from '@/components/ContactForm';

export function About() {
  const developers = [
    {
      name: 'Larry Anne',
      role: 'Junior React Developer',
      image: larryPic,
      // image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80',
      phone: '+237 650 204 277',
      email: 'larrybache0@engineerup.cm'
    },
    {
      name: 'Menang Jedkings',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
      phone: '+237 676 910 508',
      email: 'menang.jedkings@engineerup.cm'
    },
    {
      name: 'Orock Joshua',
      role: 'Junior JavaScript Developer',
      image: joshuaPic,
      // image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      phone: '+237 345 678 901',
      email: 'orock.joshua@engineerup.cm'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About EngineerUp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built by students, for students. We understand your struggle because we've lived it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-100 mb-4 leading-relaxed">
              EngineerUp was born from a simple observation: Cameroonian engineering students face
              unique challenges—financial stress, power outages, limited resources, overwhelming coursework,
              and the pressure of family expectations.
            </p>
            <p className="text-lg text-gray-100 leading-relaxed">
              We created this platform to provide realistic, practical motivation that acknowledges these
              struggles without offering empty platitudes. Every quote, story, and resource is designed
              to help you build consistency, resilience, and ultimately, success.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: BookOpen,
              title: '80+ Quotes',
              description: 'Contextual motivation for every struggle',
              color: 'blue'
            },
            {
              icon: Heart,
              title: '12+ Stories',
              description: 'Real student journeys of failure and success',
              color: 'red'
            },
            {
              icon: Target,
              title: 'Daily Challenges',
              description: 'Build discipline through small actions',
              color: 'green'
            },
            {
              icon: Users,
              title: 'Course Support',
              description: 'Tips and resources for every subject',
              color: 'purple'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-auto object-fit"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                    {dev.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                    {dev.role}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{dev.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{dev.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Why We Built This
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              We've all been there—staring at code that won't compile at 3 AM, failing exams despite
              studying, feeling like we're the only ones struggling while everyone else seems to get it.
            </p>
            <p>
              But here's what we learned: everyone struggles. The successful ones just keep showing up.
              They ask for help. They try again after failing. They build systems and habits instead of
              relying on motivation alone.
            </p>
            <p>
              EngineerUp is our attempt to give current students what we wish we had—realistic motivation,
              practical advice, and a reminder that the struggle is temporary but the degree is permanent.
            </p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">
              Keep going. Your future self will thank you.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Reviews />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Questions or Feedback?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We'd love to hear from you. Send us a message below.
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
