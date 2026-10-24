import React, { useState } from 'react'
import { X, MessageCircle, FlaskConical, Target, ShieldAlert, TriangleAlert } from 'lucide-react'
import StockBadge from './StockBadge.jsx'
import { formatINR, buildWhatsappLink, productOrderMessage } from '../utils/helpers.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'

const hazardColor = {
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Moderate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  High: 'bg-red-100 text-red-800 border-red-300'
}

export default function ProductModal({ product, onClose }) {
  const { t, lang } = useLanguage()
  const { storeInfo, addInquiry } = useStore()
  const [activeImg, setActiveImg] = useState(0)
  const gallery = product.gallery?.length ? product.gallery : [product.image]

  const handleOrder = () => {
    addInquiry({
      productId: product.id,
      productName: product.name,
      phone: '',
      message: productOrderMessage(product, lang),
      channel: 'WhatsApp'
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-950/60 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-3xl max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-end p-3 bg-gradient-to-b from-white via-white/90 to-transparent">
          <button onClick={onClose} className="p-2 rounded-full bg-forest-100 hover:bg-forest-200 text-forest-800" aria-label={t.close}>
            <X size={18} />
          </button>
        </div>

        <div className="px-5 sm:px-8 pb-8 -mt-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="rounded-2xl overflow-hidden aspect-square bg-forest-50 border border-forest-100">
                <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {gallery.map((g, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${activeImg === i ? 'border-emerald-600' : 'border-transparent'}`}>
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono-label uppercase text-emerald-700">{product.category} · {product.subCategory}</span>
                <StockBadge stock={product.stock} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-forest-900 mb-1">{product.name}</h2>
              <p className="text-sm text-forest-700/70 mb-3">{product.brand}</p>
              <p className="text-sm text-forest-800/80 mb-4">{product.description}</p>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-bold text-forest-900">{formatINR(product.price)}</span>
                <span className="text-sm text-forest-700/60">{t.perUnit} {product.unit}</span>
              </div>

              <a
                href={buildWhatsappLink(storeInfo.whatsapp, productOrderMessage(product, lang))}
                target="_blank" rel="noreferrer"
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-card transition-colors"
              >
                <MessageCircle size={18} /> {t.orderOnWhatsapp}
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <InfoBlock icon={<FlaskConical size={16} />} title={t.activeIngredient} text={product.activeIngredient} />
            <InfoBlock icon={<Target size={16} />} title={t.targetUse} text={product.targetUse} />
            <InfoBlock icon={<FlaskConical size={16} />} title={t.dosageTitle} text={product.dosage} />
            <div className={`rounded-xl border p-4 ${hazardColor[product.hazardLevel] || hazardColor.Low}`}>
              <div className="flex items-center gap-1.5 text-xs font-mono-label uppercase font-bold mb-1.5">
                <ShieldAlert size={14} /> {t.hazardLevel}: {product.hazardLevel}
              </div>
              <p className="text-sm leading-relaxed">{product.safety}</p>
            </div>
          </div>

          {product.hazardLevel === 'High' && (
            <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">
              <TriangleAlert size={18} className="shrink-0 mt-0.5" />
              <p>This is a restricted-use agrochemical. Sale and application must comply with CIB&RC label conditions and state pesticide regulations. Ask our staff for the current advisory before use.</p>
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
