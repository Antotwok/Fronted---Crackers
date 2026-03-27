import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div style={card}>
      <Link to={`/product/${product.id}`} style={link}>
        <img src={product.image} alt={product.name} style={img} />
        <h4>{product.name}</h4>
      </Link>

      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)} style={btn}>
        Add to Cart
      </button>
    </div>
  );
}

/* STYLES */

const card = {
  padding: 15,
  borderRadius: 12,
  background: "#f5f5f5",
  textAlign: "center"
};

const link = {
  textDecoration: "none",
  color: "#000"
};

const img = {
  width: "100%",
  height: 150,
  objectFit: "contain",
  marginBottom: 10
};

const btn = {
  marginTop: 10,
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  background: "#000",
  color: "#fff",
  cursor: "pointer"
};
