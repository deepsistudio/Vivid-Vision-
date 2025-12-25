
import React from 'react';
import { TranslationSet } from '../types';

interface HeroProps {
  t: TranslationSet;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ t, onCtaClick }) => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background with video-like feel using an image */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&film" 
          alt="Cinema background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <h1 className="text-5xl md:text-8xl font-black font-syncopate mb-6 leading-tight tracking-tighter">
          {t.hero.title.toUpperCase()}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
        <button 
          onClick={onCtaClick}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black"
        >
          <span className="relative uppercase tracking-widest">{t.hero.cta}</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-cyan-500/30 rounded-bl-3xl" />
      <div className="absolute top-10 right-10 w-32 h-32 border-r border-t border-magenta-500/30 rounded-tr-3xl" style={{ borderColor: '#ff006e33' }} />
    </section>
  );
};

export default Hero;
