import Nav from "@/app/_components/Nav";
import Hero from "@/app/_components/Hero";
import WhoItsFor from "@/app/_components/WhoItsFor";
import HowItWorks from "@/app/_components/HowItWorks";
import Proof from "@/app/_components/Proof";
import WhyUs from "@/app/_components/WhyUs";
import Pricing from "@/app/_components/Pricing";
import Faq from "@/app/_components/Faq";
import SignupSection from "@/app/_components/SignupSection";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <WhoItsFor />
        <HowItWorks />
        <Proof />
        <WhyUs />
        <Pricing />
        <Faq />
        <SignupSection />
      </main>
      <Footer />
    </>
  );
}
