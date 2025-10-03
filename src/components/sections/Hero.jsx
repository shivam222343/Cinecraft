import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import { gsap } from 'gsap';

import Button from '../ui/Button';

import { mouseParallax, floatY } from '../../utils/animations';



const Hero = ({ onBookingOpen, onExploreWork }) => {

    const heroRef = useRef(null);

    const titleRef = useRef(null);

    const subtitleRef = useRef(null);

    const buttonsRef = useRef(null);

    const videoRef = useRef(null);

    const layer1Ref = useRef(null);

    const layer2Ref = useRef(null);



    useEffect(() => {

        const ctx = gsap.context(() => {

            // Set initial states

            gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {

                opacity: 0,

                y: 50

            });



            // Create timeline

            const tl = gsap.timeline({ delay: 0.3 });



            // Animate title

            tl.to(titleRef.current, {

                opacity: 1,

                y: 0,

                duration: 0.9,

                ease: "power3.out"

            })

                // Animate subtitle

                .to(subtitleRef.current, {

                    opacity: 1,

                    y: 0,

                    duration: 0.7,

                    ease: "power3.out"

                }, "-=0.5")

                // Animate buttons

                .to(buttonsRef.current, {

                    opacity: 1,

                    y: 0,

                    duration: 0.6,

                    ease: "power3.out"

                }, "-=0.3");



            // Parallax effect on scroll

            const handleScroll = () => {

                const scrollY = window.scrollY;

                const rate = scrollY * -0.5;



                if (videoRef.current) {

                    gsap.set(videoRef.current, {

                        transform: `translate3d(0, ${rate}px, 0)`

                    });

                }

            };



            window.addEventListener('scroll', handleScroll);



            // Mouse parallax for background blobs

            let removeMouseParallax;

            if (heroRef.current) {

                removeMouseParallax = mouseParallax(heroRef.current, [

                    { el: layer1Ref.current, strength: 30 },

                    { el: layer2Ref.current, strength: 20 }

                ]);

            }



            // Floating decorative elements for subtle life

            if (layer1Ref.current) floatY(layer1Ref.current, { amplitude: 10, duration: 3, delay: 0.2 });

            if (layer2Ref.current) floatY(layer2Ref.current, { amplitude: 12, duration: 3.4, delay: 0.4 });



            return () => {

                window.removeEventListener('scroll', handleScroll);

                if (removeMouseParallax) removeMouseParallax();

            };

        }, heroRef);



        return () => ctx.revert();

    }, []);



    const handleExploreWork = () => {

        const portfolioSection = document.getElementById('portfolio');

        if (portfolioSection) {

            portfolioSection.scrollIntoView({ behavior: 'smooth' });

        }

        if (onExploreWork) onExploreWork();

    };



    return (

        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Video */}

            <div className="absolute inset-0 z-0">

                <div

                    ref={videoRef}

                    className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900"

                >

                    {/* Placeholder for background video - replace with actual video */}

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />



                    {/* Animated background elements */}

                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />

                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl animate-pulse animation-delay-400" />

                </div>

            </div>



            {/* Content */}

            <div className="relative z-10 container-custom text-center text-white">

                <div className="max-w-4xl mx-auto">

                    {/* Main Title */}

                    <h1

                        ref={titleRef}

                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"

                    >

                        <span className="block">CineCraft Media:</span>

                        <span className='flex flex-col lg:flex-row gap-2'>
                            <span className="block text-gradient text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">

                                Crafting stories,

                            </span>

                            <span className="block text-gradient text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary-200 to-white bg-clip-text text-transparent">

                                creating impact

                            </span>
                        </span>

                    </h1>



                    {/* Subtitle */}

                    <p

                        ref={subtitleRef}

                        className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"

                    >

                        From cameras to drones. From concept to broadcast.

                        We craft visuals that move people and tell stories that matter.

                    </p>



                    {/* CTA Buttons */}

                    <div

                        ref={buttonsRef}

                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"

                    >

                        <Button

                            onClick={onBookingOpen}

                            size="lg"

                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold"

                        >

                            Book Now

                        </Button>

                        <Button

                            onClick={handleExploreWork}

                            variant="secondary"

                            size="lg"

                            className="border-white text-blue-400 hover:border-blue-500 hover:text-black hover:bg-blue-700  px-8 py-4 text-lg font-semibold"

                        >

                            Explore Work

                        </Button>

                    </div>
                    </div>

                   

                {/* Scroll Indicator */}



            </div>



            {/* Decorative Elements */}

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

                <div className="absolute top-1/3 left-10 w-2 h-2 bg-primary-400 rounded-full animate-ping" />

                <div className="absolute top-2/3 right-20 w-3 h-3 bg-primary-300 rounded-full animate-pulse animation-delay-200" />

                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-600" />

            </div>

        </section>

    );

};



export default Hero;