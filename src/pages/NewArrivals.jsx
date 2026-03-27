import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import NewsLetter from "../components/NewsLetter";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH NEW ARRIVALS ================= */
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/new-arrivals"
        );

        const data = await res.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("New arrivals fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading new arrivals...</h2>;
  }

  return (
    <div style={page}>
      <h1 style={{ marginBottom: 30 }}>New Arrivals</h1>

      {products.length === 0 && (
        <p>No new arrival products available</p>
      )}

      <div style={grid}>
        {products.map(product => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={card}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={img}
                />
              )}

              <h4>{product.name}</h4>
              <p style={price}>₹{product.price}</p>

              <span style={badge}>NEW</span>
            </div>
          </Link>
        ))}
      </div>
      <div style={fullWidth}>
              <Reviews />
              <NewsLetter />
            </div>
    </div>
    
  );
}

/* ================= STYLES ================= */

const page = {
  padding: 40,
  minHeight: "80vh"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 25
};

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 20,
  textAlign: "center",
  position: "relative",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const img = {
  width: "100%",
  height: 160,
  objectFit: "contain",
  marginBottom: 10
};

const price = {
  fontWeight: "bold"
};

const badge = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "#e53935",
  color: "#fff",
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600
};

const fullWidth = {
  width: "100%",
  marginTop: 60,
  padding: "0 -10px",
  boxSizing: "border-box"
};