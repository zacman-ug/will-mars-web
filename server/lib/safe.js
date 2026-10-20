export const MAX = {
  name: 80,
  email: 254,
  phone: 20,
  password: 72,
  note: 500,
  destination: 160,
};

export const clampString = (value, max) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
};

export const digitsOnly = (value) => clampString(value, MAX.phone).replace(/\D/g, '');

export const normalizeEmail = (value) => clampString(value, MAX.email).toLowerCase();

export const normalizeUgPhone = (value) => {
  let digits = digitsOnly(value);
  if (digits.startsWith('256')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits;
};

export const toE164Ug = (localNine) => `256${localNine}`;

export const publicError = (res, status, message) =>
  res.status(status).json({ ok: false, error: message });

export const publicUser = (customer) => {
  if (!customer) return null;
  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    birthday: customer.birthday,
  };
};
