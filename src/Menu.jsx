import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { scrollTo } from './motion.js';
import { phone } from './data.js';
import { useI18n, LangToggle } from './i18n.jsx';

const LINKS = [
  ['#treatments', 'Treatments'],
  ['#calm', 'Your first visit'],
  ['#approach', 'How we work'],
  ['#doctors', 'Our dentists'],
  ['#faq', 'Questions'],
];

// Hamburger for phones: opens a full-screen panel (portalled, so a blurred bar can't trap it).
export default function Menu() {
  const { t, n } = useI18n();
  const [open, setOpen] = useState(false);
  const id = useId();
  const openBtn = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('menu-open');
    closeBtn.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    // the panel is for phones: if the window grows past that, close it
    const mq = window.matchMedia('(min-width: 641px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      openBtn.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollTo(href));
  };

  return (
    <>
      <button ref={openBtn} type="button" className="menu-btn" aria-label={t('Open menu')} aria-expanded={open} aria-controls={id} onClick={() => setOpen(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
      </button>
      {createPortal(
        <div id={id} className={open ? 'menu-panel open' : 'menu-panel'} role="dialog" aria-modal="true" aria-label={t('Menu')} aria-hidden={!open} inert={open ? undefined : ''}>
          <div className="menu-top">
            <span className="wordmark" lang="en">Dentax</span>
            <LangToggle />
            <button ref={closeBtn} type="button" className="menu-btn" aria-label={t('Close menu')} onClick={() => setOpen(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <nav aria-label={t('Menu')}>
            {LINKS.map(([href, label]) => <a key={href} href={href} onClick={(e) => go(e, href)}>{t(label)}</a>)}
          </nav>
          <div className="menu-foot">
            <a href="#reserve" className="menu-cta" onClick={(e) => go(e, '#reserve')}>{t('Book a visit')}</a>
            <a href="tel:+15550142290" className="menu-tel" dir="ltr">{n(phone)}</a>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
