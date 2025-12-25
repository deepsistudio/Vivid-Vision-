
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: string, pass: string) => void;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(user, pass);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-syne font-extrabold tracking-tighter uppercase mb-2">RESTRICTED<span className="text-cyan-500">.</span></h2>
          <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Admin Access Only</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Identity</label>
            <input 
              type="text" 
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-[#111] border border-white/5 rounded-xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all"
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Keyphrase</label>
            <input 
              type="password" 
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-[#111] border border-white/5 rounded-xl px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-[10px] font-bold text-center tracking-widest uppercase">{error}</p>}
          
          <button 
            type="submit"
            className="w-full py-5 bg-cyan-500 text-black font-bold text-[10px] tracking-[0.4em] uppercase rounded-xl hover:bg-white transition-all active:scale-95"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-12 text-center">
           <a href="/" className="text-[9px] font-bold tracking-[0.2em] text-white/20 hover:text-white uppercase transition-colors">Return to Reality</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
