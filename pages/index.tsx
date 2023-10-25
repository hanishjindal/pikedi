import Footer from "@/components/Footer";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomeMain />
      <Footer />
    </div>
  )
}
