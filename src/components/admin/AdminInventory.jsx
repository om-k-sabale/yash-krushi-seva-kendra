import React, { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Search, RotateCcw } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'
import { formatINR } from '../../utils/helpers.js'
import ProductFormModal from './ProductFormModal.jsx'

export default function AdminInventory() {
  const { products, deleteProduct, adjustStock, updateProduct, resetToSeed } = useStore()
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())
  )

  const openNew = () => { setEditing(null); setShowForm(true) }
  const openEdit = (p) => { setEditing(p); setShowForm(true) }

  const handleDelete = (p) => {
    if (window.confirm(`Delete "${p.name}"? This cannot be undone.`)) {
      deleteProduct(p.id)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Inventory</h1>
        <div className="flex items-center gap-2">
          <button onClick={resetToSeed} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-forest-200 text-forest-700 text-xs font-semibold hover:bg-forest-100">
            <RotateCcw size={14} /> Reset Demo Data
          </button>
          <button onClick={openNew} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="relative max-w-sm mb-4">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search inventory..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-forest-200 bg-white text-sm outline-none focus:border-emerald-600"
        />
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-700/40" />
      </div>

      <div className="bg-white rounded-2xl border border-forest-100 shadow-card overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left text-[11px] font-mono-label uppercase text-forest-700/60 border-b border-forest-100">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-forest-50 hover:bg-forest-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div>
                      <div className="font-medium text-forest-900 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-forest-700/50">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-forest-700/80">{p.category}</td>
                <td className="px-4 py-3">
                  <input
                    type="number" value={p.price}
                    onChange={e => updateProduct(p.id, { price: Number(e.target.value) })}
                    className="w-20 px-2 py-1 rounded border border-forest-200 text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => adjustStock(p.id, -1)} className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center hover:bg-forest-200"><ChevronDown size={13} /></button>
                    <span className={`w-10 text-center font-semibold ${p.stock === 0 ? 'text-red-600' : p.stock < 10 ? 'text-yellow-700' : 'text-forest-900'}`}>{p.stock}</span>
                    <button onClick={() => adjustStock(p.id, 1)} className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center hover:bg-forest-200"><ChevronUp size={13} /></button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-forest-100 text-forest-700 hover:bg-forest-200"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-sm text-forest-700/50 py-10">No products match your search.</p>}
      </div>

      {showForm && (
        <ProductFormModal
          product={editing}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
