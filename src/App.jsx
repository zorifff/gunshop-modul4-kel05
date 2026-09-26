import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState(null)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('bore_barrel_orders')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return [
      {
        id: 'ORD-8921',
        name: 'Glock 17',
        type: 'Pistol',
        caliber: '9mm',
        price: 599,
        quantity: 1,
        image: '/guns/pistol.svg',
        status: 'In Transit',
        orderDate: 'Today',
      },
      {
        id: 'ORD-8919',
        name: 'Remington 870',
        type: 'Shotgun',
        caliber: '12 Gauge',
        price: 449,
        quantity: 1,
        image: '/guns/shotgun.svg',
        status: 'Cargo Dispatched',
        orderDate: 'Yesterday',
      },
    ]
  })

  useEffect(() => {
    try {
      localStorage.setItem('bore_barrel_orders', JSON.stringify(orders))
    } catch {
      // ignore
    }
  }, [orders])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 2400)
  }

  const handleAddToCart = (gun) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === gun.name)
      if (existing) {
        return prevCart.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...gun, quantity: 1 }]
    })
    showToast(`✓ ${gun.name} added to cart`)
  }

  const handleOrder = (gun) => {
    handleAddToCart(gun)
    setTab('Cart')
  }

  const handleUpdateQuantity = (gunName, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.name === gunName) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  const handleRemoveFromCart = (gunName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== gunName))
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleCancelOrder = (orderId) => {
    const cancelled = orders.find((o) => o.id === orderId)
    setOrders((prev) => prev.filter((o) => o.id !== orderId))
    showToast(`✕ Order for ${cancelled ? cancelled.name : 'item'} cancelled`)
  }

  const handlePlaceOrder = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return
    const newItems = cartItems.map((item, idx) => ({
      id: `ORD-${Date.now().toString().slice(-4)}${idx}`,
      name: item.name,
      type: item.type,
      caliber: item.caliber,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      status: 'Cargo Dispatched',
      orderDate: 'Just now',
    }))
    setOrders((prev) => [...newItems, ...prev])
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        orders={orders}
        onCancelOrder={handleCancelOrder}
      />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onOrder={handleOrder}
          />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
            onContinueShopping={() => setTab('Catalog')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </main>

      {toast && <div className="toast-notification">{toast}</div>}

      <Footer />
    </div>
  )
}

export default App
