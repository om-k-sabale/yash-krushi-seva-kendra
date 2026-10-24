import React from 'react'
import { Boxes, TriangleAlert, MessagesSquare, IndianRupee, ArrowRight } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'
import { formatINR } from '../../utils/helpers.js'

export default function AdminDashboard({ setTab }) {
  const { stats, products, inquiries } = useStore()

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Boxes, color: 'bg-emerald-100 text-emerald-800' },
    { label: 'Low Stock Alerts', value: stats.lowStock + stats.outOfStock, icon: TriangleAlert, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Daily Inquiries', value: stats.dailyInquiries, icon: MessagesSquare, color: 'bg-forest-100 text-forest-800' },
    { label: 'Total Inventory Value', value: formatINR(stats.totalInventoryValue), icon: IndianRupee, color: 'bg-sun-500/20 text-sun-600' }
  ]

  const lowStockProducts = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock).slice(0, 6)
  const recentInquiries = inquiries.slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900 mb-5">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-forest-100 shadow-card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold text-forest-900">{value}</div>
            <div className="text-xs text-forest-700/60 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-forest-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-forest-900">Low / Out of Stock</h2>
            <button onClick={() => setTab('inventory')} className="text-xs font-semibold text-emerald-700 flex items-center gap-1 hover:underline">
              Manage <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {lowStockProducts.length === 0 && <p className="text-sm text-forest-700/50">All products are well stocked.</p>}
            {lowStockProducts.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-forest-800 truncate pr-2">{p.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${p.stock === 0 ? 'badge-out-stock' : 'badge-low-stock'}`}>
                  {p.stock === 0 ? 'Out' : `${p.stock} left`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-forest-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-forest-900">Recent Inquiries</h2>
            <button onClick={() => setTab('inquiries')} className="text-xs font-semibold text-emerald-700 flex items-center gap-1 hover:underline">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {recentInquiries.length === 0 && <p className="text-sm text-forest-700/50">No inquiries yet — orders from the storefront will appear here.</p>}
            {recentInquiries.map(i => (
              <div key={i.id} className="flex items-center justify-between text-sm">
                <span className="text-forest-800 truncate pr-2">{i.productName}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${i.status === 'Pending' ? 'badge-low-stock' : 'badge-in-stock'}`}>
                  {i.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
