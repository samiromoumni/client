export const formatPrice = (price: number, currency: string = 'DZD'): string => {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatDuration = (days: number): string => {
  if (days === 1) return '1 jour'
  return `${days} jours`
}


