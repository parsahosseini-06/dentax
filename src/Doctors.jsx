import React, { useState } from 'react';
import { doctors } from './data.js';
import Plus from './Plus.jsx';

// Grid tracks per selection (-1 = none). Items keep their grid area; the tracks resize so the
// chosen doctor grows and the rest shrink. Columns: [lead 2 cols][second][stat / third].
const TRACKS = [
  ['1fr 1fr 1fr 1fr', '1fr 1fr'],
  ['2fr 2fr 1fr 1fr', '1fr 1fr'],
  ['1fr 1fr 3fr 1fr', '1fr 1fr'],
  ['1fr 1fr 1fr 3fr', '1fr 2fr'],
];

export default function Doctors() {
  const [sel, setSel] = useState(-1);
  const [cols, rows] = TRACKS[sel + 1];

  const tile = (d, i) => (
    <button
      key={i}
      type="button"
      className={`dx-tile dx-${'abc'[i]}${sel === i ? ' dx-sel' : ''}`}
      aria-expanded={sel === i}
      onClick={() => setSel(sel === i ? -1 : i)}
    >
      <img className="dx-ph" src={d.img} alt="" loading="lazy" decoding="async" style={d.pos && { objectPosition: d.pos }} />
      <span className="dx-plus"><Plus /></span>
      <span className="dx-plate">
        <span className={i === 0 ? 'dx-name dx-name-lg' : 'dx-name'}>{d.name}</span>
        <span className="dx-role">{d.role} · {d.exp}</span>
        <span className="dx-bio"><span><span>{d.bio}</span></span></span>
      </span>
    </button>
  );

  return (
    <section id="doctors" className="section">
      <div className="split-head">
        <h2 className="h2-serif" style={{ maxWidth: 560 }}>Meet your <em>dentists.</em></h2>
        <p className="lede-sm" style={{ maxWidth: 360 }}>Your dentist stays with you from the first consultation to the final check-up.</p>
      </div>
      <div className="dx-bento" style={{ gridTemplateColumns: cols, gridTemplateRows: rows }}>
        {tile(doctors[0], 0)}
        {tile(doctors[1], 1)}
        <div className="dx-s">
          <div className="label-mauve">Years in practice, three dentists</div>
          <div className="serif" style={{ fontSize: 64, lineHeight: 1 }}><span data-count="37">37</span><span style={{ fontSize: 32 }}> years</span></div>
        </div>
        {tile(doctors[2], 2)}
      </div>
    </section>
  );
}
