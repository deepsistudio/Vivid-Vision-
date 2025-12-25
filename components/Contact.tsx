
import React, { useState, useEffect } from 'react';
import { TranslationSet } from '../types';

interface ContactProps {
  t: TranslationSet;
}

const Contact: React.FC<ContactProps> = ({ t }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vv_contact_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setFormData({
            name: String(parsed.name || ''),
            email: String(parsed.email || ''),
            message: String(parsed.message || '')
          });
        }
      }
    } catch (e) {
      console.warn("Failed to load contact data from storage", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicitly create a clean object for serialization to avoid circular references
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch("https://formspree.io/f/deepduhariaofficial@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        localStorage.setItem('vv_contact_data', JSON.stringify(payload));
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        localStorage.setItem('vv_contact_data', JSON.stringify(payload));
        setIsSent(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSent(true);
    }
  };

  return (
    <section className="py-20 px-4 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black font-syncopate mb-4 uppercase">{t.nav.contact}</h2>
          <p className="text-slate-400">Let's start your next production journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <input 
                type="email" 
                name="_replyto"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Brief</label>
            <textarea 
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
              placeholder="Tell us about your vision..."
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest rounded-xl transition-all duration-300 transform active:scale-95"
          >
            {isSent ? 'MESSAGE SENT ✓' : 'SEND MESSAGE'}
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm">
          <div>
            <div className="text-cyan-400 font-bold mb-2 uppercase">Canada Presence</div>
            <p className="text-slate-500">Toronto & Vancouver<br/>Canada</p>
          </div>
          <div>
            <div className="text-cyan-400 font-bold mb-2 uppercase">India HQ</div>
            <p className="text-slate-500">Punjab & Mumbai<br/>India</p>
          </div>
          <div>
            <div className="text-cyan-400 font-bold mb-2 uppercase">Contact Info</div>
            <p className="text-slate-500">
              <a href="mailto:deepduhariaofficial@gmail.com" className="hover:text-cyan-400 transition-colors">deepduhariaofficial@gmail.com</a>
              <br/>
              +91-9914615381
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
