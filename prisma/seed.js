import { PrismaClient } from '@prisma/client';
import { STAY_LISTINGS } from '../src/constants/stays.js';
import { BAKERY_ITEMS } from '../src/constants/bakery.js';

const prisma = new PrismaClient();

const zones = [
  { slug: 'makindye', name: 'Makindye / Makamba Road', fee: 5000, sortOrder: 1 },
  { slug: 'kabalagala', name: 'Kabalagala / Nsambya', fee: 6000, sortOrder: 2 },
  { slug: 'central', name: 'Kampala Central', fee: 8000, sortOrder: 3 },
  { slug: 'nakasero', name: 'Nakasero / Kololo', fee: 10000, sortOrder: 4 },
  { slug: 'ntinda', name: 'Ntinda / Bukoto', fee: 12000, sortOrder: 5 },
  { slug: 'najjera', name: 'Najjera / Kira', fee: 15000, sortOrder: 6 },
  { slug: 'entebbe-rd', name: 'Entebbe Road / Kajjansi', fee: 18000, sortOrder: 7 },
  { slug: 'wakiso', name: 'Wakiso / Nansana', fee: 20000, sortOrder: 8 },
];

async function main() {
  for (const zone of zones) {
    await prisma.deliveryZone.upsert({
      where: { slug: zone.slug },
      update: { name: zone.name, fee: zone.fee, sortOrder: zone.sortOrder, active: true },
      create: zone,
    });
  }

  for (const listing of STAY_LISTINGS) {
    await prisma.stayListing.upsert({
      where: { slug: listing.slug },
      update: {
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
        active: true,
        sortOrder: listing.sortOrder,
      },
      create: listing,
    });
  }

  for (const item of BAKERY_ITEMS) {
    await prisma.bakeryItem.upsert({
      where: { slug: item.slug },
      update: {
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
        active: true,
        sortOrder: item.sortOrder,
      },
      create: item,
    });
  }
}

main()
  .catch((error) => {
    console.error('Seed failed');
    process.exitCode = 1;
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
