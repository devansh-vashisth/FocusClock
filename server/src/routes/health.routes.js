import { Router } from 'express';

const router = Router();

/**
 * GET /api/v1/health
 * Returns a lightweight JSON payload confirming the service is alive.
 */
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    service: 'FocusClock API',
    version: '1.0.0',
    message: 'Server is healthy and running.',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
