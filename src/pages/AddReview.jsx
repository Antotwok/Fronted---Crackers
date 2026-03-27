import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  const navigate = useNavigate();
  const [cart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submitReview = async () => {
    if (!comment.trim()) {
      setError("Please write a review comment before submitting!");
      return;
    }

    if (comment.trim().length < 10) {
      setError("Review must be at least 10 characters long!");
      return;
    }

    if (!rating) {
      setError("Please select a rating!");
      return;
    }

    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          name: user?.email || "Customer",
          rating,
          comment
        })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Review API error:", text);
        setError("Failed to submit review. Please try again.");
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const data = await res.json();

      alert("Thanks for your review!");
      navigate("/shipping");
    } catch (err) {
      console.error("Review failed:", err);
      setError("Review failed. Please try again.");
    }
  };

  return (
    <div style={mainContainer}>
      <h1>📦 Review Your Purchase</h1>

      {/* PRODUCTS SECTION */}
      <div style={productsSection}>
        <h2>Products You Purchased:</h2>
        <div style={itemsContainer}>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} style={productCard}>
                <div style={productImageContainer}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={productImage} />
                  ) : (
                    <div style={noImagePlaceholder}>No Image</div>
                  )}
                </div>
                <div style={productInfo}>
                  <h3>{item.name}</h3>
                  <p style={productPrice}>₹{item.price}</p>
                  <p style={productQty}>Quantity: {item.qty}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={emptyCart}>No products purchased</p>
          )}
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div style={reviewSection}>
        <h2>✍️ Share Your Review</h2>

        {error && <div style={errorBox}>{error}</div>}

        {/* STAR RATING */}
        <div style={ratingSection}>
          <label>Your Rating:</label>
          <div style={starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  ...starStyle,
                  color: star <= rating ? "#ffc107" : "#ddd",
                  cursor: "pointer"
                }}
                title={`${star} star`}
              >
                ★
              </span>
            ))}
          </div>
          <p style={ratingText}>{rating} out of 5 stars</p>
        </div>

        {/* REVIEW TEXT AREA */}
        <div style={textAreaSection}>
          <label>Your Review:</label>
          <textarea
            placeholder="Write your detailed review here... (minimum 10 characters)"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError("");
            }}
            style={textarea}
          />
          <p style={charCount}>{comment.length} characters</p>
        </div>

        {/* SUBMIT BUTTON */}
        <button onClick={submitReview} style={submitBtn}>
          Submit Review & Continue to Shipping
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const mainContainer = {
  maxWidth: "900px",
  margin: "30px auto",
  padding: "0 20px"
};

const productsSection = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  marginBottom: "30px"
};

const itemsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "15px",
  marginTop: "15px"
};

const productCard = {
  border: "1px solid #eee",
  borderRadius: "8px",
  padding: "15px",
  textAlign: "center",
  backgroundColor: "#fafafa",
  transition: "transform 0.2s",
  cursor: "pointer"
};

const productImageContainer = {
  marginBottom: "10px"
};

const productImage = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "5px"
};

const noImagePlaceholder = {
  width: "100%",
  height: "120px",
  backgroundColor: "#e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
  fontSize: "12px",
  color: "#999"
};

const productInfo = {
  textAlign: "left"
};

const productPrice = {
  color: "#2ecc71",
  fontWeight: "bold",
  fontSize: "16px",
  margin: "5px 0"
};

const productQty = {
  color: "#666",
  fontSize: "12px"
};

const emptyCart = {
  textAlign: "center",
  color: "#999",
  padding: "20px"
};

const reviewSection = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const errorBox = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "12px 15px",
  borderRadius: "5px",
  marginBottom: "20px",
  border: "1px solid #f5c6cb",
  fontSize: "14px"
};

const ratingSection = {
  marginBottom: "30px"
};

const starsContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  marginBottom: "10px"
};

const starStyle = {
  fontSize: "40px",
  transition: "color 0.2s",
  userSelect: "none"
};

const ratingText = {
  display: "inline-block",
  backgroundColor: "#e8f4f8",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "14px",
  color: "#0066cc",
  fontWeight: "bold"
};

const textAreaSection = {
  marginBottom: "25px"
};

const textarea = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fafafa",
  minHeight: "120px",
  resize: "vertical",
  boxSizing: "border-box",
  marginTop: "10px"
};

const charCount = {
  fontSize: "12px",
  color: "#999",
  marginTop: "5px"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s"
};