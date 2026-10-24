import React from 'react'
import { TriangleAlert, Sprout, CalendarDays } from 'lucide-react'
import advisories from '../data/advisories.json'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Advisory() {
  const { t, lang } = useLanguage()

  return (
    <section id="advisory-section" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900 mb-1">{t.advisoryTitle}</h2>
      <p className="text-sm text-forest-700/60 mb-6">Updated by our in-store agronomists</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {advisories.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-forest-100 shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${item.type === 'alert' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {item.type === 'alert' ? <TriangleAlert size={12} /> : <Sprout size={12} />}
                {item.type === 'alert' ? 'Pest Alert' : 'Advisory'}
              </span>
              <span className="text-[11px] text-forest-700/50 flex items-center gap-1">
                <CalendarDays size={12} /> {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <h3 className="font-display font-semibold text-forest-900 mb-1.5">
              {lang === 'mr' ? item.titleMr : item.title}
            </h3>
            <p className="text-sm text-forest-800/75 leading-relaxed mb-2">
              {lang === 'mr' ? item.bodyMr : item.body}
            </p>
            <span className="text-[11px] font-mono-label uppercase text-forest-700/50">Crop: {item.crop}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
