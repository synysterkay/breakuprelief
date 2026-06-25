import topics from './topics.json';
import type { LocaleTag } from './site';

export const topicQueues = topics as Record<LocaleTag, string[]>;
