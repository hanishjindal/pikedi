import Footer from "@/components/Footer";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div id='about' className="flex flex-col min-h-screen relative">
      <Navbar />
      <HomeMain />
      <ContactForm />
      <Footer />
    </div>
  )
}
