import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Header = ({ onBookingOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Portfolio', path: '/#portfolio' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' }
  ];

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    
    if (path.startsWith('/#')) {
      // If we're on the home page, scroll to section
      if (location.pathname === '/') {
        setTimeout(() => {
          const element = document.getElementById(path.substring(2));
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100); // Small delay to ensure menu closes first
      } else {
        // If we're on a different page, navigate to home first then scroll
        window.location.href = path;
      }
    } else {
      // Regular navigation
      if (path === '/') {
        window.location.href = '/';
      } else {
        window.location.href = path;
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 text-white backdrop-blur-md shadow-lg' 
          : 'bg-transparent text-white'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                <img className='rounded-[20%]' src="./2.png" alt="" />
              </span>
            </div>
            <span className="text-xl font-bold dark:text-white text-dark-200">CineCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  (item.path === '/' && location.pathname === '/') || 
                  (item.path.startsWith('/#') && location.pathname === '/')
                    ? 'text-purple-400'
                    : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={onBookingOpen} 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📅 Book Now
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Book Button */}
            <button
              onClick={onBookingOpen}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg text-sm transition-all duration-300"
            >
              📅
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg  transition-colors ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden rounded-xl mb-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={`block w-full text-left px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 font-medium ${
                      (item.path === '/' && location.pathname === '/') || 
                      (item.path.startsWith('/#') && location.pathname === '/')
                        ? 'text-purple-600 bg-purple-50'
                        : ''
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-6 pt-4 pb-2">
                  <Button 
                    onClick={() => {
                      onBookingOpen();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    📅 Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
