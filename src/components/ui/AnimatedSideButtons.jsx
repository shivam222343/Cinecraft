import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeedbackModal from '../modals/FeedbackModal';

const AnimatedSideButtons = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to button position with smoother animation
  const leftButtonX = useTransform(scrollY, [0, 200, 500, 800], [0, -15, -60, -120]);
  const rightButtonX = useTransform(scrollY, [0, 200, 500, 800], [0, 15, 60, 120]);
  const buttonOpacity = useTransform(scrollY, [0, 300, 600, 900], [1, 0.9, 0.6, 0.2]);
  const buttonScale = useTransform(scrollY, [0, 200, 500], [1, 0.95, 0.8]);

  // Service domains data with icons and colors
  const leftServices = [
    {
      id: 1,
      name: 'Video Production',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-pink-500',
      hoverGradient: 'from-red-600 to-pink-600',
      path:'/videography'
    },
    {
      id: 2,
      name: 'Photography',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.65-.07.97 0 .33.03.65.07.97L2.46 14.6c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      path:'/photography'
    },
    {
      id: 3,
      name: 'Drone Services',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.5 1C4.67 1 4 1.67 4 2.5S4.67 4 5.5 4 7 3.33 7 2.5 6.33 1 5.5 1M18.5 1C17.67 1 17 1.67 17 2.5S17.67 4 18.5 4 20 3.33 20 2.5 19.33 1 18.5 1M5.5 20C4.67 20 4 20.67 4 21.5S4.67 23 5.5 23 7 22.33 7 21.5 6.33 20 5.5 20M18.5 20C17.67 20 17 20.67 17 21.5S17.67 23 18.5 23 20 22.33 20 21.5 19.33 20 18.5 20M12 8C10.9 8 10 8.9 10 10V14C10 15.1 10.9 16 12 16S14 15.1 14 14V10C14 8.9 13.1 8 12 8M7.5 6C6.67 6 6 6.67 6 7.5V8.5C6 9.33 6.67 10 7.5 10S9 9.33 9 8.5V7.5C9 6.67 8.33 6 7.5 6M16.5 6C15.67 6 15 6.67 15 7.5V8.5C15 9.33 15.67 10 16.5 10S18 9.33 18 8.5V7.5C18 6.67 17.33 6 16.5 6M7.5 14C6.67 14 6 14.67 6 15.5V16.5C6 17.33 6.67 18 7.5 18S9 17.33 9 16.5V15.5C9 14.67 8.33 14 7.5 14M16.5 14C15.67 14 15 14.67 15 15.5V16.5C15 17.33 15.67 18 16.5 18S18 17.33 18 16.5V15.5C18 14.67 17.33 14 16.5 14Z"/>
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
      hoverGradient: 'from-green-600 to-emerald-600',
      path:'/drone-services'
    }
  ];

  const rightServices = [
    {
      id: 4,
      name: 'Live Streaming',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5M14.5,13C14.5,13.83 13.83,14.5 13,14.5H8C7.17,14.5 6.5,13.83 6.5,13V11C6.5,10.17 7.17,9.5 8,9.5H13C13.83,9.5 14.5,10.17 14.5,11V13Z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-indigo-500',
      hoverGradient: 'from-purple-600 to-indigo-600',
      path:'/videography'
    },
    {
      id: 5,
      name: 'Post Production',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18,16V14H16V16H18M6,16V14H4V16H6M20,18H4V20H20V18M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M12,12A6,6 0 0,1 18,18H6A6,6 0 0,1 12,12Z"/>
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      hoverGradient: 'from-orange-600 to-red-600',
      path:'/vfx-post'
    },
    {
      id: 6,
      name: 'Brand Content',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
      ),
      gradient: 'from-teal-500 to-blue-500',
      hoverGradient: 'from-teal-600 to-blue-600',
      path:'/commercial'
    }
  ];

  // Check if home page is visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show buttons only when home page sections are visible
      // Hide when scrolled too far down
      setIsVisible(scrollPosition < windowHeight * 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = (serviceName) => {
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(`Clicked on ${serviceName}`);
  };

  if (!isVisible) return null;


  
  return (
    <>
      {/* Left Side Buttons */}
      <motion.div
        className="fixed left-2 md:left-4 top-[100px] md:top-1/2 -translate-y-1/2 space-y-3 md:space-y-4"
        style={{ x: leftButtonX, opacity: buttonOpacity, scale: buttonScale }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {leftServices.map((service, index) => (
          <motion.button
            key={service.id}
            onClick={() => window.location.href = service.path}   
            className={`group relative ml-3 md:ml-5 bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient} text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon */}
            <div className="relative z-10">
              {service.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {service.name}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
          </motion.button>
        ))}
      </motion.div>

      {/* Right Side Buttons */}
      <motion.div
        className="fixed right-2 md:right-4 top-[100px] md:top-1/2 -translate-y-1/2 space-y-3 md:space-y-4"
        style={{ x: rightButtonX, opacity: buttonOpacity, scale: buttonScale }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {rightServices.map((service, index) => (
          <motion.button
            key={service.id}
            onClick={() => window.location.href = service.path}   
            className={`group relative mr-3 md:mr-5  bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient} text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 2, -2, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon */}
            <div className="relative z-10">
              {service.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {service.name}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
          </motion.button>
        ))}
      </motion.div>

      {/* Floating Feedback Button */}
      <motion.button
        onClick={() => setShowFeedbackModal(true)}
        style={{ 
          opacity: buttonOpacity,
          scale: buttonScale,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          !
        </div>
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Share Feedback
        </div>
      </motion.button>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmitSuccess={() => {
          // Could add a success toast here
          console.log('Feedback submitted successfully!');
        }}
      />
    </>
  );
};

export default AnimatedSideButtons;
