'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { t as tFn } from '@/lib/i18n';
import { LAWYERS, SPECIALTIES, LOCATIONS, BUDGET_OPTIONS, URGENCY_OPTIONS } from '@/lib/data';
import type { Lawyer } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import LawyerCard from '@/components/LawyerCard';
import Rating from '@/components/Rating';
import {
  FilterIcon, PinIcon, XIcon, WalletIcon, ShieldCheckIcon, GlobeIcon,
  StarIcon, ArrowRightIcon,
} from '@/components/Icons';
import { useBreakpoint } from '@/hooks/useBreakpoint';

// ─── Geo → canvas coords ───
function geoToCanvas(lat: number, lng: number) {
  const x = ((lng + 85.9) / 3.4) * 100;
  const y = (1 - (lat - 8) / 3.2) * 100;
  return { x: Math.max(8, Math.min(92, x)), y: Math.max(10, Math.min(90, y)) };
}

// ─── ResultsMap ───
function ResultsMap({
  lawyers, hoveredId, setHoveredId, selectedId, setSelectedId, navigate, height = '100%',
}: {
  lawyers: Lawyer[];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  navigate: (path: string) => void;
  height?: string | number;
}) {
  const pins = lawyers.map(l => ({
    ...geoToCanvas(l.offices[0]?.lat ?? 9.93, l.offices[0]?.lng ?? -84.08),
    lawyer: l,
    id: l.id,
  }));
  const selected = lawyers.find(l => l.id === selectedId);

  return (
    <div className="map-canvas" style={{ height, width: '100%', position: 'relative' }}>
      <div className="map-grid"></div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="landGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.10)" />
            <stop offset="100%" stopColor="rgba(11, 31, 77, 0.04)" />
          </linearGradient>
        </defs>
        <path d="M 10,48 Q 14,40 22,38 L 32,40 Q 38,42 44,46 L 52,48 Q 60,46 66,50 L 76,56 Q 82,60 86,66 L 88,72 Q 84,76 78,76 L 70,74 Q 62,76 56,72 L 48,70 Q 40,72 34,68 L 24,64 Q 16,60 12,54 Z"
          fill="url(#landGrad2)" stroke="rgba(11, 31, 77, 0.18)" strokeWidth="0.3" />
      </svg>
      <div className="map-road" style={{ top: '52%', left: '20%', width: '60%', height: '4px', opacity: 0.5 }}></div>
      <div className="map-road" style={{ top: '64%', left: '30%', width: '50%', height: '3px', opacity: 0.4 }}></div>
      <div className="map-road" style={{ left: '42%', top: '40%', width: '3px', height: '40%', opacity: 0.4 }}></div>

      {pins.map((pin, i) => {
        const isHovered = hoveredId === pin.id;
        const isSelected = selectedId === pin.id;
        const active = isHovered || isSelected;
        return (
          <div
            key={pin.id}
            style={{
              position: 'absolute',
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: `translate(-50%, -100%) ${active ? 'scale(1.15)' : 'scale(1)'}`,
              transition: 'transform 0.18s cubic-bezier(0.2, 0.6, 0.2, 1)',
              zIndex: active ? 20 : 10,
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredId(pin.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedId(pin.id === selectedId ? null : pin.id)}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: active ? 'var(--accent)' : (pin.lawyer.verified ? 'var(--navy)' : 'var(--muted)'),
              color: active ? 'var(--navy-ink)' : 'white',
              display: 'grid', placeItems: 'center',
              fontWeight: 700, fontSize: 13,
              boxShadow: active ? '0 6px 18px rgba(20, 184, 166, 0.45), 0 0 0 4px rgba(20, 184, 166, 0.2)' : '0 3px 8px rgba(11, 31, 77, 0.35)',
              border: '2px solid white',
              fontFamily: 'var(--font-sans)',
            }}>
              {i + 1}
            </div>
            <div style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 10, height: 10, background: active ? 'var(--accent)' : (pin.lawyer.verified ? 'var(--navy)' : 'var(--muted)'), borderRight: '2px solid white', borderBottom: '2px solid white', zIndex: -1 }}></div>
          </div>
        );
      })}

      {selected && (() => {
        const pin = pins.find(p => p.id === selected.id)!;
        return (
          <div
            className="card elev"
            style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: `translate(-50%, calc(-100% - 40px))`, width: 260, padding: 14, zIndex: 30, animation: 'fadeUp 0.2s ease both' }}
            onMouseEnter={() => setHoveredId(selected.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', color: 'var(--muted)', padding: 4 }} onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}>
              <XIcon size={14} />
            </div>
            <div className="row gap-10" style={{ marginBottom: 10 }}>
              <img src={selected.avatar} className="avatar" style={{ width: 44, height: 44 }} alt="" />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selected.title} {selected.name}
                </div>
                <div className="muted text-xs">{selected.primarySpecialty}</div>
              </div>
            </div>
            <div className="row gap-10 wrap" style={{ marginBottom: 10, fontSize: 12 }}>
              <Rating value={selected.rating} count={selected.reviews} size={12} />
              {selected.verified && (
                <span className="text-xs row gap-4" style={{ color: 'var(--accent-ink)', fontWeight: 600 }}>
                  <ShieldCheckIcon size={11} /> Verificado
                </span>
              )}
            </div>
            <div className="row between" style={{ paddingTop: 10, borderTop: '1px solid var(--line)' }}>
              <div>
                <div className="text-xs muted">Consulta desde</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 14 }}>{selected.consultPriceFormatted}</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => navigate(`/lawyer/${selected.slug}`)}>
                Ver perfil <ArrowRightIcon size={12} />
              </button>
            </div>
            <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 16, height: 16, background: 'white', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}></div>
          </div>
        );
      })()}

      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '10px 14px', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-sm)', fontSize: 12.5, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 25 }}>
        <span className="row gap-6"><PinIcon size={13} /> {lawyers.length} oficinas</span>
        <span className="muted" style={{ fontWeight: 500 }}>Costa Rica</span>
      </div>
      <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 'var(--r-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', zIndex: 25 }}>
        {['+', '−'].map(s => (
          <button key={s} style={{ border: 0, background: 'white', width: 34, height: 34, cursor: 'pointer', fontSize: 16, fontWeight: 500, color: 'var(--navy)', borderBottom: s === '+' ? '1px solid var(--line)' : 'none', fontFamily: 'inherit' }}>{s}</button>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: 12, fontSize: 9, color: 'rgba(11,31,77,0.4)', fontFamily: 'var(--font-mono)' }}>JurisGO Maps · CR</div>
    </div>
  );
}

