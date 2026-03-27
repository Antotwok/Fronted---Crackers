import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    isNewArrival: false
  });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role?.toLowerCase() !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  /* ================= LOAD PRODUCTS ON MOUNT ================= */
  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= LOAD PRODUCTS ================= */
 const loadProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    console.log("ADMIN PRODUCTS API:", data); // 🔍 debug

    // ✅ handle all possible backend shapes
    let list = [];

    if (Array.isArray(data)) {
      list = data;
    } else if (Array.isArray(data.products)) {
      list = data.products;
    } else if (Array.isArray(data.data)) {
      list = data.data;
    } else {
      console.warn("Unexpected product response shape");
    }

    setProducts(list);

  } catch (err) {
    console.error("Fetch error:", err);
    setProducts([]);
  }
};
  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= START EDIT ================= */
  const startEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
      image: product.image || "",
      isNewArrival: product.isNewArrival || false
    });

    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= ADD OR UPDATE ================= */
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.price) {
        alert("Name and price are required");
        return;
      }

      const token = localStorage.getItem("token");

      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : "http://localhost:5000/api/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save product");
        return;
      }

      alert(editingId ? "Product updated successfully" : "Product added successfully");

      await loadProducts();

      // reset form
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        isNewArrival: false
      });

      setEditingId(null);

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        console.error("Delete failed");
      }

      await loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CANCEL EDIT ================= */
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      isNewArrival: false
    });
  };

  return (
    <div style={page}>
      <div style={header}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout} style={logoutBtn}>Logout</button>
      </div>

      <div style={layout}>
        {/* ADD / UPDATE PRODUCT */}
        <div style={card}>
          <h3>{editingId ? "Update Product" : "Add Product"}</h3>

          <input
            style={input}
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm(prev => ({ ...prev, name: e.target.value }))
            }
          />

          <input
            style={input}
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm(prev => ({ ...prev, category: e.target.value }))
            }
          />

          <input
            style={input}
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm(prev => ({ ...prev, price: e.target.value }))
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: 15 }}
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              style={{
                width: "100%",
                height: 150,
                objectFit: "contain",
                marginBottom: 15,
                border: "1px solid #ddd",
                borderRadius: 8
              }}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={form.isNewArrival}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  isNewArrival: e.target.checked
                }))
              }
            />
            {" "}Mark as New Arrival
          </label>

          <button onClick={handleSubmit} style={primaryBtn}>
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button onClick={cancelEdit} style={cancelBtn}>
              Cancel Edit
            </button>
          )}
        </div>

        {/* PRODUCT LIST */}
        <div style={card}>
          <h3>All Products</h3>

          {products.map((p) => (
            <div key={p._id} style={productRow}>
              <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={thumb}
                  />
                )}

                <div>
                  <strong>{p.name}</strong><br />
                  ₹{p.price}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={editBtn} onClick={() => startEdit(p)}>
                  Edit
                </button>

                <button style={deleteBtn} onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: 40,
  background: "#f4f6f9"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: 30
};

const card = {
  background: "#ffffff",
  padding: 25,
  borderRadius: 12,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ddd"
};

const primaryBtn = {
  width: "100%",
  padding: 12,
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  marginTop: 15,
  cursor: "pointer"
};

const cancelBtn = {
  width: "100%",
  padding: 10,
  background: "#777",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  marginTop: 10,
  cursor: "pointer"
};

const productRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #eee"
};

const thumb = {
  width: 60,
  height: 60,
  objectFit: "contain",
  borderRadius: 8,
  border: "1px solid #eee"
};

const editBtn = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer"
};

const deleteBtn = {
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer"
};

const logoutBtn = {
  padding: "6px 14px",
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};