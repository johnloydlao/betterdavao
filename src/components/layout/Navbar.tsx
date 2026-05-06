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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Crimson+Pro:wght@400;500;600&display=swap');

        /* Desktop Nav Link Hover Effect */
        .nav-link {
          position: relative;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        /* Dropdown Animation */
        .dropdown-menu {
          transform-origin: top center;
          animation: dropdownSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Dropdown Item Stagger */
        .dropdown-item {
          opacity: 0;
          animation: dropdownItemFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .dropdown-item:nth-child(1) { animation-delay: 0.05s; }
        .dropdown-item:nth-child(2) { animation-delay: 0.08s; }
        .dropdown-item:nth-child(3) { animation-delay: 0.11s; }
        .dropdown-item:nth-child(4) { animation-delay: 0.14s; }
        .dropdown-item:nth-child(5) { animation-delay: 0.17s; }

        @keyframes dropdownItemFade {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Top Bar Link Animation */
        .top-bar-link {
          position: relative;
          transition: all 0.2s ease;
        }

        .top-bar-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .top-bar-link:hover::before {
          width: 100%;
        }

        /* Language Selector Enhancement */
        .language-select {
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .language-select:hover {
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-1px);
        }

        /* Search Button Hover */
        .search-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-btn:hover {
          transform: translateY(-1px);
        }

        .search-btn:hover .search-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .search-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Chevron Rotation */
        .chevron {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .group:hover .chevron {
          transform: rotate(180deg);
        }

        /* Font Styling */
        .nav-font {
          font-family: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.01em;
        }

        .logo-area {
          transition: transform 0.2s ease;
        }

        .logo-area:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* Top bar with language switcher and additional links */}
      <div className="bg-primary-500 border-b border-primary-600/20">
        <div className="container mx-auto px-4 flex justify-end items-center h-10">
          <div className="flex items-center space-x-6">
            <a
              href="https://bettergov.ph/join-us"
              className="text-xs text-white hover:text-primary-100 font-semibold transition-colors top-bar-link"
              target="_blank"
            >
              🚀 Join Us
            </a>
            <a
              href="https://bettergov.ph/about"
              className="text-xs text-white hover:text-primary-100 transition-colors top-bar-link"
              target="_blank"
            >
              About BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              className="text-xs text-white hover:text-primary-100 transition-colors top-bar-link"
              target="_blank"
            >
              Official Gov.ph
            </a>

            <a
              href="https://bettergov.ph/philippines/hotlines"
              className="text-xs text-white hover:text-primary-100 transition-colors top-bar-link"
              target="_blank"
              rel="noreferrer"
            >
              Hotlines
            </a>
            <div className="hidden md:block">
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="language-select text-xs rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/50"
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
            <Link to="/" className="logo-area flex items-center">
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
                  className="nav-link nav-font flex items-center px-4 py-2 text-xl font-bold text-gray-700 hover:text-primary-600"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="chevron ml-1 h-4 w-4 text-gray-500" />
                  )}
                </a>
                {item.children && (
                  <div className="dropdown-menu absolute left-0 mt-1 w-64 rounded-xl shadow-xl bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <div className="py-2">
                      {item.children.map((child, index) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="dropdown-item nav-font flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-50/50 hover:text-primary-700 transition-all duration-200 border-l-2 border-transparent hover:border-primary-500"
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
              className="nav-link nav-font text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              About
            </Link>
            <Link
              to="/search"
              className="search-btn nav-font flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg shadow-sm hover:shadow-md"
            >
              <Search className="search-icon h-4 w-4 mr-2" />
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
