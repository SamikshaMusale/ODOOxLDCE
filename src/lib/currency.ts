export const CURRENCIES: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  AED: 'د.إ',
  CHF: 'CHF',
  SGD: 'S$',
};

export function formatMoney(amount: number | undefined | null, currencyCode?: string): string {
  const safeAmount = amount || 0;
  const code = currencyCode || 'INR';
  const symbol = CURRENCIES[code] || '₹';
  return `${symbol}${safeAmount.toLocaleString()}`;
}
