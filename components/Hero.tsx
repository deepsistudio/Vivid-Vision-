
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".reveal-item", {
        y: 150,
        rotateX: -30,
        opacity: 0,
        duration: 1.8,
        stagger: 0.1,
      })
      .from(".fade-item", {
        opacity: 0,
        y: 20,
        duration: 1.5,
      }, "-=1.2");

      gsap.to(".hero-media", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 1.15,
        y: 80
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t.hero.image]); // Re-run if image changes

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src={t.hero.image} 
          alt="Vision - Director" 
          className="hero-media w-full h-full object-cover opacity-60 grayscale transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a] z-10" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-[1400px]">
        <h1 className="hero-title text-[clamp(2.5rem,10vw,8.5rem)] font-syne font-extrabold uppercase mb-12 flex flex-col items-center tracking-tighter leading-[0.85]">
          <span className="reveal-container block h-[1.1em]">
            <span className="reveal-item block">VIVID</span>
          </span>
          <span className="reveal-container block h-[1.1em] -mt-[0.1em]">
            <span className="reveal-item block text-cyan-500">VISION</span>
          </span>
        </h1>
        
        <p className="fade-item text-white/40 text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase mb-12 max-w-xl mx-auto leading-loose">
          {t.hero.subtitle}
        </p>

        <div className="fade-item">
          <button 
            onClick={onCtaClick}
            className="group relative px-16 py-6 overflow-hidden rounded-full border border-white/10 transition-all duration-500 hover:border-cyan-400"
          >
            <span className="relative z-10 text-[9px] font-bold tracking-[0.4em] uppercase transition-colors group-hover:text-black">
              Explore Showreel
            </span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 hidden lg:block fade-item overflow-hidden">
        <div className="text-[9px] font-bold tracking-[0.5em] text-white/10 uppercase" style={{ writingMode: 'vertical-rl' }}>
          VISION & VIVID / DIRECTORS
        </div>
      </div>

      <div className="absolute bottom-12 right-12 fade-item flex items-center space-x-6">
         <span className="text-[8px] font-bold tracking-[0.3em] text-white/20 uppercase">Cinema Mastered</span>
         <div className="w-12 h-[1px] bg-white/10" />
      </div>
    </section>
  );
};

export default Hero;
