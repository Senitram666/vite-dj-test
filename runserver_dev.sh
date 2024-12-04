wait-for-it backend:8000 -t 60
npm install && npm run dev -- --host 0.0.0.0 || cat npm-debug.log