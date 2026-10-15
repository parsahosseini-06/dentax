import React, { useLayoutEffect, useRef, useState } from 'react';
import { doctors } from './data.js';
import Plus from './Plus.jsx';
import { useI18n } from './i18n.jsx';

// motion.js counts this number up by writing its text directly, so React must not own the text node:
// it only writes the (localised) number through the ref, whenever the language changes.
function Count({ to }) {
  const { n } = useI18n();
  const ref = useRef(null);
  useLayoutEffect(() => { ref.current.textContent = n(to); }, [to, n]);
  return <span ref={ref} data-count={to} />;
}

// Grid tracks per selection (-1 = none). Items keep their grid area; the tracks resize so the
// chosen doctor grows and the rest shrink. Columns: [lead 2 cols][second][stat / third].
const TRACKS = [
  ['1fr 1fr 1fr 1fr', '1fr 1fr'],
  ['2fr 2fr 1fr 1fr', '1fr 1fr'],
  ['1fr 1fr 3fr 1fr', '1fr 1fr'],
  ['1fr 1fr 1fr 3fr', '1fr 2fr'],
];

export default function Doctors() {
  const { t, r } = useI18n();
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
        <span className={i === 0 ? 'dx-name dx-name-lg' : 'dx-name'}>{t(d.name)}</span>
        <span className="dx-role">{t(d.role)} · {t(d.exp)}</span>
        <span className="dx-bio"><span><span>{t(d.bio)}</span></span></span>
      </span>
    </button>
  );

  return (
    <section id="doctors" className="section">
      <div className="split-head">
        <h2 className="h2-serif" style={{ maxWidth: 560 }}>{r('Meet your <em>dentists.</em>')}</h2>
        <p className="lede-sm" style={{ maxWidth: 360 }}>{t('Your dentist stays with you from the first consultation to the final check-up.')}</p>
      </div>
      <div className="dx-bento" style={{ gridTemplateColumns: cols, gridTemplateRows: rows }}>
        {tile(doctors[0], 0)}
        {tile(doctors[1], 1)}
        <div className="dx-s">
          <div className="label-mauve">{t('Years in practice, three dentists')}</div>
          <div className="serif" style={{ fontSize: 64, lineHeight: 1 }}><Count to={37} /><span style={{ fontSize: 32 }}> {t('years')}</span></div>
        </div>
        {tile(doctors[2], 2)}
      </div>
    </section>
  );
}
