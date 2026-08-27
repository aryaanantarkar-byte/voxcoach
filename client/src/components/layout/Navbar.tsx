import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic, ArrowRight, Moon, Sun } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('voxcoach-theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('voxcoach-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Topics', path: '/topics' },
    { name: 'Practice', path: '/practice' },
    { name: 'Report', path: '/results' },
    { name: 'Progress', path: '/progress' },
  ];

  return (
    <header className={`border-b-2 border-black backdrop-blur-md sticky top-0 z-50 ${isDark ? 'bg-[#080d17]/95' : 'bg-[#fff7ec]/95'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#66d9c9] border-2 border-black shadow-[3px_3px_0_#191717] flex items-center justify-center text-black transition-all group-hover:-translate-y-0.5">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <span className={`font-extrabold tracking-tight text-base ${isDark ? 'text-[#cbd5e1]' : 'text-black'}`}>
            Vox<span className="text-[#147f76]">Coach</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs transition-colors py-1 relative ${
                  isActive
                    ? (isDark ? 'text-[#cbd5e1] font-bold' : 'text-black font-bold')
                    : (isDark ? 'text-[#8d9aad] hover:text-[#cbd5e1] font-medium' : 'text-[#665f5b] hover:text-black font-medium')
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#ff7b7b] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center text-black shadow-[3px_3px_0_#191717] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#191717] active:translate-y-0.5 ${isDark ? 'bg-[#ff7b7b]' : 'bg-[#66d9c9]'}`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/topics"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#ffdc60] border-2 border-black text-black text-xs font-bold hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#191717] active:translate-y-0.5 transition-all shadow-[3px_3px_0_#191717]"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
