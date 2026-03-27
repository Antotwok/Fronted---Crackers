import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Admin Login</h2>

        <input
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={btn}>
          Login
        </button>

        <p style={hint}>
          Only authorized administrators can access this page
        </p>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #000000, #434343)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  width: 360,
  padding: 35,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
  textAlign: "center"
};

const title = {
  marginBottom: 25,
  fontWeight: 600
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14
};

const btn = {
  width: "100%",
  padding: 12,
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 10
};

const hint = {
  marginTop: 15,
  fontSize: 12,
  color: "#777"
};
