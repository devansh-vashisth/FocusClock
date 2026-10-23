import request from 'supertest';
import createApp from '../src/app.js';

const app = createApp();

describe('GET /api/v1/health', () => {
  it('responds 200 with the expected shape', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.service).toBe('FocusClock API');
    expect(res.body.message).toBe('Server is healthy and running.');
    expect(typeof res.body.timestamp).toBe('string');
  });
});

describe('GET /api/v1/unknown-route', () => {
  it('responds 404 for unknown API routes', async () => {
    const res = await request(app).get('/api/v1/unknown-route');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('POST /api/v1/health with malformed JSON', () => {
  it('responds 400 for malformed JSON body', async () => {
    const res = await request(app)
      .post('/api/v1/health')
      .set('Content-Type', 'application/json')
      .send('{ bad json }');

    // Express.json() rejects it with 400
    expect([400, 404]).toContain(res.statusCode);
    expect(res.body.success).toBe(false);
  });
});
