import fs from 'node:fs/promises';
import path from 'node:path';

const host = 'breakuprelief.com';
const key = 'c1acbd06d7d5043e8d4e45630f2063015b85f0bae08c3fcc94bcf615006d922d';
const baseUrl = (process.env.INDEXNOW_BASE_URL ?? 'https://breakuprelief.com').replace(/\/$/, '');
const keyLocation = `${baseUrl}/${key}.txt`;
const endpoint = process.env.INDEXNOW_ENDPOINT ?? 'https://api.indexnow.org/indexnow';

const sitemapPath = path.resolve('dist/sitemap.xml');
const sitemap = await fs.readFile(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .map((url) => url.replace(/^https?:\/\/breakuprelief\.com/i, baseUrl));

if (!urls.length) {
  console.error('No sitemap URLs found to submit.');
  process.exit(1);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: urls,
  }),
});

const text = await response.text();
if (![200, 202].includes(response.status)) {
  console.error(`IndexNow submission failed: ${response.status} ${text}`);
  process.exit(1);
}

console.log(`IndexNow accepted ${urls.length} URLs with status ${response.status}.`);
