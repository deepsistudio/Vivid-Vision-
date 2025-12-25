
import React from 'react';

interface GenreGridProps {
  title: string;
  items: { title: string; desc: string; img: string }[];
}

const GenreGrid: React.FC<GenreGridProps> = ({ title, items }) => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-7xl font-black font-syncopate mb-12 text-center uppercase tracking-tighter italic">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-[16/10]">
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
              <div className="mt-4 w-12 h-1 bg-cyan-400 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreGrid;
