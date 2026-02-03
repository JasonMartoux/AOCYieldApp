/**
 * Format a number as currency (EUR)
 */
export function formatCurrency(
  value: number,
  currency: string = "EUR",
  locale: string = "fr-FR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a number as percentage
 */
export function formatPercentage(
  value: number,
  locale: string = "fr-FR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(value / 100)
}

/**
 * Format an address for display (shorten)
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return ""
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Format large numbers with K/M suffix
 */
export function formatCompact(
  value: number,
  locale: string = "fr-FR"
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value)
}
