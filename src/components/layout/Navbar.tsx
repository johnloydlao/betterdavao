import React, { useState, useEffect } from 'react';
import {
  X,
  Menu,
  ChevronDown,
  Globe,
  Search,
  Phone,
  Thermometer,
  Clock,
} from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import { NAVBAR_HOTLINES as HOTLINES } from '../../data/hotlines';

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

const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'SGD'] as const;
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  SGD: 'S$',
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');

  const [rates, setRates] = useState<Record<string, string>>({});
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [forexVisible, setForexVisible] = useState(true);
  const [temp, setTemp] = useState('--');
  const [datetime, setDatetime] = useState(formatDatetime());

  const activeCurrency = CURRENCIES[currencyIdx];
  const forexDisplay = rates[activeCurrency]
    ? `${CURRENCY_SYMBOLS[activeCurrency]}1 ${activeCurrency} = ₱${rates[activeCurrency]}`
    : `1 ${activeCurrency} = ₱--`;

  useEffect(() => {
    const timer = setInterval(() => setDatetime(formatDatetime()), 60_000);

    const cached = localStorage.getItem('bd_rates');
    const cachedTime = localStorage.getItem('bd_rates_time');
    if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3_600_000) {
      setRates(JSON.parse(cached));
    } else {
      fetch('https://open.er-api.com/v6/latest/PHP')
        .then(r => r.json())
        .then(data => {
          if (data?.rates) {
            const phpRates = data.rates as Record<string, number>;
            const computed: Record<string, string> = {};
            for (const cur of ['USD', 'EUR', 'JPY', 'GBP', 'SGD']) {
              if (phpRates[cur]) {
                computed[cur] = (1 / phpRates[cur]).toFixed(2);
              }
            }
            localStorage.setItem('bd_rates', JSON.stringify(computed));
            localStorage.setItem('bd_rates_time', String(Date.now()));
            setRates(computed);
          }
        })
        .catch(() => {});
    }

    const currencyTimer = setInterval(() => {
      setForexVisible(false);
      setTimeout(() => {
        setCurrencyIdx(i => (i + 1) % CURRENCIES.length);
        setForexVisible(true);
      }, 300);
    }, 3_000);

    const cachedTemp = localStorage.getItem('bd_temp');
    const cachedTempTime = localStorage.getItem('bd_temp_time');
    if (
      cachedTemp &&
      cachedTempTime &&
      Date.now() - parseInt(cachedTempTime) < 1_800_000
    ) {
      setTemp(cachedTemp);
    } else {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=7.07&longitude=125.61&current_weather=true'
      )
        .then(r => r.json())
        .then(data => {
          if (data?.current_weather?.temperature !== undefined) {
            const t = `${Math.round(data.current_weather.temperature)}°C`;
            localStorage.setItem('bd_temp', t);
            localStorage.setItem('bd_temp_time', String(Date.now()));
            setTemp(t);
          }
        })
        .catch(() => {});
    }

    return () => {
      clearInterval(timer);
      clearInterval(currencyTimer);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      {/* ── Emergency Hotlines Bar ─────────────────────────── */}
      <div className="bg-red-600 text-white">
        <div className="px-4 py-2.5 mx-auto">
          {/* Label — always centered */}
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-0 sm:hidden">
            <Phone className="h-3.5 w-3.5 shrink-0 opacity-90" />
            <span className="text-xs font-bold uppercase tracking-wide opacity-80">
              Hotlines
            </span>
          </div>
          {/* Mobile: featured full-width, rest in 2-col grid */}
          <div className="sm:hidden space-y-1.5">
            {HOTLINES.filter(h => h.featured).map(h => (
              <a
                key={h.number.tel}
                href={`tel:${h.number.tel}`}
                className="flex items-center justify-center gap-2 bg-white text-red-600 rounded-lg py-1.5 font-black text-sm hover:bg-red-50 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {h.number.number} — {h.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {HOTLINES.filter(h => !h.featured).map(h => (
                <a
                  key={h.number.tel}
                  href={`tel:${h.number.tel}`}
                  className="text-center hover:underline transition-opacity hover:opacity-80 py-1 text-xs"
                >
                  <span className="font-bold">{h.label}:</span>{' '}
                  <span className="opacity-90">{h.number.number}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-1.5 sm:hidden">
            <Link
              to="/hotlines"
              className="text-xs text-red-200 hover:text-white underline underline-offset-2 transition-colors"
            >
              View All Hotlines &rarr;
            </Link>
          </div>
          {/* Desktop: single centered row */}
          <div className="hidden sm:flex items-center justify-center gap-1 overflow-x-auto whitespace-nowrap">
            <Phone className="h-3.5 w-3.5 mr-2 shrink-0 opacity-90" />
            <span className="text-xs font-bold uppercase tracking-wide opacity-80 mr-2">
              Hotlines
            </span>
            {HOTLINES.map((h, i) => (
              <React.Fragment key={h.number.tel}>
                {h.featured ? (
                  <a
                    href={`tel:${h.number.tel}`}
                    className="inline-flex items-center gap-1.5 bg-white text-red-600 font-black text-xs px-3 py-0.5 rounded-full hover:bg-red-50 transition-colors mx-1"
                  >
                    <Phone className="h-3 w-3 shrink-0" />
                    {h.number.number}
                  </a>
                ) : (
                  <a
                    href={`tel:${h.number.tel}`}
                    className="hover:underline transition-opacity hover:opacity-80 px-3 py-1 text-xs"
                  >
                    <span className="font-bold">{h.label}:</span>{' '}
                    <span className="opacity-90">{h.number.number}</span>
                  </a>
                )}
                {i < HOTLINES.length - 1 && !h.featured && (
                  <span className="opacity-30 select-none mx-0.5">|</span>
                )}
              </React.Fragment>
            ))}
            <span className="opacity-30 select-none mx-0.5">|</span>
            <Link
              to="/hotlines"
              className="text-xs text-red-200 hover:text-white px-3 py-1 underline underline-offset-2 transition-colors"
            >
              View All &rarr;
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50">
        {/* Main navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center transition-transform duration-200 hover:-translate-y-px"
              >
                <img
                  src="/logo_colored_2.svg"
                  alt="Better Davao Logo"
                  className="h-12 sm:h-16 lg:h-20"
                />
                <span className="ml-2 font-sans font-bold tracking-tight text-primary-700 text-base sm:text-lg leading-tight">
                  {import.meta.env.VITE_WEBSITE_URL}
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavigation.map(item => (
                <div key={item.label} className="relative group">
                  <a
                    href={item.href}
                    className="relative font-sans flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-accent-500 after:transition-[width] after:duration-[400ms] after:ease-in-out hover:after:w-full"
                  >
                    {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                    {item.children && (
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                    )}
                  </a>
                  {item.children && (
                    <div className="animate-dropdown-slide origin-top absolute left-0 mt-1 w-64 rounded-xl shadow-xl bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="animate-dropdown-item-fade font-sans flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-50/50 hover:text-primary-700 transition-all duration-200 border-l-2 border-transparent hover:border-primary-500"
                            style={{ animationDelay: `${index * 0.03}s` }}
                          >
                            <span className="flex-1">{child.label}</span>
                            <ChevronDown className="h-3 w-3 -rotate-90 opacity-0 group-hover:opacity-50 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="/about"
                className="relative font-sans text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-accent-500 after:transition-[width] after:duration-[400ms] after:ease-in-out hover:after:w-full"
              >
                About
              </Link>
              <Link
                to="/search"
                className="group font-sans flex items-center px-4 py-2 text-sm font-medium text-primary-900 bg-accent-500 hover:bg-accent-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-px"
              >
                <Search className="h-4 w-4 mr-2 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-[5deg]" />
                Search
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
            {mainNavigation.map(item => (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeMenu === item.label ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {item.children && activeMenu === item.label && (
                  <div className="pl-6 py-2 space-y-1 bg-gray-50">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/join-us"
              onClick={closeMenu}
              className="block px-4 py-2 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
            >
              🚀 Join Us
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
            >
              About
            </Link>
            <Link
              to="/search"
              onClick={closeMenu}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
            >
              Search
            </Link>
            <Link
              to="/sitemap"
              onClick={closeMenu}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
            >
              Sitemap
            </Link>
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-800 mr-2" />
                <select
                  value={i18n.language}
                  onChange={e => changeLanguage(e.target.value as LanguageType)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                >
                  {Object.entries(LANGUAGES).map(([code, lang]) => (
                    <option key={code} value={code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Info bar: forex, temperature, datetime */}
      <div className="bg-primary-800 border-b border-primary-600/20">
        <div className="container mx-auto px-4 flex justify-end items-center h-10">
          <div className="flex items-center gap-4 text-xs text-white">
            <span className="flex items-center gap-1.5 opacity-90">
              <span
                className="font-semibold transition-opacity duration-300"
                style={{ opacity: forexVisible ? 1 : 0 }}
              >
                {forexDisplay}
              </span>
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Thermometer className="h-3 w-3 opacity-70" />
              <span>Davao</span>
              <span className="font-semibold">{temp}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <Clock className="h-3 w-3 opacity-70" />
              <span className="font-semibold">{datetime}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
