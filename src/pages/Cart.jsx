import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const UPI_ID = "8807406815@axisbank";
const MERCHANT_NAME = "SARATHKUMAR R";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loadCart = useCallback(async () => {
    try {const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        setCart([]);
        setLoading(false);
        return;
      }const res = await fetch(
        `http://localhost:5000/api/cart/${user.id}`
      );
      const data = await res.json();
      console.log("CART DATA:", data);
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Cart load error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadCart();
  }, [loadCart]);
  const removeItem = async (cartId) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "DELETE"
      });
      setCart(prev => prev.filter(item => item._id !== cartId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };
  const updateQty = async (cartId, newQty) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: newQty })});
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update qty");
        return;
      }if (data.message && data.message.toLowerCase().includes("removed")) {
        setCart(prev => prev.filter(item => item._id !== cartId));
        return;
      }if (data.item) {
        setCart(prev => prev.map(it => (it._id === cartId ? data.item : it)));
      } else {
        setCart(prev => prev.map(it => (it._id === cartId ? { ...it, qty: newQty } : it)));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };
const total = cart.reduce((sum, item) =>sum + (item.productId?.price || 0) * (item.qty || 1), 0);
const handleUPIPayment = async () => {if (cart.length === 0) {alert("Cart is empty");return; }
const user = JSON.parse(localStorage.getItem("user"));
const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${total}&cu=INR`;
window.location.href = upiUrl;
try {
  await fetch("http://localhost:5000/api/orders", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user?.id || "guest", products: cart, total, paymentMethod: "UPI"})});
  setTimeout(() => {alert("Payment successful & order placed!");setCart([]); navigate("/add-review");}, 2000);} catch (err) { console.error("Order error:", err);alert("Order failed. Try again.");
  }
};
  return (
    <div style={page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Your Cart</h1>
      </div>
      {loading && <p>Loading cart...</p>}
      {!loading && cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item._id} style={row}>
          {item.productId?.image && (
            <img
              src={item.productId.image}
              alt={item.productId.name}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h4>{item.productId?.name}</h4>
            <p>₹{item.productId?.price}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <button
                onClick={() => updateQty(item._id, (item.qty || 1) - 1)}
                style={qtyBtn}
                aria-label="decrease"> − </button>
              <div style={{ minWidth: 32, textAlign: "center" }}>{item.qty || 1}</div>
              <button
                onClick={() => updateQty(item._id, (item.qty || 1) + 1)}
                style={qtyBtn}
                aria-label="increase" > +</button></div></div>
          <h4>
            ₹{(item.productId?.price || 0) * (item.qty || 1)}
          </h4>
          <button onClick={() => removeItem(item._id)} style={removeBtn}> ✖</button>
        </div>))}
      {cart.length > 0 && (<><hr />
          <h2>Total: ₹{total}</h2>
          <button onClick={handleUPIPayment} style={checkoutBtn}>
            Pay with UPI
          </button>
        </>
      )}
    </div>
  );
}
const page = { padding: 40, minHeight: "80vh" };
const row = {display: "flex", alignItems: "center",gap: 20,borderBottom: "1px solid #ddd",padding: "15px 0"};
const removeBtn = {background: "none", border: "none",color: "red",fontSize: 18,cursor: "pointer"};
const qtyBtn = {width: 32, height: 32,borderRadius: 6,border: "1px solid #ddd",background: "#fff",cursor: "pointer",fontSize: 18,lineHeight: "28px",textAlign: "center"};
const checkoutBtn = {padding: "10px 30px", background: "black", color: "white", border: "none", cursor: "pointer"};
