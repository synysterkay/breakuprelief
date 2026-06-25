import fs from 'node:fs/promises';
import path from 'node:path';

const host = 'breakuprelief.com';
const key = 'c1acbd06d7d5043e8d4e45630f2063015b85f0bae08c3fcc94bcf615006d922d';
const baseUrl = (process.env.INDEXNOW_BASE_URL ?? 'http://breakuprelief.com').replace(/\/$/, '');
const keyLocation = `${baseUrl}/${key}.txt`;
const endpoints = (process.env.INDEXNOW_ENDPOINTS ?? 'https://api.indexnow.org/indexnow,https://yandex.com/indexnow')
  .split(',')
  .map((endpoint) => endpoint.trim())
  .filter(Boolean);

const sitemapPath = path.resolve('dist/sitemap.xml');
const sitemap = await fs.readFile(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .map((url) => url.replace(/^https?:\/\/breakuprelief\.com/i, baseUrl));

if (!urls.length) {
  console.error('No sitemap URLs found to submit.');
  process.exit(1);
}

let accepted = 0;
for (const endpoint of endpoints) {
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
  if ([200, 202].includes(response.status)) {
    accepted += 1;
    console.log(`IndexNow accepted ${urls.length} URLs at ${endpoint} with status ${response.status}.`);
  } else {
    console.warn(`IndexNow rejected ${endpoint}: ${response.status} ${text}`);
  }
}

if (!accepted) {
  console.error('IndexNow submission failed at every endpoint.');
  process.exit(1);
}
