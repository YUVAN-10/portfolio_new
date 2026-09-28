import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { Volume2, VolumeX, Terminal, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ hackerMode, setHackerMode, zeroGravity, setZeroGravity, activeSection, setActiveSection }) {
  const [isMuted, setIsMuted] = useState(sound.muted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'internship', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];



  const handleNavClick = (id) => {
    sound.playClick();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 max-w-7xl mx-auto pointer-events-auto flex justify-center">
      <nav className="apple-glass-panel rounded-full px-5 py-2.5 flex items-center justify-between w-full max-w-5xl shadow-[0px_20px_50px_rgba(120,130,180,0.12)] border border-white/80">
        
        {/* YS Circular Monogram Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-cyan-400 p-[2px] animate-breathing-glow shadow-md">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="font-space font-extrabold text-xs text-blue-600 group-hover:scale-110 transition-transform">YS</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-space font-bold text-xs tracking-wider text-gray-900 group-hover:text-blue-600 transition-colors">
              YUVANSHANKAR
            </div>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100/60 p-1 rounded-full border border-gray-200/60">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'internship' && activeSection === 'devops');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-space transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md font-bold scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Utility Audio & Mode Controls */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            title={isMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
            className={`p-2 rounded-full transition-all border ${
              isMuted
                ? 'bg-gray-100 border-gray-300 text-gray-400 hover:text-gray-700'
                : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-gray-100 text-gray-700 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-4 right-4 apple-glass-panel rounded-2xl p-4 flex flex-col gap-2 border border-white/80 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'internship' && activeSection === 'devops');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2.5 rounded-xl text-left text-xs font-space flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-blue-500 font-mono">↗</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
