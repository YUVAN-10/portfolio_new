import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { GraduationCap, Code2, Cpu, Cloud, CheckCircle2, Sparkles, BookOpen, Target } from 'lucide-react';

export default function AboutMission() {
  const [activeTab, setActiveTab] = useState(0);

  const cards = [
    {
      title: 'Mission & Vision',
      subtitle: 'Digital Excellence',
      icon: Target,
      content:
        "I don't just build websites. I build complete digital experiences with scalable architecture, elegant design systems, and seamless user experiences.",
      highlights: ['Scalable Architecture', 'User-Centric Design', 'Clean Code Engineering']
    },
    {
      title: 'Education Journey',
      subtitle: 'Kongu Engineering College',
      icon: GraduationCap,
      content:
        'Pursuing B.E. in Computer Science and Engineering at Kongu Engineering College (2023–2027) with a cumulative CGPA of 7.42. Strong grounding in algorithms and web technology.',
      highlights: ['Degree: B.E. CSE', 'Duration: 2023 – 2027', 'Current CGPA: 7.42']
    },
    {
      title: 'Tech Philosophy',
      subtitle: 'Full Stack & Cloud',
      icon: Cpu,
      content:
        'Combining the agility of MERN Stack and Firebase with the reliability of DevOps container pipelines (Docker & Kubernetes) and Cloud infrastructure.',
      highlights: ['MERN Stack & Firebase', 'DevOps & CI/CD Pipelines', 'Cloud & AI Explorations']
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 px-4 bg-white/60 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            ABOUT <span className="text-gradient-primary">YUVANSHANKAR S</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-inter">
            Discover the technical foundation, academic journey, and engineering philosophy behind Mission Yuvanshankar.
          </p>
        </div>

        {/* Floating Glass Editorial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Card Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-6 rounded-3xl text-left transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-white border-blue-500 shadow-[0_20px_50px_rgba(37,99,235,0.14)] scale-[1.02]'
                      : 'apple-glass-card border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-space font-bold text-base text-gray-900">{card.title}</h4>
                      <p className="text-xs font-mono text-gray-500">{card.subtitle}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Card Content Showcase */}
          <div className="lg:col-span-7 apple-glass-panel p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-[0_30px_80px_rgba(120,130,180,0.12)] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider">
                  CHAPTER 0{activeTab + 1} // {cards[activeTab].subtitle}
                </span>
                <span className="text-xs font-mono text-gray-400">YS-EDITORIAL</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-space font-bold text-gray-900">
                {cards[activeTab].title}
              </h3>

              <blockquote className="text-gray-700 font-inter text-base sm:text-lg leading-relaxed italic border-l-4 border-blue-600 pl-4 bg-blue-50/50 py-3 rounded-r-xl">
                "{cards[activeTab].content}"
              </blockquote>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-2">KEY HIGHLIGHTS:</span>
                <div className="flex flex-wrap gap-2">
                  {cards[activeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-xs font-mono text-gray-500">
              <span>LOCATION: ERODE, TN, INDIA</span>
              <span className="text-blue-600 font-bold">STATUS: AVAILABLE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
