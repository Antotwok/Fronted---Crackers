import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();
      alert(data.message);
      setEmail("");
    } catch (err) {
      alert("Subscription failed: ",err);
    }
  };

  return (
    <section style={section}>
      <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>

      <div>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={input}
        />

        <button onClick={subscribe} style={btn}>
          Subscribe
        </button>
      </div>
    </section>
  );
}

const section = {
  background: "black",
  color: "white",
  padding: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const input = {
  padding: 10,
  borderRadius: 20,
  border: "none",
  marginRight: 10
};

const btn = {
  padding: "10px 25px",
  borderRadius: 20,
  border: "none",
  cursor: "pointer"
};