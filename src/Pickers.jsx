import React, { useEffect, useId, useRef, useState } from 'react';

// Branded dropdown and date picker used in the hero booking bar.

const Chevron = ({ open }) => (
  <svg className={open ? 'pick-chev open' : 'pick-chev'} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 5.25 7 9l4-3.75" />
  </svg>
);

// Close on outside click and on Escape (returns focus to the trigger).
function useDismiss(rootRef, open, close) {
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!rootRef.current.contains(e.target)) close(false); };
    const onKey = (e) => { if (e.key === 'Escape') close(true); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, rootRef, close]);
}

export function Dropdown({ label, value, options, onChange, placeholder = 'Select', boxed, invalid }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const btn = useRef(null);
  const uid = useId();
  const close = (refocus) => { setOpen(false); if (refocus) btn.current.focus(); };
  useDismiss(root, open, close);

  const show = () => { setActive(Math.max(options.indexOf(value), 0)); setOpen(true); };
  const pick = (o) => { onChange(o); close(true); };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); show(); }
      return;
    }
    const move = { ArrowDown: Math.min(active + 1, options.length - 1), ArrowUp: Math.max(active - 1, 0), Home: 0, End: options.length - 1 }[e.key];
    if (move !== undefined) { e.preventDefault(); setActive(move); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(options[active]); }
    else if (e.key === 'Tab') close(false);
  };

  return (
    <div className={`pick${boxed ? ' boxed' : ''}${invalid ? ' invalid' : ''}`} ref={root}>
      <button
        ref={btn}
        type="button"
        className="pick-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${uid}-list` : undefined}
        aria-activedescendant={open ? `${uid}-o${active}` : undefined}
        onClick={() => (open ? close(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span className="pick-label">{label}</span>
        <span className={value ? 'pick-value' : 'pick-value empty'}>{value || placeholder}<Chevron open={open} /></span>
      </button>
      {open && (
        <ul id={`${uid}-list`} className="pop list" role="listbox" aria-label={label}>
          {options.map((o, i) => (
            <li
              key={o}
              id={`${uid}-o${i}`}
              role="option"
              aria-selected={o === value}
              className={i === active ? 'opt on' : 'opt'}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
            >
              {o}
              {o === value && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.75 7.25 2.75 2.75 5.75-6" /></svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const pad = (n) => String(n).padStart(2, '0');
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function DatePicker({ label, value, min, onChange, placeholder = 'Select date', boxed, invalid }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => parse(value || min));
  const [focusIso, setFocusIso] = useState(null);
  const root = useRef(null);
  const btn = useRef(null);
  const close = (refocus) => { setOpen(false); if (refocus) btn.current.focus(); };
  useDismiss(root, open, close);

  // Move keyboard focus onto the chosen day once it is rendered.
  useEffect(() => {
    if (open && focusIso) root.current.querySelector(`[data-iso="${focusIso}"]`)?.focus();
  }, [open, focusIso, view]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7; // week starts on Monday
  const days = new Date(y, m + 1, 0).getDate();
  const minDate = parse(min);
  const canPrev = new Date(y, m, 0) >= minDate;

  const show = () => {
    const start = parse(value || min);
    setView(new Date(start.getFullYear(), start.getMonth(), 1));
    setFocusIso(value || min);
    setOpen(true);
  };
  const go = (delta) => setView(new Date(y, m + delta, 1));
  const pick = (s) => { onChange(s); close(true); };

  const onGridKey = (e) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const cur = parse(e.target.dataset.iso);
    const next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + step);
    if (next < minDate) return;
    setView(new Date(next.getFullYear(), next.getMonth(), 1));
    setFocusIso(iso(next.getFullYear(), next.getMonth(), next.getDate()));
  };

  const text = value && parse(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={`pick${boxed ? ' boxed' : ''}${invalid ? ' invalid' : ''}`} ref={root}>
      <button ref={btn} type="button" className="pick-btn" aria-haspopup="dialog" aria-expanded={open} onClick={() => (open ? close(false) : show())}>
        <span className="pick-label">{label}</span>
        <span className={text ? 'pick-value' : 'pick-value empty'}>{text || placeholder}<Chevron open={open} /></span>
      </button>
      {open && (
        <div className="pop cal" role="dialog" aria-label="Choose a date">
          <div className="cal-head">
            <button type="button" className="cal-nav" onClick={() => go(-1)} disabled={!canPrev} aria-label="Previous month">‹</button>
            <div className="cal-title" aria-live="polite">{view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            <button type="button" className="cal-nav" onClick={() => go(1)} aria-label="Next month">›</button>
          </div>
          <div className="cal-grid cal-week" aria-hidden="true">{WEEK.map((d) => <span key={d}>{d}</span>)}</div>
          <div className="cal-grid" onKeyDown={onGridKey}>
            {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: days }, (_, i) => {
              const s = iso(y, m, i + 1);
              const off = s < min;
              return (
                <button
                  key={s}
                  type="button"
                  data-iso={s}
                  disabled={off}
                  aria-pressed={s === value}
                  tabIndex={s === focusIso ? 0 : -1}
                  className={`day${s === value ? ' sel' : ''}${s === min ? ' today' : ''}`}
                  onClick={() => pick(s)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="cal-foot">
            <button type="button" className="link-btn" onClick={() => pick('')} disabled={!value}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}
