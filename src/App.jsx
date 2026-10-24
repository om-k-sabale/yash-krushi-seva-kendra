import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import ContactBar from './components/ContactBar.jsx'
import Hero from './components/Hero.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import Advisory from './components/Advisory.jsx'
import Calculator from './components/Calculator.jsx'
import Footer from './components/Footer.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import { useStore } from './context/StoreContext.jsx'

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || 'home')
  const { isAdmin } = useStore()

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (r) => {
    window.location.hash = r
    setRoute(r)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route === 'admin') {
    return isAdmin ? <AdminLayout navigate={navigate} /> : <AdminLogin navigate={navigate} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ContactBar />
      <Header navigate={navigate} />
      <main className="flex-1">
        <Hero navigate={navigate} />
        <ProductCatalog />
        <Calculator />
        <Advisory />
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
