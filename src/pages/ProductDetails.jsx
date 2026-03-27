import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading product...</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: 40 }}>Product not found</h2>;
  }

const handleAddToCart = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!product?._id) {
      alert("Product not ready");
      return;
    }

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        productId: product._id
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add to cart");
      return;
    }

    alert("Added to cart ✅");
    navigate("/cart");
  } catch (err) {
    console.error("Add to cart error:", err);
    alert("Server error");
  }
};
  

  return (
    <div style={container}>
      <div style={card}>
        {/* IMAGE */}
        <div style={imgBox}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={img} />
          ) : (
            <div>No Image</div>
          )}
        </div>

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h2>{product.name}</h2>
          <h3 style={{ color: "#d32f2f" }}>₹{product.price}</h3>

          <p><strong>Category:</strong> {product.category}</p>

          {product.isNewArrival && (
            <span style={badge}>New Arrival</span>
          )}

          <button style={btn} onClick={handleAddToCart}>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
  
}

/* ================= STYLES ================= */

const container = {
  padding: 40
};

const card = {
  display: "flex",
  gap: 40,
  background: "#fff",
  padding: 30,
  borderRadius: 16,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
};

const imgBox = {
  width: 320,
  height: 320,
  background: "#f3f3f3",
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

const btn = {
  marginTop: 20,
  padding: "12px 24px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const badge = {
  display: "inline-block",
  marginTop: 10,
  padding: "4px 10px",
  background: "#1976d2",
  color: "#fff",
  borderRadius: 6,
  fontSize: 12
};