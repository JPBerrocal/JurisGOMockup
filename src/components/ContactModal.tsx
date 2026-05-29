'use client';

import { useState } from 'react';
import type { Lawyer } from '@/lib/data';
import { t as tFn, type Lang } from '@/lib/i18n';
import { CheckIcon, ClockIcon, XIcon, WhatsAppIcon, PhoneIcon, ChatIcon, ArrowRightIcon } from './Icons';

interface ContactModalProps {
  lawyer: Lawyer;
  onClose: () => void;
  lang: Lang;
}

export default function ContactModal({ lawyer, onClose, lang }: ContactModalProps) {
  const [channel, setChannel] = useState('whatsapp');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const translate = (key: string) => tFn(lang, key);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'var(--teal-50)', color: 'var(--success)',
              margin: '0 auto 16px', display: 'grid', placeItems: 'center',
            }}>
              <CheckIcon size={28} />
            </div>
            <h3 style={{ marginBottom: 8 }}>{translate('contact.sent.title')}</h3>
            <p className="muted" style={{ marginBottom: 24 }}>
              {translate('contact.sent.body').replace('{name}', lawyer.name).replace('{time}', lawyer.responseTime)}
            </p>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
              {translate('contact.sent.close')}
            </button>
          </div>
        ) : (
          <>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)' }} className="row between">
              <div className="row gap-12">
                <img src={lawyer.avatar} className="avatar" style={{ width: 42, height: 42 }} alt="" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{translate('contact.title')}</div>
                  <div className="muted text-sm">{lawyer.title} {lawyer.name}</div>
                </div>
              </div>
              <button className="btn btn-icon btn-ghost" onClick={onClose}><XIcon /></button>
            </div>
            <div style={{ padding: 24 }}>
              <label className="field-label">{translate('contact.channel')}</label>
              <div className="contact-channels" style={{ marginBottom: 20 }}>
                {[
                  { id: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon size={18} />, note: '+506 8888-0001' },
                  { id: 'phone', label: translate('contact.call'), icon: <PhoneIcon size={18} />, note: '+506 2222-3344' },
                  { id: 'chat', label: translate('contact.chat'), icon: <ChatIcon size={18} />, note: translate('contact.chat_note') },
                ].map(c => (
                  <button
                    key={c.id}
                    className={`channel-btn ${channel === c.id ? 'on' : ''}`}
                    onClick={() => setChannel(c.id)}
                  >
                    <span className="channel-icon">{c.icon}</span>
                    <div className="col" style={{ alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{c.label}</span>
                      <span className="muted text-xs">{c.note}</span>
                    </div>
                  </button>
                ))}
              </div>
              <label className="field-label">{translate('contact.tellus')}</label>
              <textarea
                className="input"
                style={{ height: 110, padding: 14, resize: 'vertical', lineHeight: 1.5 }}
                placeholder={translate('contact.placeholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="row gap-8" style={{
                marginTop: 12, padding: 12,
                background: 'var(--teal-50)', borderRadius: 'var(--r-md)',
                border: '1px solid var(--teal-100)',
              }}>
                <ClockIcon size={14} />
                <span className="text-sm" style={{ color: 'var(--accent-ink)' }}>
                  {translate('contact.responds').replace('{time}', lawyer.responseTime)}
                </span>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: 20 }}
                onClick={() => setSent(true)}
              >
                {translate('contact.send')} <ArrowRightIcon size={15} />
              </button>
              <p className="text-xs muted" style={{ textAlign: 'center', marginTop: 12 }}>
                {translate('contact.consent')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
