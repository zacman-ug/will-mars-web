import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import {
  clearSessionCookie,
  hashPassword,
  optionalCustomer,
  requireCustomer,
  setSessionCookie,
  signSession,
  verifyPassword,
} from '../lib/auth.js';
import { firstZodError, forgotSchema, loginSchema, registerSchema } from '../lib/schemas.js';
import { publicError, publicUser, toE164Ug } from '../lib/safe.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));

  const { firstName, lastName, birthday, phone, email, password } = parsed.data;
  const e164 = toE164Ug(phone);

  try {
    const passwordHash = await hashPassword(password);
    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        birthday: birthday ? new Date(birthday) : null,
        phone: e164,
        email,
        passwordHash,
        provider: 'local',
      },
    });
    const token = signSession(customer.id);
    setSessionCookie(res, token);
    return res.status(201).json({ ok: true, customer: publicUser(customer) });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return publicError(res, 409, 'An account with that email or phone already exists.');
    }
    return publicError(res, 500, 'Could not create your account. Try again.');
  }
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));

  try {
    const customer = await prisma.customer.findUnique({ where: { email: parsed.data.email } });
    const valid = customer?.passwordHash
      ? await verifyPassword(parsed.data.password, customer.passwordHash)
      : false;

    if (!customer || !valid) {
      return publicError(res, 401, 'Invalid email or password.');
    }

    const token = signSession(customer.id);
    setSessionCookie(res, token);
    return res.json({ ok: true, customer: publicUser(customer) });
  } catch {
    return publicError(res, 500, 'Could not log in. Try again.');
  }
});

authRouter.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  return res.json({ ok: true });
});

authRouter.get('/me', optionalCustomer, (req, res) => {
  return res.json({ ok: true, customer: req.customer ?? null });
});

authRouter.post('/forgot', async (req, res) => {
  const parsed = forgotSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));

  try {
    await prisma.customer.findUnique({ where: { email: parsed.data.email } });
  } catch {
    /* do not leak */
  }
  return res.json({
    ok: true,
    message: 'If that email is registered, we will send reset instructions.',
  });
});

authRouter.get('/account', requireCustomer, (req, res) => {
  return res.json({ ok: true, customer: req.customer });
});
