import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { optionalCustomer } from '../lib/auth.js';
import { firstZodError, stayBookSchema } from '../lib/schemas.js';
import { clampString, MAX, publicError } from '../lib/safe.js';
import { enumerateNights, nightsBetween, parseDay, todayISO } from '../lib/dates.js';
import { STAY_LISTINGS } from '../../src/constants/stays.js';

export const staysRouter = Router();

const publicListing = (listing) => ({
  slug: listing.slug,
  title: listing.title,
  summary: listing.summary,
  description: listing.description,
  nightlyRate: listing.nightlyRate,
  cleaningFee: listing.cleaningFee,
  maxGuests: listing.maxGuests,
  bedrooms: listing.bedrooms,
  beds: listing.beds,
  baths: listing.baths,
  amenities: listing.amenities,
  images: listing.images,
});

async function loadListings() {
  try {
    const rows = await prisma.stayListing.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (rows.length) return rows;
  } catch {
    /* fall through */
  }
  return STAY_LISTINGS;
}

async function loadListing(slug) {
  try {
    const row = await prisma.stayListing.findFirst({ where: { slug, active: true } });
    if (row) return row;
  } catch {
    /* fall through */
  }
  return STAY_LISTINGS.find((listing) => listing.slug === slug) || null;
}

async function blockedNightsFor(listingId, from, to) {
  if (!listingId) return [];
  const start = parseDay(from);
  const end = parseDay(to);
  if (!start || !end) return [];
  const bookings = await prisma.stayBooking.findMany({
    where: {
      listingId,
      status: { in: ['pending', 'confirmed'] },
      checkIn: { lt: end },
      checkOut: { gt: start },
    },
    select: { checkIn: true, checkOut: true },
  });
  const blocked = new Set();
  bookings.forEach((booking) => {
    enumerateNights(booking.checkIn.toISOString().slice(0, 10), booking.checkOut.toISOString().slice(0, 10)).forEach(
      (night) => blocked.add(night)
    );
  });
  return [...blocked];
}

async function rangeIsFree(listingId, checkIn, checkOut) {
  if (!listingId) return true;
  const start = parseDay(checkIn);
  const end = parseDay(checkOut);
  const clash = await prisma.stayBooking.findFirst({
    where: {
      listingId,
      status: { in: ['pending', 'confirmed'] },
      checkIn: { lt: end },
      checkOut: { gt: start },
    },
    select: { id: true },
  });
  return !clash;
}

staysRouter.get('/', async (req, res) => {
  const checkIn = clampString(req.query.checkIn || '', 10);
  const checkOut = clampString(req.query.checkOut || '', 10);
  const guests = Number(req.query.guests || 1);
  const listings = await loadListings();
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const today = todayISO();

  if (checkIn && checkOut) {
    if (nights < 1 || nights > 30 || checkIn < today) {
      return publicError(res, 400, 'Choose a check-in and check-out that make a stay of 1–30 nights.');
    }
  }

  const available = [];
  for (const listing of listings) {
    if (Number.isFinite(guests) && guests > listing.maxGuests) continue;
    if (nights >= 1 && listing.id) {
      const free = await rangeIsFree(listing.id, checkIn, checkOut);
      if (!free) continue;
    }
    available.push(publicListing(listing));
  }

  return res.json({ ok: true, listings: available });
});

staysRouter.get('/:slug/availability', async (req, res) => {
  const slug = clampString(req.params.slug, 80);
  const listing = await loadListing(slug);
  if (!listing) return publicError(res, 404, 'That room is not listed.');
  const from = clampString(req.query.from || todayISO(), 10);
  const to = clampString(req.query.to || '', 10);
  const end = parseDay(to) ? to : formatPlusMonths(from, 4);
  try {
    const blocked = listing.id ? await blockedNightsFor(listing.id, from, end) : [];
    return res.json({ ok: true, blocked });
  } catch {
    return res.json({ ok: true, blocked: [] });
  }
});

staysRouter.get('/:slug', async (req, res) => {
  const listing = await loadListing(clampString(req.params.slug, 80));
  if (!listing) return publicError(res, 404, 'That room is not listed.');
  return res.json({ ok: true, listing: publicListing(listing) });
});

staysRouter.post('/book', optionalCustomer, async (req, res) => {
  const parsed = stayBookSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));
  const data = parsed.data;
  const nights = nightsBetween(data.checkIn, data.checkOut);
  const today = todayISO();
  if (nights < 1 || nights > 30 || data.checkIn < today) {
    return publicError(res, 400, 'Choose a stay of 1–30 nights starting today or later.');
  }

  const listing = await loadListing(data.slug);
  if (!listing) return publicError(res, 404, 'That room is not listed.');
  if (data.guests > listing.maxGuests) {
    return publicError(res, 400, `This room takes up to ${listing.maxGuests} guests.`);
  }

  const nightsCost = listing.nightlyRate * nights;
  const total = nightsCost + listing.cleaningFee;
  if (total <= 0 || total > 50_000_000) {
    return publicError(res, 400, 'That booking total looks invalid.');
  }

  try {
    if (listing.id) {
      const free = await rangeIsFree(listing.id, data.checkIn, data.checkOut);
      if (!free) return publicError(res, 409, 'Those dates are no longer free. Choose another stay.');
    }

    const booking = listing.id
      ? await prisma.stayBooking.create({
          data: {
            listingId: listing.id,
            customerId: req.customerId || null,
            guestName: data.guestName,
            guestPhone: data.guestPhone,
            guestEmail: data.guestEmail || null,
            checkIn: parseDay(data.checkIn),
            checkOut: parseDay(data.checkOut),
            guests: data.guests,
            nights,
            nightlyRate: listing.nightlyRate,
            cleaningFee: listing.cleaningFee,
            total,
            note: clampString(data.note || '', MAX.note) || null,
          },
        })
      : { id: 'local', nights, total };

    return res.status(201).json({
      ok: true,
      booking: {
        id: booking.id,
        title: listing.title,
        slug: listing.slug,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        nights,
        nightlyRate: listing.nightlyRate,
        cleaningFee: listing.cleaningFee,
        total,
      },
    });
  } catch {
    return publicError(res, 500, 'Could not save the stay. Try WhatsApp if this continues.');
  }
});

function formatPlusMonths(from, months) {
  const start = parseDay(from) || parseDay(todayISO());
  const later = new Date(start);
  later.setUTCMonth(later.getUTCMonth() + months);
  return later.toISOString().slice(0, 10);
}
