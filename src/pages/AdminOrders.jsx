import { useEffect, useState } from "react";


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>All Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: 20, padding: 15, borderRadius: 8 }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          
          <h4>Shipping Details:</h4>
          <p><strong>Name:</strong> {order.shipping?.fullName}</p>
          <p><strong>Phone:</strong> {order.shipping?.phone}</p>
          <p><strong>Address:</strong> {order.shipping?.address}</p>
          <p><strong>City:</strong> {order.shipping?.city}</p>
          <p><strong>State:</strong> {order.shipping?.state}</p>
          <p><strong>Pincode:</strong> {order.shipping?.pincode}</p>
          
          <h4>Products:</h4>
          {order.products?.map((product, index) => (
            <div key={index} style={{ marginBottom: 5 }}>
              <p>{product.name} - ₹{product.price} x {product.qty}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
