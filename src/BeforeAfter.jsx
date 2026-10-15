import React, { useState } from 'react';
import { cases } from './data.js';
import { useI18n } from './i18n.jsx';

// Drag (or use arrow keys on) the line to compare. A transparent range input covers the image,
// so mouse, touch and keyboard all work natively.
function Slider({ item }) {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const layer = (src, label, cls) => (src
    ? <img className="ba-img" src={src} alt="" draggable="false" />
    : <div className={`ba-ph ${cls}`}>{t(`[ ${label} photo ]`)}</div>);

  // dir="ltr": the slider is a physical control (the range input, the clip and the handle must agree on
  // which side is "before"), and photos are not mirrored, so it keeps the same layout in both languages.
  return (
    <div className="ba" dir="ltr">
      <div className="ba-layer">{layer(item.after, 'after', 'after')}</div>
      <div className="ba-layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{layer(item.before, 'before', 'before')}</div>
      <span className="ba-tag left">{t('Before')}</span>
      <span className="ba-tag right">{t('After')}</span>
      <div className="ba-line" style={{ left: `${pos}%` }}>
        <span className="ba-handle" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m8 6-5 5 5 5M14 6l5 5-5 5" /></svg>
        </span>
      </div>
      <input
        className="ba-range"
        type="range"
        min="0"
        max="100"
        step="0.5"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={t('Compare before and after: {name}', { name: t(item.name) })}
        aria-valuetext={t('{pct}% before', { pct: Math.round(pos) })}
      />
    </div>
  );
}

export default function BeforeAfter() {
  const { t, r } = useI18n();
  const [i, setI] = useState(0);
  return (
    <section id="results" className="section ba-section">
      <div className="split-head">
        <h2 className="h2-serif" style={{ maxWidth: 560 }}>{r('Before and <em>after.</em>')}</h2>
        <p className="lede-sm" style={{ maxWidth: 360 }}>{t("Drag the line to compare. Photos are shared with each patient's written consent and are not retouched. Results vary.")}</p>
      </div>
      <div className="ba-tabs" role="group" aria-label={t('Choose a treatment')}>
        {cases.map((c, k) => (
          <button key={c.name} type="button" className={k === i ? 'ba-tab on' : 'ba-tab'} aria-pressed={k === i} onClick={() => setI(k)}>{t(c.name)}</button>
        ))}
      </div>
      <Slider key={i} item={cases[i]} />
      <p className="small ba-note">{t(cases[i].note)}</p>
    </section>
  );
}
