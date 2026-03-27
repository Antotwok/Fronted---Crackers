export default function Footer() {
  return (
    <footer style={footer}>
      <div style={grid}>
        {/* COMPANY */}
        <div>
          <h2 style={title}>COMPANY</h2>
          <p>Products</p>
          <p>Careers</p>
          <p>Safety Standards</p>
        </div>

        {/* HELP */}
        <div>
          <h4 style={title}>HELP</h4>
          <p>Customer Support</p>
          <p>Delivery Details</p>
          <p>Privacy Policy</p>
        </div>

        {/* FAQ */}
        <div>
          <h4 style={title}>FAQ</h4>
          <p>How to order crackers?</p>
          <p>Payment Options</p>
        </div>

        {/* LOCATION */}
        <div>
          <strong><h2 style={title}>Location</h2></strong>
          <p style={{ lineHeight: 1.6 }}>
            <strong>Deeksha Crackers</strong> – Madathupatti, Sivakasi, Tamil Nadu
          </p>

          <div
            style={mapLink}
            onClick={() =>
              window.open(
                "https://www.google.com/maps/search/?api=1&query=Madathupatti+Sivakasi+Tamil+Nadu",
                "_blank"
              )
            }
          >
            <iframe
              title="Deeksha Crackers Location"
              src="https://www.google.com/maps?q=Madathupatti,Sivakasi,Tamil+Nadu&output=embed"
              style={map}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div style={contact}>
        <p>
          <a
            href="mailto:deekshacrackers2019@gmail.com?subject=Customer%20Enquiry&body=Hello%20Deeksha%20Crackers,"
            style={contactLink}
          >
            ✉️ deekshacrackers2019@gmail.com
          </a>
        </p>
      </div>

      <p style={copyright}>
        © 2026 Deeksha Crackers. All rights reserved.
      </p>
    </footer>
  );
}

/* ================= STYLES ================= */

const footer = {
  background: "#ffffff",
  color: "#333",
  padding: "40px 30px",
  borderTop: "1px solid #eee"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 30
};

const title = {
  marginBottom: 12,
  fontSize: 19,
  fontWeight: 600
};

const map = {
  width: "100%",
  height: 140,
  border: 0,
  borderRadius: 10,
  marginTop: 10
};

const mapLink = {
  cursor: "pointer"
};

const contact = {
  marginTop: 30,
  textAlign: "center"
};

const contactLink = {
  color: "#1e88e5",
  textDecoration: "none",
  fontWeight: 500,
  cursor: "pointer"
};

const copyright = {
  marginTop: 25,
  textAlign: "center",
  fontSize: 13,
  color: "#777"
};