// Konfiguration für Vite, den Dev-Server und Bundler.
// Vite selbst läuft übrigens auf Node.js – ein Beispiel dafür,
// dass Node nicht nur für Backends genutzt wird.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
