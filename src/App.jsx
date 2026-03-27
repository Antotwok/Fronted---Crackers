import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import NewArrivals from "./pages/NewArrivals";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import AddReview from "./pages/AddReview";
import ShippingDetails from "./pages/ShippingDetails";
export default function App() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={user ? (<Layout><Home /></Layout> ) : ( <Navigate to="/login" /> ) } />
      <Route path="/products" element={user ? ( <Layout><Products /> </Layout> ) : ( <Navigate to="/login" /> )}/>
      <Route path="/product/:id" element={ user ? ( <Layout> <ProductDetails /> </Layout>  ) : (<Navigate to="/login" /> )} />
      <Route path="/new-arrivals" element={ user ? (<Layout><NewArrivals /></Layout> ) : ( <Navigate to="/login" />)}/>
      <Route path="/cart" element={ user ? ( <Layout> <Cart /> </Layout> ) : ( <Navigate to="/login" />)} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute> } />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/add-review" element={user ? <AddReview /> : <Navigate to="/login" />} />
      <Route path="/shipping" element={user ? <ShippingDetails /> : <Navigate to="/login" />} />
    </Routes>
  );
}