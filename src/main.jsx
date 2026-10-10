import React from 'react';
import { createRoot } from 'react-dom/client';
import './ds/styles.css';
import './index.css';
import App from './App.jsx';

// A reload would restore a scroll position before the layout is final, which looks like a glitch: always start at the top.
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Wait (briefly) for the two fonts so the headline never swaps mid-entrance and shifts the layout.
const fonts = Promise.all(['300 1em Newsreader', '400 1em Newsreader', 'italic 300 1em Newsreader', 'italic 400 1em Newsreader', '400 1em Inter', '500 1em Inter', '600 1em Inter']
  .map((f) => document.fonts.load(f))).catch(() => {});
Promise.race([fonts, new Promise((r) => setTimeout(r, 1500))]).then(() => {
  createRoot(document.getElementById('root')).render(<App />);
});
