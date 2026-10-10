import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from './Button.jsx';
import Doctors from './Doctors.jsx';
import Plus from './Plus.jsx';
import Menu from './Menu.jsx';
import BeforeAfter from './BeforeAfter.jsx';
import HeroOrb from './HeroOrb.jsx';
import { initMotion, scrollTo, reduced } from './motion.js';
import { animate, spring } from 'animejs';
import Testimonials from './Testimonials.jsx';
import Reservation from './Reservation.jsx';
import { treatments, steps, principles, faqs, clinic } from './data.js';

const EMPTY = { name: '', email: '', phone: '', treatment: '', date: '' };
const goReserve = () => scrollTo('#reserve');

function Hero() {
  const strip = [
    { src: treatments[0].img, alt: treatments[0].alt },
    { src: clinic, alt: 'A quiet treatment room with curved plaster walls, travertine and frosted glass' },
    { src: treatments[1].img, alt: treatments[1].alt },
  ];
  return (

    <section id="top" className="hero">
      <HeroOrb />
      <header className="nav">
        <a href="#top" className="wordmark">Dentax</a>
        <nav aria-label="Primary">
          <a href="#treatments">Treatments</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
        <Menu />
      </header>
      <h1><span className="ln"><span>Dental care,</span></span> <span className="ln"><span><em>done properly.</em></span></span></h1>
      <div className="hero-row">
        <p className="lede">A private dental clinic offering orthodontics, implants, cosmetic dentistry and care for children.</p>
        <div className="hero-actions">
          <Button className="btn" variant="secondary" size="lg" onClick={goReserve}>Reserve a visit</Button>
          <a href="#treatments" className="arrow-link big">Our treatments <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="hero-strip">
        {strip.map((p, i) => <div key={p.src} className="photo"><img src={p.src} alt={p.alt} fetchpriority={i === 0 ? 'high' : undefined} decoding="async" /></div>)}
      </div>
    </section>

  );
}

function Treatments({ setField }) {
  return (
    <section id="treatments">
      <div className="split-head intro">
        <h2 className="h2-sans" style={{ maxWidth: 520 }}>Our treatments</h2>
        <p className="lede-sm" style={{ maxWidth: 380 }}>Every treatment starts with a consultation. You leave with a written plan, a timeline and a price, and no obligation to go ahead.</p>
      </div>
      {treatments.map((t, i) => (
        <div key={t.name} className={t.dark ? 'band dark' : 'band'} style={{ background: t.bg }}>
          <div>
            <div className="label-mauve" style={{ marginBottom: 16 }}>0{i + 1}</div>
            <div className="band-name">{t.name}</div>
          </div>
          <div>
            <p className="lede-sm" style={{ maxWidth: 380, margin: '0 0 24px' }}>{t.desc}</p>
            <a href="#reserve" className="arrow-link" onClick={() => setField('treatment', t.name)}>Reserve this treatment <span aria-hidden="true">→</span></a>
          </div>
          <div className="photo band-photo"><img src={t.img} alt={t.alt} loading="lazy" decoding="async" style={{ objectPosition: t.pos }} /></div>
        </div>
      ))}
    </section>
  );
}

