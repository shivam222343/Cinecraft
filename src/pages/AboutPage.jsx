import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import About from '../components/sections/About';
import AnimatedSideButtons from '../components/ui/AnimatedSideButtons';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main>
        <About />
      </main>

      <Footer />
      
      {/* Animated Side Buttons */}
      <AnimatedSideButtons />
    </motion.div>
  );
};

export default AboutPage;
