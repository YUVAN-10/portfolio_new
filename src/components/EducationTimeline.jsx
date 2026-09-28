import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audioSynth';
import {
  GraduationCap,
  Atom,
  Code2,
  Briefcase,
  Rocket,
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronRight,
  X,
  Layers,
  Award,
  Zap,
  Cpu,
  ArrowRight
} from 'lucide-react';

export default function EducationTimeline() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const milestones = [
    {
      year: '2023',
      badge: 'Academic Foundation',
      title: 'College Journey Started',
      subtitle: 'Kongu Engineering College • B.E. CSE',
      tags: 'B.E. CSE • CGPA 7.42',
      description: 'Embarked on Computer Science Engineering journey with deep dive into programming algorithms, data structures, and core software principles.',
      icon: GraduationCap,
      color: '#2563EB',
      gradient: 'from-blue-600 via-indigo-600 to-blue-500',
      bgTint: '#EEF5FF',
      glowColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: 'rgba(37, 99, 235, 0.3)',
      iconEffect: 'Soft blue light expands behind the graduation icon',
      highlights: [
        'Degree: B.E. Computer Science & Engineering',
        'Institution: Kongu Engineering College',
        'Academic Standing: CGPA 7.42',
        'Core Disciplines: OOP, Data Structures, DBMS, OS'
      ],
      caseStudy: {
        summary: 'Laid down strong theoretical and practical software foundations, mastering algorithmic problem solving and clean code architecture.',
        deliverables: ['Built fundamental C++/Java algorithm suites', 'Achieved consistent academic excellence', 'Active member of Tech Coding Club']
      }
    },
    {
      year: '2024',
      badge: 'Frontend Engineering',
      title: 'Frontend Mastery & React Ecosystem',
      subtitle: 'Modern UI Architecture & State Management',
      tags: 'React • ES6+ • TailwindCSS',
      description: 'Mastered modern client-side engineering, crafting fluid responsive web applications, component architectures, and dynamic animations.',
      icon: Atom,
      color: '#7C3AED',
      gradient: 'from-purple-600 via-fuchsia-600 to-purple-500',
      bgTint: '#F5F1FF',
      glowColor: 'rgba(124, 58, 237, 0.2)',
      borderColor: 'rgba(124, 58, 237, 0.3)',
      iconEffect: 'React atom spins continuously with particle trail',
      highlights: [
        'React 19 Component Architecture',
        'Custom Hooks & State Engines',
        'TailwindCSS & Glassmorphism Design',
        'ES6+ Async JavaScript & DOM Optimization'
      ],
      caseStudy: {
        summary: 'Engineered high-performance web applications focused on UI micro-interactions, responsive design grids, and fast load times.',
        deliverables: ['Designed 10+ interactive web apps', 'Built reusable UI design token systems', 'Optimized Lighthouse score to 98+']
      }
    },
    {
      year: '2025',
      badge: 'Full Stack Engineering',
      title: 'MERN Full Stack Applications',
      subtitle: 'End-to-End Web App Development',
      tags: 'MongoDB • Express • React • Node',
      description: 'Architected and deployed full-stack MERN products, integrating secure JWT authentication, RESTful APIs, and MongoDB database models.',
      icon: Code2,
      color: '#06B6D4',
      gradient: 'from-cyan-600 via-teal-600 to-cyan-500',
      bgTint: '#ECFEFF',
      glowColor: 'rgba(6, 182, 212, 0.2)',
      borderColor: 'rgba(6, 182, 212, 0.3)',
      iconEffect: 'Laptop mockup screen glows with code execution',
      highlights: [
        'Expense Tracker Full-Stack Suite',
        'Medical Insurance Prediction Engine',
        'Express REST APIs & Middleware',
        'MongoDB Atlas Aggregations & Schema Security'
      ],
      caseStudy: {
        summary: 'Constructed production-ready web apps with real-time state synchronization, encrypted authentication pipelines, and cloud database hosting.',
        deliverables: ['Expense Tracker MERN App', 'Insurance Cost ML Predictor', 'JWT Auth Security Matrix']
      }
    },
    {
      year: '2026 Internship',
      badge: 'Industry Experience',
      title: 'Full Stack Developer Intern',
      subtitle: 'PEP Software • Production Client Apps',
      tags: 'React • Firebase • Admin Dashboard',
      description: 'Driving frontend feature development for enterprise admin control panels, implementing real-time Firestore sync and automated test cases.',
      icon: Briefcase,
      color: '#10B981',
      gradient: 'from-emerald-600 via-teal-600 to-emerald-500',
      bgTint: '#F0FDF4',
      glowColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      iconEffect: 'Office glass building lights up with milestone celebration',
      highlights: [
        'Enterprise Admin Panel Engineering',
        'Firebase Firestore & Auth Integration',
        'UI Component Optimization & Bug Resolution',
        'Agile Sprint Execution & Team Collaboration'
      ],
      caseStudy: {
        summary: 'Contributing directly to production client codebases at PEP Software, building scalable admin tools and refining client workflows.',
        deliverables: ['Shipped 15+ Admin Features', 'Reduced dashboard render delay by 35%', 'Auth & Firestore security rules hardening']
      }
    }
  ];

  // Framer Motion Scroll Progress for Desktop Timeline Line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Track Active Milestone based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      milestones.forEach((_, idx) => {
        const el = document.getElementById(`cinematic-milestone-${idx}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height + 100) {
            if (activeIdx !== idx) {
              setActiveIdx(idx);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIdx]);

  // Card Mouse Tilt Interaction
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x / (rect.width / 2), y: y / (rect.height / 2) });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const currentBgTint = milestones[activeIdx]?.bgTint || '#FAFBFF';

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 md:py-32 relative z-10 px-4 transition-colors duration-700 ease-out overflow-hidden"
      style={{ backgroundColor: currentBgTint }}
    >
      {/* Parallax Layer 1: Ambient Glass Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-30 transition-all duration-700"
          style={{ backgroundColor: milestones[activeIdx]?.color }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-[90px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: milestones[(activeIdx + 1) % milestones.length]?.color }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-extrabold font-space text-[#101828] tracking-tight">
            ENGINEERING <span className="text-gradient-primary">EVOLUTION</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-inter leading-relaxed">
            From foundational computer science studies to full-stack MERN products, DevOps cloud pipelines, and industry work.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP TIMELINE ENGINE (Lg Screens)                         */}
        {/* ============================================================ */}
        <div ref={containerRef} className="hidden lg:block relative min-h-[1400px] py-10">
          
          {/* Central Liquid Glass Energy Line */}
          <div className="absolute left-1/2 top-4 bottom-16 -translate-x-1/2 w-1.5 pointer-events-none z-0">
            {/* Background Track Line */}
            <div className="w-full h-full bg-gray-200/70 rounded-full" />

            {/* Dynamic Animated Liquid Glass Energy Fill Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-blue-600 via-purple-600 via-cyan-500 via-emerald-500 to-orange-500 shadow-[0_0_15px_rgba(37,99,235,0.7)]"
              style={{
                scaleY: smoothProgress,
                transformOrigin: 'top center'
              }}
            />

            {/* Traveling Energy Orb */}
            <motion.div
              className="absolute -left-[9px] w-6 h-6 rounded-full bg-white border-2 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.9)] flex items-center justify-center pointer-events-none z-20"
              style={{
                top: useTransform(smoothProgress, [0, 1], ['0%', '100%'])
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping" />
            </motion.div>
          </div>

          {/* Milestone Cards Flow List */}
          <div className="space-y-32 relative z-10">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;
              const isActive = activeIdx === idx;

              return (
                <div
                  key={m.year}
                  id={`cinematic-milestone-${idx}`}
                  className={`flex items-center justify-between gap-12 relative ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  
                  {/* Card Column (48% width) */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -80 : 80,
                      scale: 0.92,
                      filter: 'blur(10px)',
                      rotateY: isEven ? 8 : -8
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: isActive ? 1.02 : 0.96,
                      filter: 'blur(0px)',
                      rotateY: 0
                    }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[48%]"
                  >
                    <div
                      onClick={() => {
                        sound.playClick();
                        setSelectedMilestone(m);
                      }}
                      onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={() => sound.playHover()}
                      className={`apple-glass-panel p-8 sm:p-10 rounded-[32px] border transition-all duration-500 relative group cursor-pointer ${
                        isActive
                          ? 'bg-white/95 border-blue-500 shadow-[0_30px_90px_rgba(37,99,235,0.18)] -translate-y-4 opacity-100'
                          : 'bg-white/75 border-gray-200/80 hover:border-blue-300 hover:shadow-2xl opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        transform: isActive
                          ? `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg) translateY(-16px)`
                          : undefined,
                        borderColor: isActive ? m.color : undefined,
                        boxShadow: isActive ? `0 30px 90px ${m.glowColor}` : undefined
                      }}
                    >
                      {/* Ambient Glass Highlight Line */}
                      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                      {/* Header Badges */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-md flex items-center gap-2"
                          style={{ backgroundColor: m.color }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{m.year}</span>
                        </span>

                        <span className="px-3.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-mono font-bold border border-gray-200/90 shadow-2xs">
                          {m.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-space font-extrabold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {m.title}
                      </h3>

                      <p className="text-xs font-mono font-bold mb-4 flex items-center gap-1.5" style={{ color: m.color }}>
                        <Zap className="w-3.5 h-3.5" />
                        <span>{m.subtitle}</span>
                      </p>

                      {/* Description */}
                      <p className="text-sm font-inter text-gray-600 leading-relaxed mb-6">
                        {m.description}
                      </p>

                      {/* Highlights Chip Grid */}
                      <div className="pt-4 border-t border-gray-200/80 space-y-2">
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">
                          MILESTONE ACHIEVEMENTS:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-700 font-medium flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.color }} />
                              <span className="truncate">{h}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Explore Case Study Interactive Prompt */}
                      <div className="mt-6 flex items-center justify-between pt-2">
                        <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                          Click to view story details
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </span>

                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold border border-blue-100">
                          {m.tags.split('•')[0]}
                        </span>
                      </div>

                    </div>
                  </motion.div>

                  {/* Central Node Icon Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      className={`w-16 h-16 rounded-2xl bg-white border-2 p-1.5 shadow-xl flex items-center justify-center transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'scale-125 border-blue-600 shadow-[0_0_35px_rgba(37,99,235,0.45)]'
                          : 'border-gray-200'
                      }`}
                      style={{ borderColor: isActive ? m.color : undefined }}
                    >
                      <div
                        className="w-full h-full rounded-xl flex items-center justify-center transition-transform"
                        style={{ backgroundColor: m.bgTint }}
                      >
                        <Icon
                          className={`w-7 h-7 transition-all duration-300 ${
                            idx === 1 ? 'animate-[spin_10s_linear_infinite]' : 'animate-pulse'
                          }`}
                          style={{ color: m.color }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer Column for Opposite Side Grid Balancing */}
                  <div className="w-[48%]" />

                </div>
              );
            })}
          </div>

          {/* End of Timeline Transition Moment */}
          <div className="text-center mt-24 pt-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-mono text-xs font-bold shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105" onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Rocket className="w-4 h-4 animate-bounce" />
              <span>TRANSITION TO PROJECTS UNIVERSE ↗</span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* MOBILE FULLSCREEN STORY CARDS ENGINE (Sm/Md Screens)          */}
        {/* ============================================================ */}
        <div className="block lg:hidden relative space-y-12">
          
          {/* Sticky Mobile Year Pill Top Center */}
          <div className="sticky top-20 z-30 flex justify-center mb-6">
            <div className="apple-glass-panel px-5 py-2 rounded-full border border-white/90 shadow-xl bg-white/90 flex items-center gap-3 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span
                className="text-sm font-space font-extrabold text-blue-600 transition-all duration-300"
                style={{ color: milestones[activeIdx]?.color }}
              >
                {milestones[activeIdx]?.year}
              </span>
              <span className="text-[10px] font-mono text-gray-500 font-bold border-l border-gray-300 pl-3">
                {milestones[activeIdx]?.badge}
              </span>
            </div>
          </div>

          {/* Mobile Fullscreen Cards Stack with Snap Scroll */}
          <div className="space-y-10">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isActive = activeIdx === idx;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div
                    onClick={() => {
                      sound.playClick();
                      setSelectedMilestone(m);
                    }}
                    className={`apple-glass-panel p-6 sm:p-8 rounded-[28px] border transition-all duration-300 relative ${
                      isActive
                        ? 'bg-white border-blue-500 shadow-[0_20px_60px_rgba(37,99,235,0.18)] scale-[1.01]'
                        : 'bg-white/80 border-gray-200 opacity-80'
                    }`}
                    style={{
                      borderColor: isActive ? m.color : undefined
                    }}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white shadow-sm"
                          style={{ backgroundColor: m.bgTint }}
                        >
                          <Icon className="w-5 h-5" style={{ color: m.color }} />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-gray-900 block">{m.year}</span>
                          <span className="text-[10px] font-mono text-gray-500 block">{m.badge}</span>
                        </div>
                      </div>

                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow-xs"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.tags.split('•')[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-space font-extrabold text-gray-900 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-xs font-mono font-bold mb-3" style={{ color: m.color }}>
                      {m.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs font-inter text-gray-600 leading-relaxed mb-4">
                      {m.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-gray-100">
                      {m.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.color }} />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono font-bold text-blue-600">
                      <span>View Case Study ↗</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MILESTONE CASE STUDY MODAL PREVIEW                           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 border border-white/80 shadow-[0_30px_100px_rgba(0,0,0,0.25)] relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-lg shadow-md"
                  style={{ backgroundColor: selectedMilestone.color }}
                >
                  {selectedMilestone.year}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                    {selectedMilestone.badge}
                  </span>
                  <h3 className="text-2xl font-space font-extrabold text-gray-900">
                    {selectedMilestone.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle & Description */}
              <p className="text-xs font-mono font-bold text-gray-500 mb-4">
                {selectedMilestone.subtitle}
              </p>
              
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-6">
                <p className="text-sm font-inter text-gray-700 leading-relaxed">
                  {selectedMilestone.caseStudy.summary}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  KEY DELIVERABLES & OUTCOMES:
                </h4>
                <div className="space-y-2">
                  {selectedMilestone.caseStudy.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs font-mono text-gray-800 font-medium flex items-center gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all shadow-md"
                >
                  Close Story Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

