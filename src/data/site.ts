export const site = {
  name: 'Breakup Relief',
  appName: 'Fresh Start: Breakup Therapy',
  domain: 'https://breakuprelief.com',
  iosUrl: 'https://apps.apple.com/app/fresh-start-breakup-therapy-ai/id6749954260',
  androidUrl: 'https://play.google.com/store/apps/details?id=com.breakup.therapy.therapyforabreakup.therapistforbreakups',
  email: 'support@breakuprelief.com',
};

export const locales = [
  { tag: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { tag: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { tag: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', dir: 'ltr' },
  { tag: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { tag: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { tag: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr' },
  { tag: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },
  { tag: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { tag: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { tag: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { tag: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { tag: 'zh-Hans', name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr' },
] as const;

export type LocaleTag = typeof locales[number]['tag'];

export const homeCopy: Record<LocaleTag, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  blog: string;
}> = {
  en: {
    eyebrow: 'AI breakup therapy support',
    title: 'Breakup support for the moment you want to text your ex.',
    subtitle: 'Fresh Start helps you get through no-contact urges, late-night spirals, and the first hard weeks after a breakup with private AI guidance and daily healing steps.',
    primary: 'Download for iPhone',
    secondary: 'Get it on Android',
    blog: 'Read breakup recovery guides',
  },
  es: {
    eyebrow: 'Apoyo de IA para rupturas',
    title: 'Apoyo cuando quieres escribirle a tu ex.',
    subtitle: 'Fresh Start te ayuda con el contacto cero, la ansiedad y las primeras semanas difíciles con guía privada de IA y pasos diarios.',
    primary: 'Descargar para iPhone',
    secondary: 'Disponible en Android',
    blog: 'Leer guías de recuperación',
  },
  'pt-BR': {
    eyebrow: 'Apoio com IA para término',
    title: 'Ajuda para o momento em que você quer mandar mensagem ao ex.',
    subtitle: 'Fresh Start apoia contato zero, ansiedade e as primeiras semanas difíceis com orientação privada de IA e passos diários.',
    primary: 'Baixar para iPhone',
    secondary: 'Baixar no Android',
    blog: 'Ler guias de recuperação',
  },
  fr: {
    eyebrow: 'Soutien IA après une rupture',
    title: 'Du soutien quand vous avez envie d’écrire à votre ex.',
    subtitle: 'Fresh Start aide avec le no contact, les pensées en boucle et les premières semaines grâce à une IA privée et des étapes quotidiennes.',
    primary: 'Télécharger sur iPhone',
    secondary: 'Obtenir sur Android',
    blog: 'Lire les guides',
  },
  de: {
    eyebrow: 'KI-Unterstützung nach Trennung',
    title: 'Hilfe in dem Moment, in dem du deinem Ex schreiben willst.',
    subtitle: 'Fresh Start hilft bei Kontaktsperre, Grübeln und den ersten schweren Wochen mit privater KI-Begleitung und täglichen Schritten.',
    primary: 'Für iPhone laden',
    secondary: 'Für Android laden',
    blog: 'Ratgeber lesen',
  },
  it: {
    eyebrow: 'Supporto IA dopo una rottura',
    title: 'Aiuto quando vuoi scrivere al tuo ex.',
    subtitle: 'Fresh Start ti sostiene nel no contact, nell’ansia e nelle prime settimane con guida IA privata e passi quotidiani.',
    primary: 'Scarica per iPhone',
    secondary: 'Scarica per Android',
    blog: 'Leggi le guide',
  },
  tr: {
    eyebrow: 'Ayrılık sonrası yapay zeka desteği',
    title: 'Eski sevgiline yazmak istediğin anda destek.',
    subtitle: 'Fresh Start temas kurmama, kaygı ve ilk zor haftalarda özel yapay zeka rehberliği ve günlük adımlarla yanında olur.',
    primary: 'iPhone için indir',
    secondary: 'Android için indir',
    blog: 'İyileşme rehberleri',
  },
  ar: {
    eyebrow: 'دعم ذكاء اصطناعي بعد الانفصال',
    title: 'دعم في اللحظة التي تريد فيها مراسلة حبيبك السابق.',
    subtitle: 'يساعدك Fresh Start في تجاوز الرغبة في التواصل والقلق والأسابيع الأولى الصعبة بإرشاد خاص وخطوات يومية.',
    primary: 'تنزيل للآيفون',
    secondary: 'تنزيل للأندرويد',
    blog: 'اقرأ أدلة التعافي',
  },
  hi: {
    eyebrow: 'ब्रेकअप के बाद AI सहारा',
    title: 'जब आप अपने एक्स को मैसेज करना चाहते हैं, उस पल के लिए सहारा।',
    subtitle: 'Fresh Start नो-कॉन्टैक्ट, बेचैनी और शुरुआती कठिन हफ्तों में निजी AI मार्गदर्शन और रोज़ छोटे कदमों से मदद करता है।',
    primary: 'iPhone के लिए डाउनलोड करें',
    secondary: 'Android पर पाएं',
    blog: 'रिकवरी गाइड पढ़ें',
  },
  ru: {
    eyebrow: 'ИИ-поддержка после расставания',
    title: 'Поддержка в момент, когда хочется написать бывшему.',
    subtitle: 'Fresh Start помогает пережить no contact, тревогу и первые тяжелые недели с приватной ИИ-поддержкой и ежедневными шагами.',
    primary: 'Скачать для iPhone',
    secondary: 'Скачать для Android',
    blog: 'Читать статьи',
  },
  ja: {
    eyebrow: '別れのためのAIサポート',
    title: '元恋人に連絡したくなる瞬間のためのサポート。',
    subtitle: 'Fresh Startは、ノーコンタクト、不安、つらい最初の数週間を、プライベートなAIガイドと毎日のステップで支えます。',
    primary: 'iPhoneでダウンロード',
    secondary: 'Androidで入手',
    blog: '回復ガイドを読む',
  },
  'zh-Hans': {
    eyebrow: '分手后的 AI 支持',
    title: '当你想给前任发消息时，先来这里。',
    subtitle: 'Fresh Start 用私密 AI 指导和每日疗愈步骤，帮助你度过断联冲动、深夜内耗和分手后的艰难阶段。',
    primary: '下载 iPhone 版',
    secondary: '下载 Android 版',
    blog: '阅读恢复指南',
  },
};

export function localePath(lang: LocaleTag, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? clean : `/${lang}${clean}`;
}
