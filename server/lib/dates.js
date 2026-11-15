const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

export function parseDay(value) {
  if (!DATE_RE.test(String(value || ''))) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDay(date) {
  return date.toISOString().slice(0, 10);
}

export function todayISO() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala' }).format(new Date());
}

export function nightsBetween(checkIn, checkOut) {
  const start = parseDay(checkIn);
  const end = parseDay(checkOut);
  if (!start || !end) return 0;
  return Math.round((end - start) / DAY_MS);
}

export function enumerateNights(checkIn, checkOut) {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return [];
  const start = parseDay(checkIn);
  return Array.from({ length: nights }, (_, index) => formatDay(new Date(start.getTime() + index * DAY_MS)));
}

export function kampalaNow() {
  const stamp = new Date().toLocaleString('en-US', { timeZone: 'Africa/Kampala' });
  return new Date(stamp);
}
