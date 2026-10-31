
import React, { useState } from 'react'
import {
  X, MessageCircle, FlaskConical, Target,
  ShieldAlert, TriangleAlert, ShoppingBag
} from 'lucide-react'
import StockBadge from './StockBadge.jsx'
import { formatINR, buildWhatsappLink } from '../utils/helpers.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'

const hazardColor = {
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Moderate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  High: 'bg-red-100 text-red-800 border-red-300'
}

export default function ProductModal({ product, onClose }) {
  const { t, lang } = useLanguage()
  const { storeInfo } = useStore()

  const [activeImg, setActiveImg] = useState(0)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    village: '',
    address: '',
    quantity: 1
  })

  const gallery = product.gallery?.length
    ? product.gallery
    : [product.image]

  const total = Number(product.price) * Number(customer.quantity)

  const updateCustomer = (e) => {
    setCustomer(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    setError('')

    if (Number(customer.quantity) > Number(product.stock)) {
      setError('Requested quantity exceeds available stock.')
      return
    }

    setSubmitting(true)

    // Open a tab during the user action to avoid popup blocking
    const whatsappTab = window.open('about:blank', '_blank')

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: Number(customer.quantity),
          customerName: customer.name.trim(),
          customerPhone: customer.phone.trim(),
          customerVillage: customer.village.trim(),
          customerAddress: customer.address.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save inquiry.')
      }

      const message = `Namaste!

I would like to place an order with Yash Krushi Seva Kendra.

CUSTOMER DETAILS
Name: ${customer.name}
Mobile: ${customer.phone}
Village: ${customer.village}
Address: ${customer.address}

PRODUCT DETAILS
Product: ${product.name}
Brand: ${product.brand || 'Not specified'}
Quantity: ${customer.quantity} ${product.unit || 'units'}
Price: ₹${product.price}
Estimated Total: ₹${total}

Please confirm product availability and delivery details.

Inquiry Reference: ${data.inquiry._id}

Thank you!`

      const whatsappUrl = buildWhatsappLink(
        storeInfo.whatsapp,
        message
      )

      if (whatsappTab) {
        whatsappTab.location.href = whatsappUrl
      } else {
        window.location.href = whatsappUrl
      }

      setShowOrderForm(false)

    } catch (err) {
      if (whatsappTab) whatsappTab.close()
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-950/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-3xl max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-end p-3 bg-white">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-forest-100 hover:bg-forest-200 text-forest-800"
            aria-label={t.close}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 sm:px-8 pb-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="rounded-2xl overflow-hidden aspect-square bg-forest-50 border border-forest-100">
                <img
                  src={gallery[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${
                        activeImg === i
                          ? 'border-emerald-600'
                          : 'border-transparent'
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono-label uppercase text-emerald-700">
                  {product.category} · {product.subCategory}
                </span>
                <StockBadge stock={product.stock} />
              </div>

              <h2 className="font-display text-2xl font-semibold text-forest-900 mb-1">
                {product.name}
              </h2>

              <p className="text-sm text-forest-700/70 mb-3">
                {product.brand}
              </p>

              <p className="text-sm text-forest-800/80 mb-4">
                {product.description}
              </p>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-bold text-forest-900">
                  {formatINR(product.price)}
                </span>
                <span className="text-sm text-forest-700/60">
                  {t.perUnit} {product.unit}
                </span>
              </div>

              <button
                onClick={() => setShowOrderForm(!showOrderForm)}
                disabled={product.stock <= 0}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white font-semibold text-sm shadow-card"
              >
                <ShoppingBag size={18} />
                {showOrderForm ? 'Close Order Form' : 'Place Your Order'}
              </button>
            </div>
          </div>

          {showOrderForm && (
            <form onSubmit={handleOrder} className="mt-8 border border-emerald-200 bg-emerald-50/50 rounded-2xl p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-forest-900">
                  Customer Order Form
                </h3>
                <p className="text-sm text-forest-700/70 mt-1">
                  Enter your details to submit your product inquiry.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  value={customer.name}
                  onChange={updateCustomer}
                  placeholder="Customer Full Name"
                  required
                  maxLength={80}
                  className="w-full p-3 rounded-lg border border-forest-200 text-sm"
                />

                <input
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={updateCustomer}
                  placeholder="10-digit Mobile Number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  required
                  title="Enter a valid 10-digit Indian mobile number"
                  className="w-full p-3 rounded-lg border border-forest-200 text-sm"
                />

                <input
                  name="village"
                  value={customer.village}
                  onChange={updateCustomer}
                  placeholder="Village / Town"
                  required
                  maxLength={100}
                  className="w-full p-3 rounded-lg border border-forest-200 text-sm"
                />

                <input
                  name="quantity"
                  type="number"
                  value={customer.quantity}
                  onChange={updateCustomer}
                  min="1"
                  max={product.stock}
                  required
                  className="w-full p-3 rounded-lg border border-forest-200 text-sm"
                  placeholder="Quantity"
                />
              </div>

              <textarea
                name="address"
                value={customer.address}
                onChange={updateCustomer}
                placeholder="Complete Address / Delivery Location"
                rows="3"
                maxLength={300}
                required
                className="w-full p-3 rounded-lg border border-forest-200 text-sm resize-none"
              />

              <div className="bg-white rounded-xl p-4 border border-emerald-100">
                <div className="flex justify-between text-sm mb-2">
                  <span>Product Price</span>
                  <span>{formatINR(product.price)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Quantity</span>
                  <span>{customer.quantity}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-forest-900 border-t pt-3">
                  <span>Estimated Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || product.stock <= 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white font-semibold text-sm"
              >
                <MessageCircle size={18} />
                {submitting ? 'Submitting...' : 'Submit & Continue to WhatsApp'}
              </button>

              <p className="text-xs text-center text-forest-700/60">
                Your inquiry will be saved before WhatsApp opens.
                Order confirmation is subject to store approval.
              </p>
            </form>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <InfoBlock icon={<FlaskConical size={16} />} title={t.activeIngredient} text={product.activeIngredient} />
            <InfoBlock icon={<Target size={16} />} title={t.targetUse} text={product.targetUse} />
            <InfoBlock icon={<FlaskConical size={16} />} title={t.dosageTitle} text={product.dosage} />

            <div className={`rounded-xl border p-4 ${hazardColor[product.hazardLevel] || hazardColor.Low}`}>
              <div className="flex items-center gap-1.5 text-xs font-mono-label uppercase font-bold mb-1.5">
                <ShieldAlert size={14} />
                {t.hazardLevel}: {product.hazardLevel}
              </div>
              <p className="text-sm leading-relaxed">{product.safety}</p>
            </div>
          </div>

          {product.hazardLevel === 'High' && (
            <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">
              <TriangleAlert size={18} className="shrink-0 mt-0.5" />
              <p>
                This is a restricted-use agrochemical. Sale and application must comply with CIB&RC label conditions and state pesticide regulations. Ask our staff for the current advisory before use.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-forest-100 bg-forest-50/60 p-4">
      <div className="flex items-center gap-1.5 text-xs font-mono-label uppercase font-bold text-forest-700 mb-1.5">
        {icon} {title}
      </div>
      <p className="text-sm text-forest-800/90 leading-relaxed">{text}</p>
    </div>
  )
}
