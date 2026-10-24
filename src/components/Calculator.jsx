import React, { useState } from 'react'
import { Calculator as CalcIcon, Sprout } from 'lucide-react'
import cropNorms from '../data/cropNorms.json'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Calculator() {
  const { t } = useLanguage()
  const [area, setArea] = useState(1)
  const [crop, setCrop] = useState('Cotton')
  const [result, setResult] = useState(null)

  const cropList = Object.keys(cropNorms)

  const handleCalculate = (e) => {
    e.preventDefault()
    const norm = cropNorms[crop]
    const acres = Math.max(0, Number(area) || 0)
    setResult({
      N: (norm.N * acres).toFixed(1),
      P: (norm.P * acres).toFixed(1),
      K: (norm.K * acres).toFixed(1),
      note: norm.note
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-forest-800 rounded-3xl overflow-hidden shadow-card">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          <div className="p-8 text-forest-50 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-sun-400 text-xs font-mono-label uppercase mb-3">
              <CalcIcon size={14} /> Farmer Tool
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{t.calculatorTitle}</h2>
            <p className="text-forest-100/75 text-sm leading-relaxed">
              Get an instant estimate of Nitrogen (N), Phosphorus (P) and Potassium (K) requirement for your field, based on standard university recommendations for Maharashtra soils.
            </p>
          </div>

          <form onSubmit={handleCalculate} className="bg-forest-50 p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono-label uppercase text-forest-700/60 block mb-1.5">{t.landArea}</label>
                <input
                  type="number" min="0.25" step="0.25" value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-forest-200 bg-white text-sm focus:border-emerald-600 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono-label uppercase text-forest-700/60 block mb-1.5">{t.selectCrop}</label>
                <select
                  value={crop} onChange={e => setCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-forest-200 bg-white text-sm focus:border-emerald-600 outline-none"
                >
                  {cropList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors">
              {t.calculate}
            </button>

            {result && (
              <div className="mt-4 bg-white rounded-xl border border-forest-100 p-4">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-sm mb-3">
                  <Sprout size={16} /> {t.calcResultTitle}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center mb-3">
                  <div className="bg-forest-50 rounded-lg py-2.5">
                    <div className="text-lg font-bold text-forest-900">{result.N} kg</div>
                    <div className="text-[11px] text-forest-700/60">Nitrogen (N)</div>
                  </div>
                  <div className="bg-forest-50 rounded-lg py-2.5">
                    <div className="text-lg font-bold text-forest-900">{result.P} kg</div>
                    <div className="text-[11px] text-forest-700/60">Phosphorus (P)</div>
                  </div>
                  <div className="bg-forest-50 rounded-lg py-2.5">
                    <div className="text-lg font-bold text-forest-900">{result.K} kg</div>
                    <div className="text-[11px] text-forest-700/60">Potassium (K)</div>
                  </div>
                </div>
                <p className="text-xs text-forest-700/70">{result.note}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
