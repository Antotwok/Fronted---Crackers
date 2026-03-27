import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <main style={main}>
        {children && typeof children === "function"
          ? children(search)
          : children}
      </main>
      <Footer />
    </>
  );
}


const main = {
  maxWidth: "2350px",
  margin: "0 auto",
  padding: "10px"
};

