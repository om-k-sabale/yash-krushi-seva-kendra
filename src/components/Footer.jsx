import React from 'react'
import { Sprout, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { buildWhatsappLink } from '../utils/helpers.js'

export default function Footer({ navigate }) {
  const { t } = useLanguage()
  const { storeInfo } = useStore()

  return (
    <footer className="bg-forest-950 text-forest-100">
      <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-sun-400">
              <Sprout size={18} />
            </div>
            <span className="font-display font-semibold text-lg">{t.storeName}</span>
          </div>
          <p className="text-sm text-forest-300/70 leading-relaxed">{t.footerAbout}</p>
        </div>

        <div>
          <h4 className="font-mono-label uppercase text-xs text-sun-400 mb-3">{t.quickLinks}</h4>
          <ul className="space-y-2 text-sm text-forest-200/80">
            <li><button onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sun-400">{t.browseInventory}</button></li>
            <li><button onClick={() => document.getElementById('advisory-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sun-400">{t.advisoryTitle}</button></li>
            <li><button onClick={() => navigate('admin')} className="hover:text-sun-400">{t.adminLogin}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono-label uppercase text-xs text-sun-400 mb-3">{t.contactUs}</h4>
          <ul className="space-y-2.5 text-sm text-forest-200/80">
            <li className="flex items-center gap-2"><Phone size={14} /> {storeInfo.phone}</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {storeInfo.address}</li>
            <li>
              <a href={buildWhatsappLink(storeInfo.whatsapp, 'Hello, I have a query.')} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-sun-400">
                <MessageCircle size={14} /> {t.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-800 py-4 text-center text-xs text-forest-400/60">
        © {new Date().getFullYear()} {t.storeName} — {t.rightsReserved}
      </div>
    </footer>
  )
}
