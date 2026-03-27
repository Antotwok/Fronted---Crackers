import { useState } from "react";

export default function WhatsAppButton() {
  const phoneNumber = "918807406815"; // country code + number
  const message = "Hi, I want to order crackers.";// auto message
  const [show, setShow] = useState(false);

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={wrapper}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={openWhatsApp}
    >

      {show && <div style={tooltip}>Chat with us</div>}

      <div style={button}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={icon}
        />
      </div>
    </div>
  );
}



const wrapper = {
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 1000,
  cursor: "pointer"
};

const tooltip = {
  position: "absolute",
  right: 70,
  top: "50%",
  transform: "translateY(-50%)",
  background: "#000",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 13,
  whiteSpace: "nowrap",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
};

const button = {
  width: 45,
  height: 45,
  backgroundColor: "#0b0c0c",
  borderRadius: "30%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
};

const icon = {
  width: 30,
  height: 30
};
