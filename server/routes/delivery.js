import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { optionalCustomer } from '../lib/auth.js';
import { firstZodError, orderSchema } from '../lib/schemas.js';
import { clampString, MAX, publicError } from '../lib/safe.js';

const FALLBACK_ZONES = [
  { id: 'fallback-makindye', slug: 'makindye', name: 'Makindye / Makamba Road', fee: 5000 },
  { id: 'fallback-central', slug: 'central', name: 'Kampala Central', fee: 8000 },
  { id: 'fallback-ntinda', slug: 'ntinda', name: 'Ntinda / Bukoto', fee: 12000 },
];

export const deliveryRouter = Router();

deliveryRouter.get('/zones', async (_req, res) => {
  try {
    const zones = await prisma.deliveryZone.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, slug: true, name: true, fee: true },
    });
    if (!zones.length) {
      return res.json({ ok: true, zones: FALLBACK_ZONES });
    }
    return res.json({ ok: true, zones });
  } catch {
    return res.json({ ok: true, zones: FALLBACK_ZONES });
  }
});

deliveryRouter.post('/quote', async (req, res) => {
  const zoneId = clampString(req.body?.zoneId, 40);
  if (!zoneId) return publicError(res, 400, 'Choose a delivery destination.');

  try {
    const zone = await prisma.deliveryZone.findFirst({
      where: { id: zoneId, active: true },
      select: { id: true, name: true, fee: true, slug: true },
    });
    if (!zone) return publicError(res, 404, 'That delivery area is not available.');
    return res.json({ ok: true, zone });
  } catch {
    return publicError(res, 500, 'Could not calculate delivery.');
  }
});

deliveryRouter.post('/orders', optionalCustomer, async (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) return publicError(res, 400, firstZodError(parsed.error));

  const data = parsed.data;
  const subtotal = data.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  if (subtotal <= 0 || subtotal > 20_000_000) {
    return publicError(res, 400, 'Order total looks invalid.');
  }

  let deliveryFee = 0;
  let zone = null;

  if (data.fulfillment === 'delivery') {
    const zoneId = clampString(data.deliveryZoneId || '', 40);
    if (!zoneId) return publicError(res, 400, 'Choose where the order should be delivered.');
    try {
      zone = await prisma.deliveryZone.findFirst({
        where: { id: zoneId, active: true },
      });
    } catch {
      return publicError(res, 500, 'Could not verify delivery area.');
    }
    if (!zone) return publicError(res, 400, 'Choose a valid delivery destination.');
    deliveryFee = zone.fee;
    if (!clampString(data.destination || '', MAX.destination)) {
      return publicError(res, 400, 'Add a delivery address or landmark.');
    }
  }

  const total = subtotal + deliveryFee;

  try {
    const order = await prisma.order.create({
      data: {
        customerId: req.customerId || null,
        guestName: data.guestName,
        guestPhone: clampString(data.guestPhone, MAX.phone),
        fulfillment: data.fulfillment,
        note: clampString(data.note || '', MAX.note) || null,
        destination: data.fulfillment === 'delivery' ? clampString(data.destination, MAX.destination) : null,
        deliveryZoneId: zone?.id || null,
        deliveryFee,
        subtotal,
        total,
        itemsJson: data.items,
      },
    });
    return res.status(201).json({
      ok: true,
      order: {
        id: order.id,
        subtotal,
        deliveryFee,
        total,
        zoneName: zone?.name || null,
      },
    });
  } catch {
    return publicError(res, 500, 'Could not save the order.');
  }
});
