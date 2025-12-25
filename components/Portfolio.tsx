
import React, { useLayoutEffect, useRef } from 'react';
import { TranslationSet } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PortfolioProps {
  t: TranslationSet;
}

const Portfolio: React.FC<PortfolioProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t.portfolio.items]);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 uppercase mb-4">Masterpieces</h4>
            <h2 className="text-6xl md:text-8xl font-syne font-extrabold tracking-tighter uppercase leading-[0.85]">
              {t.portfolio.title.split(' ')[0]}<br/><span className="text-white/20">{t.portfolio.title.split(' ')[1] || 'WORKS.'}</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm font-medium tracking-wide">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="editorial-grid">
          {t.portfolio.items.map((project) => (
            <div 
              key={project.id} 
              className={`project-card group relative overflow-hidden bg-[#111] transition-all duration-700 hover:z-10 cursor-pointer
                ${project.size === 'large' ? 'col-span-12 lg:col-span-8 aspect-[16/9]' : ''}
                ${project.size === 'medium' ? 'col-span-12 lg:col-span-7 aspect-[4/3]' : ''}
                ${project.size === 'small' ? 'col-span-12 lg:col-span-4 aspect-[4/5]' : ''}
              `}
            >
              <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase mb-4">{project.category}</span>
                <h3 className="text-4xl font-syne font-extrabold uppercase tracking-tighter text-white">{project.title}</h3>
                <div className="mt-8 flex items-center space-x-4">
                   <div className="w-12 h-[1px] bg-white" />
                   <span className="text-[9px] font-bold tracking-[0.2em] uppercase">View Project</span>
                </div>
              </div>

              <div className="absolute top-10 right-10 z-20 text-[10px] font-bold tracking-widest text-white/20">
                0{project.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
