import React from 'react'
import { Tag, Leaf } from 'lucide-react'
import StockBadge from './StockBadge.jsx'
import { formatINR } from '../utils/helpers.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ProductCard({ product, onOpen }) {
  const { t } = useLanguage()
  return (
    <button
      onClick={() => onOpen(product)}
      className="group text-left bg-white rounded-2xl border border-forest-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-forest-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <StockBadge stock={product.stock} className="absolute top-2 right-2 shadow" />
        {product.hazardLevel === 'High' && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white shadow">
            Restricted
          </span>
        )}
      </div>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono-label uppercase text-emerald-700">
          <Tag size={11} /> {product.category}
        </div>
        <h3 className="font-display font-semibold text-forest-900 text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-forest-700/70 flex items-center gap-1">
          <Leaf size={11} /> {product.brand}
        </p>
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-forest-900">{formatINR(product.price)}</div>
            <div className="text-[11px] text-forest-700/60">{t.perUnit} {product.unit}</div>
          </div>
        </div>
      </div>
    </button>
  )
}
