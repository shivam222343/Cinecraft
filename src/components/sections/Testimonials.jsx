import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AverageRating } from '../ui/StarRating';
import { feedbackAPI } from '../../utils/api';
import FeedbackModal from '../modals/FeedbackModal';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Fetch testimonials and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [testimonialsResponse, statsResponse] = await Promise.all([
          feedbackAPI.getApproved(10),
          feedbackAPI.getStats()
        ]);

        if (testimonialsResponse.success) {
          setTestimonials(testimonialsResponse.data);
        }

        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current.children, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleFeedbackSubmitted = () => {
    // Refresh testimonials after new feedback
    const fetchData = async () => {
      try {
        const [testimonialsResponse, statsResponse] = await Promise.all([
          feedbackAPI.getApproved(10),
          feedbackAPI.getStats()
        ]);

        if (testimonialsResponse.success) {
          setTestimonials(testimonialsResponse.data);
        }

        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (error) {
        console.error('Error refreshing testimonials:', error);
      }
    };

    fetchData();
  };

  const getServiceIcon = (category) => {
    const icons = {
      photography: '📸',
      videography: '🎬',
      cinematography: '🎭',
      'drone-services': '🚁',
      'vfx-post': '✨',
      commercial: '🎯'
    };
    return icons[category] || '⭐';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Client Testimonials</h2>
          <p className="text-gray-600 mb-8">No testimonials available at the moment.</p>
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Be the First to Share Feedback
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              What Our <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Clients Say</span>
            </motion.h2>
            
            {/* Average Rating Display */}
            {stats && stats.average_rating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-8"
              >
                <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
                  <AverageRating 
                    rating={parseFloat(stats.average_rating)} 
                    totalReviews={parseInt(stats.approved_count)}
                    size="lg"
                  />
                </div>
              </motion.div>
            )}

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Don't just take our word for it. Here's what our amazing clients have to say about our work.
            </motion.p>
          </div>

          {/* Testimonials Slider */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  <div className="text-center">
                    {/* Quote */}
                    <div className="text-6xl text-purple-200 mb-6">"</div>
                    <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                      {testimonials[currentIndex]?.message}
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      <AverageRating 
                        rating={testimonials[currentIndex]?.rating || 5} 
                        totalReviews={0}
                        size="md"
                      />
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonials[currentIndex]?.name?.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {testimonials[currentIndex]?.name}
                        </div>
                        {testimonials[currentIndex]?.service_category && (
                          <div className="text-sm text-gray-600 flex items-center">
                            <span className="mr-1">
                              {getServiceIcon(testimonials[currentIndex].service_category)}
                            </span>
                            {testimonials[currentIndex].service_category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-purple-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-purple-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-purple-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setShowFeedbackModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Share Your Experience
            </motion.button>
          </div>
        </div>
      </section>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmitSuccess={handleFeedbackSubmitted}
      />
    </>
  );
};

export default Testimonials;
