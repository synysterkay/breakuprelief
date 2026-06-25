import fs from 'node:fs/promises';
import path from 'node:path';

const topicQueues = JSON.parse(await fs.readFile(path.resolve('src/data/topics.json'), 'utf8'));

const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  console.error('DEEPSEEK_API_KEY is required.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const contentRoot = path.resolve('src/content/blog');
const appLinks = {
  ios: 'https://apps.apple.com/app/fresh-start-breakup-therapy-ai/id6749954260',
  android: 'https://play.google.com/store/apps/details?id=com.breakup.therapy.therapyforabreakup.therapistforbreakups',
};

function slugify(value) {
  const slug = value
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 72);
  return slug || `article-${today}`;
}

async function existingSlugs(lang) {
  const dir = path.join(contentRoot, lang);
  try {
    const files = await fs.readdir(dir);
    return new Set(files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, '')));
  } catch {
    await fs.mkdir(dir, { recursive: true });
    return new Set();
  }
}

function pickTopic(lang, used) {
  const topics = topicQueues[lang] ?? topicQueues.en;
  return topics.find((topic) => !used.has(slugify(topic))) ?? `${topics[0]} ${today}`;
}

function frontmatter(data) {
  const faq = (data.faq ?? [])
    .map((item) => `  - question: ${JSON.stringify(item.question)}\n    answer: ${JSON.stringify(item.answer)}`)
    .join('\n');
  const keywords = (data.keywords ?? [])
    .map((keyword) => `  - ${JSON.stringify(keyword)}`)
    .join('\n');

  return `---\ntitle: ${JSON.stringify(data.title)}\ndescription: ${JSON.stringify(data.description)}\nlang: ${JSON.stringify(data.lang)}\nseoSlug: ${JSON.stringify(data.seoSlug)}\ncategory: ${JSON.stringify(data.category)}\npublishDate: ${JSON.stringify(today)}\nkeywords:\n${keywords || '  - "breakup recovery"'}\nfaq:\n${faq || '  []'}\n---\n\n`;
}

async function generateArticle(lang, topic, slug) {
  const prompt = `Write a high-quality SEO article for breakuprelief.com in ${lang}.

Topic: ${topic}

Return strict JSON only:
{
  "title": "...",
  "description": "...",
  "category": "No Contact | Breakup Anxiety | Healing | Self-Worth | Toxic Relationships | Dating Again | AI Support",
  "keywords": ["...", "..."],
  "faq": [{"question":"...", "answer":"..."}],
  "markdown": "..."
}

Requirements:
- Write in the target language, localized for natural search behavior.
- Be compassionate, practical, and non-clinical unless discussing therapy carefully.
- Include the exact iOS link ${appLinks.ios} and Android link ${appLinks.android} in the markdown.
- Mention Fresh Start as private AI breakup support.
- Include a safety note when discussing depression, panic, self-harm, abuse, or crisis.
- Do not claim to cure depression, trauma, anxiety, or heartbreak.
- Use Markdown headings and short readable sections.`;

  let data;
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a careful multilingual SEO editor for a breakup recovery app. Return valid JSON only. No markdown fences.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: attempt === 1 ? 0.7 : 0.35,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek failed for ${lang}: ${response.status} ${await response.text()}`);
    }

    const result = await response.json();
    const raw = result.choices?.[0]?.message?.content?.trim() ?? '';
    const jsonText = raw
      .replace(/^```json\s*/i, '')
      .replace(/```$/i, '')
      .trim();
    try {
      data = JSON.parse(jsonText);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!data) {
    throw lastError ?? new Error(`DeepSeek returned empty JSON for ${lang}.`);
  }
  data.lang = lang;
  data.seoSlug = slug;

  if (!data.markdown.includes(appLinks.ios) || !data.markdown.includes(appLinks.android)) {
    throw new Error(`Generated article for ${lang} is missing app links.`);
  }

  return frontmatter(data) + data.markdown.trim() + '\n';
}

for (const lang of Object.keys(topicQueues)) {
  const used = await existingSlugs(lang);
  const topic = pickTopic(lang, used);
  const slug = slugify(topic);
  const file = path.join(contentRoot, lang, `${slug}.md`);
  if (used.has(slug)) continue;
  const markdown = await generateArticle(lang, topic, slug);
  await fs.writeFile(file, markdown, 'utf8');
  console.log(`Generated ${lang}/${slug}.md`);
}
