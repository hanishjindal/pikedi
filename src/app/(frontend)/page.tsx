import HomeMain from "@/components/home/HomeMain";
import ContactForm from "@/components/home/ContactForm";
import AccordianSection from "@/components/common/AccordianSection";
import HomeTopSection from "@/components/home/HomeTopSection";
import Carosel from "@/components/home/Carosel";

export default function Home() {
  return (
    <div className="flex flex-col relative select-none" >
      <HomeTopSection />
      <HomeMain />
      {/* <Carosel /> */}
      <AccordianSection />
      <ContactForm />
    </div>
  )
}
