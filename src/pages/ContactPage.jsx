import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Contact from '../components/sections/Contact';
import AnimatedSideButtons from '../components/ui/AnimatedSideButtons';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main>
        <Contact />
      </main>

      <Footer />
      
      {/* Animated Side Buttons */}
      <AnimatedSideButtons />
    </motion.div>
  );
};

export default ContactPage;
