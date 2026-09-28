import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sound } from '../utils/audioSynth';
import { ArrowRight, Download, Terminal, Briefcase, GraduationCap, Award } from 'lucide-react';

const signaturePath = "M 50 160 C 35 90, 70 30, 115 45 C 135 52, 145 110, 145 160 C 145 230, 95 300, 65 305 C 48 310, 45 280, 78 240 C 110 200, 150 195, 175 190 C 185 180, 195 210, 205 210 C 215 210, 225 180, 235 190 C 245 180, 255 185, 260 200 C 265 210, 275 180, 280 175 C 290 170, 305 175, 305 190 C 305 205, 290 210, 280 205 C 275 200, 280 185, 305 185 C 315 175, 320 205, 325 205 C 330 180, 340 205, 345 205 C 355 175, 365 175, 360 190 C 355 205, 370 205, 375 185 C 380 130, 390 120, 385 160 C 385 205, 395 185, 405 205 C 415 170, 430 175, 430 190 C 430 205, 415 210, 405 205 C 400 200, 405 185, 430 185 C 440 175, 445 205, 450 205 C 455 180, 465 205, 470 205 C 475 125, 485 115, 480 165 C 480 190, 490 175, 495 205 C 500 205, 510 185, 515 185 C 525 170, 540 175, 540 190 C 540 205, 525 210, 515 205 C 510 200, 515 185, 540 185 C 550 180, 555 175, 560 185 C 565 195, 570 205, 580 195 M 620 140 C 600 100, 650 70, 680 85 C 710 100, 625 150, 670 210 C 695 240, 735 210, 720 185 M 40 270 Q 420 315 850 220 Q 870 215 830 235 Q 440 320 80 285";

const particlesData = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: Math.random() * 85 + 5,
  y: Math.random() * 75 + 10,
  size: Math.random() * 3.5 + 1.2,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
  color: ['#2563EB', '#06B6D4', '#6366F1', '#8B5CF6', '#38BDF8'][i % 5]
}));

