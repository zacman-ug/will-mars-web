import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma.js';
import { publicUser } from './safe.js';

const COOKIE = 'willmars_session';
const SALT_ROUNDS = 12;

const jwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET is missing or too short');
  }
  return secret;
};

export const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);

export const verifyPassword = (plain, hash) => {
  if (!plain || !hash) return Promise.resolve(false);
  return bcrypt.compare(plain, hash);
};

export const signSession = (customerId) =>
  jwt.sign({ sub: customerId }, jwtSecret(), { expiresIn: '7d' });

export const setSessionCookie = (res, token) => {
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

export const clearSessionCookie = (res) => {
  res.clearCookie(COOKIE, { httpOnly: true, sameSite: 'lax', path: '/' });
};

export async function requireCustomer(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE];
    if (!token) {
      return res.status(401).json({ ok: false, error: 'Please log in.' });
    }
    const payload = jwt.verify(token, jwtSecret());
    if (!payload?.sub || typeof payload.sub !== 'string') {
      return res.status(401).json({ ok: false, error: 'Please log in.' });
    }
    const customer = await prisma.customer.findUnique({ where: { id: payload.sub } });
    if (!customer) {
      clearSessionCookie(res);
      return res.status(401).json({ ok: false, error: 'Please log in.' });
    }
    req.customer = publicUser(customer);
    req.customerId = customer.id;
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: 'Please log in.' });
  }
}

export async function optionalCustomer(req, _res, next) {
  try {
    const token = req.cookies?.[COOKIE];
    if (!token) return next();
    const payload = jwt.verify(token, jwtSecret());
    if (!payload?.sub) return next();
    const customer = await prisma.customer.findUnique({ where: { id: payload.sub } });
    if (customer) {
      req.customer = publicUser(customer);
      req.customerId = customer.id;
    }
  } catch {
    /* ignore invalid cookies */
  }
  return next();
}
