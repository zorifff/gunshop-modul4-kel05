import { useState } from 'react'

function Cart({
  cart,
  onUpdateQuantity,
  onRemove,
  onClear,
  onContinueShopping,
  onPlaceOrder,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (onPlaceOrder) {
      onPlaceOrder(cart)
    }
    setOrderPlaced(true)
  }

  const handleFinishOrder = () => {
    setOrderPlaced(false)
    onClear()
    onContinueShopping()
  }

  return (
    <div className="cart-page">
      <section className="masthead">
        <h1 className="display">Shopping Cart</h1>
        <p className="lede">
          Hardware staged for order. Review your selection before dispatch.
        </p>
      </section>

      {orderPlaced ? (
        <div className="order-success-card">
          <div className="order-success-icon">✓</div>
          <h2 className="display">Order Confirmed</h2>
          <p className="lede">
            Thank you for ordering with Bore &amp; Barrel. Your order total is{' '}
            <strong className="price">${totalPrice.toLocaleString()}</strong> ({totalItems} pieces).
          </p>
          <button type="button" className="popup-order-btn" onClick={handleFinishOrder}>
            Back to Catalog
          </button>
        </div>
      ) : cart.length === 0 ? (
        <div className="cart-empty">
          <svg
            className="cart-empty-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2 className="display">Your Cart is Empty</h2>
          <p className="lede">No hardware currently staged. Browse the catalog to add items.</p>
          <button type="button" className="popup-order-btn" onClick={onContinueShopping}>
            Browse Catalog
          </button>
        </div>
      ) : (
        <section className="cart-content">
          <div className="list-head">
            <h2>Staged Hardware</h2>
            <span className="count">
              {totalItems} pieces ({cart.length} types)
            </span>
          </div>

          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.name} className="cart-item">
                <img
                  className="cart-item-img"
                  src={item.image}
                  alt={item.name}
                  width="100"
                  height="75"
                />
                <div className="cart-item-info">
                  <h3 className="name display">{item.name}</h3>
                  <span className="type">
                    {item.type} · {item.caliber}
                  </span>
                  <span className="price">${item.price.toLocaleString()} / piece</span>
                </div>

                <div className="cart-item-qty">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.name, -1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.name, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  <span className="subtotal-label">Subtotal</span>
                  <span className="price">${(item.price * item.quantity).toLocaleString()}</span>
                </div>

                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => onRemove(item.name)}
                  title="Remove from cart"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Order Total:</span>
              <span className="summary-total price">${totalPrice.toLocaleString()}</span>
            </div>

            <div className="cart-summary-actions">
              <button
                type="button"
                className="cart-continue-btn"
                onClick={onContinueShopping}
              >
                + Add More Hardware
              </button>
              <button
                type="button"
                className="popup-order-btn cart-checkout-btn"
                onClick={handleCheckout}
              >
                Confirm Order (${totalPrice.toLocaleString()})
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Cart
