import { useId, useState } from 'react';
import { Search } from 'lucide-react';
import { threadClass } from '../../lib/threads';
import {
  useServiceSearch,
  type SearchItem,
} from '../../hooks/useServiceSearch';

// Example searches that match real guide titles.
const TRY_QUERIES = ['business permit', 'housing', 'garbage', 'senior'];

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
      className={`cursor-pointer px-4 py-2.5 text-base flex items-center gap-3 transition-colors ${
        active ? 'bg-primary-50' : ''
      }`}
    >
      <span
        className={`w-1.5 h-7 rounded-full shrink-0 ${
          item.type === 'service'
            ? threadClass(item.categorySlug)
            : 'bg-gray-400'
        }`}
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

  const tryQuery = (q: string) => {
    setQuery(q);
    setShowDropdown(true);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white text-gray-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
      <label htmlFor={inputId} className="block font-bold text-base mb-2.5">
        Search services
      </label>

      <div className="relative">
        <form
          onSubmit={handleSearch}
          role="search"
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[1.125rem] w-[1.125rem] text-gray-600 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={inputId}
              ref={inputRef}
              type="search"
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
              placeholder="e.g. permit, scholarship"
              className="w-full h-12 border border-gray-300 rounded-lg pl-10 pr-4 text-base text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 rounded-lg bg-accent-500 hover:bg-accent-400 text-primary-700 font-bold transition-colors"
          >
            Search
          </button>
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

      <div className="flex flex-wrap items-center gap-2 mt-3.5 text-sm text-gray-700">
        <span>Try:</span>
        {TRY_QUERIES.map(q => (
          <button
            key={q}
            type="button"
            onClick={() => tryQuery(q)}
            className="min-h-9 px-2.5 rounded-md border border-gray-200 font-semibold text-primary-600 hover:bg-primary-50 hover:border-primary-200"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
