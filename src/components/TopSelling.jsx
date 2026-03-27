import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TopSelling() {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);

  /* ================= FETCH TOP SELLING ================= */
  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/top-selling"
        );

        const data = await res.json();

        console.log("TOP SELLING:", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Top selling error:", err);
        setProducts([]);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <section style={section}>
      <h2 style={{ textAlign: "center" }}>TOP SELLINGS</h2>

      <div style={grid}>
        {products.map(product => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                ...card,
                ...(hovered === product._id ? cardHover : {})
              }}
              onMouseEnter={() => setHovered(product._id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={product.image} alt={product.name} style={img} />

              <h4>{product.name}</h4>

              <p>₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const section = { padding: 40 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 25
};

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  textAlign: "center",
  cursor: "pointer",
  height: 260,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease"
};

const cardHover = {
  transform: "translateY(-6px) scale(1.03)",
  boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
};

const img = {
  width: "100%",
  height: 140,
  objectFit: "contain",
  marginBottom: 10
};