-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'cancelled');

-- CreateTable
CREATE TABLE "StayListing" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "nightlyRate" INTEGER NOT NULL,
    "cleaningFee" INTEGER NOT NULL DEFAULT 0,
    "maxGuests" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StayListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StayBooking" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "customerId" TEXT,
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "nights" INTEGER NOT NULL,
    "nightlyRate" INTEGER NOT NULL,
    "cleaningFee" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "note" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StayBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BakeryItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "leadHours" INTEGER NOT NULL DEFAULT 24,
    "image" TEXT NOT NULL,
    "sizes" JSONB NOT NULL,
    "flavours" JSONB NOT NULL,
    "extras" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BakeryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BakeryOrder" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "customerId" TEXT,
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT,
    "pickupAt" TIMESTAMP(3) NOT NULL,
    "fulfillment" TEXT NOT NULL,
    "destination" TEXT,
    "sizeId" TEXT,
    "flavourId" TEXT,
    "extraIds" JSONB NOT NULL,
    "qty" INTEGER NOT NULL,
    "messageOnCake" TEXT,
    "note" TEXT,
    "unitPrice" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BakeryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StayListing_slug_key" ON "StayListing"("slug");

-- CreateIndex
CREATE INDEX "StayBooking_listingId_checkIn_checkOut_idx" ON "StayBooking"("listingId", "checkIn", "checkOut");

-- CreateIndex
CREATE INDEX "StayBooking_status_idx" ON "StayBooking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "BakeryItem_slug_key" ON "BakeryItem"("slug");

-- CreateIndex
CREATE INDEX "BakeryOrder_itemId_pickupAt_idx" ON "BakeryOrder"("itemId", "pickupAt");

-- AddForeignKey
ALTER TABLE "StayBooking" ADD CONSTRAINT "StayBooking_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "StayListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StayBooking" ADD CONSTRAINT "StayBooking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BakeryOrder" ADD CONSTRAINT "BakeryOrder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "BakeryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BakeryOrder" ADD CONSTRAINT "BakeryOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
