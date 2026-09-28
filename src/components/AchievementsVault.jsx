import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { Award, Trophy, Lock, Unlock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AchievementsVault() {
  const [unlocked, setUnlocked] = useState(true);

  const achievements = [
    {
      title: 'BRICS Youth Council Entrepreneurship Pre-Consultation',
      location: 'IISc Bangalore (Indian Institute of Science)',
      category: 'International Summit',
      desc: 'Selected participant in the prestigious BRICS Youth Council Entrepreneurship Pre-Consultation held at IISc Bangalore.',
      badge: 'IISc Bangalore'
    },
    {
      title: 'U&ME Hackathon CIT',
      location: 'Coimbatore Institute of Technology',
      category: 'Competitive Hackathon',
      desc: 'Participated in competitive U&ME Hackathon building innovative technology solutions within time constraints.',
      badge: 'CIT Hackathon'
    }
  ];

  const handleToggleVault = () => {
    sound.playAchievement();
    setUnlocked(!unlocked);
  };

  return (
    <section id="achievements" className="py-24 relative z-10 px-4 bg-white/70">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            ACHIEVEMENTS <span className="text-gradient-primary">& CERTIFICATIONS</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-inter">
            Premium floating achievement gallery featuring certified credentials and competitive summits.
          </p>
        </div>

        {/* Featured Azure AI Certificate Glass Vault Card */}
        <div className="apple-glass-panel p-8 sm:p-10 rounded-3xl border border-gray-200/80 mb-12 relative shadow-[0_30px_80px_rgba(120,130,180,0.12)] bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div
                onClick={handleToggleVault}
                onMouseEnter={() => sound.playHover()}
                className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-amber-400 p-1 cursor-pointer shadow-lg transition-transform hover:scale-105 group"
              >
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center relative">
                  {unlocked ? (
                    <Unlock className="w-12 h-12 text-blue-600 group-hover:rotate-12 transition-transform" />
                  ) : (
                    <Lock className="w-12 h-12 text-gray-400" />
                  )}
                  <span className="text-[10px] font-mono text-blue-600 font-bold mt-2">
                    {unlocked ? 'VAULT UNLOCKED' : 'CLICK TO UNLOCK'}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-bold">
                <Award className="w-4 h-4 text-amber-500" />
                <span>PROFESSIONAL CERTIFICATION</span>
              </div>

              <h3 className="text-3xl font-space font-extrabold text-gray-900">
                Azure AI Engineer Associate
              </h3>

              <div className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                ISSUER: MICROSOFT AZURE • VERIFIED CREDENTIAL
              </div>

              <p className="text-gray-700 font-inter text-sm leading-relaxed">
                Certified competence in designing and implementing AI solutions, natural language processing, computer vision, and cognitive APIs.
              </p>
            </div>

          </div>
        </div>

        {/* Summit & Hackathon Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="apple-glass-card p-6 sm:p-8 rounded-3xl border border-gray-200/80 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-semibold border border-purple-200">
                  {ach.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-semibold border border-blue-200">
                  {ach.badge}
                </span>
              </div>

              <h4 className="text-xl font-space font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {ach.title}
              </h4>

              <p className="text-xs font-mono text-blue-600 font-semibold mb-4">{ach.location}</p>

              <p className="text-sm font-inter text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                {ach.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
