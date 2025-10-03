import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesAPI } from '../../utils/api';
import { scrollReveal } from '../../utils/animations';
import ServiceDetailModal from '../modals/ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

const Services = ({ onBookingOpen }) => {
  const sectionRef = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        console.log('🔄 Fetching services from API...');
        const res = await servicesAPI.getAll();
        console.log('📊 Services API response:', res);
        
        // res should be { success, data }
        const items = res?.data || res || [];
        console.log('📋 Services data:', items);
        
        if (!Array.isArray(items)) {
          throw new Error('Invalid services data format');
        }
        
        // Map to include UI-friendly defaults with category-specific icons
        const categoryIcons = {
          'photography': '📸',
          'videography': '🎬',
          'editing': '🎞️',
          'drone': '🚁',
          'event': '🎉',
          'commercial': '🎯'
        };
        
        const mapped = items.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description || 'Professional service description',
          icon: categoryIcons[s.category] || '🎬',
          price: s.price ? `$${s.price}` : null,
          duration: s.duration,
          features: s.features || [],
          category: s.category,
          image: s.image
        }));
        
        if (mounted) {
          setServices(mapped);
          console.log('✅ Services loaded successfully:', mapped.length);
        }
      } catch (e) {
        console.error('❌ Services loading error:', e);
        if (mounted) setError(`Failed to load services: ${e.message}`);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        scrollReveal(sectionRef.current, '.service-card', { start: 'top 85%', stagger: 0.12, y: 28 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [services]);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-600 max-w-3xl mx-auto"
          >
            From concept to completion, we offer comprehensive media production services 
            to bring your vision to life with professional quality and creative excellence.
          </motion.p>
        </div>

        {/* Status */}
        {loading && (
          <div className="text-center mb-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-dark-600 mt-4">Loading services...</p>
          </div>
        )}
        {error && (
          <div className="text-center mb-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Services Grid - Smaller, More Effective Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Compact Header */}
              <div className="relative h-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-4xl">${service.icon}</div>`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl text-white group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                )}
                
                {/* Price Badge */}
                {service.price && (
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white font-semibold text-sm">{service.price}</span>
                  </div>
                )}
              </div>

              {/* Compact Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                
                {/* Short Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {service.description.length > 80 ? service.description.substring(0, 80) + '...' : service.description}
                </p>

                {/* Duration Badge */}
                {service.duration && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 mb-3">
                    <svg className="w-3 h-3 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">{service.duration}</span>
                  </div>
                )}

                {/* Features Preview - Compact */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 1).map((feature, idx) => (
                        <span key={idx} className="inline-flex items-center bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                          <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature.length > 15 ? feature.substring(0, 15) + '...' : feature}
                        </span>
                      ))}
                      {service.features.length > 1 && (
                        <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                          +{service.features.length - 1}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Single Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedService(service);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Subtle Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-dark-600 mb-6">
            Ready to start your project? Let's discuss your vision.
          </p>
          <button className="btn-primary">
            Get Started Today
          </button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        onBookNow={onBookingOpen}
      />
    </section>
  );
};

export default Services;
