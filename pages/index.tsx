import { useState } from "react";
import Footer from "@/components/Footer";
import HomeMain from "@/components/HomeMain";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  return (
    <div id='about' className="flex flex-col min-h-screen relative" onClick={() => setMobileMenu(false)}>
      <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <HomeMain />
      <ContactForm />
      <Footer />
    </div>
  )
}
