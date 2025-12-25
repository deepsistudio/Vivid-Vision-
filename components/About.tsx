
import React, { useLayoutEffect, useRef } from 'react';
import { TranslationSet } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AboutProps {
  t: TranslationSet;
}

const About: React.FC<AboutProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });
      
      gsap.from(".founder-img", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-60 px-6 md:px-12 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 items-start">
          
          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <div className="relative aspect-[3/4] overflow-hidden founder-img rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 shadow-2xl">
              <img 
                src={t.about.image} 
                alt="Vision - Founding Director" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">Vision</span>
                <p className="text-[8px] font-bold text-white/40 tracking-[0.2em] uppercase mt-1">Founding Director</p>
              </div>
            </div>
            
            <div className="mt-12 hidden lg:block opacity-20">
               <p className="text-[10px] font-bold tracking-[0.5em] uppercase">Vivid Vision Films</p>
               <p className="text-[8px] font-medium tracking-[0.3em] uppercase mt-2">© All Rights Reserved</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-16">
            <h4 className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 uppercase mb-8 reveal-text">Our Directors</h4>
            <h2 className="text-6xl md:text-9xl font-syne font-extrabold uppercase tracking-tighter leading-[0.8] reveal-text">
              {t.about.title.split(' & ').map((name, i) => (
                <React.Fragment key={name}>
                  {i > 0 && <span className="text-white/10 block md:inline"> & </span>}
                  <span>{name}</span>
                </React.Fragment>
              ))}
            </h2>
            
            <p className="text-xl md:text-4xl font-medium leading-tight text-white/90 reveal-text max-w-4xl">
              "{t.about.vision}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 reveal-text">
               <div className="space-y-6">
                  <div className="h-[1px] w-12 bg-cyan-500" />
                  <p className="text-white/40 text-lg leading-relaxed font-light">
                    Directed by Vision & Vivid, we are more than a production house. We are architects of cinematic atmosphere.
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="h-[1px] w-12 bg-white/20" />
                  <p className="text-white/40 text-lg leading-relaxed font-light">
                    Based in Toronto and Punjab, our team merges high-fashion editorial aesthetics with raw, narrative-driven filmmaking to redefine global music and commercial media.
                  </p>
               </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-20 reveal-text">
              <div className="space-y-2">
                <div className="text-5xl font-syne font-extrabold tracking-tighter">{t.about.stats.projects.split(' ')[0]}</div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">{t.about.stats.projects.split(' ').slice(1).join(' ')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-syne font-extrabold tracking-tighter">12+</div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-syne font-extrabold tracking-tighter">{t.about.stats.clients.split(' ')[0]}</div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">{t.about.stats.clients.split(' ').slice(1).join(' ')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
