import React, { useState } from 'react';
import { cases } from './data.js';

// Drag (or use arrow keys on) the line to compare. A transparent range input covers the image,
// so mouse, touch and keyboard all work natively.
function Slider({ item }) {
  const [pos, setPos] = useState(50);
  const layer = (src, label, cls) => (src
    ? <img className="ba-img" src={src} alt="" draggable="false" />
    : <div className={`ba-ph ${cls}`}>[ {label} photo ]</div>);

  return (
    <div className="ba">
      <div className="ba-layer">{layer(item.after, 'after', 'after')}</div>
      <div className="ba-layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{layer(item.before, 'before', 'before')}</div>
      <span className="ba-tag left">Before</span>
      <span className="ba-tag right">After</span>
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
        aria-label={`Compare before and after: ${item.name}`}
        aria-valuetext={`${Math.round(pos)}% before`}
      />
    </div>
  );
}

export default function BeforeAfter() {
  const [i, setI] = useState(0);
  return (
    <section id="results" className="section ba-section">
      <div className="split-head">
        <h2 className="h2-serif" style={{ maxWidth: 560 }}>Before and <em>after.</em></h2>
        <p className="lede-sm" style={{ maxWidth: 360 }}>Drag the line to compare. Photos are shared with each patient's written consent and are not retouched. Results vary.</p>
      </div>
      <div className="ba-tabs" role="group" aria-label="Choose a treatment">
        {cases.map((c, k) => (
          <button key={c.name} type="button" className={k === i ? 'ba-tab on' : 'ba-tab'} aria-pressed={k === i} onClick={() => setI(k)}>{c.name}</button>
        ))}
      </div>
      <Slider key={i} item={cases[i]} />
      <p className="small ba-note">{cases[i].note}</p>
    </section>
  );
}
