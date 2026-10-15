import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { digits } from './i18n.jsx';

gsap.registerPlugin(ScrollTrigger);

// Motion is off when the visitor asked for reduced motion. Add ?motion=on to the URL to preview it anyway.
export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !location.search.includes('motion=on');

// ?motion=on also lifts the CSS reduced-motion rules, so CSS transitions and JS motion agree
if (!reduced) document.documentElement.classList.add('motion-on');

let lenis = null;
export const scrollTo = (selector) => {
  if (lenis) lenis.scrollTo(selector);
  else document.querySelector(selector)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
};

// Elements that fade up once when they scroll into view, and groups whose children stagger in.
const SINGLES = '.split-head, .calm-head > div, .step-card, .approach > div:last-child > .eyebrow, .approach > div:last-child > h2, .principle, .faq > div:first-child, .ba-tabs, .ba, .reserve > div';
const GROUPS = '.steps, .faq > div:last-child, .dx-bento';

function reveal(targets, extra = {}) {
  return gsap.from(targets, {
    opacity: 0, y: 36, duration: 1.1, ease: 'power3.out', clearProps: 'opacity,transform', ...extra,
  });
}

export function initMotion(root) {
  if (reduced) return () => {};

  // Lenis drives the scroll; GSAP's ticker drives Lenis, so ScrollTrigger stays in sync.
  lenis?.destroy();
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    // Hero entrance
    gsap.from('.hero h1 .ln > span', { yPercent: 115, duration: 1.4, ease: 'power4.out', stagger: 0.14, delay: 0.1 });
    gsap.from('.hero .nav, .hero-row', { opacity: 0, y: 24, duration: 1.1, ease: 'power3.out', delay: 0.55, stagger: 0.12 });
    gsap.from('.hero-strip .photo', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', delay: 0.5, stagger: 0.15 });
    gsap.from('.hero-strip img', { scale: 1.3, duration: 2, ease: 'power3.out', delay: 0.5, stagger: 0.15 });

    // Scroll reveals
    gsap.utils.toArray(SINGLES).forEach((el) => reveal(el, { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    gsap.utils.toArray(GROUPS).forEach((el) => reveal(el.children, { stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));

    // Footer content rises in as the footer is uncovered
    const spacer = document.querySelector('.footer-spacer');
    gsap.from('.footer-brand, .footer-grid > *, .footer-bottom', {
      opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.08, clearProps: 'opacity,transform',
      scrollTrigger: { trigger: spacer.offsetHeight ? spacer : '.footer', start: spacer.offsetHeight ? 'top 70%' : 'top 90%', once: true },
    });

    // Parallax inside photo frames
    gsap.utils.toArray('.band-photo img, .approach-photo img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -8, scale: 1.2 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });

    // Count-up
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const state = { v: 0 };
      const show = () => { el.textContent = digits(state.v, document.documentElement.lang); }; // Persian digits on the Persian page
      gsap.to(state, {
        v: end, duration: 2.2, ease: 'power2.out', snap: { v: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onStart: show,
        onUpdate: show,
      });
    });
  }, root);

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);
  let refreshTimer;
  const ro = new ResizeObserver(() => { clearTimeout(refreshTimer); refreshTimer = setTimeout(refresh, 150); });
  ro.observe(document.body);

  return () => {
    window.removeEventListener('load', refresh);
    ro.disconnect();
    clearTimeout(refreshTimer);
    ctx.revert();
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  };
}
