const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount = 0, searchQuery = '', onSearchChange }) {
  const handleSearchChange = (val) => {
    if (onSearchChange) onSearchChange(val)
    if (tab !== 'Catalog' && val.trim()) {
      onTab('Catalog')
    }
  }

  return (
    <header className="header">
      <div className="header-brand-wrap">
        <span
          className="brand display"
          role="button"
          tabIndex={0}
          onClick={() => onTab('Catalog')}
          onKeyDown={(e) => e.key === 'Enter' && onTab('Catalog')}
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
            onClick={() => onTab('Cart')}
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
              onClick={() => onTab(item)}
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
