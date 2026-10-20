import { PrismaClient } from '@prisma/client';

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
