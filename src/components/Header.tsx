'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandMark from './BrandMark';
import { XIcon } from './Icons';
import { t as tFn, type Lang } from '@/lib/i18n';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();
  const pathname = usePathname();
  const translate = (key: string) => tFn(lang, key);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" style={{ textDecoration: 'none' }}>
          <BrandMark />
          <div className="brand-name">Juris<b>GO</b></div>
        </Link>

        {!isMobile && (
          <nav className="nav">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>{translate('nav.search')}</Link>
            <Link href="/search">{translate('nav.specialties')}</Link>
            <a style={{ cursor: 'pointer' }}>{translate('nav.how')}</a>
            <a style={{ cursor: 'pointer' }}>{translate('nav.lawyers')}</a>
          </nav>
        )}

        {!isMobile ? (
          <div className="header-actions">
            <div className="lang-toggle">
              <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
            </div>
            <button className="btn btn-ghost btn-sm">{translate('nav.login')}</button>
            <button className="btn btn-primary btn-sm">{translate('nav.cta')}</button>
          </div>
        ) : (
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        )}
      </div>

      {isMobile && (
        <div className={`mobile-drawer-root ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)}></div>
          <div className="mobile-drawer">
            <div className="mobile-drawer-head">
              <Link href="/" className="brand" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <BrandMark />
                <div className="brand-name">Juris<b>GO</b></div>
              </Link>
              <button className="btn btn-icon btn-ghost" onClick={() => setMenuOpen(false)} aria-label="Cerrar">
                <XIcon />
              </button>
            </div>
            <nav className="mobile-nav">
              <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                {translate('nav.search')}
              </Link>
              <Link href="/search" onClick={() => setMenuOpen(false)}>{translate('nav.specialties')}</Link>
              <a onClick={() => setMenuOpen(false)}>{translate('nav.how')}</a>
              <a onClick={() => setMenuOpen(false)}>{translate('nav.lawyers')}</a>
            </nav>
            <div className="mobile-drawer-foot">
              <div className="row between" style={{ marginBottom: 14 }}>
                <span className="text-sm muted">Idioma</span>
                <div className="lang-toggle">
                  <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
                  <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
                </div>
              </div>
              <button className="btn btn-ghost" style={{ width: '100%', marginBottom: 8 }}>{translate('nav.login')}</button>
              <button className="btn btn-primary" style={{ width: '100%' }}>{translate('nav.cta')}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
