import { Link } from "react-router-dom";
import heroImg from "../assets/hero2.png";
import Counter from "./Counter";
import "/src/index.css";

export default function Hero() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "50px" }}>
      <div>
    <h1 style={heroTitle}>
  LIGHT UP YOUR  CELEBRATIONS <br />
  WITH PREMIUM CRACKERS
</h1>

        <p style={{ fontSize: "25px", marginBottom: "25px"}}>
          Explore our wide range of safe, high-quality fireworks and crackers <br/>
          crafted to make every festival, wedding, and celebration brighter,<br/>
          louder and unforgettable
        </p>

        <Link to="/products">
          <button
            style={{
              padding: "12px 30px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Shop Now
          </button>
        </Link>

        <div style={{ display: "flex", gap: "70px", marginTop: "35px" }}>
          <div>
            <Counter end={2000} />
            <p style={{ margin: 0 }}>High-Quality Products</p>
          </div>

          <div>
            <Counter end={30000} />
            <p style={{ margin: 0 }}>Happy Customers</p>
          </div>
          <div>
           <Counter end={10 
            
           } />
            <p style={{margin:0}}>Years of Experience</p>
            </div>       
            </div>
      </div>

      <img src={heroImg} width="500" height="480" alt="Crackers Hero" />
    </div>
  );
}
const heroTitle = {
  fontSize: "48px",
  fontFamily: "SNProDisplay, serif",
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: "1px",
  marginBottom: 20
};

