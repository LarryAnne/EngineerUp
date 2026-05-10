import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Square, Headphones } from 'lucide-react';

interface StoryReaderProps {
  text: string;
  title?: string;
}

// Prefer African English voices for an authentic accent.
const AFRICAN_LOCALES = ['en-NG', 'en-ZA', 'en-KE', 'en-GH', 'en-ZW', 'en-UG', 'en-TZ'];

function pickAfricanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  for (const loc of AFRICAN_LOCALES) {
    const v = voices.find((x) => x.lang?.toLowerCase() === loc.toLowerCase());
    if (v) return v;
  }
  // Loose match: any voice whose name hints African
  const hint = voices.find((v) =>
    /nigeria|south africa|kenya|ghana|africa|zulu|xhosa|swahili|yoruba|igbo/i.test(
      `${v.name} ${v.lang}`
    )
  );
  if (hint) return hint;
  // Fallback to en-GB (closer cadence than en-US for many African English speakers)
  return (
    voices.find((v) => v.lang?.toLowerCase() === 'en-gb') ||
    voices.find((v) => v.lang?.toLowerCase().startsWith('en')) ||
    voices[0]
  );
}

export function StoryReader({ text, title }: StoryReaderProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
  };

  const play = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(
      title ? `${title}. ${text}` : text
    );
    const voice = pickAfricanVoice(voices);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    } else {
      utter.lang = 'en-NG';
    }
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.onend = () => {
      setPlaying(false);
      setPaused(false);
    };
    utter.onerror = () => {
      setPlaying(false);
      setPaused(false);
    };
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setPlaying(true);
    setPaused(false);
  };

  const togglePause = () => {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  if (!supported) return null;

  const voice = pickAfricanVoice(voices);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20"
    >
      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
        <Headphones className="w-5 h-5" />
        <span className="text-sm font-medium">Listen along</span>
      </div>

      {!playing ? (
        <button
          onClick={play}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm shadow-sm transition-colors"
        >
          <Play className="w-4 h-4" /> Play story
        </button>
      ) : (
        <>
          <button
            onClick={togglePause}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm shadow-sm transition-colors"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={stop}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm hover:bg-amber-100/60 dark:hover:bg-amber-900/30 transition-colors"
          >
            <Square className="w-4 h-4" /> Stop
          </button>
        </>
      )}

      <span className="text-xs text-amber-700/80 dark:text-amber-300/70 ml-auto">
        Voice: {voice ? `${voice.name} (${voice.lang})` : 'Default'}
      </span>
    </motion.div>
  );
}
