import { z } from 'zod';
import { MAX, normalizeEmail, normalizeUgPhone } from './safe.js';

const name = z
  .string()
  .trim()
  .min(1, 'Enter your name.')
  .max(MAX.name, 'Name is too long.');

const email = z
  .string()
  .trim()
  .max(MAX.email)
  .transform(normalizeEmail)
  .pipe(z.string().email('Enter a valid email address.'));

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .max(MAX.password, 'Password is too long.');

const phone = z
  .string()
  .transform(normalizeUgPhone)
  .pipe(z.string().regex(/^[7]\d{8}$/, 'Enter a valid Uganda mobile number.'));

const birthday = z
  .string()
  .optional()
  .transform((value) => (value && String(value).trim() ? value : undefined))
  .refine((value) => {
    if (!value) return true;
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return false;
    const now = new Date();
    if (date > now) return false;
    const age = (now - date) / (365.25 * 24 * 60 * 60 * 1000);
    return age >= 13 && age <= 120;
  }, 'Enter a valid birthday.');

export const registerSchema = z
  .object({
    firstName: name,
    lastName: name,
    birthday: birthday,
    phone: z.string(),
    email,
    password,
    confirmPassword: z.string(),
  })
  .transform((data) => ({ ...data, phone: normalizeUgPhone(data.phone) }))
  .superRefine((data, ctx) => {
    const parsed = phone.safeParse(data.phone);
    if (!parsed.success) {
      ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Enter a valid Uganda mobile number.' });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'Passwords do not match.' });
    }
  });

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password.').max(MAX.password),
});

export const forgotSchema = z.object({ email });

export const orderSchema = z.object({
  guestName: name,
  guestPhone: z.string().min(7).max(MAX.phone),
  fulfillment: z.enum(['dine-in', 'takeaway', 'delivery']),
  note: z.string().max(MAX.note).optional(),
  destination: z.string().max(MAX.destination).optional(),
  deliveryZoneId: z.string().max(40).optional(),
  items: z
    .array(
      z.object({
        name: z.string().min(1).max(120),
        qty: z.number().int().min(1).max(20),
        unitPrice: z.number().int().min(0).max(5_000_000),
        optionLabels: z.array(z.string().max(160)).max(12).optional(),
        extraLabels: z.array(z.string().max(160)).max(20).optional(),
      })
    )
    .min(1)
    .max(40),
});

export const firstZodError = (error) => {
  const issue = error?.issues?.[0] || error?.errors?.[0];
  return issue?.message || 'Please check your details.';
};
