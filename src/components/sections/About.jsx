import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollRevealElement } from '../../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll reveal animations
      scrollRevealElement(contentRef.current, { delay: 0.2 });
      scrollRevealElement(imageRef.current, { delay: 0.4, x: 50 });
      scrollRevealElement(statsRef.current, { delay: 0.6 });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 2,
            delay: 0.8 + (index * 0.2),
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 500, label: "Happy Clients", suffix: "+" },
    { number: 1200, label: "Projects Completed", suffix: "+" },
    { number: 8, label: "Years Experience", suffix: "" },
    { number: 50, label: "Awards Won", suffix: "+" }
  ];

  const features = [
    {
      icon: "🎯",
      title: "Creative Vision",
      description: "We bring unique artistic perspectives to every project, ensuring your story is told in the most compelling way."
    },
    {
      icon: "⚡",
      title: "Professional Excellence",
      description: "State-of-the-art equipment and cutting-edge techniques deliver exceptional quality in every frame."
    },
    {
      icon: "🤝",
      title: "Client-Focused",
      description: "Your vision is our priority. We work closely with you to exceed expectations and create lasting memories."
    },
    {
      icon: "🏆",
      title: "Award-Winning",
      description: "Recognized industry expertise with multiple awards for outstanding photography and videography work."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden"
      id="about"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-6">
            About CineCraft Media
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting visual stories that captivate, inspire, and endure. We are passionate creators dedicated to bringing your vision to life.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800 font-display">
                Where Creativity Meets Excellence
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded with a passion for visual storytelling, CineCraft Media has grown into a premier creative studio specializing in photography, videography, and cinematic production. Our team of skilled professionals combines artistic vision with technical expertise to deliver exceptional results.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From intimate portraits to grand corporate events, from wedding celebrations to commercial campaigns, we approach each project with dedication, creativity, and an unwavering commitment to quality.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🎬</span>
                Our Mission
              </h4>
              <p className="text-gray-600 leading-relaxed">
                To create compelling visual narratives that not only capture moments but evoke emotions, tell stories, and preserve memories for generations to come.
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="CineCraft Media Team"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-purple-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Achievements</h3>
            <p className="text-purple-100 text-lg">Numbers that speak to our commitment and success</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  <span className="stat-number">{stat.number}</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-purple-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
