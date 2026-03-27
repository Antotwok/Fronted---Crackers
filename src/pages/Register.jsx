import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,              // ✅ fixed name
          password: form.password,
          confirmPassword: form.confirmPassword // ✅ VERY IMPORTANT
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful");
      navigate("/login"); // ✅ auto go to login

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: 20 }}>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          style={input}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          style={input}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          style={input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={input}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          style={input}
          onChange={handleChange}
        />

        <button style={btn} onClick={handleSubmit}>
          Register
        </button>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  width: 360,
  padding: 30,
  border: "1px solid #ddd",
  borderRadius: 10,
  textAlign: "center",
  background: "#fff"
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 5,
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: 12,
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  cursor: "pointer"
};