/**
 * Application constants
 */

export const SITE_CONFIG = {
  name: "Muhammad Qasim",
  title: "Full Stack & AI Developer",
  description: "Premium portfolio showcasing full stack engineering and AI integration projects",
  url: "https://qasim.dev", // Update with actual domain
};

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const HERO_WORDS = ["Full Stack Engineering", "AI Integration", "Conversion-first Delivery"];

export const ANIMATION_CONFIG = {
  revealTransition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  cardMaxTilt: 6,
  cardScaleHover: 1.02,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const SOCIAL_LINKS = {
  email: "muhammadqasim.dev@gmail.com",
  phone: "+92-300-1234567",
  whatsapp: "https://wa.me/923001234567",
  linkedin: "https://www.linkedin.com/in/muhammadqasim-dev",
  github: "https://github.com/muhammadqasim-dev",
};