// ─── FilterControls ───
function FilterControls({
  filters, setFilters, toggleArr, clearFilters, lang, t, hideHeader,
}: {
  filters: ReturnType<typeof useApp>['filters'];
  setFilters: (f: ReturnType<typeof useApp>['filters']) => void;
  toggleArr: (key: string, val: string) => void;
  clearFilters: () => void;
  lang: string;
  t: (k: string) => string;
  hideHeader?: boolean;
}) {
  return (
    <>
      {!hideHeader && (
        <div className="row between" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, margin: 0 }}>{t('search.filters')}</h3>
          <button className="btn btn-link text-sm muted" onClick={clearFilters}>{t('search.clear')}</button>
        </div>
      )}
      <div className="filter-group">
        <h5>{t('filter.verified')}</h5>
        <label className="filter-check">
          <input type="checkbox" checked={!!filters.verifiedOnly} onChange={e => setFilters({ ...filters, verifiedOnly: e.target.checked })} />
          <ShieldCheckIcon size={14} />
          <span>{t('filter.verified.only')}</span>
        </label>
        <label className="filter-check">
          <input type="checkbox" checked={!!filters.availableNow} onChange={e => setFilters({ ...filters, availableNow: e.target.checked })} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></span>
          <span>{t('filter.available_now')}</span>
        </label>
      </div>
      <div className="filter-group">
        <h5>{t('filter.specialty')}</h5>
        {SPECIALTIES.slice(0, 8).map(s => (
          <label key={s.id} className="filter-check">
            <input type="radio" name="spec" checked={filters.specialty === s.id} onChange={() => setFilters({ ...filters, specialty: s.id })} />
            <span>{lang === 'es' ? s.label_es : s.label_en}</span>
            <span className="count">{Math.floor((s.id.charCodeAt(0) * 7) % 80) + 20}</span>
          </label>
        ))}
        <button className="btn btn-link text-sm" style={{ marginTop: 8 }}>+ {t('filter.specialty')}…</button>
      </div>
      <div className="filter-group">
        <h5>{t('filter.location')}</h5>
        {LOCATIONS.slice(0, 6).map(l => (
          <label key={l} className="filter-check">
            <input type="checkbox" checked={filters.location === l} onChange={() => setFilters({ ...filters, location: filters.location === l ? null : l })} />
            <span>{l}</span>
            <span className="count">{Math.floor((l.charCodeAt(0) * 5) % 100) + 30}</span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h5>{t('filter.language')}</h5>
        {['Español', 'Inglés', 'Francés', 'Portugués'].map(lng => (
          <label key={lng} className="filter-check">
            <input type="checkbox" checked={(filters.languages || []).includes(lng)} onChange={() => toggleArr('languages', lng)} />
            <span>{lng}</span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h5>{t('filter.rating')}</h5>
        {[4.5, 4.0, 3.5].map(r => (
          <label key={r} className="filter-check">
            <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => setFilters({ ...filters, minRating: r })} />
            <StarIcon size={13} filled />
            <span>{r.toFixed(1)}+</span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h5>{t('filter.budget')}</h5>
        {BUDGET_OPTIONS.slice(0, 4).map(b => (
          <label key={b.id} className="filter-check">
            <input type="radio" name="budget" checked={filters.budget === b.id} onChange={() => setFilters({ ...filters, budget: b.id })} />
            <span style={{ flex: 1 }}>
              <div>{lang === 'es' ? b.label_es : b.label_en}</div>
              <div className="text-xs muted" style={{ marginTop: 2 }}>{b.range}</div>
            </span>
          </label>
        ))}
      </div>
    </>
  );
}

// ─── Active filter chips ───
function ActiveChips({ filters, setFilters, toggleArr, t, lang }: {
  filters: ReturnType<typeof useApp>['filters'];
  setFilters: (f: ReturnType<typeof useApp>['filters']) => void;
  toggleArr: (key: string, val: string) => void;
  t: (k: string) => string;
  lang: string;
}) {
  const has = filters.specialty || filters.location || filters.urgency || filters.budget || filters.verifiedOnly || filters.minRating || (filters.languages || []).length;
  if (!has) return null;
  return (
    <div className="row gap-8 wrap" style={{ marginBottom: 20 }}>
      {filters.specialty && (
        <span className="chip chip-navy">
          {SPECIALTIES.find(s => s.id === filters.specialty)?.[lang === 'es' ? 'label_es' : 'label_en']}
          <span onClick={() => setFilters({ ...filters, specialty: null })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {filters.location && (
        <span className="chip chip-navy">
          <PinIcon size={11} /> {filters.location}
          <span onClick={() => setFilters({ ...filters, location: null })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {filters.urgency && (
        <span className="chip chip-accent">
          {URGENCY_OPTIONS.find(u => u.id === filters.urgency)?.emoji}{' '}
          {URGENCY_OPTIONS.find(u => u.id === filters.urgency)?.[lang === 'es' ? 'label_es' : 'label_en']}
          <span onClick={() => setFilters({ ...filters, urgency: null })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {filters.budget && (
        <span className="chip chip-accent">
          <WalletIcon size={11} /> {BUDGET_OPTIONS.find(b => b.id === filters.budget)?.[lang === 'es' ? 'label_es' : 'label_en']}
          <span onClick={() => setFilters({ ...filters, budget: null })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {filters.verifiedOnly && (
        <span className="chip chip-accent">
          <ShieldCheckIcon size={11} /> {t('filter.verified.only')}
          <span onClick={() => setFilters({ ...filters, verifiedOnly: false })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {filters.minRating && (
        <span className="chip chip-accent">
          <StarIcon size={11} filled /> {filters.minRating}+
          <span onClick={() => setFilters({ ...filters, minRating: null })} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      )}
      {(filters.languages || []).map(lng => (
        <span key={lng} className="chip chip-accent">
          <GlobeIcon size={11} /> {lng}
          <span onClick={() => toggleArr('languages', lng)} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span>
        </span>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const { lang, setLang, filters, setFilters } = useApp();
  const router = useRouter();
  const { isMobile, isPhone } = useBreakpoint();
  const translate = (key: string) => tFn(lang, key);

  const [sort, setSort] = useState('recommended');
  const [viewMode, setViewMode] = useState<'list' | 'split' | 'map'>('split');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [mapOverlayOpen, setMapOverlayOpen] = useState(false);

  useEffect(() => {
    const lock = filterSheetOpen || mapOverlayOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [filterSheetOpen, mapOverlayOpen]);

  // Filter
  let results = LAWYERS.slice();
  if (filters.specialty) results = results.filter(l => l.specialties.includes(filters.specialty!));
  if (filters.location) results = results.filter(l => l.locations.includes(filters.location!));
  if (filters.verifiedOnly) results = results.filter(l => l.verified);
  if (filters.availableNow) results = results.filter(l => l.available);
  if (filters.minRating) results = results.filter(l => l.rating >= filters.minRating!);
  if (filters.languages?.length) results = results.filter(l => filters.languages!.some(lng => l.languages.includes(lng)));
  if (filters.budget && filters.budget !== 'pending') {
    const ranges: Record<string, [number, number]> = { consult: [0, 40000], low: [0, 150000], mid: [0, 500000], high: [0, Infinity] };
    const [, max] = ranges[filters.budget] || [0, Infinity];
    results = results.filter(l => l.consultPrice <= max);
  }

  // Sort
  if (sort === 'rating') results = [...results].sort((a, b) => b.rating - a.rating);
  if (sort === 'price_asc') results = [...results].sort((a, b) => a.consultPrice - b.consultPrice);
  if (sort === 'price_desc') results = [...results].sort((a, b) => b.consultPrice - a.consultPrice);
  if (sort === 'response') results = [...results].sort((a, b) => parseInt(a.responseTime) - parseInt(b.responseTime));
  if (sort === 'recommended') results = [...results].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);

  const toggleArr = (key: string, val: string) => {
    const cur = (filters as Record<string, unknown>)[key] as string[] || [];
    const next = cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val];
    setFilters({ ...filters, [key]: next });
  };
  const clearFilters = () => setFilters({});
  const navigate = (path: string) => router.push(path);

  const activeFilterCount =
    (filters.specialty ? 1 : 0) + (filters.location ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) + (filters.availableNow ? 1 : 0) +
    (filters.minRating ? 1 : 0) + (filters.budget ? 1 : 0) +
    ((filters.languages || []).length);

  const showMap = !isMobile && viewMode !== 'list';
  const showList = isMobile || viewMode !== 'map';

  let layoutCols = '280px 1fr';
  if (showMap && showList) layoutCols = '260px minmax(0,1fr) minmax(0,1.05fr)';
  else if (!showList) layoutCols = '260px 1fr';

  return (
    <div className="app">
      <Header lang={lang} setLang={setLang} />

      <main className="page">
        <div className="search-page-bar">
          <div className="container">
            <SearchBar filters={filters} setFilters={setFilters} lang={lang} onSearch={() => router.push('/search')} />
          </div>
        </div>

        <div className="container container-wide">
          <div className="search-layout" style={{ gridTemplateColumns: isMobile ? '1fr' : layoutCols }}>
            {/* Filter panel */}
            {!isMobile && (
              <aside className="filter-panel">
                <FilterControls filters={filters} setFilters={setFilters} toggleArr={toggleArr} clearFilters={clearFilters} lang={lang} t={translate} />
              </aside>
            )}

            {/* Results */}
            {showList && (
              <main>
                <div className="results-head">
                  <div>
                    <h2 style={{ fontSize: isPhone ? 22 : 26, marginBottom: 4 }}>
                      {filters.specialty
                        ? SPECIALTIES.find(s => s.id === filters.specialty)?.[lang === 'es' ? 'label_es' : 'label_en']
                        : translate('search.title')}
                      {filters.location && <span className="muted"> · {filters.location}</span>}
                    </h2>
                    <span className="muted text-sm">{results.length} {translate('search.results')}</span>
                  </div>
                  {!isMobile && (
                    <div className="row gap-12 wrap">
                      <div className="sort-pill" style={{ background: 'var(--faint)' }}>
                        {(['list', 'split', 'map'] as const).map(m => (
                          <button key={m} className={viewMode === m ? 'on' : ''} onClick={() => setViewMode(m)}>
                            {m === 'list' ? 'Lista' : m === 'split' ? 'Dividido' : 'Mapa'}
                          </button>
                        ))}
                      </div>
                      <div className="sort-pill">
                        {(['recommended', 'rating', 'price_asc'] as const).map(s => (
                          <button key={s} className={sort === s ? 'on' : ''} onClick={() => setSort(s)}>
                            {translate(`search.sort.${s}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isMobile && (
                  <div className="mobile-search-toolbar">
                    <button className="mobile-tool-btn" onClick={() => setFilterSheetOpen(true)}>
                      <FilterIcon size={15} />
                      {translate('search.filters')}
                      {activeFilterCount > 0 && <span className="tool-badge">{activeFilterCount}</span>}
                    </button>
                    <div className="mobile-sort-wrap">
                      <select className="mobile-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="recommended">{translate('search.sort.recommended')}</option>
                        <option value="rating">{translate('search.sort.rating')}</option>
                        <option value="price_asc">{translate('search.sort.price_asc')}</option>
                        <option value="response">{translate('search.sort.response')}</option>
                      </select>
                    </div>
                    <button className="mobile-tool-btn primary" onClick={() => setMapOverlayOpen(true)}>
                      <PinIcon size={15} />
                      {translate('search.show_map')}
                    </button>
                  </div>
                )}

                <ActiveChips filters={filters} setFilters={setFilters} toggleArr={toggleArr} t={translate} lang={lang} />

                {results.length === 0 ? (
                  <div className="card" style={{ textAlign: 'center', padding: 60 }}>
                    <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>⚖</div>
                    <h3 style={{ marginBottom: 8 }}>{translate('no_results')}</h3>
                    <p className="muted">Probá ampliando los filtros o cambiando la ubicación.</p>
                    <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={clearFilters}>{translate('search.clear')}</button>
                  </div>
                ) : (
                  <div className="results-list">
                    {results.map((l, i) => (
                      <div
                        key={l.id}
                        onMouseEnter={() => setHoveredId(l.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedId(l.id)}
                        style={{
                          position: 'relative',
                          transition: 'transform 0.15s ease',
                          transform: hoveredId === l.id ? 'translateX(2px)' : 'none',
                        }}
                      >
                        <div style={{
                          position: 'absolute', top: 12, left: -12,
                          width: 26, height: 26, borderRadius: '50%',
                          background: (hoveredId === l.id || selectedId === l.id) ? 'var(--accent)' : 'var(--navy)',
                          color: (hoveredId === l.id || selectedId === l.id) ? 'var(--navy-ink)' : 'white',
                          display: 'grid', placeItems: 'center',
                          fontWeight: 700, fontSize: 12,
                          boxShadow: 'var(--shadow-sm)', zIndex: 5,
                          border: '2px solid white',
                          transition: 'background 0.18s, color 0.18s',
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ boxShadow: selectedId === l.id ? '0 0 0 2px var(--accent)' : 'none', borderRadius: 'var(--r-lg)', transition: 'box-shadow 0.15s' }}>
                          <LawyerCard lawyer={l} lang={lang} variant="list" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            )}

            {/* Map */}
            {showMap && (
              <aside className={viewMode === 'map' ? 'map-aside map-aside-full' : 'map-aside'}>
                <ResultsMap
                  lawyers={results}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  navigate={navigate}
                />
                {viewMode === 'map' && (
                  <div className="map-overlay-cards">
                    {results.slice(0, 4).map((l, i) => (
                      <div
                        key={l.id}
                        className="map-overlay-card"
                        onMouseEnter={() => setHoveredId(l.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => navigate(`/lawyer/${l.slug}`)}
                        style={hoveredId === l.id ? { boxShadow: '0 0 0 2px var(--accent), var(--shadow-md)' } : {}}
                      >
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--navy)', color: 'white', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                        <img src={l.avatar} className="avatar" style={{ width: 36, height: 36 }} alt="" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title} {l.name}</div>
                          <div className="row gap-6 muted text-xs"><StarIcon size={11} filled /> {l.rating} · {l.primarySpecialty}</div>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--navy)' }}>{l.consultPriceFormatted}</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>

        {/* Mobile filter sheet */}
        {isMobile && (
          <div className={`sheet-root ${filterSheetOpen ? 'open' : ''}`}>
            <div className="sheet-backdrop" onClick={() => setFilterSheetOpen(false)}></div>
            <div className="sheet">
              <div className="sheet-handle"></div>
              <div className="sheet-head">
                <h3 style={{ fontSize: 19, margin: 0 }}>{translate('search.filters')}</h3>
                <button className="btn btn-icon btn-ghost" onClick={() => setFilterSheetOpen(false)}><XIcon /></button>
              </div>
              <div className="sheet-body">
                <FilterControls filters={filters} setFilters={setFilters} toggleArr={toggleArr} clearFilters={clearFilters} lang={lang} t={translate} hideHeader />
              </div>
              <div className="sheet-foot">
                <button className="btn btn-ghost" onClick={clearFilters}>{translate('search.clear')}</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setFilterSheetOpen(false)}>
                  {translate('search.results_show').replace('{n}', String(results.length))}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile full-screen map */}
        {isMobile && mapOverlayOpen && (
          <div className="map-fullscreen">
            <div className="map-fullscreen-bar">
              <button className="btn btn-ghost btn-sm" onClick={() => setMapOverlayOpen(false)}>
                <XIcon size={15} /> {translate('search.hide_map')}
              </button>
              <span className="text-sm" style={{ fontWeight: 600 }}>{results.length} {translate('search.results')}</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <ResultsMap lawyers={results} hoveredId={hoveredId} setHoveredId={setHoveredId} selectedId={selectedId} setSelectedId={setSelectedId} navigate={navigate} height="100%" />
            </div>
            <div className="map-fullscreen-rail">
              {results.map((l, i) => (
                <div key={l.id} className="map-rail-card" onClick={() => setSelectedId(l.id)} style={selectedId === l.id ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 2px var(--accent)' } : {}}>
                  <div className="map-rail-num">{i + 1}</div>
                  <img src={l.avatar} className="avatar" style={{ width: 40, height: 40 }} alt="" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title} {l.name}</div>
                    <div className="row gap-6 muted text-xs"><StarIcon size={11} filled /> {l.rating} · {l.consultPriceFormatted}</div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); navigate(`/lawyer/${l.slug}`); }}>
                    <ArrowRightIcon size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Footer lang={lang} />
      </main>
    </div>
  );
}
