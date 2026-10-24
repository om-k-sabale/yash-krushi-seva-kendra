import React from 'react'
import { stockStatus } from '../utils/helpers.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function StockBadge({ stock, className = '' }) {
  const { t } = useLanguage()
  const status = stockStatus(stock)
  const map = {
    in: { cls: 'badge-in-stock', label: t.inStock },
    low: { cls: 'badge-low-stock', label: `${t.lowStock} (${stock})` },
    out: { cls: 'badge-out-stock', label: t.outOfStock }
  }
  const { cls, label } = map[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${cls} ${className}`}>
      {label}
    </span>
  )
}
