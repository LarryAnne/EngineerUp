// Public reading cache only: never store sessions, credentials or proof uploads here.
const PREFIX = 'engineerup:content:v1:';
const memory = new Map<string, unknown>();

export function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.localStorage.getItem(PREFIX + key);
    if (saved) return JSON.parse(saved) as T;
  } catch { /* unavailable storage or invalid JSON */ }
  return (memory.get(key) as T | undefined) ?? fallback;
}

export function writeLocal<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  memory.set(key, value);
  try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); }
  catch { /* restricted storage or quota: retain the in-memory backup */ }
}

export async function cachedRead<T>(
  key: string,
  live: (signal: AbortSignal) => Promise<T>,
  fallback: T,
  timeoutMs = 4000,
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error('Content temporarily unavailable'));
      }, timeoutMs);
    });
    const value = await Promise.race([live(controller.signal), timeout]);
    writeLocal(key, value);
    return value;
  } catch {
    return readLocal(key, fallback);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function rememberViewed(type: string, userId: string, id: number) {
  const key = `viewed:${type}:${userId}`;
  const ids = readLocal<number[]>(key, []);
  if (!ids.includes(id)) writeLocal(key, [...ids, id]);
}

export function localViewed(type: string, userId: string | null): number[] {
  return userId ? readLocal(`viewed:${type}:${userId}`, []) : [];
}