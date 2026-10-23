import express from 'express';
import cors from 'cors';

import healthRouter from './routes/health.routes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

// ─── CORS configuration ───────────────────────────────────────────────────────
// CLIENT_ORIGIN can be a comma-separated list of allowed origins.
// e.g. "http://localhost:5173,https://focusclock.app"
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin "${origin}" is not allowed.`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// ─── App factory ──────────────────────────────────────────────────────────────
const createApp = () => {
  const app = express();

  // Global middleware
  app.use(cors(corsOptions));
  app.use(express.json());           // Parse JSON bodies (throws SyntaxError on bad JSON)
  app.use(express.urlencoded({ extended: true }));

  // ── API routes ────────────────────────────────────────────────────────────
  app.use('/api/v1/health', healthRouter);

  // ── 404 handler — must be after all routes ───────────────────────────────
  app.use('/api', notFound);

  // ── Centralized error handler — must be last ─────────────────────────────
  app.use(errorHandler);

  return app;
};

export default createApp;
