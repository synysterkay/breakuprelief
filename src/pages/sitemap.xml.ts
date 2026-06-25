import { getCollection } from 'astro:content';
import { localePath, locales, site } from '../data/site';

export async function GET() {
  const articles = await getCollection('blog');
  const urls = [
    '/',
    '/blog/',
    ...locales.filter((locale) => locale.tag !== 'en').flatMap((locale) => [`/${locale.tag}/`, `/${locale.tag}/blog/`]),
    ...articles.map((article) => localePath(article.data.lang as any, `/blog/${article.data.seoSlug}/`)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${new URL(path, site.domain).toString()}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
