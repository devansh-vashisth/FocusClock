import 'dotenv/config';            // Load .env before anything else
import createApp from './app.js';
import connectDB from './config/db.js';

const PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  // ── Database ──────────────────────────────────────────────────────────────
  // If MONGODB_URI is provided, connect first — fail fast if it's unreachable.
  // If it's missing, connectDB() logs a clear message and exits.
  if (process.env.MONGODB_URI) {
    await connectDB();
  } else {
    console.warn(
      '[Server] ⚠  MONGODB_URI is not set — starting without a database connection.\n' +
        '          Copy server/.env.example → server/.env and set MONGODB_URI to enable persistence.'
    );
  }

  // ── HTTP server ───────────────────────────────────────────────────────────
  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(
      `[Server] ✔  FocusClock API listening on http://localhost:${PORT}\n` +
        `[Server]    Health → http://localhost:${PORT}/api/v1/health\n` +
        `[Server]    Environment: ${process.env.NODE_ENV || 'development'}`
    );
  });

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n[Server] ${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));

  // Handle unhandled promise rejections (e.g. DB drop mid-run)
  process.on('unhandledRejection', (reason) => {
    console.error('[Server] ✖  Unhandled Rejection:', reason);
    server.close(() => process.exit(1));
  });
};

startServer();
