'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SPECIALTIES, LOCATIONS, URGENCY_OPTIONS, BUDGET_OPTIONS } from '@/lib/data';
import { t as tFn, type Lang } from '@/lib/i18n';
import type { Filters } from '@/context/AppContext';
import { SearchIcon, SparklesIcon, PinIcon, ClockIcon, WalletIcon } from './Icons';

interface SearchBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lang: Lang;
  vertical?: boolean;
  onSearch?: () => void;
}

export default function SearchBar({ filters, setFilters, lang, vertical = false, onSearch }: SearchBarProps) {
  const [open, setOpen] = useState<string | null>(null);
  const router = useRouter();
  const translate = (key: string) => tFn(lang, key);

  const specialtyLabel = filters.specialty
    ? SPECIALTIES.find(s => s.id === filters.specialty)?.[lang === 'es' ? 'label_es' : 'label_en']
    : null;
  const urgencyLabel = filters.urgency
    ? URGENCY_OPTIONS.find(u => u.id === filters.urgency)?.[lang === 'es' ? 'label_es' : 'label_en']
    : null;

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const handleSearch = () => {
    if (onSearch) onSearch();
    else router.push('/search');
  };

  return (
    <div
      className="search-bar"
      onClick={stop}
      style={vertical ? { gridTemplateColumns: '1fr' } : {}}
    >
      {/* Specialty */}
      <div
        className={`search-field ${open === 'spec' ? 'open' : ''} ${!specialtyLabel ? 'placeholder' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(open === 'spec' ? null : 'spec'); }}
      >
        <span className="field-eyebrow">{translate('search.specialty')}</span>
        <span className="field-value">
          <SparklesIcon size={14} />
          {specialtyLabel || translate('search.specialty.ph')}
        </span>
        {open === 'spec' && (
          <div className="search-pop" onClick={stop}>
            {SPECIALTIES.map(s => (
              <div
                key={s.id}
                className={`search-pop-item ${filters.specialty === s.id ? 'on' : ''}`}
                onClick={() => { setFilters({ ...filters, specialty: s.id }); setOpen(null); }}
              >
                <span>{lang === 'es' ? s.label_es : s.label_en}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div
        className={`search-field ${open === 'loc' ? 'open' : ''} ${!filters.location ? 'placeholder' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(open === 'loc' ? null : 'loc'); }}
      >
        <span className="field-eyebrow">{translate('search.location')}</span>
        <span className="field-value">
          <PinIcon size={14} />
          {filters.location || translate('search.location.ph')}
        </span>
        {open === 'loc' && (
          <div className="search-pop" onClick={stop}>
            {LOCATIONS.map(l => (
              <div
                key={l}
                className={`search-pop-item ${filters.location === l ? 'on' : ''}`}
                onClick={() => { setFilters({ ...filters, location: l }); setOpen(null); }}
              >
                <PinIcon size={13} />
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Urgency / budget */}
      <div
        className={`search-field ${open === 'urg' ? 'open' : ''} ${!urgencyLabel ? 'placeholder' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(open === 'urg' ? null : 'urg'); }}
      >
        <span className="field-eyebrow">{translate('search.urgency')}</span>
        <span className="field-value">
          <ClockIcon size={14} />
          {urgencyLabel || translate('search.urgency.ph')}
        </span>
        {open === 'urg' && (
          <div className="search-pop" onClick={stop} style={{ minWidth: 260 }}>
            <div className="text-xs muted" style={{ padding: '6px 12px 4px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {lang === 'es' ? '¿Cuándo?' : 'When?'}
            </div>
            {URGENCY_OPTIONS.map(u => (
              <div
                key={u.id}
                className={`search-pop-item ${filters.urgency === u.id ? 'on' : ''}`}
                onClick={() => setFilters({ ...filters, urgency: u.id })}
              >
                <span className="item-emoji">{u.emoji}</span>
                <span>{lang === 'es' ? u.label_es : u.label_en}</span>
              </div>
            ))}
            <div className="divider" style={{ margin: '6px 8px' }}></div>
            <div className="text-xs muted" style={{ padding: '6px 12px 4px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {lang === 'es' ? 'Presupuesto' : 'Budget'}
            </div>
            {BUDGET_OPTIONS.map(b => (
              <div
                key={b.id}
                className={`search-pop-item ${filters.budget === b.id ? 'on' : ''}`}
                onClick={() => { setFilters({ ...filters, budget: b.id }); setOpen(null); }}
              >
                <WalletIcon size={13} />
                <span>{lang === 'es' ? b.label_es : b.label_en}</span>
                <span className="item-sub">{b.range}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="search-cta" onClick={handleSearch}>
        <SearchIcon size={16} />
        {translate('search.cta')}
      </button>
    </div>
  );
}
