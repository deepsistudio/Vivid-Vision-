
import React, { useState, useRef } from 'react';
import { TranslationSet } from '../types';
import { editImageWithGemini } from '../services/geminiService';

interface AIEditorProps {
  t: TranslationSet;
}

const AIEditor: React.FC<AIEditorProps> = ({ t }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      alert("Failed to process image. Please check your API key or try a different prompt.");
    }
    setIsProcessing(false);
  };

  return (
    <section className="py-20 px-4 bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black font-syncopate mb-6 gradient-text uppercase">
          {t.lab.title}
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          {t.lab.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Editor Area */}
          <div className="glass p-6 rounded-2xl">
            <div className="mb-6 h-[400px] bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-700 hover:border-cyan-500 transition-colors">
              {image ? (
                <img src={image} alt="Original" className="max-w-full max-h-full object-contain" />
              ) : (
                <div 
                  className="text-slate-500 cursor-pointer text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-5xl mb-4">📸</div>
                  <p>{t.lab.upload}</p>
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
            
            <div className="space-y-4">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.lab.placeholder}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
              <button 
                onClick={handleEdit}
                disabled={!image || !prompt || isProcessing}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${isProcessing ? 'bg-slate-700 cursor-wait' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'}`}
              >
                {isProcessing ? 'Processing Vision...' : t.lab.edit}
              </button>
            </div>
          </div>

          {/* Result Area */}
          <div className="glass p-6 rounded-2xl h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              <span>RESULT FRAME</span>
              {resultImage && (
                <a 
                  href={resultImage} 
                  download="vivid-vision-edit.png"
                  className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  DOWNLOAD
                </a>
              )}
            </h3>
            <div className="flex-grow min-h-[400px] bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-cyan-400 animate-pulse">Dreaming...</p>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="AI Edited" className="max-w-full max-h-full object-contain animate-fade-in" />
              ) : (
                <div className="text-slate-600 text-center">
                   <div className="text-5xl mb-4">✨</div>
                   <p>Your creation will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEditor;
