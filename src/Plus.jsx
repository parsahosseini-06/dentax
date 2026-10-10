import React from 'react';

// Drawn as two strokes so it is optically centered, unlike a "+" text glyph.
export default function Plus({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M7 1.5v11M1.5 7h11" />
    </svg>
  );
}
