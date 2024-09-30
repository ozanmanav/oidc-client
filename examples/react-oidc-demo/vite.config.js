﻿import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'], //possibly needed due to duplicates from monorepo. supposedly plugin-react already does this? https://github.com/vitejs/vite/issues/8378
  },
  build: {
    sourcemap: true,
    minify: false,
  },
  server: {
    headers: {
      //"Content-Security-Policy": "script-src 'unsafe-inline' https://www.google-analitics.com;",
    },
    open: true,
    https:
      process.env.NODE_ENV === 'development'
        ? {
            key: fs.readFileSync('./.cert/key.pem'),
            cert: fs.readFileSync('./.cert/cert.pem'),
          }
        : undefined,
  },
});
