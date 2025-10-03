import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Basic fade+up reveal for a list of elements
export function revealStagger(targets, opts = {}) {
  const {
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    y = 24,
    ease = 'power3.out'
  } = opts;

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    { autoAlpha: 1, y: 0, duration, ease, delay, stagger }
  );
}

// Scroll-based reveal for child selector within a container
export function scrollReveal(container, selector, opts = {}) {
  const {
    start = 'top 85%',
    end = 'bottom 20%',
    once = true,
    stagger = 0.12,
    y = 24,
    duration = 0.8,
    ease = 'power3.out'
  } = opts;

  const elements = container.querySelectorAll(selector);
  elements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease,
        delay: i * stagger,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          toggleActions: 'play none none reverse',
          once
        }
      }
    );
  });
}

// Simple scroll reveal for single elements
export function scrollRevealElement(element, opts = {}) {
  if (!element) return;
  
  const {
    start = 'top 85%',
    end = 'bottom 20%',
    once = true,
    y = 30,
    x = 0,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out'
  } = opts;

  return gsap.fromTo(
    element,
    { autoAlpha: 0, y, x },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: 'play none none reverse',
        once
      }
    }
  );
}

// Simple parallax on scroll (translateY)
export function parallaxY(target, speed = -0.2) {
  const onScroll = () => {
    const y = window.scrollY * speed;
    gsap.to(target, { y, duration: 0.3, ease: 'power2.out' });
  };
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}

// Mouse parallax across multiple layers [{ el, x, y, strength }]
export function mouseParallax(container, layers) {
  const onMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = container.getBoundingClientRect();
    const cx = clientX - left - width / 2;
    const cy = clientY - top - height / 2;

    layers.forEach(({ el, strength = 10 }) => {
      if (!el) return;
      gsap.to(el, {
        x: -(cx / strength),
        y: -(cy / strength),
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  };
  container.addEventListener('mousemove', onMove);
  return () => container.removeEventListener('mousemove', onMove);
}

// Subtle floating animation for decorative items
export function floatY(el, { amplitude = 8, duration = 2.2, delay = 0 } = {}) {
  return gsap.to(el, {
    y: `+=${amplitude}`,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay
  });
}
