import React from 'react'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { buildWhatsappLink } from '../utils/helpers.js'

export default function ContactBar() {
  const { storeInfo } = useStore()
  const { t } = useLanguage()

  return (
    <div className="bg-forest-950 text-forest-100 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-4 whitespace-nowrap">
          <a href={`tel:${storeInfo.phone}`} className="flex items-center gap-1.5 hover:text-sun-400 transition-colors">
            <Phone size={13} /> {storeInfo.phone}
          </a>
          <a href={storeInfo.mapsUrl} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1.5 hover:text-sun-400 transition-colors">
            <MapPin size={13} /> {t.location}
          </a>
        </div>
        <a
          href={buildWhatsappLink(storeInfo.whatsapp, 'Hello, I have a query about your products.')}
          target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-emerald-300 hover:text-sun-400 font-medium whitespace-nowrap transition-colors"
        >
          <MessageCircle size={13} /> {t.whatsapp}
        </a>
      </div>
    </div>
  )
}
