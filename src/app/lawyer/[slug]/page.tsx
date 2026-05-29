'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { t as tFn } from '@/lib/i18n';
import { LAWYERS, SPECIALTIES, REVIEWS } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LawyerCard from '@/components/LawyerCard';
import MapView from '@/components/MapView';
import ContactModal from '@/components/ContactModal';
import VerifiedBadge from '@/components/VerifiedBadge';
import Rating from '@/components/Rating';
import {
  BriefcaseIcon, PinIcon, GlobeIcon, StarIcon, HeartIcon, ShareIcon,
  AwardIcon, ShieldCheckIcon, SparklesIcon, CheckIcon, CalendarIcon,
  ChatIcon, ArrowRightIcon,
} from '@/components/Icons';

export default function ProfilePage() {
  const { lang, setLang } = useApp();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const translate = (key: string) => tFn(lang, key);

  const lawyer = LAWYERS.find(l => l.slug === slug) || LAWYERS[0];
  const [tab, setTab] = useState<'bio' | 'experience' | 'offices' | 'reviews'>('bio');
  const [activeOffice, setActiveOffice] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);

  const reviews = REVIEWS[lawyer.id] || [];
  const totalReviews = reviews.length || lawyer.reviews;
  const similar = LAWYERS.filter(l => l.id !== lawyer.id && l.specialties.some(s => lawyer.specialties.includes(s))).slice(0, 3);
  const officePins = lawyer.offices.map((_, i) => ({ x: 20 + i * 30, y: 35 + (i % 2) * 25, label: lawyer.offices[i]?.city }));

  return (
    <div className="app">
      <Header lang={lang} setLang={setLang} />

      <main className="page profile-page">
        {/* Cover */}
        <div className="profile-cover">
          <div className="profile-cover-pattern"></div>
          <div className="container" style={{ position: 'relative', height: '100%' }}>
            <button
              onClick={() => router.push('/search')}
              className="btn btn-link"
              style={{ position: 'absolute', top: 20, left: 28, color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.35)', fontWeight: 500, fontSize: 13 }}
            >
              {translate('profile.back')}
            </button>
          </div>
        </div>

        <div className="container">
          {/* Profile head */}
          <div className="profile-head">
            <div className="profile-avatar-wrap">
              <img src={lawyer.avatar} alt={lawyer.name} />
            </div>
            <div className="profile-name-block">
              <div className="row gap-12 wrap" style={{ marginBottom: 10 }}>
                {lawyer.verified && <VerifiedBadge size="lg" />}
                {lawyer.available && (
                  <span className="chip chip-outline" style={{ color: 'var(--success)', borderColor: 'rgba(15,157,112,0.3)', background: 'rgba(15,157,112,0.08)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></span>
                    {translate('available_today')}
                  </span>
                )}
              </div>
              <h1>{lawyer.title} {lawyer.name}</h1>
              <div className="row gap-16 wrap" style={{ marginTop: 12, fontSize: 14 }}>
                <span className="row gap-6"><BriefcaseIcon size={14} />{lawyer.primarySpecialty}</span>
                <span className="row gap-6"><PinIcon size={14} />{lawyer.locations.join(', ')}</span>
                <Rating value={lawyer.rating} count={totalReviews} />
                <span className="row gap-6 muted"><GlobeIcon size={14} />{lawyer.languages.join(' · ')}</span>
              </div>
            </div>
            <div className="row gap-8" style={{ paddingBottom: 12 }}>
              <button className="btn btn-icon btn-ghost" title={translate('profile.save')}><HeartIcon size={15} /></button>
              <button className="btn btn-icon btn-ghost" title={translate('profile.share')}><ShareIcon size={15} /></button>
            </div>
          </div>

          <div className="profile-layout">
            {/* Main content */}
            <div>
              {/* Metrics */}
              <div className="detail-grid" style={{ marginBottom: 32 }}>
                <div className="detail-tile">
                  <h6>{translate('profile.metrics.exp')}</h6>
                  <p className="detail-tile-value">{lawyer.yearsExp} <span style={{ fontSize: 13, color: 'var(--muted)' }} className="serif">años</span></p>
                </div>
                <div className="detail-tile">
                  <h6>{translate('profile.metrics.cases')}</h6>
                  <p className="detail-tile-value">{Math.floor(lawyer.yearsExp * 22)}<span style={{ fontSize: 13, color: 'var(--muted)' }}>+</span></p>
                </div>
                <div className="detail-tile">
                  <h6>{translate('profile.metrics.response')}</h6>
                  <p className="detail-tile-value">{lawyer.responseTime}</p>
                </div>
                <div className="detail-tile">
                  <h6>{translate('profile.metrics.reviews')}</h6>
                  <p className="detail-tile-value">
                    <StarIcon size={18} filled /> {lawyer.rating} <span style={{ fontSize: 13, color: 'var(--muted)' }}>({totalReviews})</span>
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="tabs" style={{ marginBottom: 24 }}>
                {([
                  { id: 'bio', label: translate('profile.bio') },
                  { id: 'experience', label: translate('profile.experience') },
                  { id: 'offices', label: `${translate('profile.offices')} (${lawyer.offices.length})` },
                  { id: 'reviews', label: `${translate('profile.reviews')} (${totalReviews})` },
                ] as const).map(tb => (
                  <button key={tb.id} className={tab === tb.id ? 'active' : ''} onClick={() => setTab(tb.id)}>
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Bio tab */}
              {tab === 'bio' && (
                <div className="fade-in">
                  <div className="profile-section">
                    <h3>{translate('profile.bio')}</h3>
                    <p className="bio-text">{lawyer.bio}</p>
                  </div>
                  <div className="profile-section">
                    <h3>{translate('profile.specialties')}</h3>
                    <div className="row gap-8 wrap">
                      {lawyer.specialties.map(sid => {
                        const s = SPECIALTIES.find(x => x.id === sid);
                        return <span key={sid} className="chip" style={{ padding: '6px 14px', fontSize: 13 }}>{lang === 'es' ? s?.label_es : s?.label_en}</span>;
                      })}
                    </div>
                  </div>
                  <div className="profile-section">
                    <h3>{translate('profile.languages')}</h3>
                    <div className="row gap-8 wrap">
                      {lawyer.languages.map(l => (
                        <span key={l} className="chip" style={{ padding: '6px 14px', fontSize: 13 }}>
                          <GlobeIcon size={12} /> {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Experience tab */}
              {tab === 'experience' && (
                <div className="fade-in">
                  <div className="profile-section">
                    <h3>{translate('profile.education')}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {lawyer.education.map((e, i) => (
                        <li key={i} className="row gap-10" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                          <AwardIcon size={16} />
                          <span className="text-md">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="profile-section">
                    <h3>{translate('profile.certifications')}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {lawyer.certifications.map((c, i) => (
                        <li key={i} className="row gap-10" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                          <ShieldCheckIcon size={16} />
                          <span className="text-md">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="profile-section">
                    <h3>Logros destacados</h3>
                    <div className="detail-grid">
                      {lawyer.cases.map((c, i) => (
                        <div key={i} className="detail-tile" style={{ padding: 14 }}>
                          <div className="row gap-8">
                            <SparklesIcon size={14} />
                            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{c}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Offices tab */}
              {tab === 'offices' && (
                <div className="fade-in">
                  <div className="profile-section">
                    <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 16 }}>
                      <MapView pins={officePins} height={320} active={activeOffice} onPinClick={setActiveOffice} />
                    </div>
                    <div className="col gap-8">
                      {lawyer.offices.map((o, i) => (
                        <div
                          key={i}
                          className="office-card"
                          onClick={() => setActiveOffice(i)}
                          style={i === activeOffice ? { borderColor: 'var(--navy)', background: 'var(--faint)' } : {}}
                        >
                          <div className="pin-icon"><PinIcon size={16} /></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{o.city}</div>
                            <div className="text-sm muted">{o.address}</div>
                          </div>
                          <ArrowRightIcon size={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews tab */}
              {tab === 'reviews' && (
                <div className="fade-in">
                  <div className="profile-section">
                    <div className="row gap-24" style={{ marginBottom: 24, padding: 20, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-md)' }}>
                      <div>
                        <div className="serif" style={{ fontSize: 48, color: 'var(--navy)', letterSpacing: '-0.02em', lineHeight: 1 }}>{lawyer.rating}</div>
                        <div className="row gap-2" style={{ marginTop: 6, color: 'var(--star)' }}>
                          {[0,1,2,3,4].map(i => <StarIcon key={i} size={14} filled />)}
                        </div>
                        <div className="text-xs muted" style={{ marginTop: 4 }}>{totalReviews} reseñas</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {[5,4,3,2,1].map(n => {
                          const pct = n === 5 ? 78 : n === 4 ? 18 : n === 3 ? 3 : 1;
                          return (
                            <div key={n} className="row gap-10" style={{ marginBottom: 4, fontSize: 12 }}>
                              <span className="muted" style={{ width: 14 }}>{n}</span>
                              <StarIcon size={11} filled />
                              <div style={{ flex: 1, height: 6, background: 'var(--faint)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--star)' }}></div>
                              </div>
                              <span className="muted" style={{ width: 30, textAlign: 'right' }}>{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {(reviews.length ? reviews : [{ author: 'Cliente verificado', date: 'Hace 1 mes', rating: 5, text: 'Atención profesional y resultados claros. Recomendado.' }]).map((r, i) => (
                      <div key={i} className="review-card">
                        <div className="review-author-row">
                          <span className="author-name">{r.author}</span>
                          <span className="review-date">{r.date}</span>
                        </div>
                        <div className="review-stars">
                          {[...Array(r.rating)].map((_, j) => <StarIcon key={j} size={13} filled />)}
                        </div>
                        <p className="review-text">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="profile-sidebar">
              <div className="profile-cta-card">
                <div className="text-xs muted" style={{ marginBottom: 6, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {translate('profile.book.title')}
                </div>
                <div className="price-row">
                  <div>
                    <div className="price">{lawyer.consultPriceFormatted}</div>
                    <div className="text-xs muted" style={{ marginTop: 2 }}>{translate('profile.consult_30')}</div>
                  </div>
                  <CalendarIcon size={20} />
                </div>
                <p className="text-sm muted" style={{ padding: '14px 0 0' }}>
                  {translate('profile.consult_includes')}
                </p>
                <div className="availability-row">
                  <span className="availability-dot"></span>
                  <span style={{ fontWeight: 500 }}>{translate('responds_in')} {lawyer.responseTime}</span>
                </div>
                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 16 }} onClick={() => setContactOpen(true)}>
                  <ChatIcon size={15} /> {translate('profile.contact')}
                </button>
                <button className="btn btn-ghost btn-lg" style={{ width: '100%', marginTop: 8 }}>
                  <CalendarIcon size={15} /> {translate('profile.schedule')}
                </button>
                <ul className="credentials">
                  <li><CheckIcon size={14} /> Verificación de cédula activa</li>
                  <li><CheckIcon size={14} /> Reseñas auditadas</li>
                  <li><CheckIcon size={14} /> Pago seguro vía JurisGO</li>
                </ul>
              </div>
              <div style={{ marginTop: 16, padding: 20, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-md)' }}>
                <div className="row gap-8" style={{ marginBottom: 8 }}>
                  <ShieldCheckIcon size={16} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Verificación Pro</span>
                </div>
                <p className="text-sm muted" style={{ lineHeight: 1.5 }}>
                  Identidad confirmada por el Colegio de Abogados y Abogadas de Costa Rica · Carné #{lawyer.certifications[0]?.match(/\d+/)?.[0] || '—'}
                </p>
              </div>
            </aside>
          </div>

          {/* Similar lawyers */}
          {similar.length > 0 && (
            <section style={{ paddingBottom: 60 }}>
              <h2 style={{ marginBottom: 24, fontSize: 26 }}>{translate('profile.similar')}</h2>
              <div className="featured-grid">
                {similar.map(l => (
                  <LawyerCard key={l.id} lawyer={l} lang={lang} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Mobile sticky action bar */}
        <div className="profile-action-bar">
          <div className="price-block">
            <div className="text-xs muted" style={{ marginBottom: 1 }}>{translate('consult_from')}</div>
            <div className="price">{lawyer.consultPriceFormatted}</div>
          </div>
          <button className="btn btn-primary" onClick={() => setContactOpen(true)}>
            <ChatIcon size={15} /> {translate('profile.contact')}
          </button>
        </div>

        <Footer lang={lang} />
      </main>

      {contactOpen && (
        <ContactModal lawyer={lawyer} onClose={() => setContactOpen(false)} lang={lang} />
      )}
    </div>
  );
}
