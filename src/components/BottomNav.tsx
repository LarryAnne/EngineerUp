import { Link, useLocation } from '@tanstack/react-router';
import { Home, BookOpen, TrendingUp, Heart, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Progress', path: '/dashboard', icon: TrendingUp },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-between px-1 sm:px-2">
        {links.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-1 min-w-0 flex-col items-center gap-0.5 py-2 px-1 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] sm:text-xs leading-tight truncate max-w-full">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
