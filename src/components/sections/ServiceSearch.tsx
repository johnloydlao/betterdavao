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
  {
    label: 'Business',
    slug: 'business',
    icon: Briefcase,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'Health',
    slug: 'health-services',
    icon: Heart,
    color: 'text-red-500 bg-red-50',
  },
  {
    label: 'Education',
    slug: 'education',
    icon: GraduationCap,
    color: 'text-green-600 bg-green-50',
  },
  {
    label: 'Waste',
    slug: 'garbage-waste-disposal',
    icon: Trash2,
    color: 'text-orange-500 bg-orange-50',
  },
  {
    label: 'Environment',
    slug: 'environment',
    icon: TreePine,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Housing',
    slug: 'housing-land-use',
    icon: Home,
    color: 'text-purple-600 bg-purple-50',
  },
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchResultItem({
  item,
  query,
  onSelect,
}: {
  item: SearchItem;
  query: string;
  onSelect: (item: SearchItem) => void;
}) {
  return (
    <button
      onMouseDown={e => {
        e.preventDefault();
        onSelect(item);
      }}
      className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 transition-colors flex items-center gap-2"
    >
      <Search className="h-3.5 w-3.5 text-primary-400 shrink-0" />
      <div className="flex flex-col flex-1 leading-tight">
        <span className="text-gray-800 font-medium">
          {highlight(item.name, query)}
        </span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          {item.categoryName}
        </span>
      </div>
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
          item.type === 'service'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-purple-100 text-purple-700'
        }`}
      >
        {item.type}
      </span>
    </button>
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <p className="text-gray-800 font-bold text-base mb-3">Search Services</p>

      <div className="relative mb-5">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for a service..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>

        {showDropdown && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {results.map(item => (
              <SearchResultItem
                key={item.id}
                item={item}
                query={query}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Popular Services
      </p>
      <div className="grid grid-cols-3 gap-2">
        {POPULAR_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              to={`/services/${cat.slug}`}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all text-center group"
            >
              <div
                className={`p-2 rounded-lg ${cat.color} group-hover:scale-110 transition-transform`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-gray-700 leading-tight">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