function Calm() {
  const [step, setStep] = useState(0);
  const [mOpen, setMOpen] = useState(0); // phones: the details open inside the list, and a step can be closed again
  const cur = steps[step];
  return (
    <section id="calm" className="section bordered">
      <div className="calm-head">
        <div>
          <div className="eyebrow">Your first visit</div>
          <h2 className="h2-serif big">Know what to expect <em>before you arrive.</em></h2>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <p className="lede" style={{ maxWidth: 460, margin: '0 0 24px' }}>Here is the whole first visit, step by step, with how long each part takes and what you will feel. You can ask us to stop at any point.</p>
          <Button className="btn" variant="primary" size="lg" onClick={goReserve}>Reserve a first visit</Button>
        </div>
      </div>
      <div className="calm-body">
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button type="button" className={i === step ? 'step on' : 'step'} aria-current={i === step} aria-expanded={mOpen === i} aria-controls={`step-panel-${i}`} data-open={mOpen === i} onClick={() => { setStep(i); setMOpen(mOpen === i ? -1 : i); }}>
                <span className="label-mauve">0{i + 1}</span>
                <span className="step-title">{s.title}</span>
                <span className="step-time">{s.time}</span>
                <span className="step-plus"><Plus /></span>
              </button>
              <div id={`step-panel-${i}`} className="step-panel" data-open={mOpen === i}>
                <div>
                  <div className="step-card">
                    <div className="step-does"><div className="label-mauve">What we do</div><p>{s.does}</p></div>
                    <div className="step-feel"><div className="label-mauve">What you will feel</div><p>{s.feel}</p></div>
                    <div className="step-foot">{s.time === 'Varies' ? 'The length depends on the treatment.' : `Usually about ${s.time}.`} You can ask us to pause at any point.</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="step-card step-card-desktop" aria-live="polite">
          <div className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>{cur.title}</div>
          <div className="step-does"><div className="label-mauve">What we do</div><p>{cur.does}</p></div>
          <div className="step-feel"><div className="label-mauve">What you will feel</div><p>{cur.feel}</p></div>
          <div className="step-foot">{cur.time === 'Varies' ? 'The length depends on the treatment.' : `Usually about ${cur.time}.`} You can ask us to pause at any point.</div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="photo approach-photo"><img src={clinic} alt="A quiet treatment room with curved plaster walls, travertine and frosted glass" loading="lazy" decoding="async" /></div>
      <div>
        <div className="eyebrow">How we work</div>
        <h2 className="h2-serif" style={{ margin: '0 0 48px' }}>You see the plan and the price before we begin.</h2>
        {principles.map((p, i) => (
          <div key={p.title} className="principle">
            <span className="label-mauve" style={{ paddingTop: 4 }}>0{i + 1}</span>
            <div><div className="principle-title">{p.title}</div><p>{p.text}</p></div>
          </div>
        ))}
        <div className="rule" />
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section faq">
      <div>
        <div className="eyebrow">Questions</div>
        <h2 className="h2-serif" style={{ margin: '0 0 24px' }}>Common <em>questions.</em></h2>
        <p className="lede-sm" style={{ maxWidth: 340 }}>If yours is not here, call or message us and we will answer it before you book.</p>
      </div>
      <div>
        {faqs.map((f, i) => (
          <div key={f.q} className="faq-item">
            <button type="button" className="faq-q" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="plus" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}><Plus size={18} /></span>
            </button>
            <div id={`faq-${i}`} className="faq-a" style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}>
              <div><p>{f.a}</p></div>
            </div>
          </div>
        ))}
        <div className="rule" />
      </div>
    </section>
  );
}

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('top');
    const reserve = document.getElementById('reserve');
    let heroOut = false, reserveIn = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.target === hero) heroOut = !e.isIntersecting; else reserveIn = e.isIntersecting; });
      setShow(heroOut && !reserveIn);
    });
    io.observe(hero);
    io.observe(reserve);
    return () => io.disconnect();
  }, []);
  return (
    <nav className={show ? 'bar show' : 'bar'} aria-label="Quick actions">
      <a href="#top" className="wordmark">Dentax</a>
      <div className="bar-actions">
        <a href="tel:+15550142290" className="bar-tel"><span className="bar-tel-num">(555) 014-2290</span><span className="bar-tel-short">Call</span></a>
        <a href="#reserve" className="bar-cta">Book a visit</a>
        <Menu />
      </div>
    </nav>
  );
}

const Icon = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

