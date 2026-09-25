import { useState } from 'react'
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

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
          />
        )}
      </main>

      {toast && <div className="toast-notification">{toast}</div>}

      <Footer />
    </div>
  )
}

export default App
