import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((gun) => gun.type))]

function Catalog({ searchQuery = '', onAddToCart, onOrder }) {
  const [activeType, setActiveType] = useState('All')

  const filteredGuns = GUNS.filter((gun) => {
    if (activeType !== 'All' && gun.type !== activeType) return false
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      gun.name.toLowerCase().includes(q) ||
      gun.type.toLowerCase().includes(q) ||
      gun.caliber.toLowerCase().includes(q) ||
      gun.description.toLowerCase().includes(q)
    )
  })

  const isFiltered = searchQuery.trim() || activeType !== 'All'

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">
            {isFiltered
              ? `${filteredGuns.length} found`
              : `${GUNS.length} pieces`}
          </span>
        </div>

        <div className="type-filter" role="group" aria-label="Filter by type">
          {TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`type-filter-btn${activeType === type ? ' active' : ''}`}
              aria-pressed={activeType === type}
              onClick={() => setActiveType(type)}
            >
              {type}
              <span className="type-filter-count">
                {type === 'All'
                  ? GUNS.length
                  : GUNS.filter((gun) => gun.type === type).length}
              </span>
            </button>
          ))}
        </div>

        {filteredGuns.length === 0 ? (
          <div className="search-empty">
            <p className="lede">
              {searchQuery.trim() ? (
                <>
                  No firearms found matching "<strong>{searchQuery}</strong>"
                  {activeType !== 'All' && <> in <strong>{activeType}</strong></>}.
                </>
              ) : (
                <>
                  No firearms found in <strong>{activeType}</strong>.
                </>
              )}
            </p>
          </div>
        ) : (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard
                key={gun.name}
                gun={gun}
                onAddToCart={onAddToCart}
                onOrder={onOrder}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
