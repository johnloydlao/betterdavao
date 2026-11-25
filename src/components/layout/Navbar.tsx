import React, { useState } from 'react';
import { X, Menu, ChevronDown, Globe, Search, Phone } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import { NAVBAR_HOTLINES as HOTLINES } from '../../data/hotlines';
import InfoStrip from './InfoStrip';

const NAV_UNDERLINE =
  "after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-accent-500 after:transition-[width] after:duration-[400ms] after:ease-in-out hover:after:w-full focus-visible:after:w-full";

const MOBILE_LINK =
  'flex items-center min-h-11 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');

  const navLabel = (label: string) =>
    t(`navbar.${label.replace(' ', '').toLowerCase()}`);

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
      <div className="bg-red-600 text-white" data-hotline-bar>
        <div className="px-4 py-2 mx-auto">
          {/* Label: mobile only */}
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:hidden">
            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wide">
              Hotlines
            </span>
          </div>
          {/* Mobile: featured full-width, rest in 2-col grid */}
          <div className="sm:hidden space-y-1">
            {HOTLINES.filter(h => h.featured).map(h => (
              <a
                key={h.number.tel}
                href={`tel:${h.number.tel}`}
                className="flex items-center justify-center gap-2 min-h-11 bg-white text-red-700 rounded-lg font-black text-sm hover:bg-red-50 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {h.number.number} — {h.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-x-2">
              {HOTLINES.filter(h => !h.featured).map(h => (
                <a
                  key={h.number.tel}
                  href={`tel:${h.number.tel}`}
                  className="flex flex-col items-center justify-center min-h-11 py-1 text-center text-xs leading-snug hover:underline"
                >
                  <span className="font-bold">{h.label}</span>
                  <span className="tabular-nums">{h.number.number}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-center sm:hidden">
            <Link
              to="/hotlines"
              className="inline-flex items-center min-h-11 px-3 text-xs font-semibold text-white underline underline-offset-2 hover:no-underline"
            >
              View all hotlines &rarr;
            </Link>
          </div>
          {/* Desktop: single centered row */}
          <div className="hidden sm:flex items-center justify-center gap-1 overflow-x-auto whitespace-nowrap">
            <Phone className="h-3.5 w-3.5 mr-2 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wide mr-2">
              Hotlines
            </span>
            {HOTLINES.map((h, i) => (
              <React.Fragment key={h.number.tel}>
                {h.featured ? (
                  <a
                    href={`tel:${h.number.tel}`}
                    aria-label={`Call ${h.number.number}, ${h.label}`}
                    className="inline-flex items-center gap-1.5 bg-white text-red-700 font-black text-xs px-3 py-1 rounded-full hover:bg-red-50 transition-colors mx-1"
                  >
                    <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                    {h.number.number}
                  </a>
                ) : (
                  <a
                    href={`tel:${h.number.tel}`}
                    className="px-3 py-1.5 text-xs hover:underline"
                  >
                    <span className="font-bold">{h.label}:</span>{' '}
                    <span className="tabular-nums">{h.number.number}</span>
                  </a>
                )}
                {i < HOTLINES.length - 1 && !h.featured && (
                  <span
                    className="text-red-200 select-none mx-0.5"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
            <span
              className="text-red-200 select-none mx-0.5"
              aria-hidden="true"
            >
              |
            </span>
            <Link
              to="/hotlines"
              className="text-xs font-semibold text-white px-3 py-1.5 underline underline-offset-2 hover:no-underline"
            >
              View all &rarr;
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50" aria-label="Main">
        {/* Main navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center rounded-md motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-px"
              >
                <img
                  src="/logo-masthead.png"
                  alt=""
                  width="160"
                  height="160"
                  className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
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
                  <Link
                    to={item.href}
                    aria-haspopup={item.children ? 'true' : undefined}
                    className={`relative font-sans flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out ${NAV_UNDERLINE}`}
                  >
                    {navLabel(item.label)}
                    {item.children && (
                      <ChevronDown
                        className="ml-1 h-4 w-4 text-gray-600 transition-transform duration-300 ease-in-out group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                  {item.children && (
                    <div className="absolute left-0 mt-1 w-64 rounded-xl shadow-xl bg-white border border-gray-100 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 ease-out z-50 overflow-hidden">
                      <ul className="py-2">
                        {item.children.map(child => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              className="font-sans flex items-center min-h-11 px-5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 focus-visible:bg-primary-50 transition-colors duration-150"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="/about"
                className={`relative font-sans text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out ${NAV_UNDERLINE}`}
              >
                About
              </Link>
              <Link
                to="/search"
                className="group font-sans flex items-center px-4 py-2 text-sm font-medium text-primary-900 bg-accent-500 hover:bg-accent-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-px"
              >
                <Search
                  className="h-4 w-4 mr-2 transition-transform duration-300 ease-in-out motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-[5deg]"
                  aria-hidden="true"
                />
                Search
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center h-11 w-11 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
              >
                <span className="sr-only">
                  {isOpen ? 'Close main menu' : 'Open main menu'}
                </span>
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
        <div
          id="mobile-menu"
          className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
            {mainNavigation.map(item =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.label)}
                    aria-expanded={activeMenu === item.label}
                    aria-controls={`mobile-submenu-${item.label}`}
                    className={`w-full justify-between ${MOBILE_LINK}`}
                  >
                    {navLabel(item.label)}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {activeMenu === item.label && (
                    <ul
                      id={`mobile-submenu-${item.label}`}
                      className="pl-4 py-1 bg-gray-50"
                    >
                      <li>
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className="flex items-center min-h-11 px-4 text-sm font-semibold text-primary-700 hover:bg-gray-100"
                        >
                          All {navLabel(item.label).toLowerCase()}
                        </Link>
                      </li>
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link
                            to={child.href}
                            onClick={closeMenu}
                            className="flex items-center min-h-11 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className={MOBILE_LINK}
                >
                  {navLabel(item.label)}
                </Link>
              )
            )}
            <Link
              to="/join-us"
              onClick={closeMenu}
              className="flex items-center min-h-11 px-4 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
            >
              Join Us
            </Link>
            <Link to="/about" onClick={closeMenu} className={MOBILE_LINK}>
              About
            </Link>
            <Link to="/search" onClick={closeMenu} className={MOBILE_LINK}>
              Search
            </Link>
            <Link to="/sitemap" onClick={closeMenu} className={MOBILE_LINK}>
              Sitemap
            </Link>
            <div className="px-4 py-3 border-t border-gray-200">
              <label className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-800" aria-hidden="true" />
                <span className="sr-only">Language</span>
                <select
                  value={i18n.language}
                  onChange={e => changeLanguage(e.target.value as LanguageType)}
                  className="min-h-11 text-sm border border-gray-300 rounded-md px-2 bg-white text-gray-700 hover:border-primary-600"
                >
                  {Object.entries(LANGUAGES).map(([code, lang]) => (
                    <option key={code} value={code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </nav>

      <InfoStrip />
    </>
  );
};

export default Navbar;
