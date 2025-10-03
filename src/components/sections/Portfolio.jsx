import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollReveal } from '../../utils/animations';
import Lightbox from '../ui/Lightbox';
import { portfolioAPI } from '../../utils/api';
import { isVideo } from '../../utils/fileUtils';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await portfolioAPI.getAll();
        const items = res?.data || [];
        // Filter only published items and map them
        const publishedItems = items.filter(p => p.status === 'published');
        const mapped = publishedItems.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category || 'photography', // Use actual portfolio category
          tags: p.tags ? (Array.isArray(p.tags) ? p.tags : p.tags.split(',').map(t => t.trim())) : [],
          thumbnail: p.media_url,
          images: p.media_url ? [p.media_url] : [],
          description: p.description || '',
          client: p.client,
          location: p.location,
          date: p.date,
          featured: p.featured,
          status: p.status
        }));
        if (mounted) setPortfolioItems(mapped);
      } catch (e) {
        console.error(e);
        if (mounted) setError('Failed to load portfolio');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const categories = [
    { id: 'all', name: 'All Work', icon: '📋' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'videography', name: 'Videography', icon: '🎬' },
    { id: 'cinematography', name: 'Cinematography', icon: '🎭' },
    { id: 'drone-services', name: 'Drone Services', icon: '🚁' },
    { id: 'vfx-post', name: 'VFX & Post', icon: '✨' },
    { id: 'commercial', name: 'Commercial', icon: '🎯' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        scrollReveal(sectionRef.current, '.portfolio-item', { start: 'top 85%', stagger: 0.12, y: 24 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [filteredItems]);

  const openLightbox = (project) => {
    setSelectedProject(project);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" ref={sectionRef} className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6"
          >
            Our <span className="text-gradient">Portfolio</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-dark-600 max-w-3xl mx-auto"
          >
            Explore our diverse collection of projects spanning various industries and creative disciplines. 
            Each project represents our commitment to excellence and storytelling.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-dark-700 hover:bg-primary-50 hover:text-primary-600 shadow-md border border-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Status */}
        {loading && (
          <div className="text-center mb-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-dark-600 mt-4">Loading portfolio...</p>
          </div>
        )}
        {error && (
          <div className="text-center mb-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Portfolio Grid - Pinterest Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="portfolio-item group cursor-pointer break-inside-avoid mb-8"
              onClick={() => openLightbox(item)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 card-hover">
                {/* Media */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.thumbnail && isVideo(item.thumbnail) ? (
                    <video
                      src={item.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Video Play Icon */}
                  {item.thumbnail && isVideo(item.thumbnail) && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 text-dark-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors">
                      Quick View
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(cat => cat.id === item.category)?.icon} {categories.find(cat => cat.id === item.category)?.name || item.category}
                    </span>
                    {item.featured && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-dark-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-dark-600 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="space-y-1 text-sm text-dark-500">
                    {item.client && (
                      <div className="flex items-center">
                        <span className="mr-2">👤</span>
                        <span>{item.client}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="btn-secondary">
            View All Projects
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={selectedProject?.images || []}
        title={selectedProject?.title}
        description={selectedProject?.description}
      />
    </section>
  );
};

export default Portfolio;
