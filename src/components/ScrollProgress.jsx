import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audioSynth';

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);

  const sections = [
    { id: 'hero', name: 'HOME' },
    { id: 'about', name: 'ABOUT' },
    { id: 'journey', name: 'JOURNEY' },
    { id: 'skills', name: 'SKILLS' },
    { id: 'projects', name: 'PROJECTS' },
    { id: 'devops', name: 'DEVOPS' },
    { id: 'internship', name: 'WORK' },
    { id: 'achievements', name: 'VAULT' },
    { id: 'games', name: 'ARCADE' },
    { id: 'contact', name: 'CONTACT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, progress)));
      }

      const scrollPos = window.scrollY + 250;
      sections.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSectionIdx(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSection = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Apple VisionOS Ultra-Minimal Floating Track */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-auto hidden lg:flex">
        {/* Soft Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md pointer-events-none" />

        <div className="apple-glass-panel py-3 px-2 rounded-full border border-white/90 shadow-[0_10px_35px_rgba(37,99,235,0.12)] bg-white/80 flex flex-col items-center relative z-10 transition-all duration-300">
          <div className="flex flex-col gap-3 relative items-center py-1">
            {/* Background Line Track */}
            <div className="absolute top-2 bottom-2 w-0.5 bg-gray-200/80 rounded-full -z-10" />

            {/* Dynamic Active Fill */}
            <div 
              className="absolute top-2 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-cyan-500 rounded-full transition-all duration-300 -z-10 shadow-[0_0_8px_rgba(37,99,235,0.8)]"
              style={{
                height: `${(currentSectionIdx / (sections.length - 1)) * 100}%`
              }}
            />

            {sections.map((sec, idx) => {
              const isActive = currentSectionIdx === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleJumpToSection(sec.id)}
                  onMouseEnter={() => sound.playHover()}
                  aria-label={`Jump to section ${sec.name}`}
                  className={`relative group flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  {/* Active Dot Aura */}
                  {isActive && (
                    <span className="absolute w-3.5 h-3.5 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                  )}

                  {/* Dot Node */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_10px_rgba(37,99,235,0.9)] border border-white'
                        : 'w-2 h-2 bg-gray-300 group-hover:bg-blue-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Minimal Track */}
      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 lg:hidden pointer-events-none">
        <div className="apple-glass-panel py-2 px-1 rounded-full border border-white/90 shadow-md bg-white/80">
          <div className="w-1 h-16 bg-gray-200 rounded-full relative overflow-hidden">
            <div 
              className="w-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full transition-all duration-300"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}


