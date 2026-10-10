import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The preview tool assigns a free port through PORT; plain `npm run dev` falls back to 5173.
export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5173 },
});
