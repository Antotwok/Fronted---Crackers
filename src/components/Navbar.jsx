import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import defaultProducts from "../data/products";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

const [products] = useState(() => {
    try {
      const stored = localStorage.getItem("products");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });
  const suggestions =isFocused ? search.trim() === "" ? products.slice(0, 5) : products.filter(p =>p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6): [];
<input
  type="text"
  placeholder="Search crackers..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setTimeout(() => setIsFocused(false), 150)}
  style={searchInput}
/>

  const handleSearch = (e) => {e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setSearch("");
    setIsFocused(false);
  };

  return (
    <header>
      <div style={topBar}>
         Contact for Order:<a href="tel:+918807406815" style={callLink}>
          +91 8807406815
        </a>
      </div>

      <nav style={nav}>
        <div style={logoBox}>
          <Logo />
        </div>


        <div style={menu}>
          <NavLink to="/home" style={navLink}>Home</NavLink>
          <NavLink to="/products" style={navLink}>Products</NavLink>
          <NavLink to="/new-arrivals" style={navLink}>New Arrivals</NavLink>
        </div>

        <div style={rightBox}>
          <div style={searchWrapper}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search crackers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                style={searchInput}
              />
            </form>

            {suggestions.length > 0 && (
              <div style={suggestionsBox}>
                {suggestions.map(p => (
                  <div
                    key={p.id}
                    style={suggestion}
                    onMouseDown={() => {
                      navigate(`/product/${p.id}`);
                      setSearch("");
                      setIsFocused(false);
                    }}
                  >
                    🔎 {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={icons}>
            <Link to="/cart" style={icon}>🛒</Link>
            <Link to="/login" style={icon}>👤</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

const topBar = {
  background: "#000",
  color: "#fff",
  textAlign: "center",
  fontSize: 13,
  padding: "6px 0"
};

const callLink = {
  color: "#4fc3f7",
  marginLeft: 6,
  textDecoration: "none",
  fontWeight: 600
};

const nav = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 40px",
  borderBottom: "1px solid #eee",
  background: "#fff"
};

const logoBox = {
  marginRight: 30
};

const menu = {
  display: "flex",
  gap: 30,
  fontWeight: 500
};

const navLink = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#1e88e5" : "#000",
  borderBottom: isActive ? "2px solid #1e88e5" : "2px solid transparent",
  paddingBottom: 4
});
const rightBox = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginLeft: 250  
};


const searchWrapper = {
  position: "relative",
  width: 320,
  marginRight: 200  
};


const searchInput = {
  width: "90%",
  padding: "10px 15px",
  borderRadius: 30,
  border: "1px solid #ddd",
  outline: "none"
};

const suggestionsBox = {
  position: "absolute",
  top: 45,
  left: 0,
  right: 0,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 10,
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  zIndex: 100
};

const suggestion = {
  padding: "10px 15px",
  cursor: "pointer",
  borderBottom: "1px solid #eee"
};

const icons = {
  display: "flex",
  gap: 16,
  fontSize: 20
};

const icon = {
  textDecoration: "none",
  cursor: "pointer"
};
