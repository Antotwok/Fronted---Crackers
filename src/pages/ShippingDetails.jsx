import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UPI_ID = "8807406815@axisbank";
const MERCHANT_NAME = "SARATHKUMAR R";
export default function ShippingDetails() {
  const navigate = useNavigate();
  const [cart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty, 0);
  const orderData = {
    userId: user?._id,
    products: cart,
    total: totalPrice,
    paymentMethod: "UPI",
    shipping: shipping
  };

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (res.status === 201 || res.status === 200) {
      // Save shipping info
      localStorage.setItem("shippingInfo", JSON.stringify(shipping));
      
      // Open UPI payment
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${totalPrice}&cu=INR`;
      window.location.href = upiUrl;

      // Redirect after delay
      setTimeout(() => {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        navigate("/order-success");
      }, 2000);
    } else {
      alert("Order failed");
    }

  } catch (error) {
    console.error("ORDER ERROR:", error);
    alert("Order failed. Please try again.");
  }
};
  return (
    <div style={mainContainer}>
      <h1>Order Summary & Shipping</h1>
      
      <div style={contentWrapper}>
        {/* ORDER ITEMS SECTION */}
        <div style={orderItemsSection}>
          <h2>📦 Products Being Shipped</h2>
          
          <div style={itemsContainer}>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} style={itemCard}>
                  <div style={itemImageContainer}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={itemImage} />
                    ) : (
                      <div style={noImagePlaceholder}>No Image</div>
                    )}
                  </div>
                  
                  <div style={itemDetails}>
                    <h3>{item.name}</h3>
                    <p style={priceText}>₹{item.price}</p>
                    <p style={qtyText}>Quantity: <strong>{item.qty}</strong></p>
                    <p style={subtotalText}>Subtotal: ₹{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={emptyCart}>No products in cart</p>
            )}
          </div>

          {/* PRICE SUMMARY */}
          {cart.length > 0 && (
            <div style={pricesSummary}>
              <div style={priceRow}>
                <span>Subtotal:</span>
                <span>₹{cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</span>
              </div>
              <div style={priceRow}>
                <span>Shipping:</span>
                <span style={freeShipping}>FREE</span>
              </div>
              <div style={totalRow}>
                <span>Total:</span>
                <span>₹{cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* SHIPPING FORM SECTION */}
        <div style={shippingFormSection}>
          <h2>🚚 Shipping Details</h2>

          <form onSubmit={handleSubmit} style={form}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              onChange={handleChange}
              style={input}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              style={input}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              required
              onChange={handleChange}
              style={textarea}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
              style={input}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              required
              onChange={handleChange}
              style={input}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              onChange={handleChange}
              style={input}
            />

            {cart.length > 0 && (
              <div style={totalAmount}>
                Total Amount to Pay: ₹{cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
              </div>
            )}

            <button type="submit" style={submitButton}>Pay & Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mainContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "30px 20px",
  backgroundColor: "#f9f9f9",
  minHeight: "100vh"
};

const contentWrapper = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr"
  }
};

const orderItemsSection = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const itemsContainer = {
  marginBottom: "20px"
};

const itemCard = {
  display: "flex",
  gap: "15px",
  padding: "15px",
  borderBottom: "1px solid #eee",
  alignItems: "flex-start"
};

const itemImageContainer = {
  minWidth: "80px"
};

const itemImage = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "5px"
};

const noImagePlaceholder = {
  width: "80px",
  height: "80px",
  backgroundColor: "#e0e0e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
  fontSize: "12px",
  color: "#999"
};

const itemDetails = {
  flex: 1
};

const priceText = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#2ecc71",
  margin: "5px 0"
};

const qtyText = {
  color: "#666",
  margin: "5px 0",
  fontSize: "14px"
};

const subtotalText = {
  color: "#333",
  margin: "5px 0",
  fontSize: "14px",
  fontWeight: "500"
};

const emptyCart = {
  textAlign: "center",
  color: "#999",
  padding: "20px"
};

const pricesSummary = {
  borderTop: "2px solid #eee",
  paddingTop: "15px"
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  fontSize: "14px",
  color: "#666"
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 0",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#000",
  borderTop: "1px solid #eee"
};

const freeShipping = {
  color: "#2ecc71",
  fontWeight: "bold"
};

const shippingFormSection = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "15px"
};

const input = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fafafa"
};

const textarea = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fafafa",
  minHeight: "100px",
  resize: "vertical"
};

const submitButton = {
  padding: "14px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s",
  marginTop: "10px"
};

const totalAmount = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#2ecc71",
  marginTop: "10px",
  textAlign: "center"
};