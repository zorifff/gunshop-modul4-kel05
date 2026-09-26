import { useState, useEffect, useRef } from 'react'

const NAV = ['Catalog', 'About', 'Contact']

function Header({
  tab,
  onTab,
  cartCount = 0,
  searchQuery = '',
  onSearchChange,
  orders = [],
  onCancelOrder,
}) {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)
  const ordersRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ordersRef.current && !ordersRef.current.contains(e.target)) {
        setIsOrdersOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOrdersOpen(false)
      }
    }

    if (isOrdersOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOrdersOpen])

  const handleSearchChange = (val) => {
    if (onSearchChange) onSearchChange(val)
    if (tab !== 'Catalog' && val.trim()) {
      setIsOrdersOpen(false)
      onTab('Catalog')
    }
  }

  const handleBrandClick = () => {
    setIsOrdersOpen(false)
    onTab('Catalog')
  }

  const handleCartClick = () => {
    setIsOrdersOpen(false)
    onTab('Cart')
  }

  const handleNavClick = (item) => {
    setIsOrdersOpen(false)
    onTab(item)
  }

  const totalOrdersCount = orders.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <header className="header">
      <div className="header-brand-wrap">
        <span
          className="brand display"
          role="button"
          tabIndex={0}
          onClick={handleBrandClick}
          onKeyDown={(e) => e.key === 'Enter' && handleBrandClick()}
          style={{ cursor: 'pointer' }}
        >
          Bore &amp; Barrel
        </span>
      </div>

      <div className="header-nav-group">
        <div className="header-search-wrap">
          <button
            type="button"
            className={tab === 'Cart' ? 'header-cart-btn active' : 'header-cart-btn'}
            onClick={handleCartClick}
            title="Cart"
            aria-label="Cart"
          >
            <svg
              className="cart-icon"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Orders cargo truck menu */}
          <div className="header-orders-wrap" ref={ordersRef}>
            <button
              type="button"
              className={isOrdersOpen ? 'header-orders-btn active' : 'header-orders-btn'}
              onClick={() => setIsOrdersOpen((prev) => !prev)}
              title="Orders (Cargo Dispatch)"
              aria-label="Orders"
              aria-expanded={isOrdersOpen}
            >
              <svg
                className="orders-icon"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              {totalOrdersCount > 0 && (
                <span className="orders-badge">{totalOrdersCount}</span>
              )}
            </button>

            {isOrdersOpen && (
              <div className="orders-dropdown" role="dialog" aria-label="Orders Menu">
                <div className="orders-dropdown-header">
                  <div className="orders-header-title">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span className="orders-title display">Orders</span>
                    <span className="orders-count-badge">
                      {orders.length} {orders.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="orders-close-btn"
                    onClick={() => setIsOrdersOpen(false)}
                    title="Close"
                    aria-label="Close orders menu"
                  >
                    ×
                  </button>
                </div>

                <div className="orders-dropdown-body">
                  {orders.length === 0 ? (
                    <div className="orders-empty">
                      <svg
                        className="orders-empty-icon"
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                      <p className="orders-empty-title">No Active Orders</p>
                      <p className="orders-empty-desc">
                        Hardware placed through checkout will appear here for cargo tracking.
                      </p>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map((order) => (
                        <div key={order.id} className="order-item">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="order-item-img"
                            width="56"
                            height="42"
                          />
                          <div className="order-item-details">
                            <div className="order-item-header">
                              <span className="order-item-name display">{order.name}</span>
                              <span className="order-status-badge">
                                {order.status || 'In Transit'}
                              </span>
                            </div>
                            <div className="order-item-specs">
                              <span>
                                {order.type} · {order.caliber}
                              </span>
                              <span>Qty: {order.quantity}</span>
                            </div>
                            <div className="order-item-bottom">
                              <span className="order-item-price price">
                                ${(
                                  (order.price || 0) * (order.quantity || 1)
                                ).toLocaleString()}
                              </span>
                              <button
                                type="button"
                                className="cancel-order-btn"
                                onClick={() => onCancelOrder && onCancelOrder(order.id)}
                                title="Cancel this order"
                              >
                                Cancel Order
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {orders.length > 0 && (
                  <div className="orders-dropdown-footer">
                    <div className="orders-total-row">
                      <span>Total Value:</span>
                      <span className="price">
                        ${orders
                          .reduce(
                            (sum, o) => sum + (o.price || 0) * (o.quantity || 1),
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search guns..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => handleSearchChange('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <nav className="nav">
          {NAV.map((item) => (
            <button
              key={item}
              type="button"
              className={tab === item ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
