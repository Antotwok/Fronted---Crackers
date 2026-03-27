import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" style={logoWrap}>
      <span style={brandText}>DEEKSH<span style={brandA}>A</span></span>
    </Link>
  );
}

/* ===== STYLES ===== */

const logoWrap = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  textDecoration: "none"
};



const brandText = {
  fontSize: 22,
  fontWeight: 700,
  background: "linear-gradient(90deg, #1976d2, #ab47bc, #ff9800)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: 1
};

const brandA = {
  fontWeight: 900
};

