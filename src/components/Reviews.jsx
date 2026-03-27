import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/reviews"
        );
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Reviews error:", err);
        setReviews([]);
      }
    };

    loadReviews();
  }, []);

  return (
    <section style={{ padding: 60 }}>
      <h2 style={{ textAlign: "center" }}>OUR HAPPY CUSTOMERS</h2>

      <div style={scrollContainer}>
        {reviews.map((r) => (
          <div key={r._id} style={reviewCard}>
            <div style={{ marginBottom: 8 }}>
              {"⭐".repeat(r.rating || 5)}
            </div>
            <h4 style={{ marginBottom: 6 }}>{r.name}</h4>
            <p style={{ fontSize: 14, color: "#555" }}>
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const scrollContainer = {
  display: "flex",
  gap: 20,
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  paddingBottom: 10
};

const reviewCard = {
  minWidth: 260,
  maxWidth: 260,
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 20,
  scrollSnapAlign: "start",
  background: "#fff",
  flexShrink: 0
};