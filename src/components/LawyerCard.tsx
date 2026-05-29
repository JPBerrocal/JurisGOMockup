'use client';

import { useRouter } from 'next/navigation';
import type { Lawyer } from '@/lib/data';
import { t as tFn, type Lang } from '@/lib/i18n';
import VerifiedBadge from './VerifiedBadge';
import Rating from './Rating';
import {
  ArrowRightIcon, BriefcaseIcon, ClockIcon, PinIcon,
} from './Icons';

interface LawyerCardProps {
  lawyer: Lawyer;
  variant?: 'photo' | 'list';
  lang: Lang;
  onNavigate?: (path: string) => void;
}

export default function LawyerCard({ lawyer, variant = 'photo', lang, onNavigate }: LawyerCardProps) {
  const router = useRouter();
  const translate = (key: string) => tFn(lang, key);
  const navigate = (path: string) => {
    if (onNavigate) onNavigate(path);
    else router.push(path);
  };

  if (variant === 'list') {
    return (
      <div
        className="card elev interactive lawyer-card-list"
        onClick={() => navigate(`/lawyer/${lawyer.slug}`)}
      >
        <img src={lawyer.avatar} className="avatar" style={{ width: 88, height: 88 }} alt={lawyer.name} />
        <div className="lawyer-card-list-body">
          <div className="row gap-10 wrap" style={{ marginBottom: 4 }}>
            <h4 style={{ margin: 0 }}>{lawyer.title} {lawyer.name}</h4>
            {lawyer.verified && <VerifiedBadge />}
          </div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>
            {lawyer.primarySpecialty} · {lawyer.yearsExp} {translate('years_exp')}
          </div>
          <div className="row gap-12 wrap" style={{ marginBottom: 10 }}>
            <Rating value={lawyer.rating} count={lawyer.reviews} />
            <span style={{ color: 'var(--line-strong)' }}>·</span>
            <span className="row gap-4 muted text-sm"><PinIcon size={13} />{lawyer.locations.join(', ')}</span>
            <span style={{ color: 'var(--line-strong)' }}>·</span>
            <span className="row gap-4 muted text-sm"><ClockIcon size={13} />{translate('responds_in')} {lawyer.responseTime}</span>
          </div>
          <p className="text-sm muted" style={{
            marginBottom: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {lawyer.bio}
          </p>
        </div>
        <div className="lawyer-card-list-side">
          <div className="text-xs muted" style={{ marginBottom: 2 }}>{translate('consult_from')}</div>
          <div className="serif" style={{ fontSize: 22, color: 'var(--navy)', letterSpacing: '-0.01em', marginBottom: 12 }}>
            {lawyer.consultPriceFormatted}
          </div>
          <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            {translate('view_profile')} <ArrowRightIcon size={13} />
          </button>
          {lawyer.available && (
            <div className="row gap-6 center text-xs" style={{ marginTop: 10, color: 'var(--success)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }}></span>
              {translate('available_today')}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="card elev interactive lawyer-card-photo"
      onClick={() => navigate(`/lawyer/${lawyer.slug}`)}
    >
      <div className="lawyer-card-photo-head">
        <img src={lawyer.avatar} className="avatar" style={{ width: 64, height: 64 }} alt={lawyer.name} />
        <div className="col" style={{ flex: 1, minWidth: 0 }}>
          <div className="row gap-8 wrap" style={{ marginBottom: 2 }}>
            <h4 style={{ margin: 0 }}>{lawyer.title} {lawyer.name}</h4>
            {lawyer.verified && <VerifiedBadge />}
          </div>
          <div className="muted text-sm">{lawyer.primarySpecialty}</div>
        </div>
      </div>
      <div className="row gap-12 wrap" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
        <Rating value={lawyer.rating} count={lawyer.reviews} />
        <span className="row gap-4 muted text-sm"><BriefcaseIcon size={12} />{lawyer.yearsExp} {translate('years_exp')}</span>
        <span className="row gap-4 muted text-sm">
          <PinIcon size={12} />{lawyer.locations[0]}{lawyer.locations.length > 1 && ` +${lawyer.locations.length - 1}`}
        </span>
      </div>
      <p className="text-sm muted" style={{
        margin: '14px 0 0',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {lawyer.bio}
      </p>
      <div className="row between" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
        <div className="col">
          <div className="text-xs muted">{translate('consult_from')}</div>
          <div className="serif navy" style={{ fontSize: 20, letterSpacing: '-0.01em' }}>{lawyer.consultPriceFormatted}</div>
        </div>
        <button className="btn btn-primary btn-sm">
          {translate('view_profile')} <ArrowRightIcon size={13} />
        </button>
      </div>
    </div>
  );
}
