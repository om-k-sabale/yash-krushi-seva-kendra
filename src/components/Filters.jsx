import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Filters({ categories, crops, brands, filters, setFilters }) {
  const { t } = useLanguage()

  const Select = ({ label, value, onChange, options }) => (
    <div className="flex flex-col gap-1 min-w-[150px]">
      <label className="text-[11px] font-mono-label uppercase text-forest-700/60">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-forest-200 bg-white text-sm text-forest-900 focus:border-emerald-600 outline-none"
      >
        <option value="">{options.allLabel}</option>
        {options.items.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-forest-100 shadow-card p-4 flex flex-wrap items-end gap-3">
      <div className="flex items-center gap-1.5 text-forest-800 font-semibold text-sm pr-2">
        <SlidersHorizontal size={16} /> {t.filters}
      </div>
      <Select
        label={t.category}
        value={filters.category}
        onChange={v => setFilters(f => ({ ...f, category: v }))}
        options={{ allLabel: t.allCategories, items: categories }}
      />
      <Select
        label={t.cropType}
        value={filters.crop}
        onChange={v => setFilters(f => ({ ...f, crop: v }))}
        options={{ allLabel: t.allCrops, items: crops }}
      />
      <Select
        label={t.brand}
        value={filters.brand}
        onChange={v => setFilters(f => ({ ...f, brand: v }))}
        options={{ allLabel: t.allBrands, items: brands }}
      />
      {(filters.category || filters.crop || filters.brand || filters.query) && (
        <button
          onClick={() => setFilters({ category: '', crop: '', brand: '', query: '' })}
          className="text-xs font-semibold text-red-600 hover:text-red-700 ml-auto self-center"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
