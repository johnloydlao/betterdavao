import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceCategories, loadCategoryIndex } from '../data/yamlLoader';

export interface SearchItem {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  type: 'service' | 'government';
}

const GOVT_CATS = [{ slug: 'departments', name: 'Departments' }];

export function useServiceSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [allSearchItems, setAllSearchItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {}, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchAllData = async () => {
      const items: SearchItem[] = [];

      const serviceCats = serviceCategories.categories as {
        category: string;
        slug: string;
      }[];
      const serviceResults = await Promise.all(
        serviceCats.map(cat =>
          loadCategoryIndex(cat.slug).then(idx => ({ cat, pages: idx.pages }))
        )
      );
      for (const { cat, pages } of serviceResults) {
        for (const page of pages) {
          items.push({
            id: `service-${cat.slug}-${page.slug}`,
            name: page.name,
            slug: page.slug,
            categorySlug: cat.slug,
            categoryName: cat.category,
            type: 'service',
          });
        }
      }

      const govtResults = await Promise.all(
        GOVT_CATS.map(cat =>
          loadCategoryIndex(cat.slug).then(idx => ({ cat, pages: idx.pages }))
        )
      );
      for (const { cat, pages } of govtResults) {
        for (const page of pages) {
          items.push({
            id: `govt-${cat.slug}-${page.slug}`,
            name: page.name,
            slug: page.slug,
            categorySlug: cat.slug,
            categoryName: cat.name,
            type: 'government',
          });
        }
      }

      setAllSearchItems(items);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const results = query.trim()
    ? allSearchItems
        .filter(
          s =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.categoryName.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/services?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelect = (item: SearchItem) => {
    setShowDropdown(false);
    setQuery('');
    if (item.type === 'service') {
      navigate(`/services/${item.categorySlug}/${item.slug}`);
    } else {
      navigate(`/government/${item.categorySlug}/${item.slug}`);
    }
  };

  return {
    query,
    setQuery,
    showDropdown,
    setShowDropdown,
    results,
    inputRef,
    dropdownRef,
    handleSearch,
    handleSelect,
  };
}
