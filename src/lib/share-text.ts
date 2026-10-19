import { Quote } from '@/data/quotes';

/**
 * Builds the text a reader gets when they copy or share a quote.
 *
 * The quote comes first, then two empty lines, then a bare site URL so the
 * link stays clickable in WhatsApp, messages, and other chat apps.
 */
export function buildQuoteShareText(
  quote: Pick<Quote, 'text' | 'author'>,
  siteUrl: string = getSiteUrl(),
): string {
  const url = siteUrl.replace(/\/+$/, '');
  const lines = [`"${quote.text}" - ${quote.author}`, '', ''];
  if (url) lines.push(url);
  return lines.join('\n');
}

function getSiteUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
}
