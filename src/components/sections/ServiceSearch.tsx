import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Briefcase,
  Heart,
  GraduationCap,
  Trash2,
  TreePine,
  Home,
} from 'lucide-react';
import {
  useServiceSearch,
  type SearchItem,
} from '../../hooks/useServiceSearch';

const POPULAR_CATEGORIES = [
  { label: 'Business', slug: 'business', icon: Briefcase },
  { label: 'Health', slug: 'health-services', icon: Heart },
  { label: 'Education', slug: 'education', icon: GraduationCap },
  { label: 'Waste', slug: 'garbage-waste-disposal', icon: Trash2 },
  { label: 'Environment', slug: 'environment', icon: TreePine },
  { label: 'Housing', slug: 'housing-land-use', icon: Home },
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent-200 text-gray-900 rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchResultItem({
  id,
  item,
  query,
  active,
  onSelect,
  onHover,
}: {
  id: string;
  item: SearchItem;
  query: string;
  active: boolean;
  onSelect: (item: SearchItem) => void;
  onHover: () => void;
}) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={active}
      onMouseDown={e => {
        e.preventDefault();
        onSelect(item);
      }}
      onMouseEnter={onHover}
      className={`cursor-pointer px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
        active ? 'bg-primary-50' : ''
      }`}
    >
      <Search
        className="h-3.5 w-3.5 text-primary-500 shrink-0"
        aria-hidden="true"
      />
      <div className="flex flex-col flex-1 leading-tight">
        <span className="text-gray-800 font-medium">
          {highlight(item.name, query)}
        </span>
        <span className="text-xs text-gray-600">{item.categoryName}</span>
      </div>
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full font-semibold capitalize ${
          item.type === 'service'
            ? 'bg-primary-100 text-primary-700'
            : 'bg-accent-100 text-accent-800'
        }`}
      >
        {item.type}
      </span>
    </li>
  );
}

export function ServiceSearch() {
  const {
    query,
    setQuery,
    showDropdown,
    setShowDropdown,
    results,
    inputRef,
    dropdownRef,
    handleSearch,
    handleSelect,
  } = useServiceSearch();
  const [activeIndex, setActiveIndex] = useState(-1);
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listId = `${baseId}-results`;
  const optionId = (i: number) => `${baseId}-option-${i}`;

  const isOpen = showDropdown && results.length > 0;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && results.length > 0) {
      e.preventDefault();
      setShowDropdown(true);
      setActiveIndex(i => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp' && results.length > 0) {
      e.preventDefault();
      setShowDropdown(true);
      setActiveIndex(i => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === 'Enter' && isOpen && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
      setActiveIndex(-1);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <label
        htmlFor={inputId}
        className="block text-gray-800 font-bold text-base mb-3"
      >
        Search services
      </label>

      <div className="relative mb-5">
        <form onSubmit={handleSearch} role="search">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-activedescendant={
                isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
              }
              autoComplete="off"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowDropdown(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={onKeyDown}
              placeholder="e.g. business permit, scholarship"
              className="w-full min-h-11 border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-base sm:text-sm text-gray-800 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>

        <div
          ref={dropdownRef}
          className={
            isOpen
              ? 'absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden'
              : 'hidden'
          }
        >
          <ul id={listId} role="listbox" aria-label="Matching services">
            {isOpen &&
              results.map((item, i) => (
                <SearchResultItem
                  key={item.id}
                  id={optionId(i)}
                  item={item}
                  query={query}
                  active={i === activeIndex}
                  onSelect={handleSelect}
                  onHover={() => setActiveIndex(i)}
                />
              ))}
          </ul>
        </div>
      </div>

      <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
        Popular services
      </h2>
      <ul className="grid grid-cols-3 gap-2">
        {POPULAR_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <li key={cat.slug}>
              <Link
                to={`/services/${cat.slug}`}
                className="flex h-full flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors text-center group"
              >
                <span className="p-2 rounded-lg bg-primary-100 text-primary-600 motion-safe:group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {cat.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
