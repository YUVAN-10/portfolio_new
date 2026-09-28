import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { Briefcase, Database, Layout, ShieldCheck, Flame, CheckCircle2 } from 'lucide-react';

export default function InternshipRoom() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <section id="internship" className="py-24 relative z-10 px-4 bg-white/70 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            PEP SOFTWARE <span className="text-gradient-primary">WORK EXPERIENCE</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-inter">
            Explore hands-on projects, Firebase integration, and admin panels developed during internship at PEP Software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column */}
          <div className="lg:col-span-5 apple-glass-panel p-8 rounded-3xl border border-gray-200/80 flex flex-col justify-between shadow-[0_30px_80px_rgba(120,130,180,0.12)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-md">
                  PEP
                </div>
                <div>
                  <h3 className="text-xl font-space font-bold text-gray-900">PEP Software</h3>
                  <p className="text-xs font-mono text-blue-600 font-semibold">Erode, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold mb-6">
                ROLE: FULL STACK DEVELOPER INTERN (JULY 2026 – PRESENT)
              </div>

              <div className="space-y-4 text-sm font-inter text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p>Developed responsive admin panels and static web applications using modern frontend frameworks.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <p>Worked extensively with Firebase for database management, real-time sync, and user authentication.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p>Assisted senior engineering team in implementing, testing, and debugging application features.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between items-center text-xs font-mono text-gray-500">
              <span>STATUS: ACTIVE INTERNSHIP</span>
              <span className="text-blue-600 font-bold">ERODE, TN</span>
            </div>
          </div>

          {/* Right Column: Interactive White Office Glass Dashboard Simulator */}
          <div className="lg:col-span-7 apple-glass-panel p-8 rounded-3xl border border-gray-200/80 shadow-[0_30px_80px_rgba(120,130,180,0.12)] flex flex-col justify-between">
            
            <div>
              <div className="flex flex-wrap gap-3 pb-6 mb-6 border-b border-gray-200">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('admin');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Layout className="w-4 h-4" />
                  <span>Admin Panel Mockup</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('firebase');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                    activeTab === 'firebase'
                      ? 'bg-amber-500 text-white font-bold shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>Firebase DB Visualizer</span>
                </button>
              </div>

              {activeTab === 'admin' ? (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm font-mono text-xs text-gray-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-blue-600 font-bold">
                    <span>ADMIN DASHBOARD // PEP SOFTWARE</span>
                    <span className="text-emerald-600 font-bold">SYS HEALTH 99.8%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-gray-500 text-[10px]">TOTAL USERS</div>
                      <div className="text-lg font-bold text-gray-900">1,420</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="text-gray-500 text-[10px]">ACTIVE SESSIONS</div>
                      <div className="text-lg font-bold text-purple-700">384</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="text-gray-500 text-[10px]">DB QUERIES</div>
                      <div className="text-lg font-bold text-emerald-700">12.8k</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-700 border border-gray-200">
                    <code>&gt; GET /api/v1/admin/analytics 200 OK (24ms)</code>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 font-mono text-xs text-amber-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 text-amber-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      <span>FIRESTORE REALTIME QUERY</span>
                    </div>
                    <span>COLLECTION: /users</span>
                  </div>

                  <pre className="p-3 bg-gray-950 rounded-xl text-[11px] overflow-x-auto text-emerald-300">
{`db.collection('pep_users').doc('yuvan_intern')
  .set({
    role: 'Full Stack Intern',
    skills: ['React', 'Firebase', 'MERN'],
    status: 'ACTIVE',
    lastDeploy: new Date()
  });`}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-gray-500 flex items-center justify-between">
              <span>WORK ENVIRONMENT: HIGH-SPEED DEVELOPMENT</span>
              <span className="text-blue-600 font-bold">STATUS: APPROVED</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
