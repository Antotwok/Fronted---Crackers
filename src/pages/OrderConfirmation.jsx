export default function OrderConfirmation() {
  const shipping = JSON.parse(localStorage.getItem("shippingInfo"));
  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h2>Order Confirmed 🎉</h2>
      <h3>Shipping Details</h3>
      <p>Name: {shipping?.fullName}</p>
      <p>Phone: {shipping?.phone}</p>
      <p>Address: {shipping?.address}</p>
      <p>City: {shipping?.city}</p>
      <p>Pincode: {shipping?.pincode}</p>
    </div>
  );
}