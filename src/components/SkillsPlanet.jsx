import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audioSynth';
import {
  Sparkles,
  X,
  Code2,
  Atom,
  Server,
  Zap,
  Leaf,
  Flame,
  Database,
  Box,
  Cpu,
  GitBranch,
  GitPullRequest,
  Globe,
  Layers,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function SkillsPlanet() {
  const [isExploded, setIsExploded] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileIndex, setMobileIndex] = useState(0);

  // 11 Core Ecosystem Technologies
  const technologies = [
    {
      id: 'react',
      name: 'React.js',
      category: 'Frontend',
      shape: 'React Atom',
      icon: Atom,
      color: '#2563EB',
      glow: 'rgba(37, 99, 235, 0.4)',
      level: 95,
      desc: 'Built responsive dashboards and modern UI using reusable React components.',
      projects: ['Expense Tracker', 'CRM System', 'Matrimony Admin'],
      tags: ['Hooks', 'Virtual DOM', 'State Management']
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'Backend',
      shape: 'Node Crystal',
      icon: Server,
      color: '#16A34A',
      glow: 'rgba(22, 163, 74, 0.4)',
      level: 90,
      desc: 'Asynchronous event-driven server runtime for handling REST APIs & microservices.',
      projects: ['Expense Tracker Backend', 'REST API Services', 'PEP Software Backend'],
      tags: ['Event Loop', 'Async I/O', 'REST APIs']
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      shape: 'MongoDB Leaf',
      icon: Leaf,
      color: '#15803D',
      glow: 'rgba(21, 128, 61, 0.4)',
      level: 88,
      desc: 'NoSQL document-oriented database with Mongoose schemas & aggregations.',
      projects: ['Expense Tracker DB', 'NoSQL Collections', 'Atlas Cloud'],
      tags: ['Aggregations', 'Documents', 'Mongoose']
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps',
      shape: 'Docker Cube',
      icon: Box,
      color: '#0284C7',
      glow: 'rgba(2, 132, 199, 0.4)',
      level: 85,
      desc: 'Containerizing web applications, multi-stage builds & image optimization.',
      projects: ['CI/CD Simulator', 'Containerized Microservices'],
      tags: ['Containers', 'Dockerfiles', 'Multi-Stage']
    },
    {
      id: 'git',
      name: 'Git',
      category: 'DevOps',
      shape: 'Git Branch Node',
      icon: GitBranch,
      color: '#DC2626',
      glow: 'rgba(220, 38, 38, 0.4)',
      level: 92,
      desc: 'Distributed version control, branching strategies, rebase, and code history.',
      projects: ['Portfolio Repo', 'Feature Branching Workflow'],
      tags: ['Rebase', 'Version Control', 'Merge Conflicts']
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Database',
      shape: 'SQL Cylinder',
      icon: Database,
      color: '#0284C7',
      glow: 'rgba(2, 132, 199, 0.4)',
      level: 85,
      desc: 'Relational database management, table queries, joins & ACID compliance.',
      projects: ['Relational Schema Design', 'PostgreSQL Services'],
      tags: ['ACID', 'Table Joins', 'PostgreSQL']
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Languages',
      shape: 'JavaScript Orb',
      icon: Code2,
      color: '#EAB308',
      glow: 'rgba(234, 179, 8, 0.4)',
      level: 95,
      desc: 'Core language of full-stack web applications. Expert in ES6+, async/await & DOM.',
      projects: ['Portfolio Web App', 'Interactive Tech Arcade', 'Web Audio Engine'],
      tags: ['ES6+', 'Promises', 'Event Loop']
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'Backend',
      shape: 'Express Chip',
      icon: Zap,
      color: '#475569',
      glow: 'rgba(71, 85, 105, 0.4)',
      level: 90,
      desc: 'Minimalist web framework for Node.js REST APIs, routing & JWT middleware.',
      projects: ['MERN Stack API', 'PEP Software Services'],
      tags: ['Middleware', 'JWT Auth', 'CORS Engine']
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'DevOps',
      shape: 'GitHub Sphere',
      icon: GitPullRequest,
      color: '#1E293B',
      glow: 'rgba(30, 41, 59, 0.4)',
      level: 90,
      desc: 'Cloud repository hosting, code reviews, and GitHub Actions deployment pipelines.',
      projects: ['GitHub Actions CI/CD', 'Open Source Repos'],
      tags: ['CI/CD Actions', 'Pull Requests', 'Code Review']
    },
    {
      id: 'firebase',
      name: 'Firebase',
      category: 'Database',
      shape: 'Firebase Prism',
      icon: Flame,
      color: '#D97706',
      glow: 'rgba(217, 119, 6, 0.4)',
      level: 88,
      desc: 'Firestore real-time DB, Auth & Security Rules used in production at PEP Software.',
      projects: ['PEP Software Admin Panel', 'Realtime Sync DB'],
      tags: ['Firestore', 'Auth Rules', 'Realtime Listeners']
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'DevOps',
      shape: 'Kubernetes Ring',
      icon: Cpu,
      color: '#4F46E5',
      glow: 'rgba(79, 70, 229, 0.4)',
      level: 82,
      desc: 'Orchestrating containerized pods, ingress routing & cluster scaling.',
      projects: ['Kubernetes Deployments', 'DevOps Command Room'],
      tags: ['Pod Orchestration', 'Ingress', 'Auto-scaling']
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Languages'];

  // 60 Tiny Orbiting Particles
  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    angle: (i / 60) * 360,
    radius: 120 + (i % 5) * 45,
    size: Math.random() * 3 + 1.2,
    speed: (Math.random() * 20 + 25) * (i % 2 === 0 ? 1 : -1),
    color: ['#2563EB', '#06B6D4', '#C084FC', '#38BDF8', '#8B5CF6'][i % 5]
  }));

  const filteredTechnologies = activeCategory === 'All'
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  const handleCoreClick = () => {
    sound.playWhoosh();
    setIsExploded(true);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 bg-gradient-to-b from-[#FBFCFF] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden min-h-[850px] flex flex-col justify-center">
      
      {/* Background Soft Mesh & Orbit Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-cyan-150/30 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-8 space-y-3 max-w-2xl relative z-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            TECHNOLOGY <span className="text-gradient-primary">GALAXY</span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm font-inter leading-relaxed">
            {!isExploded
              ? 'Tap the core to explore my engineering ecosystem.'
              : 'Click any orbiting technology node to view project usage & skill specs.'}
          </p>
        </div>

        {/* Category Filter Pills (Visible after explode) */}
        <AnimatePresence>
          {isExploded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap justify-center gap-2 mb-8 relative z-20"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                      : 'bg-white/80 backdrop-blur-md text-gray-700 hover:text-blue-600 border border-gray-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* DESKTOP / TABLET 3D ORBIT SYSTEM (Hidden on Mobile) */}
        {/* ========================================================= */}
        <div className="hidden md:flex relative w-full max-w-4xl h-[580px] items-center justify-center select-none">
          
          {/* Orbit Rings (Visible when exploded) */}
          {isExploded && (
            <>
              <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-200/60 pointer-events-none animate-spin-slow" />
              <div className="absolute w-[560px] h-[560px] rounded-full border border-purple-200/40 pointer-events-none" />
            </>
          )}

          {/* 60 Tiny Orbiting Ambient Light Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none blur-[0.5px]"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`
              }}
              animate={{
                rotate: [p.angle, p.angle + 360],
              }}
              transition={{
                duration: p.speed,
                repeat: Infinity,
                ease: 'linear'
              }}
              transformTemplate={({ rotate }) =>
                `rotate(${rotate}deg) translate(${p.radius}px) rotate(-${rotate}deg)`
              }
            />
          ))}

          {/* STEP 1: CENTRAL GLASS SPHERE "TECH GALAXY" CORE */}
          <motion.button
            onClick={handleCoreClick}
            onMouseEnter={() => sound.playHover()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-white/90 shadow-[0_20px_60px_rgba(37,99,235,0.25)] backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer z-30 transition-all duration-700 ${
              isExploded
                ? 'bg-gradient-to-tr from-blue-600/90 to-indigo-600/90 text-white border-blue-400'
                : 'bg-white/85 text-gray-900 border-white hover:border-blue-300 animate-pulse'
            }`}
          >
            {/* Core Aura Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
            
            <Globe className={`w-10 h-10 mb-2 transition-transform duration-700 ${isExploded ? 'text-white rotate-45' : 'text-blue-600 animate-spin-slow'}`} />

            <span className="font-space font-extrabold text-sm tracking-wider uppercase block">
              TECH GALAXY
            </span>

            <span className={`text-[10px] font-mono mt-1 font-semibold ${isExploded ? 'text-blue-100' : 'text-gray-500'}`}>
              {isExploded ? 'CORE ACTIVE' : 'TAP CORE'}
            </span>
          </motion.button>

          {/* STEP 2: EXPANDED 11 ORBITING TECHNOLOGY NODES */}
          <AnimatePresence>
            {isExploded &&
              technologies.map((tech, idx) => {
                const Icon = tech.icon;
                const isFiltered = activeCategory === 'All' || tech.category === activeCategory;
                const totalNodes = technologies.length;

                // Calculate Orbital Position (Circle radius ~250px)
                const radius = 250;
                const angleRad = (idx / totalNodes) * 2 * Math.PI - Math.PI / 2;
                const xPos = Math.cos(angleRad) * radius;
                const yPos = Math.sin(angleRad) * radius;

                return (
                  <motion.button
                    key={tech.id}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: isFiltered ? 1 : 0.45,
                      opacity: isFiltered ? 1 : 0.3,
                      x: xPos,
                      y: yPos,
                    }}
                    exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 70,
                      damping: 12,
                      delay: idx * 0.05
                    }}
                    onClick={() => {
                      sound.playWhoosh();
                      setSelectedSkill(tech);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    whileHover={{ scale: 1.18, zIndex: 40 }}
                    className="absolute w-20 h-20 rounded-2xl apple-glass-card p-3 flex flex-col items-center justify-center cursor-pointer group shadow-xl border border-white/90 bg-white/85 backdrop-blur-xl transition-all duration-300"
                    style={{
                      borderColor: tech.color,
                      boxShadow: `0 10px 30px ${tech.glow}`
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform"
                      style={{ backgroundColor: `${tech.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tech.color }} />
                    </div>

                    <span className="text-[10px] font-space font-extrabold text-gray-900 mt-1 truncate max-w-full">
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
          </AnimatePresence>

        </div>

        {/* ========================================================= */}
        {/* MOBILE 3D SWIPEABLE CAROUSEL (Visible on Mobile) */}
        {/* ========================================================= */}
        <div className="flex md:hidden flex-col items-center w-full relative z-20 py-4">
          
          {!isExploded ? (
            <button
              onClick={handleCoreClick}
              className="w-48 h-48 rounded-full apple-glass-panel border-2 border-blue-400 bg-white/90 shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-pulse"
            >
              <Globe className="w-12 h-12 text-blue-600 mb-2 animate-spin-slow" />
              <span className="font-space font-extrabold text-base text-gray-900 uppercase">TECH GALAXY</span>
              <span className="text-xs font-mono text-gray-500 mt-1">Tap to explore</span>
            </button>
          ) : (
            <div className="w-full flex flex-col items-center">
              
              {/* Swipeable 3D Card Showcase */}
              <div className="w-full max-w-sm flex items-center justify-between gap-2 px-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileIndex((prev) => (prev > 0 ? prev - 1 : filteredTechnologies.length - 1));
                  }}
                  className="p-3 rounded-full bg-white border border-gray-200 text-gray-800 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                  {filteredTechnologies[mobileIndex] && (
                    <motion.div
                      key={filteredTechnologies[mobileIndex].id}
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      onClick={() => setSelectedSkill(filteredTechnologies[mobileIndex])}
                      className="flex-1 p-6 rounded-[28px] bg-white border border-gray-200/90 shadow-2xl flex flex-col items-center text-center cursor-pointer"
                    >
                      {React.createElement(filteredTechnologies[mobileIndex].icon, {
                        className: "w-12 h-12 mb-3",
                        style: { color: filteredTechnologies[mobileIndex].color }
                      })}

                      <h3 className="font-space font-extrabold text-lg text-gray-900">
                        {filteredTechnologies[mobileIndex].name}
                      </h3>
                      <span className="text-xs font-mono text-blue-600 font-bold mt-0.5">
                        {filteredTechnologies[mobileIndex].category} • {filteredTechnologies[mobileIndex].level}% Skill
                      </span>

                      <p className="text-xs font-inter text-gray-600 mt-3 line-clamp-2">
                        {filteredTechnologies[mobileIndex].desc}
                      </p>

                      <div className="mt-4 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-mono text-xs font-bold flex items-center gap-1">
                        <span>TAP TO INSPECT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileIndex((prev) => (prev < filteredTechnologies.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-3 rounded-full bg-white border border-gray-200 text-gray-800 shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex gap-1.5 mt-4">
                {filteredTechnologies.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      mobileIndex === i ? 'w-6 bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* STEP 3: FLOATING VISIONOS INFORMATION PANEL MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-8 sm:p-10 rounded-[36px] bg-white/95 border border-white/90 shadow-[0_30px_90px_rgba(37,99,235,0.25)] backdrop-blur-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${selectedSkill.color}15` }}
                >
                  {React.createElement(selectedSkill.icon, {
                    className: "w-8 h-8",
                    style: { color: selectedSkill.color }
                  })}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-space font-extrabold text-gray-900">{selectedSkill.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[10px] font-mono font-bold text-blue-600 border border-blue-100">
                      {selectedSkill.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-500 font-bold block mt-0.5">
                    {selectedSkill.shape}
                  </span>
                </div>
              </div>

              {/* Skill Level Ring & Bar */}
              <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-600 font-bold">PROFICIENCY LEVEL</span>
                
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                  <span className="text-sm font-space font-extrabold text-blue-600">{selectedSkill.level}%</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-inter text-gray-700 leading-relaxed mb-6">
                {selectedSkill.desc}
              </p>

              {/* Projects Used In */}
              <div className="mb-6 space-y-2">
                <span className="text-xs font-mono text-gray-500 font-bold uppercase tracking-wider block">
                  USED IN REAL PROJECTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.projects.map((proj, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 font-space font-bold text-xs border border-blue-100 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{proj}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                {selectedSkill.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-mono font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
