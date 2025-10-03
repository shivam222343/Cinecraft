import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import BookingModal from '../components/modals/BookingModal';
import AnimatedSideButtons from '../components/ui/AnimatedSideButtons';

const Home = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header onBookingOpen={openBookingModal} />
      
      <main>
        <Hero onBookingOpen={openBookingModal} />
        <Services onBookingOpen={openBookingModal} />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      
      {/* Animated Side Buttons */}
      <AnimatedSideButtons />
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={closeBookingModal} 
      />
    </motion.div>
  );
};

export default Home;
