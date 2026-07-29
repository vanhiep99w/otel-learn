import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // Orama does not currently provide a Vietnamese tokenizer.
  language: 'english',
});
