import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md',
  className = '' 
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  // Pre-generate a few ambient particles positions for backdrop
  const particles = useMemo(() => (
    Array.from({ length: 7 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 6 + Math.round(Math.random() * 8),
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.4
    }))
  ), [isOpen]);

  const spring = {
    type: 'spring',
    stiffness: 360,
    damping: 28,
    mass: 0.9
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 backdrop-blur-[6px]"
            onClick={onClose}
          />
          {/* Ambient floating particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map(p => (
              <motion.span
                key={p.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: p.opacity, y: [0, -12, 0] }}
                transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                className="absolute rounded-full bg-primary-400/40 blur-[1px]"
              />
            ))}
          </div>
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: 18, filter: 'blur(6px)' }}
            transition={spring}
            className={`relative w-full ${sizes[size]} rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] ${className}`}
          >
            {/* Subtle gradient border glow */}
            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-white/10 via-primary-500/10 to-white/10 pointer-events-none" />
            <div className="relative bg-white rounded-2xl">
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-dark-900">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {/* Content */}
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
