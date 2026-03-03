const formatCurrency = (amount, currencyCode = 'AUD', locale = 'en-AU') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}

export default formatCurrency
