
import React, { useState } from 'react';
import { TranslationSet } from '../types';

interface PortfolioProps {
  t: TranslationSet;
}

const ITEMS = [
  { id: 1, title: 'Summer Anthem', category: 'music', img: 'https://picsum.photos/600/400?random=1' },
  { id: 2, title: 'Elite Fragrance', category: 'commercial', img: 'https://picsum.photos/600/400?random=2' },
  { id: 3, title: 'The Last Train', category: 'films', img: 'https://picsum.photos/600/400?random=3' },
  { id: 4, title: 'Urban Beats', category: 'music', img: 'https://picsum.photos/600/400?random=4' },
  { id: 5, title: 'Tech Future', category: 'commercial', img: 'https://picsum.photos/600/400?random=5' },
  { id: 6, title: 'Echoes of Silence', category: 'films', img: 'https://picsum.photos/600/400?random=6' },
];

const Portfolio: React.FC<PortfolioProps> = ({ t }) => {
  const [filter, setFilter] = useState<'all' | 'music' | 'commercial' | 'films'>('all');

  const filteredItems = filter === 'all' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black font-syncopate mb-4 uppercase">{t.portfolio.title}</h2>
        <p className="text-slate-400 text-lg">{t.portfolio.subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['all', 'music', 'commercial', 'films'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full border-2 transition-all duration-300 uppercase text-xs font-bold tracking-widest ${
              filter === cat 
                ? 'bg-cyan-400 border-cyan-400 text-black' 
                : 'border-slate-800 text-slate-400 hover:border-cyan-400'
            }`}
          >
            {cat === 'all' ? 'All Work' : t.portfolio.categories[cat as keyof typeof t.portfolio.categories]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl transition-transform duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">{t.portfolio.categories[item.category as keyof typeof t.portfolio.categories]}</span>
              <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
              <button className="mt-4 text-white text-sm font-bold flex items-center group/btn">
                PLAY VIDEO <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
