import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const Videography = () => {
  const videographyData = {
    title: "Videography",
    subtitle: "Bringing your stories to life through motion",
    description: "Professional video production services that capture compelling narratives with cinematic quality, from concept to final cut.",
    icon: "🎬",
    heroImage: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "blue-600",
    gradientTo: "indigo-600",
    
    features: [
      {
        icon: "🎥",
        title: "4K Production",
        description: "Ultra-high definition video recording with professional cinema cameras for stunning clarity."
      },
      {
        icon: "🎞️",
        title: "Expert Editing",
        description: "Professional post-production with color grading, sound design, and visual effects."
      },
      {
        icon: "🎵",
        title: "Audio Excellence",
        description: "Crystal-clear audio recording and mixing for professional-grade sound quality."
      },
      {
        icon: "📱",
        title: "Multi-Platform",
        description: "Optimized video formats for web, social media, broadcast, and cinema distribution."
      },
      {
        icon: "⚡",
        title: "Fast Delivery",
        description: "Efficient workflow and quick turnaround times without compromising quality."
      },
      {
        icon: "🎯",
        title: "Strategic Approach",
        description: "Video content designed to achieve your specific marketing and communication goals."
      }
    ],

    services: [
      {
        title: "Corporate Videos",
        description: "Professional corporate videos for training, marketing, and internal communications.",
        price: "1299",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Wedding Films",
        description: "Cinematic wedding videography that captures your special day beautifully.",
        price: "1899",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Music Videos",
        description: "Creative music video production with artistic vision and technical expertise.",
        price: "2499",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Documentary Films",
        description: "Compelling documentary storytelling that engages and informs audiences.",
        price: "3499",
        image: "https://images.unsplash.com/photo-1478720568477-b0ac8ace8daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Videos",
        description: "Engaging product demonstration and promotional videos for marketing.",
        price: "899",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Event Coverage",
        description: "Comprehensive event videography for conferences, launches, and celebrations.",
        price: "1599",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Tech Startup Launch",
        description: "Dynamic promotional video for innovative tech company",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Wedding Cinematic",
        description: "Romantic wedding film with cinematic storytelling",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Music Video Production",
        description: "Creative music video with stunning visual effects",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Training",
        description: "Professional training video series for enterprise client",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Documentary Feature",
        description: "Award-winning documentary on environmental conservation",
        image: "https://images.unsplash.com/photo-1478720568477-b0ac8ace8daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Showcase",
        description: "High-end product video for luxury brand launch",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...videographyData} />;
};

export default Videography;
