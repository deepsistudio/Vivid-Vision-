
import React, { useEffect, useState } from 'react';
import { Page, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  setCurrentPage, 
  language, 
  setLanguage, 
}) => {
  const t = TRANSLATIONS[language];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string }[] = [
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'lab', label: 'AI Lab' },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white selection:bg-cyan-500 selection:text-black">
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-md' : 'py-8'}`}>
        <nav className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div 
            className="text-xl font-syne font-extrabold cursor-pointer tracking-tighter"
            onClick={() => setCurrentPage('home')}
          >
            VIVID VISION<span className="text-cyan-500">.</span>
          </div>
          
          <div className="flex items-center space-x-12">
            <ul className="hidden lg:flex space-x-10 text-[11px] font-bold tracking-[0.2em] uppercase">
              {navItems.map((item) => (
                <li 
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`cursor-pointer transition-all duration-300 hover:text-cyan-400 relative group ${currentPage === item.id ? 'text-cyan-400' : 'text-white/60'}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full ${currentPage === item.id ? 'w-full' : ''}`} />
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 border-l border-white/10 pl-10">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-[10px] font-bold tracking-widest outline-none cursor-pointer focus:text-cyan-400 uppercase"
              >
                <option value="en" className="bg-black">EN</option>
                <option value="pb" className="bg-black">ਪੰ</option>
                <option value="hi" className="bg-black">हिਂ</option>
              </select>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#050505] border-t border-white/5 py-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h3 className="text-4xl font-syne font-extrabold mb-8 tracking-tighter">VIVID VISION FILMS<br/><span className="text-white/20">CANADA & INDIA</span></h3>
              <p className="text-white/40 max-w-sm text-sm leading-relaxed">
                A globally recognized cinematic production house specializing in high-end music videos and commercials. Bridging visual storytelling across continents.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setCurrentPage('portfolio')}>Projects</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setCurrentPage('lab')}>AI Lab</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>Studio</li>
                <li className="pt-4 opacity-30 hover:opacity-100 hover:text-cyan-400 transition-all cursor-pointer text-[10px] font-bold tracking-widest uppercase" onClick={() => setCurrentPage('admin')}>Dashboard</li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase mb-8">Social</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="https://www.instagram.com/deep_vision_films/" className="hover:text-white transition-colors">Instagram</a></li>
                <li className="hover:text-white transition-colors cursor-pointer">Vimeo</li>
                <li className="hover:text-white transition-colors cursor-pointer">LinkedIn</li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase mb-8">Newsletter</h4>
              <div className="flex border-b border-white/10 pb-2">
                <input 
                  type="email" 
                  placeholder="STAY UPDATED" 
                  className="bg-transparent border-none w-full text-xs font-bold tracking-widest outline-none placeholder:text-white/20" 
                />
                <button className="text-xs font-bold tracking-widest hover:text-cyan-400 transition-colors">JOIN</button>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
            <div>© 2024 VIVID VISION FILMS. CRAFTED WITH PRECISION.</div>
            <div className="flex space-x-12">
              <span>TORONTO</span>
              <span>PUNJAB</span>
              <span>MUMBAI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
