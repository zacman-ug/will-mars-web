export const BAKERY_ITEMS = [
  {
    slug: 'celebration-cake',
    name: 'Celebration cake',
    summary: 'A proper iced cake for birthdays and small tables.',
    description: 'Sponge cake, buttercream, and a short inscription if you want one. Choose size and flavour. We need two days.',
    category: 'Cakes',
    basePrice: 85000,
    leadHours: 48,
    image: '/images/menu/ds-01.webp',
    sizes: [
      { id: '1kg', name: '1 kg · 6–8 slices', price: 0 },
      { id: '2kg', name: '2 kg · 12–16 slices', price: 45000 },
      { id: '3kg', name: '3 kg · 20–24 slices', price: 90000 },
    ],
    flavours: [
      { id: 'vanilla', name: 'Vanilla', price: 0 },
      { id: 'chocolate', name: 'Chocolate', price: 0 },
      { id: 'red-velvet', name: 'Red velvet', price: 10000 },
      { id: 'passion', name: 'Passion fruit', price: 8000 },
    ],
    extras: [
      { id: 'inscription', name: 'Inscription on the cake', price: 8000 },
      { id: 'fresh-fruit', name: 'Fresh fruit finish', price: 15000 },
      { id: 'candles', name: 'Candles', price: 3000 },
    ],
    sortOrder: 1,
  },
  {
    slug: 'custom-tiered-cake',
    name: 'Custom tiered cake',
    summary: 'Two or three tiers, designed with you for a wedding or church day.',
    description:
      'We sketch flavour and finish with you. Write what you need in the notes. Three days’ notice, more if the week is already booked.',
    category: 'Cakes',
    basePrice: 280000,
    leadHours: 72,
    image: '/images/gallery/gal-05.webp',
    sizes: [
      { id: 'two-tier', name: 'Two tier', price: 0 },
      { id: 'three-tier', name: 'Three tier', price: 120000 },
    ],
    flavours: [
      { id: 'mixed', name: 'Mixed flavours (tell us below)', price: 0 },
      { id: 'chocolate', name: 'All chocolate', price: 0 },
      { id: 'vanilla', name: 'All vanilla', price: 0 },
    ],
    extras: [
      { id: 'fresh-flowers', name: 'Fresh flowers', price: 40000 },
      { id: 'gold-leaf', name: 'Gold detail', price: 25000 },
    ],
    sortOrder: 2,
  },
  {
    slug: 'cupcake-dozen',
    name: 'Cupcakes, a dozen',
    summary: 'A box of twelve for an office or a children’s table.',
    description: 'Vanilla or chocolate, iced, packed in a box. Same-day is possible if you book before noon for a late pickup.',
    category: 'Trays',
    basePrice: 48000,
    leadHours: 12,
    image: '/images/menu/ds-02.webp',
    sizes: [
      { id: '12', name: '12 cupcakes', price: 0 },
      { id: '24', name: '24 cupcakes', price: 45000 },
    ],
    flavours: [
      { id: 'vanilla', name: 'Vanilla', price: 0 },
      { id: 'chocolate', name: 'Chocolate', price: 0 },
      { id: 'mixed', name: 'Half and half', price: 0 },
    ],
    extras: [
      { id: 'inscription', name: 'A short message on the box', price: 5000 },
      { id: 'theme-icing', name: 'Coloured icing for an occasion', price: 12000 },
    ],
    sortOrder: 3,
  },
  {
    slug: 'morning-pastry-tray',
    name: 'Morning pastry tray',
    summary: 'A tray for the meeting that starts at eight.',
    description: 'Samosas, mini chapatis, and a sweet bun mix. Feeds a table of ten. Book the evening before.',
    category: 'Trays',
    basePrice: 65000,
    leadHours: 18,
    image: '/images/menu/sn-04.webp',
    sizes: [
      { id: '10', name: 'Tray for ~10', price: 0 },
      { id: '20', name: 'Tray for ~20', price: 60000 },
    ],
    flavours: [
      { id: 'mixed', name: 'Mixed savoury & sweet', price: 0 },
      { id: 'savoury', name: 'Savoury only', price: 0 },
    ],
    extras: [
      { id: 'juice-jugs', name: 'Two jugs of juice', price: 24000 },
      { id: 'tea-urn', name: 'African tea for the table', price: 28000 },
    ],
    sortOrder: 4,
  },
  {
    slug: 'banana-loaf',
    name: 'Banana loaf',
    summary: 'A loaf to take home, or two for Sunday.',
    description: 'Banana bread, sliced if you ask. Ready the same afternoon if you book by morning.',
    category: 'Loaves',
    basePrice: 18000,
    leadHours: 8,
    image: '/images/menu/br-01.webp',
    sizes: [
      { id: 'one', name: 'One loaf', price: 0 },
      { id: 'two', name: 'Two loaves', price: 16000 },
    ],
    flavours: [
      { id: 'plain', name: 'Plain', price: 0 },
      { id: 'walnut', name: 'With walnuts', price: 4000 },
    ],
    extras: [],
    sortOrder: 5,
  },
];

export const getBakeryBySlug = (slug) => BAKERY_ITEMS.find((item) => item.slug === slug);

export const bakeryLineTotal = (item, sizeId, flavourId, extraIds = [], qty = 1) => {
  const size = item.sizes?.find((entry) => entry.id === sizeId);
  const flavour = item.flavours?.find((entry) => entry.id === flavourId);
  const extras = (item.extras || []).filter((extra) => extraIds.includes(extra.id));
  const unit = item.basePrice + (size?.price || 0) + (flavour?.price || 0) + extras.reduce((sum, extra) => sum + extra.price, 0);
  return { unit, total: unit * Math.max(1, qty), size, flavour, extras };
};
