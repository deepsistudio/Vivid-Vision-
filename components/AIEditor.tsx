
import React, { useState, useRef, useLayoutEffect } from 'react';
import { TranslationSet } from '../types';
import { editImageWithGemini } from '../services/geminiService';
import { gsap } from 'gsap';

interface AIEditorProps {
  t: TranslationSet;
}

const AIEditor: React.FC<AIEditorProps> = ({ t }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lab-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsProcessing(true);
    const result = await editImageWithGemini(image, prompt);
    if (result) {
      setResultImage(result);
    } else {
      alert("System overload. Please try a different creative direction.");
    }
    setIsProcessing(false);
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#050505] text-white py-40 px-6 overflow-hidden">
      {/* Immersive Background Element - Conceptual Director Vibe */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <img 
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop" 
          alt="Vision Lab" 
          className="w-full h-full object-cover grayscale"
         />
         <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 lab-content">
        <div className="mb-24 text-center">
          <h4 className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 uppercase mb-6">{t.lab.title}</h4>
          <h2 className="text-6xl md:text-8xl font-syne font-extrabold uppercase tracking-tighter leading-[0.85] mb-8">
            TRANSFORM<br/><span className="text-white/10">THE REALITY.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto font-medium tracking-wide">
            {t.lab.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Source Panel */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">01 Input Source</span>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-[9px] font-bold tracking-[0.2em] text-cyan-400 hover:text-white transition-colors uppercase"
              >
                Change Frame
              </button>
            </div>
            
            <div 
              className="flex-grow min-h-[400px] bg-black rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group cursor-pointer"
              onClick={() => !image && fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Source" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="text-center space-y-4 opacity-20 group-hover:opacity-100 transition-opacity">
                   <div className="text-4xl">⊕</div>
                   <p className="text-[10px] font-bold tracking-widest uppercase">{t.lab.upload}</p>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <div className="mt-8 space-y-4">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.lab.placeholder}
                rows={2}
                className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-xs font-medium tracking-wide text-white focus:border-cyan-500 outline-none transition-all resize-none"
              />
              <button 
                onClick={handleEdit}
                disabled={!image || !prompt || isProcessing}
                className={`w-full py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${isProcessing ? 'bg-white/5 text-white/20' : 'bg-cyan-500 text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
              >
                {isProcessing ? 'Rewriting Reality...' : t.lab.edit}
              </button>
            </div>
          </div>

          {/* Outcome Panel */}
          <div className="bg-black border border-white/5 rounded-2xl p-8 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">02 Vision Result</span>
              {resultImage && (
                <a 
                  href={resultImage} 
                  download="vivid-vision-lab.png"
                  className="text-[9px] font-bold tracking-[0.2em] text-cyan-400 hover:text-white transition-colors uppercase"
                >
                  Save Result
                </a>
              )}
            </div>

            <div className="flex-grow min-h-[400px] bg-[#080808] rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
              {isProcessing ? (
                <div className="text-center space-y-6">
                  <div className="w-8 h-8 border-[1px] border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[9px] font-bold tracking-[0.5em] text-cyan-500 animate-pulse uppercase">Dreaming in Cinematic...</p>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="AI Result" className="w-full h-full object-cover animate-fade-in" />
              ) : (
                <div className="text-center opacity-10">
                   <p className="text-[10px] font-bold tracking-[0.2em] uppercase italic">Awaiting Directorial Input</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-xl">
               <p className="text-[9px] font-medium leading-loose text-white/30 tracking-widest uppercase">
                 Note: The Vision Lab uses Gemini 2.5 generative engine to augment cinematic frames. Results may vary based on directorial descriptive input.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEditor;
