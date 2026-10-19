import { afterEach, describe, expect, test } from 'bun:test';
import { cachedRead, readLocal, writeLocal, rememberViewed, localViewed } from './content-cache.ts';

const saved = new Map();
const browser = { localStorage: { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) } };
Object.defineProperty(globalThis, 'window', { configurable: true, value: browser });
afterEach(() => saved.clear());

describe('content availability', () => {
  test('recent generated content persists and is used when live reads fail', async () => {
    await cachedRead('recent', async () => [{ id: 72, text: 'Generated content' }], []);
    expect(saved.has('engineerup:content:v1:recent')).toBe(true);
    expect(await cachedRead('recent', async () => { throw new Error('Paused'); }, []))
      .toEqual([{ id: 72, text: 'Generated content' }]);
  });
  test('a hung request falls back within the deadline and is aborted', async () => {
    let signal;
    expect(await cachedRead('hung', s => { signal = s; return new Promise(() => {}); }, ['Backup'], 10)).toEqual(['Backup']);
    expect(signal?.aborted).toBe(true);
  });
  test('recovery replaces backup with live content', async () => {
    writeLocal('recovery', ['Old']);
    expect(await cachedRead('recovery', async () => ['New live content'], [])).toEqual(['New live content']);
    expect(readLocal('recovery', [])).toEqual(['New live content']);
  });
  test('first visits and malformed local storage still receive bundled content', async () => {
    saved.set('engineerup:content:v1:broken', '{invalid');
    expect(await cachedRead('broken', async () => { throw new Error('Offline'); }, ['Bundled'])).toEqual(['Bundled']);
  });
  test('viewing history is isolated by account during outages', () => {
    rememberViewed('story', 'account-one', 52);
    expect(localViewed('story', 'account-one')).toEqual([52]);
    expect(localViewed('story', 'account-two')).toEqual([]);
  });
  test('restricted storage retains an in-memory fallback', async () => {
    Object.defineProperty(globalThis, 'window', { configurable: true, value: { localStorage: { getItem() { throw new Error('Restricted'); }, setItem() { throw new Error('Full'); } } } });
    writeLocal('restricted', ['Recent']);
    expect(await cachedRead('restricted', async () => { throw new Error('Paused'); }, ['Bundled'])).toEqual(['Recent']);
    Object.defineProperty(globalThis, 'window', { configurable: true, value: browser });
  });
});