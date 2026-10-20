import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { FALLBACK_PHOTO, GALLERY_PHOTOS, MENU_PHOTOS, SITE_PHOTOS } from './photo-map.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

async function fetchBuffer(id, w, h) {
  const res = await fetch(unsplash(id, w, h), {
    headers: { 'Accept': 'image/*', 'User-Agent': 'will-mars-web/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveWebp(relDir, name, photoId, w, h) {
  const dir = path.join(root, 'public', 'images', relDir);
  await mkdir(dir, { recursive: true });
  let raw;
  try {
    raw = await fetchBuffer(photoId, w, h);
  } catch {
    raw = await fetchBuffer(FALLBACK_PHOTO, w, h);
  }
  const webp = await sharp(raw).rotate().resize(w, h, { fit: 'cover' }).webp({ quality: 72 }).toBuffer();
  const dest = path.join(dir, `${name}.webp`);
  await writeFile(dest, webp);
  return dest;
}

async function run() {
  const jobs = [
    ...Object.entries(MENU_PHOTOS).map(([id, photo]) => () => saveWebp('menu', id, photo, 800, 800)),
    ...Object.entries(SITE_PHOTOS).map(([id, photo]) => () => saveWebp('site', id, photo, 1400, 900)),
    ...Object.entries(GALLERY_PHOTOS).map(([id, photo]) => () => saveWebp('gallery', id, photo, 1000, 800)),
  ];

  for (const job of jobs) {
    const dest = await job();
    console.log('saved', path.relative(root, dest));
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
