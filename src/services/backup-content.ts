import { quotes } from '@/data/quotes';
import { stories } from '@/data/stories';
import { challenges } from '@/data/challenges';
import type { GQuote, GStory, GTask } from './content';

// Negative IDs distinguish bundled content from generated database rows.
export const backupQuotes: GQuote[] = quotes.map(q => ({
  ...q, id: -q.id, country: null, tone: null,
}));
export const backupStories: GStory[] = stories.map(s => ({
  ...s, id: -s.id, country: null, tone: null,
  read_minutes: Math.max(2, Math.round(s.content.split(/\s+/).length / 200)),
}));
export const backupTasks: GTask[] = challenges.map(c => ({
  ...c, id: -c.id, country: null,
  minutes: c.difficulty === 'Hard' ? 60 : c.difficulty === 'Medium' ? 45 : 30,
}));