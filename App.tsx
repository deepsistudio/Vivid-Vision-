
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Page, Language, Theme, TranslationSet } from './types';
import { TRANSLATIONS } from './constants';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import GenreGrid from './components/GenreGrid';
import Contact from './components/Contact';
import AIEditor from './components/AIEditor';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip, Observer, TextPlugin);
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vv_lang');
    return (saved === 'en' || saved === 'pb' || saved === 'hi') ? saved as Language : 'en';
  });

  // Content state loaded from localStorage or fallback to constants
  const [content, setContent] = useState<Record<Language, TranslationSet>>(() => {
    const saved = localStorage.getItem('vv_dynamic_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return TRANSLATIONS;
      }
    }
    return TRANSLATIONS;
  });

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('vv_admin_auth') === 'true';
  });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (typeof language === 'string') {
      localStorage.setItem('vv_lang', language);
    }
  }, [language]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'portfolio', 'about', 'bollywood', 'drill', 'contact', 'lab', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(".page-content", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    );
    ScrollTrigger.refresh();
  }, [currentPage]);

  const handleLogin = (user: string, pass: string) => {
    if (user === 'Admin' && pass === 'Admin@123') {
      setIsLoggedIn(true);
      sessionStorage.setItem('vv_admin_auth', 'true');
      navigateTo('admin');
      setLoginError('');
    } else {
      setLoginError('Invalid Credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('vv_admin_auth');
    navigateTo('home');
  };

  const handleSaveContent = (newContent: Record<Language, TranslationSet>) => {
    setContent(newContent);
    localStorage.setItem('vv_dynamic_content', JSON.stringify(newContent));
    alert('Vision Synchronized Successfully');
  };

  const handlePreview = (newContent: Record<Language, TranslationSet>) => {
    setContent(newContent);
    navigateTo('home');
    alert('Previewing Unsynthesized Vision. Publish to save permanently.');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const t = content[language];

  // Specific admin route check
  if (currentPage === 'admin') {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} error={loginError} />;
    }
    return <AdminDashboard content={content} onSave={handleSaveContent} onPreview={handlePreview} onLogout={handleLogout} />;
  }

  const renderPage = () => {
    return (
      <div className="page-content">
        {(() => {
          switch (currentPage) {
            case 'home':
              return (
                <>
                  <Hero t={t} onCtaClick={() => navigateTo('portfolio')} />
                  <div className="py-40 bg-black border-y border-white/5 overflow-hidden">
                     <div className="max-w-[1800px] mx-auto px-12 flex flex-col md:flex-row items-center justify-between gap-12 grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                        <span className="text-xl md:text-3xl font-syne font-extrabold tracking-tighter">SONY MUSIC</span>
                        <span className="text-xl md:text-3xl font-syne font-extrabold tracking-tighter">T-SERIES</span>
                        <span className="text-xl md:text-3xl font-syne font-extrabold tracking-tighter">NETFLIX</span>
                        <span className="text-xl md:text-3xl font-syne font-extrabold tracking-tighter">WARNER MUSIC</span>
                     </div>
                  </div>
                  <About t={t} />
                  <Portfolio t={t} />
                </>
              );
            case 'portfolio':
              return <Portfolio t={t} />;
            case 'about':
              return <About t={t} />;
            case 'lab':
              return <AIEditor t={t} />;
            case 'contact':
              return <Contact t={t} />;
            default:
              return <Hero t={t} onCtaClick={() => navigateTo('portfolio')} />;
          }
        })()}
      </div>
    );
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={navigateTo} 
      language={language} 
      setLanguage={setLanguage}
      theme="dark"
      toggleTheme={() => {}}
    >
      {renderPage()}
      <div className="fixed bottom-6 left-6 z-[200]">
        <button 
          onClick={() => navigateTo('admin')}
          className="text-[8px] font-bold tracking-[0.4em] text-white/10 hover:text-cyan-500 transition-colors uppercase"
        >
          {isLoggedIn ? 'Dashboard' : 'Admin Login'}
        </button>
      </div>
    </Layout>
  );
};

export default App;