function Footer() {
  const ref = useRef(null);
  // The footer is fixed underneath the page and revealed as the last section scrolls away.
  // Its height is published as --footer-h; when it is taller than the screen it just sits in the flow.
  useLayoutEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    const measure = () => {
      root.style.setProperty('--footer-h', `${el.offsetHeight}px`);
      root.classList.toggle('footer-static', el.offsetHeight > window.innerHeight * 0.92);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // keyboard users tabbing into the covered footer should see it
    const onFocus = () => window.scrollTo(0, document.documentElement.scrollHeight);
    el.addEventListener('focusin', onFocus);
    // anime.js: the three waves breathe slowly at different speeds; social icons spring up on hover
    const anims = [];
    const cleanups = [];
    if (!reduced) {
      el.querySelectorAll('.footer-land path').forEach((p, i) => {
        anims.push(animate(p, { scaleY: [1, 1.07 + i * 0.03], duration: 5200 + i * 1700, ease: 'inOutSine', loop: true, alternate: true, delay: i * 600 }));
      });
      el.querySelectorAll('.footer-social a svg').forEach((svg) => {
        const a = svg.parentElement;
        const to = (y) => animate(svg, { y, scale: y ? 1.12 : 1, ease: spring({ bounce: 0.45, duration: 500 }) });
        const over = () => to(-3), out = () => to(0);
        a.addEventListener('pointerenter', over); a.addEventListener('pointerleave', out);
        cleanups.push(() => { a.removeEventListener('pointerenter', over); a.removeEventListener('pointerleave', out); });
      });
    }
    return () => { anims.forEach((a) => a.revert()); cleanups.forEach((c) => c()); ro.disconnect(); el.removeEventListener('focusin', onFocus); root.classList.remove('footer-static'); };
  }, []);

  return (
    <>
      <div id="contact" className="footer-spacer" aria-hidden="true" />
      <footer ref={ref} className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="wordmark">Dentax</div>
            <p>Orthodontics, implants and cosmetic dentistry in a private clinic. Appointments are never rushed.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><Icon><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></Icon></a>
              <a href="#" aria-label="Facebook"><Icon><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" /></Icon></a>
              <a href="#" aria-label="Find us on the map"><Icon><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Icon></a>
            </div>
          </div>
          <div className="footer-grid">
            <div className="links">
              <div className="label-mauve">Treatments</div>
              {treatments.map((t) => <a key={t.name} href="#treatments">{t.name}</a>)}
            </div>
            <div className="links">
              <div className="label-mauve">Clinic</div>
              <a href="#calm">Your first visit</a>
              <a href="#approach">How we work</a>
              <a href="#doctors">Our dentists</a>
              <a href="#faq">Questions</a>
            </div>
            <div className="links">
              <div className="label-mauve">Visit</div>
              <span>24 Linden Street</span>
              <span>Riverside, 40213</span>
              <span>Mon to Fri, 8:30 to 18:00</span>
              <span>Sat, 9:00 to 14:00</span>
            </div>
            <div className="links">
              <div className="label-mauve">Contact</div>
              <a href="tel:+15550142290">(555) 014-2290</a>
              <a href="mailto:hello@dentax.example">hello@dentax.example</a>
              <a href="#reserve">Request an appointment</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dentax. All rights reserved.</span>
          <span className="footer-legal"><a href="#">Privacy</a><a href="#">Terms</a></span>
        </div>
        <svg className="footer-land" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="fl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#efe7dc" stopOpacity="0" /><stop offset="1" stopColor="#e8e0f0" /></linearGradient>
            <linearGradient id="fl-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9cde9" /><stop offset="1" stopColor="#b9a6d6" /></linearGradient>
            <linearGradient id="fl-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c8dccf" /><stop offset=".55" stopColor="#6f9f88" /><stop offset="1" stopColor="#3d7a62" /></linearGradient>
            <linearGradient id="fl-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2b6b54" /><stop offset="1" stopColor="#14352b" /></linearGradient>
            <filter id="fl-soft" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch" result="n" />
              <feColorMatrix in="n" type="matrix" values=".33 .33 .33 0 0  .33 .33 .33 0 0  .33 .33 .33 0 0  0 0 0 .6 0" result="g" />
              <feComposite in="g" in2="b" operator="in" result="gi" />
              <feBlend in="gi" in2="b" mode="overlay" />
            </filter>
          </defs>
          <rect width="1440" height="320" fill="url(#fl-sky)" />
          <g filter="url(#fl-soft)">
            <path d="M0 150C180 80 360 140 560 110S960 50 1160 100s220 30 280-10V320H0Z" fill="url(#fl-a)" />
            <path d="M0 215C220 150 430 235 700 180S1100 120 1440 195V320H0Z" fill="url(#fl-b)" />
            <path d="M0 268C260 226 520 296 820 246S1200 214 1440 254V320H0Z" fill="url(#fl-c)" />
          </g>
        </svg>
      </footer>
    </>
  );
}

export default function App() {
  const [form, setForm] = useState(EMPTY);
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  useLayoutEffect(() => initMotion(document.getElementById('root')), []);
  return (
    <>
      <a className="skip" href="#treatments">Skip to content</a>
      <StickyBar />
      <main>
        <Hero />
        <Treatments setField={setField} />
        <Calm />
        <Approach />
        <Doctors />
        <BeforeAfter />
        <Testimonials />
        <Faq />
        <Reservation form={form} setField={setField} reset={() => setForm(EMPTY)} />
      </main>
      <Footer />
    </>
  );
}
