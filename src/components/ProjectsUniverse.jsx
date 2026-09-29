import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { Rocket, Sparkles, ExternalLink, GitBranch, DollarSign, Stethoscope, Cpu, ArrowRight, Layers, Database, ShieldCheck, Server, Laptop, Smartphone, FileText, CheckCircle2, Code2, X, Terminal, Workflow, Globe } from 'lucide-react';

export default function ProjectsUniverse() {
  const [activeCaseStudyModal, setActiveCaseStudyModal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const projects = [
    {
      id: 'expense-tracker',
      name: 'Expense Tracker',
      headerLabel: 'PROJECT CASE STUDY',
      ctaLabel: 'Explore Expense Tracker Experience ↗',
      theme: 'Full-Stack MERN Architecture',
      date: 'November 2025',
      bgColor: '#F4F7FF',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind'],
      icon: DollarSign,
      summary: 'Full-stack MERN expense tracking application with JWT authentication, budget analytics, and financial reporting.',
      problemSolved: 'Managing personal finances across multiple categories often suffers from fragmented data, lack of real-time budgeting feedback, and security risks. Expense Tracker provides an encrypted, centralized ledger with dynamic visual charts.',
      features: [
        'Secure JWT Authentication & Session Token Storage',
        'Full CRUD Transaction Management with Category Filtering',
        'Interactive Monthly Budget Analytics & Visual Spend Breakdown',
        'REST API Architecture with Express & MongoDB Aggregations'
      ],
      techStack: [
        'Frontend: React 18, Tailwind CSS, Lucide Icons',
        'Backend: Node.js, Express.js REST Controllers',
        'Database: MongoDB Atlas with Mongoose Schemas',
        'Security: bcrypt password hashing & JWT bearer tokens'
      ],
      databaseFlow: 'Client Request -> Express Route Middleware -> JWT Verification -> Mongoose Aggregation Pipeline -> MongoDB Atlas -> Formatted JSON Response',
      apiFlow: 'POST /api/auth/login → GET /api/expenses (Bearer Token) → POST /api/expenses/create → DELETE /api/expenses/:id',
      whatILearned: 'Engineered robust JWT authentication middleware, optimized MongoDB aggregate queries for real-time reporting, and built smooth client state management with React.',
      mockupScreens: [
        { title: 'Financial Analytics Dashboard', badge: 'Main Overview' },
        { title: 'Income & Expense Category Manager', badge: 'Transaction Portal' },
        { title: 'Monthly Budget Projection Model', badge: 'Insights Engine' }
      ]
    },
    {
      id: 'health-insurance',
      name: 'Health Insurance Premium Predictor',
      headerLabel: 'PROJECT CASE STUDY',
      ctaLabel: 'Explore Prediction System ↗',
      theme: 'Medical AI Predictive System',
      date: 'March 2025',
      bgColor: '#FFFBF4',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'BMI Analytics Engine', 'UI/UX'],
      icon: Stethoscope,
      summary: 'Smart medical application that predicts health insurance premium rates based on body metrics and lifestyle risk factors.',
      problemSolved: 'Insurance policyholders struggle to understand how age, BMI, smoking habits, and pre-existing medical conditions impact premium costs. This interactive system calculates accurate prediction metrics instantly.',
      features: [
        'Real-time BMI Index Calculation Engine',
        'Dynamic Lifestyle & Health Risk Scoring System',
        'Interactive Visual Premium Prediction Gauges',
        'Responsive Medical Glass UI Architecture'
      ],
      techStack: [
        'Core Logic: Vanilla JavaScript ES6 Engine',
        'UI Framework: HTML5 & Custom CSS Glassmorphism',
        'Analytics: Predictive Cost Algorithm Formula',
        'Design System: Apple Health Inspired Palette'
      ],
      databaseFlow: 'User Inputs (Age, BMI, Habits) -> JS Logic Calculation -> Health Risk Coefficient -> Dynamic Premium Matrix -> Visual Gauge Rendering',
      apiFlow: 'Input Change Event → Calculate BMI() → Calculate RiskFactor() → Render Dynamic Cost Matrix',
      whatILearned: 'Implemented complex client-side mathematical algorithms, responsive glass UI systems, and intuitive health metric visualization.',
      mockupScreens: [
        { title: 'Medical Risk Input Suite', badge: 'Health Metrics' },
        { title: 'Dynamic Premium Estimation Gauge', badge: 'Cost Analytics' },
        { title: 'Lifestyle Factor Analysis View', badge: 'Risk Profiler' }
      ]
    },
    {
      id: 'posture-correction',
      name: 'Posture Correction System',
      headerLabel: 'PROJECT CASE STUDY',
      ctaLabel: 'Explore IoT Device Experience ↗',
      theme: 'IoT Smart Hardware Device',
      date: 'March 2025',
      bgColor: '#F2FCF7',
      tech: ['ESP32 Microcontroller', 'MPU6050 Gyroscope', 'Arduino C++', 'Sensors'],
      icon: Cpu,
      summary: 'Wearable IoT hardware device with real-time posture inclination detection and instant automated alert triggers.',
      problemSolved: 'Poor posture during long desk hours causes chronic spinal stress. This wearable IoT device continuously measures spinal angle inclinations and provides immediate feedback to form healthy ergonomic habits.',
      features: [
        'MPU6050 6-Axis Gyroscope & Accelerometer Calibration',
        'Instant Piezoelectric Buzzer Alert Trigger',
        'Low-Power Microcontroller Hardware Firmware'
      ],
      techStack: [
        'Hardware Core: ESP32 WiFi/BLE Board',
        'Sensors: MPU6050 Accelerometer / Gyroscope',
        'Firmware: Arduino C++ Sensor Polling Loops',
        'Power Management: Deep Sleep Optimization'
      ],
      databaseFlow: 'MPU6050 Raw Gyro Stream -> ESP32 Complementary Filter -> Inclination Angle Check -> Threshold Comparison -> Alert Pin Trigger',
      apiFlow: 'Loop (Every 50ms) → Read MPU6050 () → Calculate Pitch/Roll → If Angle > 15° → Trigger Alarm',
      whatILearned: 'Mastered hardware-software integration with ESP32, sensor data filtering algorithms (Complementary & Kalman), and real-time microcontroller state loops.',
      mockupScreens: [
        { title: 'ESP32 Hardware Circuit Diagram', badge: 'Schematic' },
        { title: 'Gyroscope Angle Stream Terminal', badge: 'Live Telemetry' },
        { title: 'Ergonomic Calibration Suite', badge: 'Threshold Config' }
      ]
    },
    {
      id: 'rmbf-admin',
      name: 'RMBF Rotary Club Admin Panel',
      headerLabel: 'PRODUCTION CLIENT ADMIN PANEL',
      ctaLabel: 'Visit Live Admin Panel ↗',
      liveUrl: 'https://rmbf-admin.web.app/',
      theme: 'Rotary Club Enterprise Dashboard',
      date: 'February 2026',
      bgColor: '#FDF5F8',
      tech: ['React.js', 'Firebase Firestore', 'Firebase Hosting', 'Tailwind CSS'],
      icon: Server,
      summary: 'Administrative management system engineered for RMBF Rotary Club with real-time member verifications, Rotary events moderation, and Firebase cloud hosting.',
      problemSolved: 'Managing high-volume Rotary Club member directories, event registrations, and media verifications manually leads to administrative delays. This portal provides real-time Firestore sync and role-based moderation.',
      features: [
        'Real-Time Member Verification & Directory Management',
        'Rotary Club Events & Registration Moderation Portal',
        'Firebase Firestore Real-time Listeners & Security Rules',
        'Fast Production Deployment on Firebase Hosting'
      ],
      techStack: [
        'Frontend: React 18, Vite, Tailwind CSS',
        'Backend & DB: Firebase Firestore & Authentication',
        'Hosting & CDN: Firebase Hosting Deployment'
      ],
      databaseFlow: 'Rotary Admin Portal -> Firebase Auth Token -> Firestore Security Rules -> Real-time Document Listener -> Instant UI Update',
      apiFlow: 'GET /rmbf-members (Firestore Snapshot) → UPDATE /member-status → DEPLOY Firebase Hosting',
      whatILearned: 'Engineered production client admin panel with Firebase Firestore real-time sync, role-based security rules, and seamless Firebase Hosting CI/CD deployment.',
      mockupScreens: [
        { title: 'RMBF Rotary Admin Control Center', badge: 'Rotary Portal' },
        { title: 'Member Verification & Moderation', badge: 'Firestore Sync' },
        { title: 'Firebase Hosting Production Telemetry', badge: 'Firebase' }
      ]
    },
    {
      id: 'a1-and-dal',
      name: 'A1anddal Commercial Website',
      headerLabel: 'CLIENT STATIC WEBSITE',
      ctaLabel: 'Visit Live Website ↗',
      liveUrl: 'https://a1anddal.com/',
      theme: 'Static Web Design & SEO',
      date: 'Aug 2026',
      bgColor: '#F5FAF8',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid', 'SEO'],
      icon: Globe,
      summary: 'Designed and developed a modern, high-performance commercial static website for A1anddal featuring responsive layouts, fast asset delivery, and SEO optimization.',
      problemSolved: 'Delivering a clean, professional web showcase with instant load times, seamless cross-device mobile responsiveness, and search engine discoverability.',
      features: [
        'Modern Responsive UI Architecture & Grid System',
        'Search Engine Optimization (SEO) & Semantic Markup',
        'Fast Loading Speeds & Cross-Browser Compatibility'
      ],
      techStack: [
        'Core Engine: HTML5, CSS3, ES6+ JavaScript',
        'Design: Custom Responsive Layout, Glassmorphism, Micro-interactions',
        'Optimization: OpenGraph Cards, Meta Tags & Fast Asset Loading'
      ],
      databaseFlow: 'Static Asset CDN -> Browser HTTP GET -> Fast DOM Render (0ms Server Delay)',
      apiFlow: 'Client Browser → HTTP GET / → HTML5 DOM Parse → Render CSS/JS Assets',
      whatILearned: 'Mastered commercial website design, responsive grid breakpoints, SEO optimization, and browser performance auditing.',
      mockupScreens: [
        { title: 'A1anddal Homepage Showcase', badge: 'Live Website' },
        { title: 'Responsive Mobile Layout', badge: 'Mobile Grid' },
        { title: 'SEO & Performance Suite', badge: 'Lighthouse' }
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            FEATURED <span className="text-gradient-primary">ENGINEERING CASE STUDIES</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-inter">
            Deep dive into project architecture, technical problem solving, database schemas, and engineering key takeaways.
          </p>
        </div>

        {/* Apple Product Case Study Cards List */}
        <div className="space-y-12">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className="apple-glass-panel rounded-[36px] p-6 sm:p-10 border border-gray-200/90 shadow-[0_30px_80px_rgba(120,130,180,0.12)] relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_45px_100px_rgba(37,99,235,0.18)] group"
                style={{ backgroundColor: proj.bgColor }}
              >
                {/* Background Subtle Gradient Mesh Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-blue-100/30 pointer-events-none z-0" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                  {/* Left Column: Case Study Metadata & Descriptions */}
                  <div className="lg:col-span-6 space-y-5">

                    {/* Header Label Pill */}
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-white/90 text-[11px] font-mono font-bold text-blue-600 border border-blue-200/80 shadow-sm uppercase tracking-wider">
                        {proj.headerLabel} • {proj.theme}
                      </span>
                      <span className="text-xs font-mono text-gray-500 font-semibold">{proj.date}</span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-2xl sm:text-4xl font-space font-extrabold text-gray-900 tracking-tight">
                      {proj.name}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-sm sm:text-base font-inter leading-relaxed">
                      {proj.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-xl bg-white/95 border border-gray-200 text-xs font-mono text-gray-800 font-semibold shadow-xs">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: Primary Liquid Glass Case Study & Secondary Architecture */}
                    <div className="flex flex-wrap gap-3 pt-3">
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          onMouseEnter={() => sound.playHover()}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-space font-bold text-xs sm:text-sm tracking-wide shadow-[0_15px_35px_rgba(16,185,129,0.3)] transition-all hover:scale-105 flex items-center gap-2 group/btn cursor-pointer"
                        >
                          <span>{proj.ctaLabel}</span>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      ) : null}

                      <button
                        onClick={() => {
                          sound.playWhoosh();
                          setActiveCaseStudyModal(proj);
                          setActiveTab('overview');
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-6 py-3.5 rounded-2xl ${proj.liveUrl ? 'apple-glass-card text-gray-800 border border-gray-200 hover:border-blue-500' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-[0_15px_35px_rgba(37,99,235,0.3)]'} font-space font-bold text-xs sm:text-sm tracking-wide transition-all hover:scale-105 flex items-center gap-2 group/btn cursor-pointer`}
                      >
                        <span>{proj.liveUrl ? 'View Case Study ↗' : proj.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveCaseStudyModal(proj);
                          setActiveTab('architecture');
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className="px-5 py-3.5 rounded-2xl apple-glass-card text-gray-800 font-space font-semibold text-xs sm:text-sm border border-gray-200 hover:border-blue-500 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                      >
                        <Workflow className="w-4 h-4 text-purple-600" />
                        <span>View Architecture</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: 3D Laptop / Phone Mockup Screenshot Preview Carousel */}
                  <div className="lg:col-span-6 flex justify-center items-center">

                    <div className="w-full max-w-md apple-glass-card rounded-[28px] p-4 sm:p-6 border border-gray-200/90 bg-white/90 shadow-xl relative overflow-hidden group/mockup">

                      {/* Top Laptop Header Bar */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                          SYSTEM ARCHITECTURE MOCKUP
                        </span>
                      </div>

                      {/* Mockup Screen Content Display */}
                      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 text-white min-h-[220px] flex flex-col justify-between relative overflow-hidden shadow-inner border border-slate-800">

                        <div className="flex justify-between items-start z-10">
                          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-blue-400 border border-white/10">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold border border-blue-500/30">
                            CASE STUDY ARCHITECTURE
                          </span>
                        </div>

                        {/* Interactive Preview Cards Stack inside Laptop Mockup */}
                        <div className="space-y-2 my-4 z-10">
                          {proj.mockupScreens.map((screen, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono transition-transform duration-300 group-hover/mockup:translate-x-1"
                            >
                              <span className="truncate text-gray-200 font-medium">{screen.title}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-bold shrink-0">{screen.badge}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Mockup Action Trigger */}
                        <button
                          onClick={() => {
                            sound.playClick();
                            setActiveCaseStudyModal(proj);
                            setActiveTab('overview');
                          }}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-mono font-bold text-xs hover:opacity-90 transition-opacity z-10 flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>OPEN FULL CASE STUDY STORY ↗</span>
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* FULLSCREEN CINEMATIC PROJECT STORY CASE STUDY MODAL */}
        {activeCaseStudyModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="apple-glass-panel rounded-[32px] p-6 sm:p-10 border border-white/90 max-w-4xl w-full relative shadow-2xl bg-white/95 my-6 max-h-[90vh] overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCaseStudyModal(null);
                }}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-mono font-bold border border-blue-200">
                    // {activeCaseStudyModal.theme}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-semibold">{activeCaseStudyModal.date}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-space font-extrabold text-gray-900">
                  {activeCaseStudyModal.name}
                </h3>
              </div>

              {/* Navigation Tabs (Overview, Architecture, Tech Stack, Key Takeaways) */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
                {[
                  { id: 'overview', label: 'Project Overview' },
                  { id: 'problem', label: 'Problem Solved' },
                  { id: 'architecture', label: 'Architecture & Flows' },
                  { id: 'tech', label: 'Tech Stack & DB' },
                  { id: 'learnings', label: 'What I Learned' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="space-y-6 min-h-[250px]">

                {/* Tab 1: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-base font-space font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Executive Summary</span>
                    </h4>
                    <p className="text-gray-700 text-sm sm:text-base font-inter leading-relaxed bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                      {activeCaseStudyModal.summary}
                    </p>

                    <h4 className="text-base font-space font-bold text-gray-900 pt-2">Key System Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCaseStudyModal.features.map((feat, idx) => (
                        <div key={idx} className="apple-glass-card p-3.5 rounded-xl border border-gray-200 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs font-inter text-gray-800 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Problem Solved */}
                {activeTab === 'problem' && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-base font-space font-bold text-gray-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>Engineering Problem & Solution Matrix</span>
                    </h4>
                    <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 text-gray-800 font-inter text-sm leading-relaxed">
                      {activeCaseStudyModal.problemSolved}
                    </div>
                  </div>
                )}

                {/* Tab 3: Architecture & Flows */}
                {activeTab === 'architecture' && (
                  <div className="space-y-5 animate-fadeIn">
                    <h4 className="text-base font-space font-bold text-gray-900 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-cyan-600" />
                      <span>Data Pipeline & API Execution Architecture</span>
                    </h4>

                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 space-y-2">
                        <div className="text-blue-400 font-bold uppercase">// Database Execution Flow</div>
                        <div>{activeCaseStudyModal.databaseFlow}</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 space-y-2">
                        <div className="text-purple-400 font-bold uppercase">// REST API Endpoint Pipeline</div>
                        <div>{activeCaseStudyModal.apiFlow}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Tech Stack & DB */}
                {activeTab === 'tech' && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-base font-space font-bold text-gray-900 flex items-center gap-2">
                      <Server className="w-4 h-4 text-indigo-600" />
                      <span>Technology Stack Breakdown</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCaseStudyModal.techStack.map((techItem, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs text-gray-800 font-medium">
                          {techItem}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 5: What I Learned */}
                {activeTab === 'learnings' && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="text-base font-space font-bold text-gray-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-600" />
                      <span>Engineering Learnings & Takeaways</span>
                    </h4>
                    <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-gray-800 font-inter text-sm leading-relaxed">
                      {activeCaseStudyModal.whatILearned}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setActiveCaseStudyModal(null)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-space font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  CLOSE CASE STUDY
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

