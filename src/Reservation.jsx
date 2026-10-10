import React, { useState } from 'react';
import { today, treatments } from './data.js';
import { Dropdown, DatePicker } from './Pickers.jsx';

const ENDPOINT = import.meta.env.VITE_RESERVATION_ENDPOINT;

function validate(f) {
  return {
    name: f.name.trim() ? '' : 'Please enter your full name.',
    email: /^\S+@\S+\.\S+$/.test(f.email) ? '' : 'Please enter a valid email address.',
    treatment: f.treatment ? '' : 'Please choose a treatment.',
  };
}

async function send(form) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return;
  }
  // No endpoint configured: keep the request in this browser only (demo mode).
  const key = 'dentax:reservations';
  const all = JSON.parse(localStorage.getItem(key) || '[]');
  all.push({ ...form, at: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(all));
}

export default function Reservation({ form, setField, reset }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [tried, setTried] = useState(false);
  const errors = validate(form);
  const invalid = Object.values(errors).some(Boolean);
  const show = (k) => tried && errors[k];

  async function onSubmit(e) {
    e.preventDefault();
    setTried(true);
    if (invalid) return;
    setStatus('sending');
    try {
      await send(form);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const field = (k, label, props = {}) => (
    <label className="field">
      {label}
      <input
        value={form[k]}
        onChange={(e) => setField(k, e.target.value)}
        aria-invalid={Boolean(show(k))}
        aria-describedby={show(k) ? `err-${k}` : undefined}
        {...props}
      />
      {show(k) && <span id={`err-${k}`} className="field-error">{errors[k]}</span>}
    </label>
  );

  return (
    <section id="reserve" className="reserve">
      <div>
        <h2 className="h2-serif big">Request an <em>appointment.</em></h2>
        <p className="lede" style={{ maxWidth: 400 }}>Tell us which treatment you are interested in and a day that suits you. We will reply within one working day to confirm a time.</p>
      </div>
      <div className="reserve-card">
        {status === 'sent' ? (
          <div className="thanks" role="status">
            <div className="serif" style={{ fontSize: 36, marginBottom: 12 }}>Thank you.</div>
            <p>We have your request and will be in touch within one working day to confirm a time.</p>
            <button type="button" className="link-btn" onClick={() => { reset(); setTried(false); setStatus('idle'); }}>Send another request</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            {field('name', 'Full name', { type: 'text', autoComplete: 'name', required: true })}
            <div className="two">
              {field('email', 'Email', { type: 'email', autoComplete: 'email', required: true })}
              {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
            </div>
            <div className="two">
              <div>
                <Dropdown boxed label="Treatment" value={form.treatment} options={treatments.map((t) => t.name)} onChange={(v) => setField('treatment', v)} invalid={Boolean(show('treatment'))} />
                {show('treatment') && <span className="field-error">{errors.treatment}</span>}
              </div>
              <DatePicker boxed label="Preferred date" value={form.date} min={today} onChange={(v) => setField('date', v)} />
            </div>
            {status === 'error' && <p className="field-error" role="alert">We could not send your request. Please try again, or call (555) 014-2290.</p>}
            <button type="submit" className="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request appointment'}
            </button>
            <p className="form-note">No payment needed. We reply within one working day.</p>
          </form>
        )}
      </div>
    </section>
  );
}
