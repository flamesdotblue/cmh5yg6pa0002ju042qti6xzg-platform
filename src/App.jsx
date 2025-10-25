import { useEffect, useMemo, useState } from 'react'
import HeaderNav from './components/HeaderNav'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import AuthModal from './components/AuthModal'
import { api } from './lib/api'
import { useLocalStorage } from './lib/useLocalStorage'

export default function App() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const [cart, setCart] = useLocalStorage('cart', [])
  const [user, setUser] = useLocalStorage('user', null)
  const token = user?.token

  useEffect(() => {
    let mounted = true
    setLoadingProducts(true)
    api.getProducts()
      .then((data) => {
        if (mounted) setProducts(data)
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoadingProducts(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const cartCount = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart])
  const cartTotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [cart]
  )

  function addToCart(product) {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 }
        return next
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
    })
  }

  function decrementItem(id) {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id)
      if (idx === -1) return prev
      const item = prev[idx]
      if (item.quantity <= 1) {
        return prev.filter((p) => p.id !== id)
      }
      const next = [...prev]
      next[idx] = { ...item, quantity: item.quantity - 1 }
      return next
    })
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  async function handleCheckout() {
    try {
      const res = await api.checkout(cart, token)
      if (res?.paymentUrl) {
        window.location.href = res.paymentUrl
      }
    } catch (e) {
      alert('Checkout failed. Please try again.')
    }
  }

  function handleLoginSuccess(userData) {
    setUser(userData)
    setShowAuth(false)
  }

  function handleLogout() {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white text-slate-800">
      <HeaderNav
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
        onAuthClick={() => {
          setAuthMode('login')
          setShowAuth(true)
        }}
        onLogout={handleLogout}
        user={user}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-10 sm:py-14">
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-rose-700 text-sm font-medium">Small-batch artisan cakes</span>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Sweet Bloom Cakes</h1>
            <p className="max-w-2xl text-slate-600">Order elegant, handcrafted cakes baked fresh daily. Simple checkout, secure payments, and fast pickup.</p>
          </div>
          <ProductGrid
            products={products}
            loading={loadingProducts}
            onAddToCart={addToCart}
          />
        </section>
      </main>

      <Cart
        open={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        onIncrement={(id) => addToCart({ id })}
        onDecrement={decrementItem}
        onRemove={removeItem}
        total={cartTotal}
        onCheckout={handleCheckout}
        requiresAuth={!user}
        onRequireAuth={() => {
          setAuthMode('login')
          setShowAuth(true)
        }}
      />

      <AuthModal
        open={showAuth}
        mode={authMode}
        onClose={() => setShowAuth(false)}
        onSwitchMode={(m) => setAuthMode(m)}
        onSuccess={handleLoginSuccess}
      />

      <footer className="border-t mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Sweet Bloom Cakes. All rights reserved.</p>
          <p>Secure payments powered by your Spring Boot backend.</p>
        </div>
      </footer>
    </div>
  )
}
