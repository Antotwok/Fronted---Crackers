import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewArrivalsection() {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);

  /* ================= FETCH NEW ARRIVALS ================= */
  useEffect(() => {
  const fetchNewArrivals = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/products/new-arrivals"
      );

      const data = await res.json();

      // ✅ only latest 4 for HOME
      const latestFour = Array.isArray(data)
        ? data.slice(0, 4)
        : [];

      setProducts(latestFour);
    } catch (err) {
      console.error("New arrivals error:", err);
      setProducts([]);
    }
  };

  fetchNewArrivals();
}, []);

  return (
    <section style={section}>
      <h2 style={{ textAlign: "center" }}>NEW ARRIVALS</h2>

      <div style={grid}>
        {products.map(p => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                ...card,
                ...(hovered === p._id ? cardHover : {})
              }}
              onMouseEnter={() => setHovered(p._id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={p.image} alt={p.name} style={img} />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const section = {
  padding: 10
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 25,
  marginTop: 20
};

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease"
};

const cardHover = {
  transform: "translateY(-6px) scale(1.03)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
};

const img = {
  width: "100%",
  height: 140,
  objectFit: "contain",
  marginBottom: 10,
  transition: "0.3s"
};