import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { optionalCustomer } from '../lib/auth.js';
import { bakeryBookSchema, firstZodError } from '../lib/schemas.js';
import { clampString, MAX, publicError } from '../lib/safe.js';
import { todayISO } from '../lib/dates.js';
import { BAKERY_ITEMS, bakeryLineTotal } from '../../src/constants/bakery.js';

export const bakeryRouter = Router();

const publicItem = (item) => ({
  slug: item.slug,
  name: item.name,
  summary: item.summary,
  description: item.description,
  category: item.category,
  basePrice: item.basePrice,
  leadHours: item.leadHours,
  image: item.image,
  sizes: item.sizes,
  flavours: item.flavours,
  extras: item.extras,
});

async function loadItems() {
  try {
    const rows = await prisma.bakeryItem.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (rows.length) return rows;
  } catch {
    /* fall through */
  }
  return BAKERY_ITEMS;
}

async function loadItem(slug) {
  try {
    const row = await prisma.bakeryItem.findFirst({ where: { slug, active: true } });
    if (row) return row;
  } catch {
    /* fall through */
  }
  return BAKERY_ITEMS.find((item) => item.slug === slug) || null;
}

bakeryRouter.get('/', async (_req, res) => {
  const items = await loadItems();
  return res.json({ ok: true, items: items.map(publicItem) });
});

bakeryRouter.get('/:slug', async (req, res) => {
  const item = await loadItem(clampString(req.params.slug, 80));
  if (!item) return publicError(res, 404, 'That bakery item is not listed.');
  return res.json({ ok: true, item: publicItem(item) });
});

bakeryRouter.post('/book', optionalCustomer, async (req, res) => {
  const parsed = bakeryBookSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));
  const data = parsed.data;
  const item = await loadItem(data.slug);
  if (!item) return publicError(res, 404, 'That bakery item is not listed.');

  const sizeOk = !item.sizes?.length || item.sizes.some((entry) => entry.id === data.sizeId);
  const flavourOk = !item.flavours?.length || item.flavours.some((entry) => entry.id === data.flavourId);
  if (!sizeOk) return publicError(res, 400, 'Choose a size.');
  if (!flavourOk) return publicError(res, 400, 'Choose a flavour.');

  const extraIds = (data.extraIds || []).filter((id) => (item.extras || []).some((extra) => extra.id === id));
  const wantsInscription = extraIds.includes('inscription');
  const message = clampString(data.messageOnCake || '', MAX.cakeMessage);
  if (wantsInscription && !message) {
    return publicError(res, 400, 'Write the inscription for the cake.');
  }

  if (data.fulfillment === 'delivery' && !clampString(data.destination || '', MAX.destination)) {
    return publicError(res, 400, 'Add a delivery address or landmark.');
  }

  if (data.pickupDate < todayISO()) {
    return publicError(res, 400, 'Choose a pickup date from today onwards.');
  }

  const pickupAt = new Date(`${data.pickupDate}T${data.pickupTime}:00+03:00`);
  if (Number.isNaN(pickupAt.getTime())) return publicError(res, 400, 'Choose a valid pickup date and time.');

  const hour = Number(data.pickupTime.slice(0, 2));
  if (hour < 8 || hour > 20) {
    return publicError(res, 400, 'Bakery collection is between 8:00 and 20:00.');
  }

  const earliest = Date.now() + (item.leadHours || 24) * 60 * 60 * 1000;
  if (pickupAt.getTime() < earliest) {
    return publicError(res, 400, `This needs about ${item.leadHours} hours’ notice. Choose a later time.`);
  }

  const priced = bakeryLineTotal(item, data.sizeId, data.flavourId, extraIds, data.qty);
  if (priced.total <= 0 || priced.total > 20_000_000) {
    return publicError(res, 400, 'That bakery total looks invalid.');
  }

  try {
    const order = item.id
      ? await prisma.bakeryOrder.create({
          data: {
            itemId: item.id,
            customerId: req.customerId || null,
            guestName: data.guestName,
            guestPhone: data.guestPhone,
            guestEmail: data.guestEmail || null,
            pickupAt,
            fulfillment: data.fulfillment,
            destination: data.fulfillment === 'delivery' ? clampString(data.destination, MAX.destination) : null,
            sizeId: data.sizeId || null,
            flavourId: data.flavourId || null,
            extraIds,
            qty: data.qty,
            messageOnCake: message || null,
            note: clampString(data.note || '', MAX.note) || null,
            unitPrice: priced.unit,
            total: priced.total,
          },
        })
      : { id: 'local', total: priced.total };

    return res.status(201).json({
      ok: true,
      order: {
        id: order.id,
        name: item.name,
        slug: item.slug,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        fulfillment: data.fulfillment,
        qty: data.qty,
        size: priced.size?.name || null,
        flavour: priced.flavour?.name || null,
        extras: priced.extras.map((extra) => extra.name),
        messageOnCake: message || null,
        total: priced.total,
      },
    });
  } catch {
    return publicError(res, 500, 'Could not save the bakery booking. Try WhatsApp if this continues.');
  }
});
