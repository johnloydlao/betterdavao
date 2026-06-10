import React, { useState } from 'react';
import { X, Menu, ChevronDown, Globe, Search } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');

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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with language switcher and additional links */}
      <div className="bg-primary-500 border-b border-primary-600/20">
        <div className="container mx-auto px-4 flex justify-end items-center h-10">
          <div className="flex items-center space-x-6">
            <a
              href="https://bettergov.ph/join-us"
              className="relative text-xs text-white hover:text-primary-100 font-semibold transition-all duration-200 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-px before:bg-current before:transition-[width] before:duration-300 hover:before:w-full"
              target="_blank"
            >
              🚀 Join Us
            </a>
            <a
              href="https://bettergov.ph/about"
              className="relative text-xs text-white hover:text-primary-100 transition-all duration-200 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-px before:bg-current before:transition-[width] before:duration-300 hover:before:w-full"
              target="_blank"
            >
              About BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              className="relative text-xs text-white hover:text-primary-100 transition-all duration-200 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-px before:bg-current before:transition-[width] before:duration-300 hover:before:w-full"
              target="_blank"
            >
              Official Gov.ph
            </a>

            <a
              href="https://bettergov.ph/philippines/hotlines"
              className="relative text-xs text-white hover:text-primary-100 transition-all duration-200 before:content-[''] before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-px before:bg-current before:transition-[width] before:duration-300 hover:before:w-full"
              target="_blank"
              rel="noreferrer"
            >
              Hotlines
            </a>
            <div className="hidden md:block">
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="cursor-pointer transition-all duration-200 bg-white border border-white/30 hover:border-white/60 hover:-translate-y-px text-xs rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                className="h-20"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="relative font-sans flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-400 after:transition-[width] after:duration-[400ms] after:ease-in-out hover:after:w-full"
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
              className="relative font-sans text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-400 after:transition-[width] after:duration-[400ms] after:ease-in-out hover:after:w-full"
            >
              About
            </Link>
            <Link
              to="/search"
              className="group font-sans flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-px"
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
  );
};

export default Navbar;
