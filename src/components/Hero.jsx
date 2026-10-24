import React from 'react'
import { Sprout, Stethoscope, MessageCircle, TriangleAlert } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { buildWhatsappLink } from '../utils/helpers.js'

export default function Hero() {
  const { t } = useLanguage()
  const { storeInfo } = useStore()

  const scrollToCatalog = () => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToAdvisory = () => document.getElementById('advisory-section')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative overflow-hidden bg-forest-900 text-forest-50">
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'repeating-linear-gradient(115deg, transparent 0 40px, rgba(234,179,8,0.5) 40px 41px)'
      }} />
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-20 relative">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 border border-emerald-700 text-emerald-300 text-xs font-mono-label uppercase mb-5">
              <Sprout size={13} /> {t.heroKicker}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-forest-100/80 text-base sm:text-lg max-w-xl mb-8">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={scrollToCatalog} className="px-5 py-3 rounded-full bg-sun-500 text-forest-950 font-semibold text-sm hover:bg-sun-400 transition-colors shadow-card">
                {t.browseInventory}
              </button>
              <button onClick={scrollToAdvisory} className="px-5 py-3 rounded-full bg-forest-800 border border-emerald-700 text-emerald-200 font-semibold text-sm hover:bg-forest-700 transition-colors flex items-center gap-2">
                <Stethoscope size={16} /> {t.askCropDoctor}
              </button>
              <a
                href={buildWhatsappLink(storeInfo.whatsapp, 'Hello, I want to place a direct order.')}
                target="_blank" rel="noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} /> {t.directOrder}
              </a>
            </div>
          </div>

          <div className="bg-forest-950/60 border border-forest-700 rounded-2xl p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-sun-400 text-xs font-mono-label uppercase mb-3">
              <TriangleAlert size={14} /> Field Bulletin
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-sun-500 pl-3">
                <p className="text-sm font-semibold text-forest-50">Pink Bollworm — Vidarbha Cotton Belt</p>
                <p className="text-xs text-forest-200/70 mt-0.5">Trap catches rising. Scout fields this week.</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-sm font-semibold text-forest-50">Soybean — 2nd Top Dressing Window</p>
                <p className="text-xs text-forest-200/70 mt-0.5">25–30 DAS is ideal for balanced nutrient uptake.</p>
              </div>
              <div className="border-l-2 border-red-400 pl-3">
                <p className="text-sm font-semibold text-forest-50">Onion Nursery — Purple Blotch Risk</p>
                <p className="text-xs text-forest-200/70 mt-0.5">High humidity favours disease — spray schedule advised.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="furrow-divider mx-4 sm:mx-8 mb-3" />
    </section>
  )
}
