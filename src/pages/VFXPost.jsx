import DomainPageTemplate from '../components/domain/DomainPageTemplate';

const VFXPost = () => {
  const vfxData = {
    title: "VFX & Post Production",
    subtitle: "Transforming footage into cinematic magic",
    description: "Professional visual effects and post-production services that enhance your content with cutting-edge technology and creative expertise.",
    icon: "✨",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    gradientFrom: "purple-600",
    gradientTo: "pink-600",
    
    features: [
      {
        icon: "🎨",
        title: "Visual Effects",
        description: "Advanced VFX including compositing, motion graphics, and digital environments."
      },
      {
        icon: "🎬",
        title: "Color Grading",
        description: "Professional color correction and grading for cinematic look and consistency."
      },
      {
        icon: "🔊",
        title: "Audio Post",
        description: "Sound design, mixing, and audio enhancement for professional quality."
      },
      {
        icon: "⚡",
        title: "Motion Graphics",
        description: "Dynamic animations, titles, and graphic elements that enhance storytelling."
      },
      {
        icon: "🎭",
        title: "Creative Editing",
        description: "Expert video editing with pacing, transitions, and narrative structure."
      },
      {
        icon: "🚀",
        title: "Delivery Ready",
        description: "Final output in any format for broadcast, web, cinema, or social media."
      }
    ],

    services: [
      {
        title: "Color Grading",
        description: "Professional color correction and grading for films and commercials.",
        price: "799",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Visual Effects",
        description: "Advanced VFX including compositing, CGI, and digital environments.",
        price: "1499",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Motion Graphics",
        description: "Dynamic animations, titles, and graphic elements for video content.",
        price: "999",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Sound Design",
        description: "Custom sound effects, music composition, and audio mixing services.",
        price: "699",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Video Editing",
        description: "Professional video editing with creative storytelling and pacing.",
        price: "899",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "3D Animation",
        description: "Custom 3D modeling, animation, and rendering for any project.",
        price: "1999",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ],

    portfolio: [
      {
        title: "Sci-Fi Film VFX",
        description: "Complex visual effects for independent science fiction film",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Brand Motion Graphics",
        description: "Dynamic animated logo and brand elements for tech startup",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Documentary Color Grade",
        description: "Cinematic color grading for award-winning documentary",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Commercial VFX",
        description: "Product visualization and effects for luxury brand campaign",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Music Video Effects",
        description: "Creative visual effects and motion graphics for music video",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        title: "Corporate Animation",
        description: "3D animation and motion graphics for corporate presentation",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  return <DomainPageTemplate {...vfxData} />;
};

export default VFXPost;
