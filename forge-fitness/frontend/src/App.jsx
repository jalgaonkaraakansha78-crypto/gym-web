import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';

import Hero from './sections/Hero';
import WhyChooseUs from './sections/WhyChooseUs';
import Programs from './sections/Programs';
import Transformations from './sections/Transformations';
import Trainers from './sections/Trainers';
import Membership from './sections/Membership';
import Testimonials from './sections/Testimonials';
import FreeTrialCta from './sections/FreeTrialCta';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <Programs />
        <Transformations />
        <Trainers />
        <Membership />
        <Testimonials />
        <FreeTrialCta />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
