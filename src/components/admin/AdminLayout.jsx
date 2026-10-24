import React, { useState } from 'react'
import { LayoutDashboard, Boxes, MessagesSquare, LogOut, Sprout, ExternalLink, Menu, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import AdminInventory from './AdminInventory.jsx'
import AdminInquiries from './AdminInquiries.jsx'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Boxes },
  { id: 'inquiries', label: 'Inquiries & Orders', icon: MessagesSquare }
]

export default function AdminLayout({ navigate }) {
  const { logout } = useStore()
  const [tab, setTab] = useState('dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-forest-50 flex">
      <aside className="hidden md:flex md:flex-col w-64 bg-forest-900 text-forest-50 shrink-0">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-forest-800">
          <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-sun-400">
            <Sprout size={18} />
          </div>
          <div>
            <div className="font-display font-semibold text-sm leading-tight">Yash Krushi</div>
            <div className="text-[10px] text-forest-300/60 uppercase font-mono-label">Admin Portal</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === id ? 'bg-emerald-600 text-white' : 'text-forest-200/80 hover:bg-forest-800'}`}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-forest-800 space-y-1">
          <button onClick={() => navigate('home')} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-forest-200/80 hover:bg-forest-800">
            <ExternalLink size={17} /> View Store
          </button>
          <button onClick={() => { logout(); navigate('home') }} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-forest-800">
            <LogOut size={17} /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between bg-forest-900 text-white px-4 py-3">
          <span className="font-display font-semibold">Admin Portal</span>
          <button onClick={() => setMobileNavOpen(o => !o)}>{mobileNavOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden bg-forest-900 text-forest-100 px-4 py-3 space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id} onClick={() => { setTab(id); setMobileNavOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium ${tab === id ? 'bg-emerald-600 text-white' : 'text-forest-200/80'}`}
              >
                <Icon size={17} /> {label}
              </button>
            ))}
            <button onClick={() => navigate('home')} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-forest-200/80">
              <ExternalLink size={17} /> View Store
            </button>
            <button onClick={() => { logout(); navigate('home') }} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-300">
              <LogOut size={17} /> Log Out
            </button>
          </div>
        )}

        <main className="p-4 sm:p-6 max-w-7xl mx-auto">
          {tab === 'dashboard' && <AdminDashboard setTab={setTab} />}
          {tab === 'inventory' && <AdminInventory />}
          {tab === 'inquiries' && <AdminInquiries />}
        </main>
      </div>
    </div>
  )
}
