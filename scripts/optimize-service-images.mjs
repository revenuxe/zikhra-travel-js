import sharp from 'sharp';

const photos = [
  ['visa', 'wOj5HTw2YMc'],
  ['hotel', '7A4wu3gPUYY'],
  ['flights', 'rf6ywHVkrlY'],
  ['ziyarat', 'AQwT375TWU0'],
];
for (const [name, id] of photos) {
  const page = await fetch(`https://unsplash.com/photos/${id}`);
  if (!page.ok) throw new Error(`Photo page ${id}: ${page.status}`);
  const html = await page.text();
  const source = html.match(/property="og:image" content="([^"]+)/)?.[1]?.replaceAll('&amp;', '&');
  if (!source) throw new Error(`Missing photo URL: ${id}`);
  const url = new URL(source);
  url.search = '';
  url.searchParams.set('w', '2000');
  url.searchParams.set('q', '95');
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Photo ${id}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(`public/travel/${name}.webp`);
}
for (const name of ['visa', 'hotel', 'flights', 'ziyarat', 'makkah', 'madinah', 'hajj', 'ramadan']) {
  for (const width of [320, 640, 960]) {
    const result = await sharp(`public/travel/${name}.webp`).resize(width, width * 0.75, { fit: 'cover', position: 'centre' }).webp({ quality: 82, effort: 6 }).toFile(`public/travel/${name}-landscape-${width}.webp`);
    console.log(`${name} ${width}: ${(result.size / 1024).toFixed(1)} KB`);
  }
}
