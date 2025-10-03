import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const Commercial = () => {
  const commercialData = {
    title: "Commercial Production",
    subtitle: "Strategic visual content that drives results",
    description: "Professional commercial production services that create compelling marketing content designed to engage audiences and achieve business objectives.",
    icon: "🎯",
    heroImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "orange-600",
    gradientTo: "red-600",
    
    features: [
      {
        icon: "📈",
        title: "ROI Focused",
        description: "Content strategically designed to maximize return on investment and business impact."
      },
      {
        icon: "🎪",
        title: "Brand Storytelling",
        description: "Compelling narratives that connect with audiences and build brand loyalty."
      },
      {
        icon: "📱",
        title: "Multi-Platform",
        description: "Content optimized for TV, web, social media, and digital advertising platforms."
      },
      {
        icon: "⚡",
        title: "Fast Turnaround",
        description: "Efficient production workflows to meet tight marketing deadlines."
      },
      {
        icon: "🎨",
        title: "Creative Excellence",
        description: "Award-winning creative team with proven track record in commercial success."
      },
      {
        icon: "📊",
        title: "Performance Analytics",
        description: "Data-driven approach to content creation and performance optimization."
      }
    ],

    services: [
      {
        title: "TV Commercials",
        description: "High-production value television commercials for broadcast and streaming.",
        price: "4999",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Digital Ads",
        description: "Social media and web advertising content optimized for digital platforms.",
        price: "1999",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Videos",
        description: "Engaging product demonstrations and promotional videos for e-commerce.",
        price: "1299",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Brand Films",
        description: "Cinematic brand storytelling that builds emotional connections with audiences.",
        price: "3499",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Videos",
        description: "Professional corporate communications and training video content.",
        price: "2299",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Explainer Videos",
        description: "Clear, engaging videos that explain products, services, or concepts.",
        price: "1799",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Tech Startup Campaign",
        description: "Multi-platform commercial campaign for innovative tech company",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Luxury Brand Film",
        description: "Cinematic brand story for premium fashion label",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Product Launch Video",
        description: "Dynamic product reveal for consumer electronics brand",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "TV Commercial Series",
        description: "Award-winning television campaign for national brand",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Digital Ad Campaign",
        description: "Social media advertising content with high engagement rates",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Training",
        description: "Comprehensive training video series for Fortune 500 company",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...commercialData} />;
};

export default Commercial;
