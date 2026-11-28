import React, { useState } from 'react';
import { X, Menu, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mainNavigation } from '../../data/navigation';
import { NAVBAR_HOTLINES as HOTLINES } from '../../data/hotlines';
import InfoStrip from './InfoStrip';
import TextSizeControl from './TextSizeControl';

const MOBILE_LINK =
  'flex items-center min-h-11 px-4 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary-600';

/** "Davao City Reports" reads as "Reports" in the tight mobile grid. */
const shortLabel = (label: string) => label.replace(/^Davao City\s+/i, '');

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t } = useTranslation('common');

  const navLabel = (label: string) =>
    t(`navbar.${label.replace(' ', '').toLowerCase()}`, label);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleMenu = () => (isOpen ? closeMenu() : setIsOpen(true));

  const toggleSubmenu = (label: string) =>
    setActiveMenu(activeMenu === label ? null : label);

  const featured = HOTLINES.filter(h => h.featured);
  const others = HOTLINES.filter(h => !h.featured);

  return (
    <>
      {/* ── Emergency hotlines: always visible, every breakpoint ── */}
      <div className="bg-hotline text-white" data-hotline-bar>
        {/* Mobile: one big 911 button, three city numbers, then all */}
        <div className="sm:hidden px-3 pt-2 pb-1">
          {featured.map(h => (
            <a
              key={h.number.tel}
              href={`tel:${h.number.tel}`}
              className="flex items-center justify-center gap-2 min-h-11 bg-white text-hotline-deep rounded-lg font-extrabold text-base hover:bg-red-50 transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              Call {h.number.number} · Emergency
            </a>
          ))}
          <ul className="grid grid-cols-3 mt-1">
            {others.map(h => (
              <li key={h.number.tel}>
                <a
                  href={`tel:${h.number.tel}`}
                  aria-label={`Call ${h.label}, ${h.number.number}`}
                  className="flex flex-col items-center justify-center min-h-11 py-1 text-center text-xs leading-tight hover:underline"
                >
                  <span className="font-bold">{shortLabel(h.label)}</span>
                  <span className="tabular-nums">{h.number.number}</span>
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/hotlines"
            className="flex items-center justify-center min-h-9 text-xs font-semibold underline underline-offset-2 hover:no-underline"
          >
            View all hotlines
            <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Desktop: one centered row */}
        <div className="hidden sm:flex items-center justify-center gap-1 px-4 py-1.5 overflow-x-auto whitespace-nowrap text-xs">
          <Phone className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden="true" />
          <span className="font-bold uppercase tracking-wide mr-2">
            Hotlines
          </span>
          {HOTLINES.map(h =>
            h.featured ? (
              <a
                key={h.number.tel}
                href={`tel:${h.number.tel}`}
                aria-label={`Call ${h.number.number}, ${h.label}`}
                className="inline-flex items-center gap-1.5 bg-white text-hotline-deep font-extrabold px-3 py-1 rounded-full hover:bg-red-50 transition-colors mx-1"
              >
                {h.number.number} Emergency
              </a>
            ) : (
              <React.Fragment key={h.number.tel}>
                <a
                  href={`tel:${h.number.tel}`}
                  className="px-2.5 py-1.5 hover:underline"
                >
                  <span className="font-bold">{shortLabel(h.label)}:</span>{' '}
                  <span className="tabular-nums">{h.number.number}</span>
                </a>
                <span className="text-red-200 select-none" aria-hidden="true">
                  |
                </span>
              </React.Fragment>
            )
          )}
          <Link
            to="/hotlines"
            className="inline-flex items-center font-semibold px-2.5 py-1.5 underline underline-offset-2 hover:no-underline"
          >
            View all
            <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50" aria-label="Main">
        <div className="site-container">
          <div className="flex items-center gap-6 h-16 lg:h-19">
            <Link to="/" className="flex items-center gap-2 rounded-md min-w-0">
              <img
                src="/logo-masthead.png"
                alt=""
                width="160"
                height="160"
                className="h-10 w-10 lg:h-12 lg:w-12 shrink-0"
              />
              <span className="truncate font-bold tracking-tight text-primary-700 text-base lg:text-lg leading-tight">
                {import.meta.env.VITE_WEBSITE_URL}
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {mainNavigation.map(item => (
                <li key={item.label} className="relative group">
                  <NavLink
                    to={item.href}
                    aria-haspopup={item.children ? 'true' : undefined}
                    className={({ isActive }) =>
                      `flex items-center px-3.5 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? 'text-primary-600 shadow-[inset_0_-2px_0_var(--color-accent-500)]'
                          : 'text-gray-700 hover:text-primary-600'
                      }`
                    }
                  >
                    {navLabel(item.label)}
                    {item.children && (
                      <ChevronDown
                        className="ml-1 h-4 w-4 text-gray-600 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </NavLink>
                  {item.children && (
                    <div className="absolute left-0 mt-1 w-72 rounded-xl shadow-xl bg-white border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150 z-50 overflow-hidden">
                      <ul className="py-2">
                        {item.children.map(child => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              className="flex items-center min-h-11 px-5 text-sm text-gray-800 hover:bg-primary-50 hover:text-primary-700 focus-visible:bg-primary-50"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <TextSizeControl />
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="lg:hidden ml-auto shrink-0 inline-flex items-center gap-2 h-11 px-3.5 rounded-lg border border-gray-300 font-semibold text-gray-800 hover:bg-gray-50"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="site-container pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
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
                            className="flex items-center min-h-11 px-4 text-sm text-gray-800 hover:bg-gray-100 hover:text-primary-600"
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
            <div className="flex items-center gap-3 px-4 pt-3 mt-2 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-800">
                Text size
              </span>
              <TextSizeControl />
            </div>
          </div>
        </div>
      </nav>

      <InfoStrip />
    </>
  );
};

export default Navbar;