export default function HeroSection({ onExploreProjects, onOpenResume }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const signatureParallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  const roles = [
    'MERN Stack Developer',
    'Full Stack Developer Intern',
    'Computer Science Engineering Student',
  ];

  const [isTouched, setIsTouched] = useState(false);
  const [touchSpot, setTouchSpot] = useState({ x: 50, y: 50, active: false });
  const portraitWrapperRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!portraitWrapperRef.current) return;
    const rect = portraitWrapperRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setTouchSpot({ x, y, active: true });
  };

  const handlePointerLeave = () => {
    setTouchSpot((prev) => ({ ...prev, active: false }));
  };

  // Animated typewriter title logic
  useEffect(() => {
    const currentRole = roles[roleIdx];
    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2200);
      return;
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIdx]);

  // Smooth mouse tilt parallax for 3D organic portrait frame
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        setMousePos({ x: normX, y: normY });
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('mousemove', handleMouseMove);
      containerEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (containerEl) {
        containerEl.removeEventListener('mousemove', handleMouseMove);
        containerEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Click ripple interaction on portrait
  const handlePortraitClick = (e) => {
    sound.playClick();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    }
  };

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 sm:pt-32 sm:pb-24 flex flex-col justify-center items-center relative z-10 px-4 sm:px-6 overflow-hidden scroll-mt-24">

      {/* Background Animated Aurora Ribbon & Soft Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-200/30 via-purple-150/20 to-cyan-150/30 blur-[130px] rounded-full animate-breathing-glow" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-200/25 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Column: VisionOS Editorial Text & Status Cards */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 text-left order-1 lg:order-1">

          {/* Main Title */}
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold font-space text-[#101828] tracking-tight leading-none flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
              <span className="text-gradient-primary">YUVANSHANKAR</span>
              <span className="text-[#101828]">S.</span>
            </h1>
          </div>

          {/* Animated Typewriter Title */}
          <div className="h-10 sm:h-12 flex items-center bg-white/90 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-gray-200/80 w-full max-w-xl shadow-sm">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 font-bold mr-2 shrink-0" />
            <span className="text-xs sm:text-base font-mono text-gray-900 font-semibold truncate">
              {displayText}
            </span>
            <span className="w-2 h-4 sm:h-5 bg-blue-600 ml-1 animate-pulse shrink-0" />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-lg leading-relaxed max-w-2xl font-inter">
            Building scalable full-stack web applications and immersive user experiences using MERN Stack and DevOps.
          </p>

          {/* Status Widgets (Internship, CGPA, Graduation) */}
          <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 max-w-xl pt-1">
            <div className="apple-glass-card p-1.5 xs:p-2 sm:p-3 rounded-2xl border border-gray-200/80 flex items-center gap-1.5 shadow-sm min-w-0">
              <div className="p-1 sm:p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-gray-500 font-bold uppercase truncate">INTERNSHIP</div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs font-space font-extrabold text-gray-900 truncate">PEP Software</div>
              </div>
            </div>

            <div className="apple-glass-card p-1.5 xs:p-2 sm:p-3 rounded-2xl border border-gray-200/80 flex items-center gap-1.5 shadow-sm min-w-0">
              <div className="p-1 sm:p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-gray-500 font-bold uppercase truncate">CGPA</div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs font-space font-extrabold text-purple-700 truncate">7.42</div>
              </div>
            </div>

            <div className="apple-glass-card p-1.5 xs:p-2 sm:p-3 rounded-2xl border border-gray-200/80 flex items-center gap-1.5 shadow-sm min-w-0">
              <div className="p-1 sm:p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-gray-500 font-bold uppercase truncate">GRADUATION</div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs font-space font-extrabold text-emerald-700 truncate">2027</div>
              </div>
            </div>
          </div>

          {/* Liquid Glass CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-4 pt-2 w-full max-w-xl">
            <button
              onClick={() => {
                sound.playClick();
                if (onExploreProjects) onExploreProjects();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex-1 sm:flex-none justify-center px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-space font-bold text-xs sm:text-sm tracking-wide shadow-[0_15px_35px_rgba(37,99,235,0.3)] transition-all hover:scale-105 flex items-center gap-1.5 group cursor-pointer whitespace-nowrap"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (onOpenResume) onOpenResume();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex-1 sm:flex-none justify-center px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl apple-glass-card text-gray-800 font-space font-semibold text-xs sm:text-sm tracking-wide border border-gray-200 hover:border-blue-500 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              <span>Download Resume</span>
            </button>
          </div>

        </div>

        {/* Right Column: Premium Apple VisionOS Floating Liquid Glass Organic Blob Portrait */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-2 lg:order-2 pt-4 pb-8 lg:py-0">

          <div
            ref={containerRef}
            onClick={handlePortraitClick}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            onMouseEnter={() => setIsTouched(true)}
            onMouseLeave={() => setIsTouched(false)}
            className="relative w-full max-w-2xl h-[480px] sm:h-[580px] lg:h-[660px] flex items-center justify-center cursor-pointer group select-none"
          >
            {/* Ambient Multi-Layer Mesh Lighting Glow */}
            <div
              className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-cyan-200/30 blur-[90px] group-hover:scale-110 transition-transform duration-700 pointer-events-none"
              style={{
                transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
              }}
            />

            {/* VIVID HIGH-VISIBILITY NEON SIGNATURE WRITING ANIMATION BEHIND PORTRAIT */}
            <motion.div
              style={{ y: signatureParallaxY }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none overflow-visible"
            >
              <div className="w-[110%] sm:w-[90%] lg:w-[78%] -rotate-[5deg] sm:-rotate-[6deg] lg:-rotate-[8deg] opacity-75 sm:opacity-85 lg:opacity-90 hover:opacity-100 transition-opacity duration-500 relative">
                <svg
                  viewBox="0 0 900 340"
                  className="w-full h-auto filter drop-shadow-[0_0_20px_rgba(0,240,255,0.6)] drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                >
                  <defs>
                    <linearGradient id="vividNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F0FF" />
                      <stop offset="30%" stopColor="#3B82F6" />
                      <stop offset="65%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#FF007F" />
                    </linearGradient>

                    <linearGradient id="vividBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="30%" stopColor="#00F0FF" stopOpacity="1" />
                      <stop offset="65%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FF007F" stopOpacity="0" />
                    </linearGradient>

                    <filter id="vividNeonBloom" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="blur1" />
                      <feGaussianBlur stdDeviation="4" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur1" />
                        <feMergeNode in="blur2" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <motion.path
                    d={signaturePath}
                    fill="none"
                    stroke="url(#vividNeonGrad)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#vividNeonBloom)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 0.7, 0.5],
                    }}
                    transition={{
                      pathLength: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 2.8 },
                    }}
                  />

                  <motion.path
                    d={signaturePath}
                    fill="none"
                    stroke="url(#vividNeonGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 1, 0.95],
                    }}
                    transition={{
                      pathLength: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 2.8 },
                    }}
                  />

                  <motion.path
                    d={signaturePath}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 1, 0.85],
                    }}
                    transition={{
                      pathLength: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 2.8 },
                    }}
                  />

                  <motion.g
                    style={{ offsetPath: `path("${signaturePath}")` }}
                    initial={{ offsetDistance: "0%", opacity: 1 }}
                    animate={{ offsetDistance: "100%", opacity: [1, 1, 0] }}
                    transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <circle r="9" fill="#FFFFFF" filter="drop-shadow(0 0 12px #00F0FF)" />
                    <circle r="18" fill="#00F0FF" opacity="0.6" filter="drop-shadow(0 0 25px #3B82F6)" />
                    <circle r="26" fill="#8B5CF6" opacity="0.35" filter="drop-shadow(0 0 35px #FF007F)" />
                  </motion.g>

                  <motion.path
                    d={signaturePath}
                    fill="none"
                    stroke="url(#vividBeamGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="220 900"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{
                      strokeDashoffset: [-1120, 0],
                      opacity: [0, 1, 0.95],
                    }}
                    transition={{
                      strokeDashoffset: {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2.8,
                      },
                      opacity: { duration: 0.5, delay: 2.8 }
                    }}
                  />
                </svg>

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {particlesData.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute rounded-full pointer-events-none blur-[0.5px]"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 10px ${p.color}`
                      }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.9, 0],
                        y: [-5, -40],
                      }}
                      transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay + 2.8,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Click Ripple Effect */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full border-2 border-blue-400/80 animate-ping pointer-events-none z-30"
                style={{
                  left: ripple.x - 40,
                  top: ripple.y - 40,
                  width: 80,
                  height: 80
                }}
              />
            ))}

            {/* CLEAN UNCROPPED TRANSPARENT PORTRAIT OF YUVANSHANKAR S WITH COLOR TOUCH REVEAL */}
            <div
              ref={portraitWrapperRef}
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              onTouchStart={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              onTouchEnd={handlePointerLeave}
              className="relative z-10 w-[270px] h-[370px] xs:w-[310px] xs:h-[430px] sm:w-[400px] sm:h-[530px] lg:w-[480px] lg:h-[620px] flex items-end justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg)`
              }}
            >
              {/* Base Layer: Natural Black & White Grayscale Cutout */}
              <img
                src="/yuvanshankar.png"
                alt="Yuvanshankar S - MERN Stack Developer & DevOps Engineer Portfolio"
                className="w-full h-full object-contain object-bottom filter grayscale drop-shadow-[0_20px_40px_rgba(37,99,235,0.15)]"
                loading="eager"
                decoding="async"
              />

              {/* Top Layer: Natural Original Color Cutout revealed on touch/hover */}
              <img
                src="/yuvanshankar.png"
                alt="Yuvanshankar S - Full Stack Software Engineer"
                className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none transition-[clip-path] duration-150 ease-out drop-shadow-[0_25px_50px_rgba(37,99,235,0.25)]"
                style={{
                  clipPath: touchSpot.active
                    ? `circle(150px at ${touchSpot.x}% ${touchSpot.y}%)`
                    : 'circle(0px at 50% 50%)'
                }}
                loading="eager"
                decoding="async"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
