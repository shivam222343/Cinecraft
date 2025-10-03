import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const DroneServices = () => {
  const droneData = {
    title: "Drone Services",
    subtitle: "Aerial perspectives that elevate your vision",
    description: "Professional drone cinematography and photography services providing stunning aerial footage with licensed pilots and cutting-edge equipment.",
    icon: "🚁",
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "cyan-600",
    gradientTo: "blue-600",
    
    features: [
      {
        icon: "🛸",
        title: "Licensed Pilots",
        description: "FAA certified drone pilots ensuring safe and legal aerial operations."
      },
      {
        icon: "📡",
        title: "Advanced Equipment",
        description: "Professional drones with 4K cameras, gimbals, and obstacle avoidance systems."
      },
      {
        icon: "🌍",
        title: "GPS Precision",
        description: "Precise positioning and automated flight paths for consistent, professional results."
      },
      {
        icon: "⛅",
        title: "Weather Adaptive",
        description: "Professional assessment of weather conditions for optimal flight safety."
      },
      {
        icon: "📊",
        title: "Data Services",
        description: "Aerial mapping, surveying, and inspection services for various industries."
      },
      {
        icon: "🎯",
        title: "Custom Shots",
        description: "Tailored aerial sequences designed to meet your specific creative vision."
      }
    ],

    services: [
      {
        title: "Real Estate Aerials",
        description: "Stunning aerial photography and video for property marketing and listings.",
        price: "499",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Event Coverage",
        description: "Aerial videography for weddings, festivals, and large-scale events.",
        price: "899",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Construction Monitoring",
        description: "Progress documentation and site monitoring for construction projects.",
        price: "699",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Cinematic Aerials",
        description: "Professional aerial cinematography for films, commercials, and documentaries.",
        price: "1299",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Agricultural Survey",
        description: "Crop monitoring, field mapping, and agricultural analysis services.",
        price: "799",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Infrastructure Inspection",
        description: "Safe aerial inspection of bridges, towers, and industrial facilities.",
        price: "999",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Luxury Resort Showcase",
        description: "Breathtaking aerial tour of premium resort property",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Wedding Aerial Film",
        description: "Romantic aerial cinematography for destination wedding",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Construction Progress",
        description: "Time-lapse aerial documentation of major development",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Cinematic Landscape",
        description: "Stunning aerial cinematography for nature documentary",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Urban Architecture",
        description: "Dynamic aerial footage of modern city skyline",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Agricultural Mapping",
        description: "Precision agriculture monitoring and crop analysis",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...droneData} />;
};

export default DroneServices;
