// All names, quotes, biographies and hours below are placeholders written to sound like a real
// clinic. Replace them with real clinicians, verified patient reviews and the clinic's own details.

import marchetti from './assets/img/doctor-marchetti.jpg';
import okafor from './assets/img/doctor-okafor.jpg';
import lindqvist from './assets/img/doctor-lindqvist.jpg';
import consultation from './assets/img/consultation.jpg';
import tooth from './assets/img/tooth-closeup.jpg';
import texture from './assets/img/texture-soft.jpg';
import pediatric from './assets/img/pediatric-visit.jpg';
import clinic from './assets/img/clinic-interior.jpg';

export { clinic };

export const phone = '(555) 014-2290';

export const today = new Date().toISOString().slice(0, 10);

export const treatments = [
  { name: 'Orthodontics', img: consultation, alt: 'A dentist showing a patient her treatment plan on a tablet', desc: 'Clear aligners and cable orthodontics for teenagers and adults. We plan the movement of your teeth on screen first, so you can see the expected result and how long it should take. Results vary between patients.', bg: '#faf9f7' },
  { name: 'Dental implants', img: tooth, alt: 'Close-up of a ceramic dental crown', desc: 'A long-term replacement for a missing tooth. We plan the position from a 3D scan before surgery and finish with a crown matched to the color of your other teeth.', bg: '#efe7dc' },
  { name: 'Cosmetic dentistry', img: texture, pos: '80% 50%', alt: 'Soft pearl-colored curves in warm light', desc: 'Whitening, veneers and small changes to the shape or color of your teeth. We start by listening to what bothers you, then show you what is realistic.', bg: '#e8e0f0' },
  { name: 'Pediatric care', dark: true, img: pediatric, alt: 'A dentist talking with a smiling child in the treatment chair', desc: 'Check-ups and treatment for children from their first teeth. Appointments are short, we explain everything in simple words, and parents are welcome in the room.', bg: '#1f4d3f' },
];

// Replace `before` / `after` with imported photos (same framing for both) to show real results.
export const cases = [
  { name: 'Clear aligners', note: 'Eleven months of clear aligner treatment.' },
  { name: 'Whitening', note: 'Two in-clinic whitening sessions.' },
  { name: 'Veneers', note: 'Four porcelain veneers on the upper front teeth.' },
];

export const steps = [
  { title: 'Welcome and conversation', time: '10 min', does: 'You meet your dentist in a quiet room and tell us what brought you in. We listen first, and we only look at your teeth when you are ready.', feel: 'Nothing physical. It is a conversation.' },
  { title: 'Examination', time: '15 min', does: 'We check your teeth and gums with a mirror and a small probe, and tell you what we are about to do before each step.', feel: 'Light pressure, and sometimes the cool touch of the mirror. Raise your hand and we stop.' },
  { title: 'Scan and planning', time: '20 min', does: 'A small handheld scanner photographs your teeth, which replaces the putty molds many people dislike. We go through the images with you on screen.', feel: 'Most people feel little or nothing, and gagging is rare. You keep your mouth open for a few minutes.' },
  { title: 'Your written plan', time: '10 min', does: 'We give you the options, the likely timeline and the full cost on paper. You do not have to decide on the day.', feel: 'Nothing. Take the plan home and talk it over.' },
  { title: 'Treatment, when you are ready', time: 'Varies', does: 'Treatment only begins when you say you are ready. We agree on numbing or sedation beforehand.', feel: 'Numb and comfortable. We check in often and adjust if you need a break.' },
];

export const principles = [
  { title: 'Planning comes first', text: 'Every case is planned from a digital scan. You see the proposed result, and the steps to reach it, before we start.' },
  { title: 'Clear about materials', text: 'We explain which materials we recommend, why, and what the alternatives would cost.' },
  { title: 'Costs in writing', text: 'You receive the full cost of your treatment in writing before it begins. If the plan changes, we talk to you first.' },
];

export const doctors = [
  { name: 'Dr. Elena Marchetti', role: 'Orthodontist', exp: '15 years in practice', img: marchetti, pos: '50% 34%', alt: 'Dr. Elena Marchetti', bio: 'Elena leads our orthodontics team and treats teenagers and adults. She trained at the University of Bologna and has a particular interest in clear aligners.' },
  { name: 'Dr. Daniel Okafor', role: 'Implant dentist', exp: '12 years', img: okafor, pos: '45% 22%', alt: 'Dr. Daniel Okafor', bio: 'Daniel places and restores dental implants, for patients who have lost one tooth or several.' },
  { name: 'Dr. Sofia Lindqvist', role: 'Cosmetic and pediatric', exp: '10 years', img: lindqvist, pos: '45% 24%', alt: 'Dr. Sofia Lindqvist', bio: 'Sofia looks after our youngest patients, and also carries out whitening and veneers.' },
];

export const testimonials = [
  ["I'd put off getting my teeth straightened for years. Dr. Marchetti showed me the whole plan on a screen, and I knew exactly how long it would take.", 'Hannah R.', 'Orthodontics'],
  ['The implant was the part I was dreading. It was far less dramatic than I expected, and Dr. Okafor phoned the next evening to ask how I was.', 'Michael T.', 'Dental implants'],
  ['My son hates the dentist, but he asked if we could go back. They let him hold the little mirror.', 'Priya N.', 'Pediatric care'],
  ['The price was written down before anything started, and it never changed. I appreciated that.', 'James W.', 'Cosmetic dentistry'],
  ['I was nervous about the scan, but it was quick and nothing like the molds I remember.', 'Laura B.', 'Orthodontics'],
  ['Easy to book, no waiting around, and the receptionist remembered my name the second time I came in.', 'Tom H.', 'Consultation'],
  ['I wanted my teeth whiter, not a different smile. Dr. Lindqvist understood that straight away.', 'Aisha M.', 'Cosmetic dentistry'],
  ['Two years on, my implant feels like all my other teeth. I forget it is there.', 'Robert S.', 'Dental implants'],
  ['She spoke to my daughter, not over her head. That mattered more to me than anything else.', 'Claire D.', 'Pediatric care'],
].map(([q, who, tx]) => ({ q, who, tx }));

export const faqs = [
  ['What happens at a first consultation?', 'It takes about an hour. We talk, examine your teeth, take a digital scan, and finish by giving you a written plan with the cost. Nothing is started that day unless you ask us to.'],
  ['Am I suitable for clear aligners?', 'Most adults and teenagers are, although some cases need fixed braces instead. We can tell you at your first visit, and the scan shows how your teeth are likely to move.'],
  ['How long does a dental implant last?', 'Implants are designed to be long-term, and how long yours lasts depends on your home care and general health. The crown on top may need replacing sooner. We will tell you what to expect in your case.'],
  ['Do you see children?', 'Yes, from their first teeth. We keep appointments short, explain things in simple words, and parents can stay in the room.'],
  ['How do I book?', 'Use the form on this page or the booking bar at the top. We reply within one working day to confirm a time. If you would rather talk to someone, call the clinic.'],
].map(([q, a]) => ({ q, a }));
