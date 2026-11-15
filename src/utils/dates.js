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

export function addDaysISO(iso, days) {
  const date = parseDay(iso);
  if (!date) return '';
  return formatDay(new Date(date.getTime() + days * DAY_MS));
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

export function formatLongDate(iso) {
  const date = parseDay(iso);
  if (!date) return iso || '';
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function monthGrid(year, month) {
  const first = new Date(Date.UTC(year, month, 1));
  const startWeekday = first.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(formatDay(new Date(Date.UTC(year, month, day))));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return {
    label: new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(first),
    year,
    month,
    cells,
  };
}

export function shiftMonth(year, month, delta) {
  const date = new Date(Date.UTC(year, month + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
}
