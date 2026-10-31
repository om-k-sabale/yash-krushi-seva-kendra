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

export function productOrderMessage(product, lang, quantity = 1) {
  if (lang === 'mr') {
    return `नमस्कार! 🙏

मला यश कृषि सेवा केंद्रातून खालील उत्पादन खरेदी करायचे आहे.

उत्पादन: ${product.name}
ब्रँड: ${product.brand || 'उपलब्ध नाही'}
प्रमाण: ${quantity} ${product.unit || 'युनिट'}
किंमत: ₹${product.price} / ${product.unit || 'युनिट'}
एकूण किंमत: ₹${product.price * quantity}
मात्रा व वापर: ${product.dosage || 'कृपया माहिती द्या'}

कृपया उपलब्ध साठा आणि ऑर्डरची पुष्टी करा.

धन्यवाद! 🌱`;
  }

  return `Namaste! 🙏

I would like to purchase the following product from Yash Krushi Seva Kendra.

Product: ${product.name}
Brand: ${product.brand || 'Not specified'}
Quantity: ${quantity} ${product.unit || 'units'}
Price: ₹${product.price} / ${product.unit || 'unit'}
Estimated Total: ₹${product.price * quantity}
Dosage: ${product.dosage || 'Please provide details'}

Could you please confirm stock availability and order details?

Thank you! 🌱`;
}