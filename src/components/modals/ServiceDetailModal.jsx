import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetailModal = ({ isOpen, onClose, service, onBookNow }) => {
  if (!service) return null;

  const features = Array.isArray(service.features) ? service.features :
    (typeof service.features === 'string' ? service.features.split(',') : []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          // Backdrop
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            // Modal Panel
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative h-48 md:h-56 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-hidden flex-shrink-0">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-70"
                />
              ) : (
                // Placeholder if no image
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white/90">
                    <div className="text-6xl mb-4 opacity-80">{service.icon || '🎬'}</div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 md:left-8 text-white">
                <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{service.title}</h2>
                {service.price && (
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                    <span className="text-md font-semibold">{service.price}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">About This Service</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Duration */}
              {service.duration && (
                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">ESTIMATED DURATION</p>
                    <p className="font-semibold text-gray-800 text-lg">{service.duration}</p>
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Steps */}

              <div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>

                <div className="space-y-4">

                  {[

                    { step: 1, title: "Consultation", desc: "We discuss your vision and requirements" },

                    { step: 2, title: "Planning", desc: "We create a detailed project plan and timeline" },

                    { step: 3, title: "Production", desc: "Professional execution of your project" },

                    { step: 4, title: "Delivery", desc: "Final review and delivery of your content" }

                  ].map((item) => (

                    <div key={item.step} className="flex items-start space-x-4">

                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">

                        {item.step}

                      </div>

                      <div>

                        <h4 className="font-semibold text-gray-900">{item.title}</h4>

                        <p className="text-sm text-gray-600">{item.desc}</p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Footer Actions */}
            <div className="bg-white/50 border-t border-gray-200 p-4 md:p-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Maybe Later
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (onBookNow) onBookNow();
                  onClose();
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-base hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
              >
                Book This Service
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;