import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import NewsLetter from "../components/NewsLetter";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [size, setSize] = useState("");

  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").toLowerCase();

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        // ✅ handle both array and {products: []}
        const list = Array.isArray(data) ? data : data.products || [];

        const normalized = list.map(p => ({
          ...p,
          price: Number(p.price) || 0,
          oldPrice: Number(p.oldPrice) || null,
          size: (p.size || "medium").toLowerCase()
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Error loading products", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  /* ================= CATEGORIES ================= */
  const categories = [
    "All",
    "Wala",
    "Gift Box",
    "Fancy Chakars",
    "Flower Pots",
    "Rockets",
    "Sparklers"
  ];

  /* ================= SAFE FILTER ================= */
  const filteredProducts = products.filter(p => {
    const productCategory = (p.category || "").toLowerCase().trim();
    const selectedCategory = category.toLowerCase().trim();
    const productSize = (p.size || "").toLowerCase();

    return (
      (category === "All" || productCategory === selectedCategory) &&
      p.price <= maxPrice &&
      (!size || productSize === size.toLowerCase()) &&
      (!searchQuery || p.name?.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <>
      {/* PRODUCTS + FILTER GRID */}
      <div style={page}>
        <aside style={filters}>
          <h3>Filters</h3>

          {/* CATEGORY */}
          <div style={filterGroup}>
            <h4>Category</h4>
            {categories.map(cat => (
              <p
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...filterItem,
                  fontWeight: category === cat ? "bold" : "normal"
                }}
              >
                {cat}
              </p>
            ))}
          </div>

          {/* PRICE */}
          <div style={filterGroup}>
            <h4>Price</h4>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p>₹50 – ₹{maxPrice}</p>
          </div>

          {/* SIZE */}
          <div style={filterGroup}>
            <h4>Size</h4>
            {["Small", "Medium", "Large"].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  ...sizeBtn,
                  background: size === s ? "#000" : "#fff",
                  color: size === s ? "#fff" : "#000"
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* CLEAR */}
          <button
            style={clearBtn}
            onClick={() => {
              setCategory("All");
              setMaxPrice(5000);
              setSize("");
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* PRODUCT GRID */}
        <section>
          <h2 style={{ marginBottom: 20 }}>Products</h2>

          {filteredProducts.length === 0 && (
            <p style={{ color: "#777" }}>No products found.</p>
          )}

          <div style={grid}>
            {filteredProducts.map(product => (
              <div key={product._id || product.id} style={card}>
                <Link to={`/product/${product._id || product.id}`}>
                  <div style={imgBox}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={img}
                      />
                    ) : (
                      <div style={{ fontSize: 12, color: "#999" }}>
                        No Image
                      </div>
                    )}
                  </div>
                </Link>

                <h4 style={{ margin: "10px 0 6px" }}>{product.name}</h4>

                <p style={priceText}>₹{product.price}</p>

                <Link
                  to={`/product/${product._id || product.id}`}
                  style={viewBtn}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FULL WIDTH SECTIONS */}
      <div style={fullWidth}>
        <Reviews />
        <NewsLetter />
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const fullWidth = {
  width: "100%",
  marginTop: 60,
  padding: "0 30px",
  boxSizing: "border-box"
};

const page = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: 30,
  padding: 30
};

const filters = {
  border: "1px solid #eee",
  padding: 20,
  borderRadius: 14
};

const filterGroup = {
  marginBottom: 20
};

const filterItem = {
  cursor: "pointer",
  margin: "6px 0"
};

const sizeBtn = {
  marginRight: 8,
  marginBottom: 6,
  padding: "6px 14px",
  borderRadius: 20,
  border: "1px solid #000",
  cursor: "pointer"
};

const clearBtn = {
  width: "100%",
  padding: 10,
  background: "#000",
  color: "#fff",
  borderRadius: 30,
  border: "none",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 20
};

const card = {
  border: "1px solid #eee",
  padding: 15,
  borderRadius: 16,
  background: "#fff"
};

const imgBox = {
  height: 160,
  background: "#f2f2f2",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "contain"
};

const priceText = {
  fontWeight: "bold",
  fontSize: 16,
  marginBottom: 8
};

const viewBtn = {
  display: "inline-block",
  marginTop: 10,
  padding: "6px 14px",
  border: "1px solid #000",
  borderRadius: 20,
  textDecoration: "none",
  color: "#000",
  fontSize: 14
};