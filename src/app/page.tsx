"use client"
import { useState } from "react";
import Footer from "@/components/common/Footer";
import HomeMain from "@/components/home/HomeMain";
import Navbar from "@/components/common/Navbar";
import ContactForm from "@/components/home/ContactForm";
import AccordianSection from "@/components/common/AccordianSection";
import HomeTopSection from "@/components/home/HomeTopSection";
import Carosel from "@/components/home/Carosel";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  return (
    <div className="flex flex-col relative select-none" onClick={() => setMobileMenu(false)}>
      <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <HomeTopSection />
      <HomeMain />
      {/* <Carosel /> */}
      <AccordianSection />
      <ContactForm />
      <Footer />
    </div>
  )
}
