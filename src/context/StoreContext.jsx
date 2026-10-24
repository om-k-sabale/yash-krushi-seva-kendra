import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import seedProducts from '../data/products.json'

const StoreContext = createContext(null)

const LS_PRODUCTS = 'ykk_products_v1'
const LS_INQUIRIES = 'ykk_inquiries_v1'
const LS_ADMIN = 'ykk_admin_auth_v1'

const STORE_INFO = {
  phone: '+919876543210',
  whatsapp: '919876543210',
  address: 'Main Market Road, Near Bus Stand, Shirdi, Ahmednagar, Maharashtra 423109',
  mapsUrl: 'https://maps.google.com/?q=Shirdi+Maharashtra'
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => loadFromStorage(LS_PRODUCTS, seedProducts))
  const [inquiries, setInquiries] = useState(() => loadFromStorage(LS_INQUIRIES, []))
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(LS_ADMIN) === 'true')

  useEffect(() => { localStorage.setItem(LS_PRODUCTS, JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem(LS_INQUIRIES, JSON.stringify(inquiries)) }, [inquiries])

  const login = useCallback((username, password) => {
    // Demo credentials — replace with real auth (Supabase/JWT) in production
    if (username === 'admin' && password === 'yash@2026') {
      sessionStorage.setItem(LS_ADMIN, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(LS_ADMIN)
    setIsAdmin(false)
  }, [])

  const addProduct = useCallback((product) => {
    setProducts(prev => [{ ...product, id: 'P' + String(Date.now()).slice(-6) }, ...prev])
  }, [])

  const updateProduct = useCallback((id, patch) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p))
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const adjustStock = useCallback((id, delta) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
  }, [])

  const resetToSeed = useCallback(() => {
    setProducts(seedProducts)
  }, [])

  const addInquiry = useCallback((inquiry) => {
    setInquiries(prev => [{
      id: 'INQ' + String(Date.now()).slice(-7),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...inquiry
    }, ...prev])
  }, [])

  const updateInquiryStatus = useCallback((id, status) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }, [])

  const stats = useMemo(() => {
    const totalProducts = products.length
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length
    const outOfStock = products.filter(p => p.stock === 0).length
    const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    const dailyInquiries = inquiries.filter(i => {
      const d = new Date(i.createdAt)
      const now = new Date()
      return d.toDateString() === now.toDateString()
    }).length
    const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length
    return { totalProducts, lowStock, outOfStock, totalInventoryValue, dailyInquiries, pendingInquiries }
  }, [products, inquiries])

  const value = {
    products, addProduct, updateProduct, deleteProduct, adjustStock, resetToSeed,
    inquiries, addInquiry, updateInquiryStatus,
    isAdmin, login, logout,
    stats, storeInfo: STORE_INFO
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
