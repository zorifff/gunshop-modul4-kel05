import { useRef } from 'react'

function GunCard({ gun, onAddToCart, onOrder }) {
  const popup = useRef(null)

  const handleOrder = () => {
    if (onOrder) onOrder(gun)
    if (popup.current) popup.current.close()
  }

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(gun)
  }

  return (
    <li className="card">
      <button className="card-btn" onClick={() => popup.current.showModal()}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" />
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>

        <div className="popup-actions">
          <form method="dialog" className="popup-form">
            <button className="popup-close">Close</button>
          </form>

          <div className="popup-cta">
            <button
              type="button"
              className="popup-cart-btn"
              onClick={handleAddToCart}
              title="Add to cart"
              aria-label="Add to cart"
            >
              <svg
                width="22"
                height="22"
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
            </button>

            <button
              type="button"
              className="popup-order-btn"
              onClick={handleOrder}
            >
              Order
            </button>
          </div>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard
