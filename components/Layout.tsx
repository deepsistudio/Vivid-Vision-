
import React from 'react';
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
  theme, 
  toggleTheme 
}) => {
  const t = TRANSLATIONS[language];
  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'bollywood', label: t.nav.bollywood },
    { id: 'drill', label: t.nav.drill },
    { id: 'lab', label: t.nav.lab },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <header className="sticky top-0 z-50 glass shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-bold font-syncopate cursor-pointer gradient-text"
            onClick={() => setCurrentPage('home')}
          >
            VIVID VISION
          </div>
          
          <ul className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider">
            {navItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`cursor-pointer transition-colors duration-200 hover:text-cyan-400 ${currentPage === item.id ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : ''}`}
              >
                {item.label.toUpperCase()}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent border border-white/20 rounded px-2 py-1 text-xs outline-none cursor-pointer focus:border-cyan-400"
            >
              <option value="en" className="text-black">EN</option>
              <option value="pb" className="text-black">ਪੰ</option>
              <option value="hi" className="text-black">हिं</option>
            </select>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-syncopate font-bold mb-4">VIVID VISION</h3>
            <p className="text-sm">Premium cinematic production house based in Canada & India. Crafting the future of music videos and commercial films.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentPage('home')}>Home</li>
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentPage('portfolio')}>Portfolio</li>
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentPage('lab')}>AI Creative Lab</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">
                <a href="https://www.instagram.com/deep_vision_films/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li className="hover:text-cyan-400 cursor-pointer">YouTube</li>
              <li className="hover:text-cyan-400 cursor-pointer">LinkedIn</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-slate-800 border-none rounded-l px-3 py-2 text-sm focus:ring-1 focus:ring-cyan-400 w-full" />
              <button className="bg-cyan-500 text-white rounded-r px-4 py-2 text-sm font-bold hover:bg-cyan-400 transition-colors">JOIN</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 VIVID VISION FILMS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
