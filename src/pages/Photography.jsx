import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const Photography = () => {
  const photographyData = {
    title: "Photography",
    subtitle: "Capturing moments that tell your story",
    description: "From portraits to events, our professional photography services capture the essence of every moment with artistic vision and technical excellence.",
    icon: "📸",
    heroImage: "https://images.unsplash.com/photo-1554048612-b6a482b224d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "purple-600",
    gradientTo: "pink-600",
    
    features: [
      {
        icon: "🎨",
        title: "Artistic Vision",
        description: "Creative composition and lighting that brings your story to life with stunning visual impact."
      },
      {
        icon: "📷",
        title: "Professional Equipment",
        description: "State-of-the-art cameras and lenses ensuring crystal-clear, high-resolution images."
      },
      {
        icon: "⚡",
        title: "Fast Turnaround",
        description: "Quick editing and delivery without compromising on quality or attention to detail."
      },
      {
        icon: "🎯",
        title: "Tailored Approach",
        description: "Customized photography sessions designed to meet your specific needs and vision."
      },
      {
        icon: "🌟",
        title: "Post-Processing",
        description: "Professional editing and retouching to enhance every image to perfection."
      },
      {
        icon: "💼",
        title: "Commercial Ready",
        description: "High-quality images suitable for marketing, websites, and professional use."
      }
    ],

    services: [
      {
        title: "Portrait Photography",
        description: "Professional headshots and personal portraits that capture personality and character.",
        price: "299",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Event Photography",
        description: "Comprehensive coverage of weddings, corporate events, and special occasions.",
        price: "799",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Photography",
        description: "High-quality product shots for e-commerce, catalogs, and marketing materials.",
        price: "199",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Fashion Photography",
        description: "Creative fashion shoots for brands, models, and fashion portfolios.",
        price: "599",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Real Estate Photography",
        description: "Professional property photography that showcases spaces at their best.",
        price: "399",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Photography",
        description: "Professional business photography for teams, offices, and corporate events.",
        price: "499",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Wedding Celebration",
        description: "Romantic wedding photography capturing love and joy",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Headshots",
        description: "Professional business portraits for executive team",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Showcase",
        description: "Elegant product photography for luxury brand",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Fashion Editorial",
        description: "Creative fashion shoot for magazine feature",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Architecture Photography",
        description: "Stunning architectural photography showcasing design",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Event Coverage",
        description: "Dynamic event photography capturing key moments",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...photographyData} />;
};

export default Photography;
