import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { testimonials } from './data.js';
import { reduced } from './motion.js';

// [first item, direction (1 = up, -1 = down), seconds per loop]
const COPIES = 3; // enough repeats that the column never runs out, even when the cards are short
const COLUMNS = [[0, 1, 60], [3, -1, 72], [6, 1, 66]];

// Columns drift on their own; the page's scroll speed pushes them (and reverses them on scroll up).
function useTicker(boxRef) {
  useEffect(() => {
    // With reduced motion the columns do not drift by themselves; they only move when the visitor scrolls.
    const drift = reduced ? 0 : 1;
    const box = boxRef.current;
    const cols = [...box.querySelectorAll('.dx-col')];
    const pos = cols.map((el, i) => (COLUMNS[i][1] < 0 ? el.scrollHeight / (COPIES * 2) : 0));
    const tops = new Map();
    let boost = 0, slow = 1;

    const onScroll = (e) => {
      const el = e.target === document ? document.scrollingElement : e.target;
      if (!el || el.scrollTop === undefined) return;
      const d = el.scrollTop - (tops.has(el) ? tops.get(el) : el.scrollTop);
      tops.set(el, el.scrollTop);
      boost = Math.max(-600, Math.min(600, boost + d * 3));
    };
    window.addEventListener('scroll', onScroll, true);

    const tick = (_time, delta) => {
      const dt = Math.min(0.05, delta / 1000);
      const r = box.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        slow += ((box.matches(':hover') ? 0.15 : 1) * drift - slow) * Math.min(1, dt * 6); // crawl while hovered so quotes can be read
        boost *= Math.pow(0.04, dt);
        cols.forEach((el, i) => {
          const [, dir, period] = COLUMNS[i];
          const half = el.scrollHeight / COPIES;
          pos[i] = (((pos[i] + dir * ((half / period) * slow + boost) * dt) % half) + half) % half;
          el.style.transform = `translate3d(0,${-pos[i]}px,0)`;
        });
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [boxRef]);
}

export default function Testimonials() {
  const boxRef = useRef(null);
  useTicker(boxRef);

  return (
    <section className="testimonials">
      <div className="split-head" style={{ marginBottom: 48 }}>
        <h2 className="h2-serif" style={{ maxWidth: 560 }}>What patients <em>tell us.</em></h2>
      </div>
      <div className="dx-ticker" ref={boxRef}>
        {COLUMNS.map(([start], c) => {
          const items = testimonials.slice(start, start + 3);
          return (
            <div key={c} className="dx-col-wrap">
              <div className="dx-col">
                {Array.from({ length: COPIES }, () => items).flat().map((t, i) => (
                  <figure key={i} className="quote" aria-hidden={i >= items.length ? 'true' : undefined}>
                    <blockquote>{t.q}</blockquote>
                    <figcaption><strong>{t.who}</strong><span>{t.tx}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
