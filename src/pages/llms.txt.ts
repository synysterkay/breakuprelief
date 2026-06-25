import { locales, site } from '../data/site';

export function GET() {
  return new Response(`# ${site.name}

${site.name} is the website for ${site.appName}, a mobile app for breakup recovery, no-contact support, journaling, daily healing steps, and private AI breakup support.

Primary URLs:
- Website: ${site.domain}
- iOS app: ${site.iosUrl}
- Android app: ${site.androidUrl}

Supported languages:
${locales.map((locale) => `- ${locale.tag}: ${locale.name}`).join('\n')}

Core topics:
- Breakup therapy support
- No contact after a breakup
- Should I text my ex?
- Breakup anxiety and grief
- Healing after a toxic relationship
- Rebuilding self-worth after heartbreak
- AI support for breakup recovery

Important guidance:
The site and app provide emotional support and self-guided recovery tools. They are not emergency care and do not replace licensed medical or mental health treatment.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
