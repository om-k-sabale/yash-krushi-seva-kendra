import React, { useState } from 'react'
import { Search, Sprout, Menu, X, Languages, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

const CATEGORIES = ['Fertilizer', 'Insecticide', 'Fungicide', 'Herbicide', 'Micronutrients', 'Seeds', 'Farm Tools']

export default function Header({ navigate, onSearch }) {
  const { t, lang, toggleLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('ykk:search', { detail: query }))
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCategoryClick = (cat) => {
    window.dispatchEvent(new CustomEvent('ykk:filter-category', { detail: cat }))
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-forest-50/95 backdrop-blur border-b border-forest-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 shrink-0 group">
          <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-sun-400 group-hover:bg-forest-700 transition-colors">
            <Sprout size={22} />
          </div>
          <div className="text-left leading-tight">
            <div className="font-display font-semibold text-forest-900 text-lg">{t.storeName}</div>
            <div className="font-mono-label text-[10px] text-forest-700/70 uppercase hidden sm:block">Est. Agri Inputs Store</div>
          </div>
        </button>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-forest-200 bg-white text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-700/50" />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forest-200 text-forest-800 text-xs font-semibold hover:bg-forest-100 transition-colors"
            aria-label="Toggle language"
          >
            <Languages size={14} /> {lang === 'en' ? 'मराठी' : 'English'}
          </button>
          <button
            onClick={() => navigate('admin')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-800 text-white text-xs font-semibold hover:bg-forest-700 transition-colors"
          >
            <ShieldCheck size={14} /> {t.adminLogin}
          </button>
          <button className="md:hidden p-2 text-forest-800" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav className="hidden md:block border-t border-forest-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-3 py-2 text-sm font-medium text-forest-800 hover:text-emerald-700 whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-emerald-600"
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-forest-200 bg-white px-4 py-3 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-forest-200 bg-forest-50 text-sm outline-none"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-700/50" />
          </form>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-medium"
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => { navigate('admin'); setMenuOpen(false) }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-forest-800 text-white text-sm font-semibold"
          >
            <ShieldCheck size={16} /> {t.adminLogin}
          </button>
        </div>
      )}
    </header>
  )
}
