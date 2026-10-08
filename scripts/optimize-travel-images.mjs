import fs from 'node:fs/promises';
import sharp from 'sharp';

const photos = [
  ['hajj', 'JFirQekVo3U'],
  ['ramadan', 'gYpKyYFdmi8'],
  ['private', 'tvEDhFhBhXM'],
];
for (const [name, id] of photos) {
  const response = await fetch(`https://unsplash.com/photos/${id}`);
  if (!response.ok) throw new Error(`Photo page ${id}: ${response.status}`);
  const html = await response.text();
  const source = html.match(/property="og:image" content="([^"]+)/)?.[1]?.replaceAll('&amp;', '&');
  if (!source) throw new Error(`Missing photo URL: ${id}`);
  const url = new URL(source);
  url.search = '';
  url.searchParams.set('w', '2400');
  url.searchParams.set('q', '95');
  const image = await fetch(url);
  if (!image.ok) throw new Error(`Photo ${id}: ${image.status}`);
  const buffer = Buffer.from(await image.arrayBuffer());
  for (const width of [320, 640, 1200]) {
    await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(`public/travel/${name}${width === 1200 ? '' : `-${width}`}.webp`);
    await sharp(buffer).rotate().resize(width, Math.round(width * 1.25), { fit: 'cover', position: 'centre' }).webp({ quality: 84, effort: 6 }).toFile(`public/travel/${name}-card-${width}.webp`);
  }
}
for (const name of ['makkah', 'madinah']) {
  for (const width of [320, 640, 1200]) {
    await sharp(`public/travel/${name}.jpg`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(`public/travel/${name}${width === 1200 ? '' : `-${width}`}.webp`);
    await sharp(`public/travel/${name}.jpg`).rotate().resize(width, Math.round(width * 1.25), { fit: 'cover', position: 'centre' }).webp({ quality: 84, effort: 6 }).toFile(`public/travel/${name}-card-${width}.webp`);
  }
}
for (const file of (await fs.readdir('public/travel')).filter(file => file.endsWith('.webp'))) {
  console.log(`${file}: ${((await fs.stat(`public/travel/${file}`)).size / 1024).toFixed(1)} KB`);
}
