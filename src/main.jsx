import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/vazirmatn/wght.css';
import './ds/styles.css';
import './index.css';
import App from './App.jsx';
import { LangProvider, initialLang } from './i18n.jsx';

// A reload would restore a scroll position before the layout is final, which looks like a glitch: always start at the top.
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Wait (briefly) for the fonts of the language we start in, so the headline never swaps mid-entrance and shifts the layout.
// The sample text matters: fonts are split by script, and only the parts the text needs are downloaded.
const FONTS = initialLang === 'fa'
  ? ["300 1em 'Vazirmatn Variable'", "400 1em 'Vazirmatn Variable'", "500 1em 'Vazirmatn Variable'"]
  : ['300 1em Newsreader', '400 1em Newsreader', 'italic 300 1em Newsreader', 'italic 400 1em Newsreader', '400 1em Inter', '500 1em Inter', '600 1em Inter'];
const fonts = Promise.all(FONTS.map((f) => document.fonts.load(f, 'Dentax دنتکس'))).catch(() => {});
Promise.race([fonts, new Promise((r) => setTimeout(r, 1500))]).then(() => {
  createRoot(document.getElementById('root')).render(<LangProvider><App /></LangProvider>);
});
