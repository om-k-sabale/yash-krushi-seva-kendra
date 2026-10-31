import React, { useEffect, useMemo, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import ProductCard from './ProductCard.jsx'
import Filters from './Filters.jsx'
import ProductModal from './ProductModal.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ProductCatalog() {
  const { products } = useStore()
  const { t } = useLanguage()
  const [filters, setFilters] = useState({ category: '', crop: '', brand: '', query: '' })
  const [activeProduct, setActiveProduct] = useState(null)

  useEffect(() => {
    const onSearch = (e) => setFilters(f => ({
  ...f,
  query: e.detail,
  category: '',
  crop: '',
  brand: ''
}))

    const onFilterCategory = (e) => setFilters(f => ({ ...f, category: e.detail }))
    window.addEventListener('ykk:search', onSearch)
    window.addEventListener('ykk:filter-category', onFilterCategory)
    return () => {
      window.removeEventListener('ykk:search', onSearch)
      window.removeEventListener('ykk:filter-category', onFilterCategory)
    }
  }, [])

  const categories = useMemo(() => [...new Set(products.map(p => p.category))].sort(), [products])
  const crops = useMemo(() => [...new Set(products.flatMap(p => p.cropTypes))].sort(), [products])
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), [products])

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return products.filter(p => {
      if (filters.category && p.category !== filters.category) return false
      if (filters.crop && !p.cropTypes.includes(filters.crop)) return false
      if (filters.brand && p.brand !== filters.brand) return false
      if (q) {
        const hay = `${p.name} ${p.nameMr} ${p.activeIngredient} ${p.brand}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [products, filters])

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900">{t.products}</h2>
          <p className="text-sm text-forest-700/60 mt-1">{filtered.length} {t.resultsFound}</p>
        </div>
      </div>

      <div className="mb-6">
        <Filters categories={categories} crops={crops} brands={brands} filters={filters} setFilters={setFilters} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-forest-700/50">
          <PackageSearch size={40} className="mb-3" />
          <p>{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onOpen={setActiveProduct} />
          ))}
        </div>
      )}

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </section>
  )
}
