export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice
}) {
  return (
    <div style={sidebar}>
      <h3>Filters</h3>

      {/* CATEGORY */}
      <div>
        <h4>Category</h4>
        {categories.map(cat => (
          <div key={cat}>
            <input
              type="radio"
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
            />
            <span style={{ marginLeft: 8 }}>{cat}</span>
          </div>
        ))}
      </div>

      {/* PRICE */}
      <div style={{ marginTop: 20 }}>
        <h4>Price</h4>
        <input
          type="range"
          min="08"
          max="3000"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
        <p>Up to ₹{price}</p>
      </div>

      <button style={applyBtn}>Apply Filter</button>
    </div>
  );
}

const sidebar = {
  width: 240,
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 12
};

const applyBtn = {
  marginTop: 20,
  width: "100%",
  padding: 10,
  background: "black",
  color: "white",
  border: "none",
  borderRadius: 20
};
