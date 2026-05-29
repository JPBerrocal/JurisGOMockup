import BrandMark from './BrandMark';
import { t as tFn, type Lang } from '@/lib/i18n';

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const translate = (key: string) => tFn(lang, key);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <div className="row gap-10" style={{ marginBottom: 12 }}>
              <BrandMark size={32} />
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'white', letterSpacing: '-0.02em' }}>
                Juris<b>GO</b>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 280, lineHeight: 1.55 }}>
              {translate('footer.tagline')}
            </p>
            <div className="row gap-8" style={{ marginTop: 18 }}>
              {['X', 'In', 'Fb', 'Ig'].map(s => (
                <div key={s} style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  display: 'grid', placeItems: 'center',
                  fontSize: 11, fontWeight: 600,
                }}>{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h5>{translate('footer.find')}</h5>
            <a>{translate('footer.by_specialty')}</a>
            <a>{translate('footer.by_city')}</a>
            <a>{translate('footer.by_lang')}</a>
            <a>{translate('footer.urgent')}</a>
          </div>
          <div>
            <h5>{translate('footer.lawyers')}</h5>
            <a>{translate('footer.join')}</a>
            <a>{translate('footer.pricing')}</a>
            <a>{translate('footer.verification')}</a>
            <a>{translate('footer.support')}</a>
          </div>
          <div>
            <h5>{translate('footer.company')}</h5>
            <a>{translate('footer.about')}</a>
            <a>{translate('footer.blog')}</a>
            <a>{translate('footer.contact')}</a>
            <a>{translate('footer.press')}</a>
          </div>
          <div>
            <h5>{translate('footer.legal')}</h5>
            <a>{translate('footer.terms')}</a>
            <a>{translate('footer.privacy')}</a>
            <a>{translate('footer.cookies')}</a>
            <a>{translate('footer.ethics')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 JurisGO Costa Rica · {translate('footer.rights')}</span>
          <span className="muted-2 text-sm">{translate('footer.made')} 🇨🇷</span>
        </div>
      </div>
    </footer>
  );
}
