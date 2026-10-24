import React, { useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'

export default function AdminInquiries() {
  const { inquiries, updateInquiryStatus } = useStore()
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = statusFilter ? inquiries.filter(i => i.status === statusFilter) : inquiries

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Inquiries & Orders</h1>
        <select
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-forest-200 text-sm bg-white"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Fulfilled">Fulfilled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-forest-100 shadow-card py-16 flex flex-col items-center text-forest-700/50">
          <MessagesSquare size={36} className="mb-3" />
          <p>No inquiries yet. When farmers order via WhatsApp from the storefront, they'll appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-forest-100 shadow-card overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-[11px] font-mono-label uppercase text-forest-700/60 border-b border-forest-100">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id} className="border-b border-forest-50 hover:bg-forest-50/50">
                  <td className="px-4 py-3 font-medium text-forest-900">{i.productName}</td>
                  <td className="px-4 py-3 text-forest-700/80">{i.channel}</td>
                  <td className="px-4 py-3 text-forest-700/60">{new Date(i.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${i.status === 'Pending' ? 'badge-low-stock' : 'badge-in-stock'}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => updateInquiryStatus(i.id, i.status === 'Pending' ? 'Fulfilled' : 'Pending')}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Mark as {i.status === 'Pending' ? 'Fulfilled' : 'Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
