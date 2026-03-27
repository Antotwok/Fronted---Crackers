import Hero from "../components/Hero";
import NewArrivalsection from "../components/NewArrivalsection";
import TopSelling from "../components/TopSelling";
import Reviews from "../components/Reviews";
import NewsLetter from "../components/NewsLetter";
import WhatsAppButton from "../components/WhatsAppButton";
export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Hero />
      <NewArrivalsection/>
      <TopSelling />
      <Reviews />
      <NewsLetter />
      <WhatsAppButton />
    </div>
  );
}





 