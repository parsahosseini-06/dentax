import React, { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import fa from './fa.js';

// English text is the key: t('Our treatments') returns it as is in English and looks it up in fa.js in Persian.
// Anything missing from fa.js falls back to English (and warns in dev), so a gap never breaks the page.
const KEY = 'dentax:lang';
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export const digits = (s, lang) => (lang === 'fa' ? String(s).replace(/\d/g, (d) => FA_DIGITS[d]) : String(s));

const stored = () => {
  try { return localStorage.getItem(KEY) === 'fa' ? 'fa' : 'en'; } catch { return 'en'; }
};
export const initialLang = stored();

const Ctx = createContext(null);
export const useI18n = () => useContext(Ctx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let s = lang === 'fa' ? fa[key] : key;
      if (s === undefined) {
        if (import.meta.env.DEV) console.warn('[i18n] missing fa translation:', key);
        s = key;
      }
      if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
      return digits(s, lang);
    };
    // r(): same as t(), but <em>…</em> in the text becomes emphasis (the word order differs between languages)
    const r = (key, vars) => t(key, vars).split(/<\/?em>/).map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));
    // Switching language is one smooth transition: the page slides and fades toward its new reading direction
    // (see ::view-transition in index.css) while the toggle that was pressed stays exactly where it is.
    const choose = async (next, toggle) => {
      if (next === lang) return;
      // load the Persian font before swapping, so the page does not flash in a fallback font
      if (next === 'fa') await Promise.race([document.fonts.load("400 1em 'Vazirmatn Variable'", 'دنتکس'), new Promise((res) => setTimeout(res, 800))]).catch(() => {});
      try { localStorage.setItem(KEY, next); } catch { /* private mode: the choice just will not persist */ }
      const apply = () => flushSync(() => setLang(next));
      if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();

      // keep what the visitor is reading in place: the two languages have different page heights
      const root = document.documentElement;
      const anchor = [...document.querySelectorAll('main > section')].find((el) => el.getBoundingClientRect().bottom > innerHeight * 0.3);
      const top = anchor?.getBoundingClientRect().top;
      root.dataset.langTo = next;
      toggle?.style.setProperty('view-transition-name', 'lang-toggle'); // excluded from the page animation, so it stays put
      const vt = document.startViewTransition(() => {
        apply();
        const shift = anchor ? anchor.getBoundingClientRect().top - top : 0;
        if (shift) window.scrollTo({ top: scrollY + shift, behavior: 'instant' });
      });
      return vt.finished.catch(() => {}).finally(() => {
        toggle?.style.removeProperty('view-transition-name');
        delete root.dataset.langTo;
      });
    };
    return { lang, dir: lang === 'fa' ? 'rtl' : 'ltr', t, r, n: (x) => digits(x, lang), setLang: choose };
  }, [lang]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = value.lang;
    root.dir = value.dir;
    document.title = value.t('Dentax | Premium dental clinic');
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t('A private dental clinic for orthodontics, implants, cosmetic dentistry and pediatric care.'));
  }, [value]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// Always EN on the left, فارسی on the right (dir="ltr"), and the header that holds it keeps one physical layout in both languages.
export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang" dir="ltr" role="group" aria-label={t('Language')}>
      <button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={(e) => setLang('en', e.currentTarget.parentElement)}>EN</button>
      <button type="button" lang="fa" aria-label="فارسی" aria-pressed={lang === 'fa'} onClick={(e) => setLang('fa', e.currentTarget.parentElement)}>فارسی</button>
    </div>
  );
}

// Directional arrow: points the way the text reads.
export function Arrow() {
  const { dir } = useI18n();
  return <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>;
}
