import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <Footer />
    </div>
  )
}
