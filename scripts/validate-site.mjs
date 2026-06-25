import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const required = ['index.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'appicon.png'];
const missing = required.filter((file) => !fs.existsSync(path.join(dist, file)));

if (missing.length) {
  console.error(`Missing build outputs: ${missing.join(', ')}`);
  process.exit(1);
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
for (const url of ['https://breakuprelief.com/', 'https://breakuprelief.com/blog/']) {
  if (!sitemap.includes(url)) {
    console.error(`Sitemap missing ${url}`);
    process.exit(1);
  }
}

console.log('Site validation passed.');
