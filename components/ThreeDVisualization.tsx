import React from 'react';
import { View } from "lucide-react"; 

const ThreeDVisualization: React.FC = () => {
  return (
    <section className="relative w-full flex items-center overflow-hidden min-h-[30vh] border-y border-gray-200">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed transition-transform duration-[10s] hover:scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#172013]/90 via-[#27331f]/70 to-[#dce0d3]/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#e6eadc] mb-4">
            <View className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-white">360° Vision</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Specialized 3D Visualization <br />
            <span className="text-brand-gold font-light lg:text-4xl text-3xl">for Builders & High-Rises</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-200 font-medium mb-6 leading-relaxed max-w-xl">
            We curate immersive 360-degree architectural experiences for commercial spaces and high-rise apartments, bringing blueprints to life with stunning photorealism.
          </p>
          
          <a href="#services" className="inline-block bg-brand-gold text-white hover:bg-yellow-600 font-bold px-6 py-3 rounded-full shadow-lg transition-all transform hover:-translate-y-1 text-sm md:text-base">
            Discover 3D Rendering
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThreeDVisualization;
