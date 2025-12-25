
import React, { useState, useRef } from 'react';
import { TranslationSet, Language } from '../types';
import { generateImageWithGemini } from '../services/geminiService';

interface AdminDashboardProps {
  content: Record<Language, TranslationSet>;
  onSave: (newContent: Record<Language, TranslationSet>) => void;
  onPreview: (newContent: Record<Language, TranslationSet>) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, onSave, onPreview, onLogout }) => {
  const [localContent, setLocalContent] = useState(content);
  const [activeLang, setActiveLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'hero' | 'portfolio' | 'about' | 'lab' | 'nav'>('hero');
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingUploadPath, setPendingUploadPath] = useState<{section: string, field: string, id?: number} | null>(null);

  const updateField = (section: keyof TranslationSet, field: string, value: any) => {
    const updated = { ...localContent };
    // @ts-ignore
    updated[activeLang][section][field] = value;
    setLocalContent(updated);
  };

  const handlePortfolioUpdate = (id: number, field: string, value: string) => {
    const updated = { ...localContent };
    const items = [...updated[activeLang].portfolio.items];
    const index = items.findIndex(i => i.id === id);
    if (index > -1) {
      // @ts-ignore
      items[index][field] = value;
      updated[activeLang].portfolio.items = items;
      setLocalContent(updated);
    }
  };

  const addPortfolioItem = () => {
    const updated = { ...localContent };
    const currentItems = updated[activeLang].portfolio.items;
    const newId = currentItems.length > 0 ? Math.max(...currentItems.map(i => i.id)) + 1 : 1;
    
    const newItem = {
      id: newId,
      title: 'New Masterpiece',
      category: 'Cinematic',
      img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
      size: 'medium'
    };

    updated[activeLang].portfolio.items = [...currentItems, newItem];
    setLocalContent(updated);
  };

  const removePortfolioItem = (id: number) => {
    if (!window.confirm("Abort this project record?")) return;
    const updated = { ...localContent };
    updated[activeLang].portfolio.items = updated[activeLang].portfolio.items.filter(i => i.id !== id);
    setLocalContent(updated);
  };

  const handleAiGenerate = async (section: keyof TranslationSet, field: string, id?: number) => {
    const userPrompt = window.prompt("Director's Command: Describe the visual to synthesize:");
    if (!userPrompt) return;

    const identifier = `${section}-${field}-${id || ''}`;
    setAiLoading(identifier);
    
    const result = await generateImageWithGemini(userPrompt);
    if (result) {
      if (id !== undefined) {
        handlePortfolioUpdate(id, field, result);
      } else {
        updateField(section, field, result);
      }
    } else {
      alert("Neural synthesis failed. Check uplink.");
    }
    setAiLoading(null);
  };

  const triggerUpload = (section: string, field: string, id?: number) => {
    setPendingUploadPath({ section, field, id });
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && pendingUploadPath) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (pendingUploadPath.id !== undefined) {
          handlePortfolioUpdate(pendingUploadPath.id, pendingUploadPath.field, base64);
        } else {
          updateField(pendingUploadPath.section as any, pendingUploadPath.field, base64);
        }
        setPendingUploadPath(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex font-inter">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
      
      {/* High-Tech Sidebar Navigation */}
      <aside className="w-80 border-r border-white/5 bg-[#050505] flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <h2 className="text-xl font-syne font-extrabold tracking-tighter uppercase">VIVID <span className="text-cyan-500">CORE</span></h2>
          </div>
          <p className="text-[8px] font-bold tracking-[0.5em] text-white/20 uppercase">Central Control OS v2.5</p>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {(['hero', 'portfolio', 'about', 'lab', 'nav'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-bold tracking-[0.4em] uppercase transition-all flex items-center justify-between group
                ${activeTab === tab ? 'bg-white/5 text-cyan-400 border border-white/10' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
            >
              <span>{tab}</span>
              <div className={`w-1 h-1 rounded-full transition-all ${activeTab === tab ? 'bg-cyan-500 scale-150' : 'bg-transparent group-hover:bg-white/20'}`} />
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-3">Active Terminal</p>
            <div className="flex space-x-2">
              {(['en', 'pb', 'hi'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`flex-grow py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${activeLang === l ? 'bg-cyan-500 text-black' : 'bg-black/40 text-white/40 border border-white/5'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full py-4 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl text-[9px] font-bold tracking-[0.3em] uppercase transition-all"
          >
            Terminal Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-80 flex-grow p-12 lg:p-20 overflow-y-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 uppercase">System Module</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            <h1 className="text-6xl font-syne font-extrabold tracking-tighter uppercase leading-none">
              {activeTab}<span className="text-white/10">.EDIT</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onPreview(localContent)}
              className="px-8 py-5 border border-white/20 text-white font-bold text-[10px] tracking-[0.4em] uppercase rounded-full hover:bg-white hover:text-black transition-all"
            >
              Preview Vision
            </button>
            <button 
              onClick={() => onSave(localContent)}
              className="px-10 py-5 bg-cyan-500 text-black font-bold text-[10px] tracking-[0.5em] uppercase rounded-full hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.2)]"
            >
              Deploy Reality
            </button>
          </div>
        </header>

        <div className="max-w-5xl">
          {/* Nav Tab */}
          {activeTab === 'nav' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {Object.entries(localContent[activeLang].nav).map(([key, value]) => (
                <div key={key} className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
                  <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">{key}</label>
                  <input 
                    type="text" 
                    value={value}
                    onChange={(e) => updateField('nav', key, e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="group relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={localContent[activeLang].hero.image} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Hero" />
                <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/80">
                  <button onClick={() => triggerUpload('hero', 'image')} className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all">Upload Local</button>
                  <button onClick={() => handleAiGenerate('hero', 'image')} className="px-8 py-3 bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all">
                    {aiLoading === 'hero-image-' ? 'Synthesizing...' : 'Neural Generate'}
                  </button>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-2 rounded-lg border border-white/10">
                   <span className="text-[8px] font-bold tracking-widest text-cyan-400 uppercase">Primary Banner</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
                  <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Title Override</label>
                  <input 
                    type="text" 
                    value={localContent[activeLang].hero.title}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-2xl font-syne font-extrabold focus:border-cyan-500 outline-none"
                  />
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
                  <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Cinematic Brief</label>
                  <textarea 
                    value={localContent[activeLang].hero.subtitle}
                    onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm leading-relaxed focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center mb-12">
                <p className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">Sequence Count: {localContent[activeLang].portfolio.items.length}</p>
                <button 
                  onClick={addPortfolioItem}
                  className="px-8 py-3 border border-cyan-500/50 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-cyan-500 hover:text-black transition-all"
                >
                  + Init New Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {localContent[activeLang].portfolio.items.map((project) => (
                  <div key={project.id} className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden group">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="md:col-span-5 relative aspect-video md:aspect-auto bg-black border-r border-white/5 overflow-hidden group">
                        <img src={project.img} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Project" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/80">
                          <button onClick={() => triggerUpload('portfolio', 'img', project.id)} className="w-2/3 py-2 bg-white text-black text-[8px] font-bold uppercase tracking-widest rounded-full">Source Local</button>
                          <button onClick={() => handleAiGenerate('portfolio', 'img', project.id)} className="w-2/3 py-2 bg-cyan-500 text-black text-[8px] font-bold uppercase tracking-widest rounded-full">
                            {aiLoading === `portfolio-img-${project.id}` ? '...' : 'Neural Synthesis'}
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-7 p-10 space-y-6">
                        <div className="flex justify-between items-start">
                           <span className="text-[8px] font-bold text-cyan-500 uppercase tracking-[0.5em]">Project 0{project.id}</span>
                           <button 
                            onClick={() => removePortfolioItem(project.id)}
                            className="text-[8px] font-bold text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-colors"
                           >
                            Abort Record
                           </button>
                        </div>
                        <input 
                          type="text" 
                          value={project.title}
                          placeholder="Project Title"
                          onChange={(e) => handlePortfolioUpdate(project.id, 'title', e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 py-2 text-xl font-syne font-extrabold focus:border-cyan-500 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Genre</label>
                            <input 
                              type="text" 
                              value={project.category}
                              onChange={(e) => handlePortfolioUpdate(project.id, 'category', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:border-cyan-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Scale</label>
                            <select 
                              value={project.size}
                              onChange={(e) => handlePortfolioUpdate(project.id, 'size', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:border-cyan-500 outline-none appearance-none cursor-pointer"
                            >
                              <option value="small">Small (4:5)</option>
                              <option value="medium">Medium (4:3)</option>
                              <option value="large">Large (16:9)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5">
                  <div className="group relative aspect-[3/4] bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                    <img src={localContent[activeLang].about.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Founder" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/80">
                      <button onClick={() => triggerUpload('about', 'image')} className="px-10 py-3 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded-full">Source Photo</button>
                      <button onClick={() => handleAiGenerate('about', 'image')} className="px-10 py-3 bg-cyan-500 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                         {aiLoading === 'about-image-' ? '...' : 'Neural Manifest'}
                      </button>
                    </div>
                    <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                       <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                       <span className="text-[7px] font-bold tracking-[0.3em] uppercase">Founder Visual</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-7 space-y-8">
                  <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
                    <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Directorial Identity</label>
                    <input 
                      type="text" 
                      value={localContent[activeLang].about.title}
                      onChange={(e) => updateField('about', 'title', e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-2xl font-syne font-extrabold focus:border-cyan-500 outline-none"
                    />
                  </div>
                  <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
                    <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Manifesto</label>
                    <textarea 
                      value={localContent[activeLang].about.vision}
                      onChange={(e) => updateField('about', 'vision', e.target.value)}
                      rows={6}
                      className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm italic leading-relaxed focus:border-cyan-500 outline-none resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(localContent[activeLang].about.stats).map(([key, val]) => (
                      <div key={key} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 space-y-3">
                        <label className="block text-[7px] font-bold text-white/20 uppercase tracking-widest">{key}</label>
                        <input 
                          type="text" 
                          value={val}
                          onChange={(e) => {
                            const stats = {...localContent[activeLang].about.stats, [key]: e.target.value};
                            updateField('about', 'stats', stats);
                          }}
                          className="w-full bg-transparent text-xl font-syne font-extrabold text-cyan-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Lab Tab */}
          {activeTab === 'lab' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="bg-white/5 border border-cyan-500/20 p-8 rounded-3xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                       <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                       </svg>
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400">Neural Interface Parameters</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="bg-black/40 p-8 rounded-2xl border border-white/5 space-y-4">
                      <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Lab Portal Name</label>
                      <input 
                        type="text" 
                        value={localContent[activeLang].lab.title}
                        onChange={(e) => updateField('lab', 'title', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-xl font-syne font-extrabold focus:border-cyan-500 outline-none"
                      />
                    </div>
                    <div className="bg-black/40 p-8 rounded-2xl border border-white/5 space-y-4">
                      <label className="text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]">Operational Brief</label>
                      <textarea 
                        value={localContent[activeLang].lab.description}
                        onChange={(e) => updateField('lab', 'description', e.target.value)}
                        rows={5}
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm leading-relaxed focus:border-cyan-500 outline-none resize-none"
                      />
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Visual Glitch/Scanner Decorations */}
      <div className="fixed top-0 right-0 w-1 bg-cyan-500/20 h-full pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-cyan-500/10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none z-[100]">
         <div className="text-[7px] font-bold text-white/10 tracking-[1em] uppercase vertical-text">OPERATIONAL_STABILITY_100%</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
