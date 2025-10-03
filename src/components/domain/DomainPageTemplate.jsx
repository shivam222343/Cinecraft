import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BookingModal from '../modals/BookingModal';
import { isVideo } from '../../utils/fileUtils';

gsap.registerPlugin(ScrollTrigger);

const DomainPageTemplate = ({
  title,
  subtitle,
  description,
  icon,
  heroImage,
  services = [],
  portfolio = [],
  features = [],
  gradientFrom = 'purple-600',
  gradientTo = 'blue-600',
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    // Advanced Scroll-triggered animations
    const ctx = gsap.context(() => {
      // Hero parallax with subtle scale and rotation for a more dynamic feel
      gsap.to(heroRef.current, {
        yPercent: -20, // Reduced parallax for better control
        scale: 1.1, // Subtle zoom effect
        rotation: 0.1, // Gentle rotation to add visual interest
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Services animation with a subtle skew for a more "flowy" reveal
      gsap.fromTo(
        servicesRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          skewX: 5,
        },
        {
          y: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Portfolio animation with a "pop-up" scale and more controlled stagger
      gsap.fromTo(
        portfolioRef.current?.children || [],
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08, // Faster stagger for a snappier feel
          ease: 'back.out(1.7)', // Use a "back" ease for a more dynamic pop
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Header onBookingOpen={() => setIsBookingModalOpen(true)} />

      {/* Hero Section - Elevated */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          ref={heroRef}
          className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom} via-${gradientTo} to-indigo-800 transition-transform duration-500`}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Dynamic Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl animate-bounce" />
        </div>
        

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white pt-24 pb-48">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
              className="text-8xl md:text-9xl mb-8"
            >
              {icon}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 mb-6 max-w-4xl mx-auto"
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>
        </div>

       
      </section>

      {/* Features Section - Revamped Grid */}
      {features.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Our {title}?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver exceptional results with professional expertise and creative vision.
              </p>
            </motion.div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-50 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-5xl mb-6 text-purple-500">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* Services Section - Card Enhancements */}
      {services.length > 0 && (
        <section id="services" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our {title} Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions tailored to your specific needs.
              </p>
            </motion.div>

            <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    {service.price && (
                      <p className="text-3xl font-extrabold text-purple-600 mb-4">
                        ${service.price}
                      </p>
                    )}
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className={`w-full bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* Portfolio Section - Advanced Grid */}
      {portfolio.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our {title} Portfolio
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See our work in action and get inspired for your next project.
              </p>
            </motion.div>

            <div ref={portfolioRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {item.image && isVideo(item.image) ? (
                    <>
                      <video
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        muted
                        loop
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      ---

      {/* CTA Section - Gradient & Button refinement */}
      <section className={`py-24 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white`}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your {title} Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with our professional {title.toLowerCase()} services.
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default DomainPageTemplate;