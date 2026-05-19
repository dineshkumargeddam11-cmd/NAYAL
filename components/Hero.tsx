import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

import { PORTFOLIO_IMAGES } from "./Portfolio";

const heroImages = PORTFOLIO_IMAGES.slice(0, 6).map((url, index) => ({
  id: index + 1,
  url,
  alt: `Featured Project ${index + 1}`,
}));

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-start pt-[20vh] overflow-hidden"
    >
      {/* Background Image Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImages[currentIndex].url}')` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Slider Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition-colors pointer-events-auto border border-white/20"
        >
          <ChevronLeft strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition-colors pointer-events-auto border border-white/20"
        >
          <ChevronRight strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>

      {/* Slides Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 z-20">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-brand-gold"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1, y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="text-white/50"
        >
          <ChevronDown className="w-8 h-8 pointer-events-none" strokeWidth={2} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10 select-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold leading-tight mb-6 tracking-wide drop-shadow-2xl whitespace-nowrap"
        >
          <span className="block font-light tracking-widest text-brand-gold mb-2 text-xl md:text-2xl lg:text-3xl whitespace-normal">
            NAYA LUXE
          </span>
          Crafting Timeless Interiors
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md font-light tracking-wide"
        >
          From luxurious residences to iconic commercial spaces, we design
          environments that inspire and endure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 max-w-sm sm:max-w-none mx-auto"
        >
          <a
            href="#contact"
            className="group relative bg-[#2563eb] text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 text-lg md:text-xl inline-flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] tracking-wider uppercase overflow-hidden text-center"
          >
            <span className="relative z-10 flex items-center justify-center">
              Get a Free Consultation
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                💡
              </span>
            </span>
          </a>
          <a
            href="#budget-calculator"
            className="group relative bg-[#2563eb] text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 text-lg md:text-xl inline-flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] tracking-wider uppercase overflow-hidden text-center"
          >
            <span className="relative z-10 flex items-center justify-center">
              Get Quotation
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                🚀
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
