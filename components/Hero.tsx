
import React, { useLayoutEffect, useRef } from 'react';
import { TranslationSet } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroProps {
  t: TranslationSet;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ t, onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const titleWords = t.hero.title.toUpperCase().split(' ');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".word-span", {
        y: 100,
        rotateX: -45,
        stagger: 0.1,
        duration: 1.5,
        opacity: 0
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1
      }, "-=1")
      .from(ctaRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        scale: 1.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t.hero.title]);

  return (
    <section ref={containerRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-40 hero-bg">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&film" 
          alt="Cinema background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black font-syncopate mb-6 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
          {titleWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden">
              <span className="word-span inline-block">{word}</span>
            </span>
          ))}
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
        <button 
          ref={ctaRef}
          onClick={onCtaClick}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black"
        >
          <span className="relative uppercase tracking-widest">{t.hero.cta}</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-cyan-500/30 rounded-bl-3xl" />
      <div className="absolute top-10 right-10 w-32 h-32 border-r border-t border-magenta-500/30 rounded-tr-3xl" style={{ borderColor: '#ff006e33' }} />
    </section>
  );
};

export default Hero;
