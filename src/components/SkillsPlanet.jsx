import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audioSynth';
import {
  Sparkles,
  Code2,
  Atom,
  Server,
  Zap,
  Leaf,
  Flame,
  Database,
  Box,
  Cpu,
  Workflow,
  GitBranch,
  GitPullRequest,
  Globe,
  Layers,
  Search,
  Cloud,
  Palette,
  FileCode,
  FileText,
  CheckCircle2,
  Compass,
  ArrowDown
} from 'lucide-react';

export default function SkillsPlanet() {
  const sectionRef = useRef(null);

  const techCategories = [
    {
      id: 'frontend',
      title: 'FRONTEND ENGINEERING',
      subtitle: 'Client-side architecture, reactive UI framework & styling engines',
      color: '#2563EB',
      items: [
        { name: 'HTML5', icon: FileCode, tag: 'Markup' },
        { name: 'CSS3', icon: Palette, tag: 'Styling' },
        { name: 'JavaScript', icon: Code2, tag: 'ES6+ Logic' },
        { name: 'React.js', icon: Atom, tag: 'UI Framework' },
        { name: 'Tailwind CSS', icon: Layers, tag: 'Utility CSS' }
      ]
    },
    {
      id: 'backend',
      title: 'BACKEND SERVICES',
      subtitle: 'Event-driven server runtimes & RESTful API controllers',
      color: '#16A34A',
      items: [
        { name: 'Node.js', icon: Server, tag: 'Runtime' },
        { name: 'Express.js', icon: Zap, tag: 'REST APIs' }
      ]
    },
    {
      id: 'database',
      title: 'DATABASE SYSTEMS',
      subtitle: 'NoSQL document collections, real-time sync & relational schemas',
      color: '#D97706',
      items: [
        { name: 'MongoDB', icon: Leaf, tag: 'NoSQL DB' },
        { name: 'Firebase', icon: Flame, tag: 'Realtime DB' },
      ]
    },
    {
      id: 'devops',
      title: 'DEVOPS & WORKFLOWS',
      badge: 'Theoretical Basics',
      subtitle: 'Conceptual understanding of containerization, CI/CD pipelines & version control',
      color: '#0284C7',
      items: [
        { name: 'Docker', icon: Box, tag: 'Container Concepts' },
        { name: 'Kubernetes', icon: Cpu, tag: 'Orchestration Theory' },
        { name: 'Jenkins', icon: Workflow, tag: 'CI Pipeline Basics' },
        { name: 'Git', icon: GitBranch, tag: 'Version Control' },
        { name: 'GitHub', icon: GitPullRequest, tag: 'Repository Hosting' }
      ]
    },
    {
      id: 'currently-learning',
      title: 'CURRENTLY LEARNING',
      badge: 'Currently Learning',
      subtitle: 'Exploring cloud deployment infrastructure & foundational services',
      color: '#7C3AED',
      items: [
        { name: 'AWS', icon: Cloud, tag: 'Cloud Fundamentals' }
      ]
    },
    {
      id: 'seo-basics',
      title: 'SEO BASICS',
      badge: 'SEO Basics',
      subtitle: 'Search engine discoverability, web speed & structured metadata',
      color: '#059669',
      items: [
        { name: 'Technical SEO', icon: Search, tag: 'Web Audits' },
        { name: 'On-page SEO', icon: Globe, tag: 'Page Speed' },
        { name: 'Semantic HTML', icon: FileCode, tag: 'Accessibility' },
        { name: 'Sitemap', icon: Compass, tag: 'Indexing' },
        { name: 'robots.txt', icon: FileText, tag: 'Crawler Rules' },
        { name: 'Meta Tags', icon: Sparkles, tag: 'OpenGraph' },
        { name: 'Image Optimization', icon: CheckCircle2, tag: 'Compression' }
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-32 relative z-10 px-4 bg-[#FAFBFF] overflow-hidden scroll-mt-24"
    >
      {/* Background Ambient Glows & Dot Matrix */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 block">
            MY ENGINEERING TOOLKIT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            TECHNOLOGY <span className="text-gradient-primary">STACK</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto font-inter">
            Technologies I use to build, deploy and optimize modern web applications.
          </p>
        </div>

        {/* Scroll-Revealed Technology Categories Journey */}
        <div className="space-y-14 relative">

          {techCategories.map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: groupIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Group Header */}
              <div className="flex items-center gap-3 mb-5 border-b border-gray-200/70 pb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="text-xs sm:text-sm font-mono font-extrabold tracking-wider text-gray-900 uppercase">
                  {group.title}
                </h3>
                {group.badge && (
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white shadow-xs"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.badge}
                  </span>
                )}
                <span className="text-xs font-inter text-gray-500 hidden sm:inline-block ml-auto">
                  {group.subtitle}
                </span>
              </div>

              {/* Group Technology Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {group.items.map((item) => (
                  <TechCard key={item.name} item={item} groupColor={group.color} />
                ))}
              </div>
            </motion.div>
          ))}

        </div>

        {/* Section End Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-24 pt-12 border-t border-gray-200/80 space-y-3"
        >
          <h3 className="text-2xl sm:text-3xl font-space font-extrabold text-gray-900 tracking-tight">
            Always learning. Always building.
          </h3>
          <p className="text-sm font-inter text-gray-600 max-w-lg mx-auto leading-relaxed">
            Currently exploring AWS and strengthening my SEO fundamentals.
          </p>

          {/* Smooth Scroll Indicator to #projects */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                sound.playClick();
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full apple-glass-card border border-gray-200 text-xs font-mono font-bold text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer group hover:scale-105"
            >
              <span>EXPLORE FEATURED PROJECTS</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-blue-600" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Interactive Floating 3D Technology Card Component
function TechCard({ item, groupColor }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        sound.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        boxShadow: isHovered ? `0 12px 30px ${groupColor}20` : undefined
      }}
      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group cursor-pointer ${isHovered ? 'bg-white border-blue-400 scale-[1.02]' : 'bg-white/90 border-gray-200/90 shadow-xs'
        }`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-2xs"
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-space font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
          {item.name}
        </h4>
        <span className="text-[10px] font-mono text-gray-500 block font-semibold truncate">
          {item.tag}
        </span>
      </div>
    </motion.div>
  );
}
