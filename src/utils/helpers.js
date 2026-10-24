export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function stockStatus(stock) {
  if (stock === 0) return 'out'
  if (stock < 10) return 'low'
  return 'in'
}

export function buildWhatsappLink(phoneWithCountryCode, message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phoneWithCountryCode}?text=${encoded}`
}

export function productOrderMessage(product, lang) {
  if (lang === 'mr') {
    return `नमस्कार, मला "${product.name}" (${product.brand}) हे उत्पादन हवे आहे.\nमात्रा/डोस: ${product.dosage}\nकिंमत: ₹${product.price} / ${product.unit}\nकृपया साठा व उपलब्धतेची खात्री करा.`
  }
  return `Hello, I would like to order "${product.name}" (${product.brand}).\nDosage: ${product.dosage}\nPrice: ₹${product.price} / ${product.unit}\nPlease confirm stock availability.`
}
