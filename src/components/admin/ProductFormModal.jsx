import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'

const CATEGORIES = ['Fertilizer', 'Insecticide', 'Fungicide', 'Herbicide', 'Micronutrients', 'Seeds', 'Farm Tools']
const HAZARDS = ['Low', 'Moderate', 'High']

const emptyProduct = {
  name: '', nameMr: '', brand: '', category: 'Fertilizer', subCategory: '',
  cropTypes: '', price: '', unit: '', stock: '', activeIngredient: '',
  image: '', gallery: '', dosage: '', targetUse: '', hazardLevel: 'Low',
  safety: '', description: '', featured: false
}

export default function ProductFormModal({ product, onClose }) {
  const { addProduct, updateProduct } = useStore()
  const isEdit = Boolean(product)

  const [form, setForm] = useState(() => {
    if (!product) return emptyProduct
    return {
      ...product,
      cropTypes: product.cropTypes?.join(', ') || '',
      gallery: product.gallery?.join(', ') || ''
    }
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      cropTypes: form.cropTypes.split(',').map(s => s.trim()).filter(Boolean),
      gallery: form.gallery.split(',').map(s => s.trim()).filter(Boolean)
    }
    if (!payload.gallery.length && payload.image) payload.gallery = [payload.image]

    if (isEdit) {
      updateProduct(product.id, payload)
    } else {
      addProduct(payload)
    }
    onClose()
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-forest-200 text-sm focus:border-emerald-600 outline-none"
  const labelCls = "text-xs font-mono-label uppercase text-forest-700/60 block mb-1"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-forest-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-semibold text-lg text-forest-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full bg-forest-100 hover:bg-forest-200"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Product Name (English)*</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Product Name (Marathi)</label>
              <input value={form.nameMr} onChange={e => set('nameMr', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Brand*</label>
              <input required value={form.brand} onChange={e => set('brand', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category*</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sub Category</label>
              <input value={form.subCategory} onChange={e => set('subCategory', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Crop Types (comma separated)</label>
              <input value={form.cropTypes} onChange={e => set('cropTypes', e.target.value)} placeholder="Cotton, Soybean, Onion" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Price (₹)*</label>
              <input required type="number" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Unit* (e.g. 50 kg bag)</label>
              <input required value={form.unit} onChange={e => set('unit', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Stock Quantity*</label>
              <input required type="number" value={form.stock} onChange={e => set('stock', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Hazard Level</label>
              <select value={form.hazardLevel} onChange={e => set('hazardLevel', e.target.value)} className={inputCls}>
                {HAZARDS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Active Ingredient / Composition</label>
            <input value={form.activeIngredient} onChange={e => set('activeIngredient', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Image URL*</label>
            <input required value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Gallery Image URLs (comma separated)</label>
            <input value={form.gallery} onChange={e => set('gallery', e.target.value)} placeholder="https://..., https://..." className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Dosage & Application (per acre)</label>
            <textarea rows={2} value={form.dosage} onChange={e => set('dosage', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Target Pest / Weed / Deficiency</label>
            <textarea rows={2} value={form.targetUse} onChange={e => set('targetUse', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Safety & Regulatory Notes</label>
            <textarea rows={2} value={form.safety} onChange={e => set('safety', e.target.value)} className={inputCls} />
          </div>
         <div>
  <label className={labelCls}>Description*</label>
  <textarea
    required
    rows={2}
    value={form.description}
    onChange={e => set('description', e.target.value)}
    className={inputCls}
  />
</div>
          <label className="flex items-center gap-2 text-sm text-forest-800">
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
            Feature this product on homepage
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-full border border-forest-200 text-forest-700 font-semibold text-sm">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500">
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
