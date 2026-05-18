import { Link } from '@tanstack/react-router';
import { BookOpen, Mail, Phone } from 'lucide-react';


export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold">EngineerUp</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering Cameroonian software engineering students with realistic motivation,
              practical guidance, and a supportive community to succeed in their academic journey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Course Support
                </Link>
              </li>
              <li>
                <Link to="/challenge" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Daily Challenge
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {[
                { name: 'Larry Anne', phone: '+237 650 204 277', wa: '237650204277' },
                { name: 'Menang Jedkings', phone: '+237 676 910 508', wa: '237676910508' },
                { name: 'Orock Joshua', phone: '+237 677 155 516', wa: '237677155516' },
              ].map((c) => (
                <li key={c.wa} className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <a
                    href={`https://wa.me/${c.wa}?text=${encodeURIComponent("Hi " + c.name + ", I'm reaching out from EngineerUp.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">{c.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{c.phone}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 EngineerUp. Built by African students, for African students. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
