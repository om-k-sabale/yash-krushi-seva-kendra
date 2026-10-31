import React, { useState } from 'react'
import { Sprout, Lock, User, ArrowLeft } from 'lucide-react'
import { useStore } from '../../context/StoreContext.jsx'

export default function AdminLogin({ navigate }) {
  const { login } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault()

  const success = await login(username, password)

  if (success) {
    setError('')
  } else {
    setError('Invalid email or password.')
  }
}

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center px-4 bg-leaf-texture">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('home')} className="flex items-center gap-1.5 text-forest-300 hover:text-sun-400 text-sm mb-6">
          <ArrowLeft size={15} /> Back to store
        </button>
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-forest-800 flex items-center justify-center text-sun-400 mb-3">
              <Sprout size={28} />
            </div>
            <h1 className="font-display text-xl font-semibold text-forest-900">Admin Portal</h1>
            <p className="text-xs text-forest-700/60 mt-1">Yash Krushi Seva Kendra</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-700/40" />
              <input
                value={username} onChange={e => setUsername(e.target.value)}
                type="email" placeholder="Email Address" required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-forest-200 text-sm focus:border-emerald-600 outline-none"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-700/40" />
              <input
                value={password} onChange={e => setPassword(e.target.value)}
                type="password" placeholder="Password" required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-forest-200 text-sm focus:border-emerald-600 outline-none"
              />
            </div>
            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
            <button type="submit" className="w-full py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm transition-colors">
              Log In
            </button>
          </form>
          <p className="text-[11px] text-forest-700/50 text-center mt-5">
  Demo email: <code className="font-mono-label">admin@example.com</code>
</p>
        </div>
      </div>
    </div>
  )
}
