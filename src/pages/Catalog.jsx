import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ searchQuery = '', onAddToCart, onOrder }) {
  const filteredGuns = GUNS.filter((gun) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      gun.name.toLowerCase().includes(q) ||
      gun.type.toLowerCase().includes(q) ||
      gun.caliber.toLowerCase().includes(q) ||
      gun.description.toLowerCase().includes(q)
    )
  })

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
            {searchQuery
              ? `${filteredGuns.length} found`
              : `${GUNS.length} pieces`}
          </span>
        </div>

        {filteredGuns.length === 0 ? (
          <div className="search-empty">
            <p className="lede">
              No firearms found matching "<strong>{searchQuery}</strong>".
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
