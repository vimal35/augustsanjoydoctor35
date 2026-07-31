import "./Home.css";
import HomeHero from "../components/HomeHero";
import Emerycontact from "../components/emerycontact";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Programs from "../components/programs";
import Process from "../components/process";
import Why from "../components/Why";
import MainServices from "../components/mainservices";
import Partner from "../components/partner";




function Home() {
  return (
    <section >      
      <HomeHero />

      <Partner />
      <MainServices />
      <Why />
      <Process />
      <Programs />
      <Testimonials />
      <FAQ />
      <Emerycontact />
      
      
    </section>
  );
}

export default Home;