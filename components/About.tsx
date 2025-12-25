
import React, { useLayoutEffect, useRef } from 'react';
import { TranslationSet } from '../types';
// Import GSAP for scroll animations
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AboutProps {
  t: TranslationSet;
}

const About: React.FC<AboutProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text content
      gsap.from(contentRef.current!.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

      // Parallax Image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        },
        y: -50,
        rotate: 2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-6xl font-black font-syncopate mb-8 uppercase leading-tight">
            {t.about.title}
          </h2>
          <div className="space-y-6 text-lg text-slate-400">
            <p className="border-l-4 border-cyan-400 pl-6 italic text-slate-300 font-medium">
              "{t.about.vision}"
            </p>
            <p>{t.about.mission}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="stat-item">
              <div className="text-4xl font-bold gradient-text">200+</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-2">{t.about.stats.projects}</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold gradient-text">50+</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-2">{t.about.stats.clients}</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold gradient-text">12</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-2">{t.about.stats.awards}</div>
            </div>
          </div>
        </div>
        
        <div ref={imageRef} className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-magenta-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" style={{'--tw-gradient-to': '#ff006e'} as any} />
          <img 
            src="https://picsum.photos/800/1000?film-set" 
            alt="Film set" 
            className="relative rounded-2xl w-full object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
