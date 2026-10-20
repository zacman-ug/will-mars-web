import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth.js';
import { deliveryRouter } from './routes/delivery.js';

const PORT = Number(process.env.API_PORT) || 5181;
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5180';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('Set JWT_SECRET in .env (at least 32 characters).');
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many attempts. Try again in a few minutes.' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authLimit, authRouter);
app.use('/api', deliveryRouter);

app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found.' }));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API listening on ${PORT}`);
});
