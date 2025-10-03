export const services = [
  {
    id: 1,
    title: 'Graphic Design',
    description: 'Creative visual solutions for branding, marketing materials, and digital assets.',
    icon: '🎨',
    category: 'design',
    features: ['Logo Design', 'Brand Identity', 'Print Materials', 'Digital Graphics'],
    pricing: { min: 500, max: 2000 },
    duration: '1-3 weeks',
    deliverables: ['Source Files', 'High-res Images', 'Brand Guidelines']
  },
  {
    id: 2,
    title: 'VFX',
    description: 'Cutting-edge visual effects for films, commercials, and digital content.',
    icon: '✨',
    category: 'post-production',
    features: ['Motion Graphics', 'Compositing', '3D Effects', 'Color Grading'],
    pricing: { min: 1500, max: 5000 },
    duration: '2-6 weeks',
    deliverables: ['Final Video', 'Project Files', 'Asset Library']
  },
  {
    id: 3,
    title: 'Photography',
    description: 'Professional photography services for events, products, and portraits.',
    icon: '📸',
    category: 'capture',
    features: ['Event Photography', 'Product Shots', 'Portraits', 'Commercial'],
    pricing: { min: 800, max: 3000 },
    duration: '1 day - 1 week',
    deliverables: ['High-res Images', 'Edited Photos', 'Print-ready Files']
  },
  {
    id: 4,
    title: 'Videography',
    description: 'High-quality video production for various needs and platforms.',
    icon: '🎬',
    category: 'capture',
    features: ['Event Coverage', 'Promotional Videos', 'Documentaries', 'Social Media'],
    pricing: { min: 1200, max: 4000 },
    duration: '1-4 weeks',
    deliverables: ['Final Video', 'Raw Footage', 'Multiple Formats']
  },
  {
    id: 5,
    title: 'Cinematography',
    description: 'Cinematic storytelling through professional film production.',
    icon: '🎭',
    category: 'capture',
    features: ['Film Production', 'Music Videos', 'Short Films', 'Commercials'],
    pricing: { min: 2000, max: 8000 },
    duration: '2-8 weeks',
    deliverables: ['Master File', 'Color Graded Version', 'Behind-the-scenes']
  },
  {
    id: 6,
    title: 'Commercial Drone',
    description: 'Aerial photography and videography for commercial projects.',
    icon: '🚁',
    category: 'aerial',
    features: ['Aerial Shots', 'Real Estate', 'Construction', 'Mapping'],
    pricing: { min: 1000, max: 3500 },
    duration: '1-2 weeks',
    deliverables: ['4K Footage', 'Still Images', 'Flight Logs']
  },
  {
    id: 7,
    title: 'FPV Drones',
    description: 'Dynamic FPV drone footage for action sequences and unique perspectives.',
    icon: '🏎️',
    category: 'aerial',
    features: ['Action Sequences', 'Racing Coverage', 'Cinematic Flights', 'Live Streaming'],
    pricing: { min: 1500, max: 4500 },
    duration: '1-3 weeks',
    deliverables: ['Raw Footage', 'Edited Sequences', 'Slow Motion Clips']
  },
  {
    id: 8,
    title: 'Post Production',
    description: 'Complete post-production services from editing to final delivery.',
    icon: '⚡',
    category: 'post-production',
    features: ['Video Editing', 'Audio Mixing', 'Color Correction', 'Final Delivery'],
    pricing: { min: 800, max: 3000 },
    duration: '1-4 weeks',
    deliverables: ['Final Cut', 'Project Files', 'Multiple Versions']
  },
  {
    id: 9,
    title: 'Broadcasting',
    description: 'Live streaming and broadcasting solutions for events and content.',
    icon: '📡',
    category: 'broadcast',
    features: ['Live Streaming', 'Multi-Camera Setup', 'Event Broadcasting', 'Remote Production'],
    pricing: { min: 2000, max: 6000 },
    duration: '1 day - 1 week',
    deliverables: ['Live Stream', 'Recording', 'Technical Support']
  }
];

export const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'design', name: 'Design' },
  { id: 'capture', name: 'Capture' },
  { id: 'aerial', name: 'Aerial' },
  { id: 'post-production', name: 'Post Production' },
  { id: 'broadcast', name: 'Broadcasting' }
];
