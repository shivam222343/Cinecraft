import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const Cinematography = () => {
  const cinematographyData = {
    title: "Cinematography",
    subtitle: "Cinematic excellence in every frame",
    description: "Professional cinematography services that create visually stunning films with artistic composition, lighting, and camera movement.",
    icon: "🎭",
    heroImage: "https://images.unsplash.com/photo-1489599904593-130ba1ce7969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "indigo-600",
    gradientTo: "purple-600",
    
    features: [
      {
        icon: "🎬",
        title: "Cinema Cameras",
        description: "Professional RED, ARRI, and Blackmagic cameras for cinematic quality footage."
      },
      {
        icon: "💡",
        title: "Lighting Design",
        description: "Expert lighting setups that create mood, atmosphere, and visual storytelling."
      },
      {
        icon: "🎨",
        title: "Color Science",
        description: "Advanced color grading and correction for cinematic look and feel."
      },
      {
        icon: "📐",
        title: "Composition",
        description: "Artistic framing and composition techniques that enhance visual narrative."
      },
      {
        icon: "🎪",
        title: "Movement",
        description: "Dynamic camera movements including steadicam, gimbal, and crane shots."
      },
      {
        icon: "🏆",
        title: "Award Quality",
        description: "Broadcast and festival-quality cinematography that meets industry standards."
      }
    ],

    services: [
      {
        title: "Feature Films",
        description: "Full-length feature film cinematography with complete visual storytelling.",
        price: "5999",
        image: "https://images.unsplash.com/photo-1489599904593-130ba1ce7969?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Short Films",
        description: "Professional cinematography for short films and artistic projects.",
        price: "2999",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Commercial Ads",
        description: "High-end commercial cinematography for advertising and marketing.",
        price: "3999",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Award-Winning Short",
        description: "Cinematography for festival award-winning short film",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Luxury Brand Commercial",
        description: "High-end cinematography for premium brand campaign",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Independent Feature",
        description: "Cinematic storytelling for independent film production",
        image: "https://images.unsplash.com/photo-1489599904593-130ba1ce7969?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...cinematographyData} />;
};

export default Cinematography;
