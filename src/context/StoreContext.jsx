import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import seedProducts from '../data/products.json'

const StoreContext = createContext(null)

const LS_PRODUCTS = 'ykk_products_v1'
const LS_INQUIRIES = 'ykk_inquiries_v1'
const LS_ADMIN = 'ykk_admin_auth_v1'

const STORE_INFO = {
  phone: '+919876543210',
  whatsapp: '919021907219',
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
 const [products, setProducts] = useState([])
const [loadingProducts, setLoadingProducts] = useState(true)
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()

      if (response.ok) {
        const formattedProducts = data.products.map(product => ({
          ...product,
          id: product._id,
          cropTypes: product.cropTypes || [],
          nameMr: product.nameMr || '',
          activeIngredient: product.activeIngredient || ''
        }))

        setProducts(formattedProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  fetchProducts()
}, [])
  const [inquiries, setInquiries] = useState(() => loadFromStorage(LS_INQUIRIES, []))
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(LS_ADMIN) === 'true')
  useEffect(() => {
  if (!isAdmin) return

  const fetchInquiries = async () => {
    try {
      const token = sessionStorage.getItem('ykk_token')

      const response = await fetch('http://localhost:5000/api/inquiries', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch inquiries')
      }

      setInquiries(
        data.inquiries.map(item => ({
          ...item,
          id: item._id,
          createdAt: item.createdAt
        }))
      )
    } catch (error) {
      console.error('Fetch inquiries error:', error)
    }
  }

  fetchInquiries()
}, [isAdmin])

  useEffect(() => { localStorage.setItem(LS_PRODUCTS, JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem(LS_INQUIRIES, JSON.stringify(inquiries)) }, [inquiries])

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return false
      }

      sessionStorage.setItem('ykk_token', data.token)
      sessionStorage.setItem(LS_ADMIN, 'true')
      setIsAdmin(true)

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
}, [])

 const logout = useCallback(() => {
  sessionStorage.removeItem(LS_ADMIN)
  sessionStorage.removeItem('ykk_token')
  setIsAdmin(false)
}, [])
const addProduct = useCallback(async (product) => {
  try {
    const token = sessionStorage.getItem('ykk_token')

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add product')
    }

    setProducts(prev => [
      { ...data.product, id: data.product._id },
      ...prev
    ])

    return true
  } catch (error) {
    console.error('Add product error:', error)
    alert(error.message)
    return false
  }
}, [])

const updateProduct = useCallback(async (id, patch) => {
  try {
    const token = sessionStorage.getItem('ykk_token')

    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(patch)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update product')
    }

    setProducts(prev =>
      prev.map(p => p.id === id ? { ...data.product, id: data.product._id } : p)
    )

    return true
  } catch (error) {
    console.error('Update product error:', error)
    alert(error.message)
    return false
  }
}, [])
const deleteProduct = useCallback(async (id) => {
  try {
    const token = sessionStorage.getItem('ykk_token')

    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete product')
    }

    setProducts(prev => prev.filter(p => p.id !== id))
    return true

  } catch (error) {
    console.error('Delete product error:', error)
    alert(error.message)
    return false
  }
}, [])

  const adjustStock = useCallback(async (id, delta) => {
  try {
    const token = sessionStorage.getItem('ykk_token')

    const currentProduct = products.find(p => p.id === id)
    if (!currentProduct) return false

    const newStock = Math.max(0, Number(currentProduct.stock) + delta)

    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stock: newStock })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update stock')
    }

    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...data.product, id: data.product._id }
          : p
      )
    )

    return true
  } catch (error) {
    console.error('Stock update error:', error)
    alert(error.message)
    return false
  }
}, [products])
const resetToSeed = useCallback(() => {
  alert('Demo reset is disabled. Products are managed through MongoDB.')
}, [])

  const addInquiry = useCallback((inquiry) => {
    setInquiries(prev => [{
      id: 'INQ' + String(Date.now()).slice(-7),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...inquiry
    }, ...prev])
  }, [])

 const updateInquiryStatus = useCallback(async (id, status) => {
  try {
    const token = sessionStorage.getItem('ykk_token')

    const response = await fetch(
      `http://localhost:5000/api/inquiries/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update inquiry status')
    }

    setInquiries(prev =>
      prev.map(item =>
        item.id === id
          ? { ...data.inquiry, id: data.inquiry._id }
          : item
      )
    )

    return true
  } catch (error) {
    console.error('Update inquiry error:', error)
    alert(error.message)
    return false
  }
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
