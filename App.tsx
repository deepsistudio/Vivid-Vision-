
import React, { useState, useEffect } from 'react';
import { Page, Language, Theme } from './types';
import { TRANSLATIONS } from './constants';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import GenreGrid from './components/GenreGrid';
import Contact from './components/Contact';
import AIEditor from './components/AIEditor';

const BOLLYWOOD_ITEMS = [
  { title: 'Soulful Melody', desc: 'A cinematic romantic journey through the valleys.', img: 'https://picsum.photos/800/600?bollywood-1' },
  { title: 'Dance Storm', desc: 'High-energy choreography with vibrant color grading.', img: 'https://picsum.photos/800/600?bollywood-2' },
  { title: 'Drama Night', desc: 'Intense narrative storytelling with moody lighting.', img: 'https://picsum.photos/800/600?bollywood-3' },
  { title: 'Golden Era', desc: 'A tribute to the classics with retro film processing.', img: 'https://picsum.photos/800/600?bollywood-4' },
];

const DRILL_ITEMS = [
  { title: 'Concrete Jungle', desc: 'Gritty urban visuals from the heart of the city.', img: 'https://picsum.photos/800/600?drill-1' },
  { title: 'Night Shift', desc: 'Fast-paced editing with aggressive transition work.', img: 'https://picsum.photos/800/600?drill-2' },
  { title: 'The Crew', desc: 'Raw, handheld cinematography capturing real energy.', img: 'https://picsum.photos/800/600?drill-3' },
  { title: 'Shadow Walk', desc: 'Experimental lighting and thermal camera effects.', img: 'https://picsum.photos/800/600?drill-4' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('vv_lang') as Language) || 'en';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('vv_theme') as Theme) || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('vv_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('vv_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Simple routing based on hash or state
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'portfolio', 'about', 'bollywood', 'drill', 'contact', 'lab'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = TRANSLATIONS[language];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <Hero t={t} onCtaClick={() => navigateTo('portfolio')} />
            <div className="py-20 text-center glass border-y border-white/5">
              <h3 className="font-syncopate text-2xl mb-4 tracking-widest opacity-50">TRUSTED BY</h3>
              <div className="flex flex-wrap justify-center gap-12 items-center opacity-30 grayscale hover:grayscale-0 transition-all">
                <span className="text-3xl font-bold">SONY MUSIC</span>
                <span className="text-3xl font-bold">NETFLIX</span>
                <span className="text-3xl font-bold">WARNER BROS</span>
                <span className="text-3xl font-bold">T-SERIES</span>
              </div>
            </div>
            <About t={t} />
          </div>
        );
      case 'portfolio':
        return <div className="animate-in fade-in duration-700"><Portfolio t={t} /></div>;
      case 'bollywood':
        return <div className="animate-in slide-in-from-bottom duration-700"><GenreGrid title={t.nav.bollywood} items={BOLLYWOOD_ITEMS} /></div>;
      case 'drill':
        return <div className="animate-in slide-in-from-bottom duration-700"><GenreGrid title={t.nav.drill} items={DRILL_ITEMS} /></div>;
      case 'about':
        return <div className="animate-in fade-in duration-700"><About t={t} /></div>;
      case 'lab':
        return <div className="animate-in zoom-in duration-700"><AIEditor t={t} /></div>;
      case 'contact':
        return <div className="animate-in fade-in duration-700"><Contact t={t} /></div>;
      default:
        return <Hero t={t} onCtaClick={() => navigateTo('portfolio')} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={navigateTo} 
      language={language} 
      setLanguage={setLanguage}
      theme={theme}
      toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
