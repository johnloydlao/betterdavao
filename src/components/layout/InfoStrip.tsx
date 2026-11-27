import { useEffect, useState } from 'react';
import { Clock, Pause, Play, Thermometer } from 'lucide-react';

const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'SGD'] as const;
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  SGD: 'S$',
};
const ROTATE_MS = 4_000;
const RATES_TTL_MS = 3_600_000;
const TEMP_TTL_MS = 1_800_000;

function formatDatetime(): string {
  const now = new Date();
  const date = now.toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  });
  const time = now.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  });
  return `${date} · ${time} PHT`;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Reads a cached value written by `safeSet`. Returns null when storage is
 * blocked, the entry is missing or expired, or the JSON is corrupt — the
 * strip mounts on every page, so it must never throw.
 */
function safeGet<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as { value: T; time: number };
    if (typeof entry?.time !== 'number' || Date.now() - entry.time > ttlMs) {
      return null;
    }
    return entry.value ?? null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ value, time: Date.now() }));
  } catch {
    // Storage full or blocked; the value just won't be cached.
  }
}

/**
 * Exchange rate, Davao temperature, and Philippine time.
 *
 * Kept separate from the Navbar so the rotating rate only re-renders this
 * strip. The rotation can be paused (WCAG 2.2.2) and starts paused for
 * visitors who ask for reduced motion. Both data providers require
 * attribution; the credits live in the Footer.
 */
export default function InfoStrip() {
  const [rates, setRates] = useState<Record<string, string>>({});
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [temp, setTemp] = useState('--');
  const [datetime, setDatetime] = useState(formatDatetime);

  const activeCurrency = CURRENCIES[currencyIdx];
  const forexDisplay = rates[activeCurrency]
    ? `${CURRENCY_SYMBOLS[activeCurrency]}1 ${activeCurrency} = ₱${rates[activeCurrency]}`
    : `1 ${activeCurrency} = ₱--`;

  useEffect(() => {
    const timer = setInterval(() => setDatetime(formatDatetime()), 60_000);

    const cachedRates = safeGet<Record<string, string>>(
      'bd_rates',
      RATES_TTL_MS
    );
    if (cachedRates && typeof cachedRates === 'object') {
      setRates(cachedRates);
    } else {
      fetch('https://open.er-api.com/v6/latest/PHP')
        .then(r => r.json())
        .then(data => {
          if (data?.rates) {
            const phpRates = data.rates as Record<string, number>;
            const computed: Record<string, string> = {};
            for (const cur of CURRENCIES) {
              if (phpRates[cur]) {
                computed[cur] = (1 / phpRates[cur]).toFixed(2);
              }
            }
            safeSet('bd_rates', computed);
            setRates(computed);
          }
        })
        .catch(() => {});
    }

    const cachedTemp = safeGet<string>('bd_temp', TEMP_TTL_MS);
    if (typeof cachedTemp === 'string') {
      setTemp(cachedTemp);
    } else {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=7.07&longitude=125.61&current_weather=true'
      )
        .then(r => r.json())
        .then(data => {
          if (data?.current_weather?.temperature !== undefined) {
            const value = `${Math.round(data.current_weather.temperature)}°C`;
            safeSet('bd_temp', value);
            setTemp(value);
          }
        })
        .catch(() => {});
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const rotate = setInterval(
      () => setCurrencyIdx(i => (i + 1) % CURRENCIES.length),
      ROTATE_MS
    );
    return () => clearInterval(rotate);
  }, [paused]);

  return (
    <div className="bg-primary-800" data-dark-surface>
      <div className="site-container flex justify-end items-center min-h-10 py-1">
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-0.5 text-xs text-white">
          <span className="flex items-center gap-1">
            <span
              key={activeCurrency}
              className="font-semibold tabular-nums motion-safe:animate-fade-in"
            >
              {forexDisplay}
            </span>
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              aria-label={
                paused
                  ? 'Resume rotating exchange rates'
                  : 'Pause rotating exchange rates'
              }
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-primary-100 hover:text-white hover:bg-primary-700 transition-colors"
            >
              {paused ? (
                <Play className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Pause className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          </span>
          <span className="flex items-center gap-1.5">
            <Thermometer
              className="h-3 w-3 text-primary-200"
              aria-hidden="true"
            />
            <span>Davao</span>
            <span className="font-semibold tabular-nums">{temp}</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-primary-200" aria-hidden="true" />
            <span className="font-semibold tabular-nums">{datetime}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
