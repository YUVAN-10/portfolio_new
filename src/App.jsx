import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import MissionLoadingScreen from './components/MissionLoadingScreen';
import HeroSection from './components/HeroSection';
import AboutMission from './components/AboutMission';
import SkillsPlanet from './components/SkillsPlanet';
import ProjectsUniverse from './components/ProjectsUniverse';
import DevOpsCommandCenter from './components/DevOpsCommandCenter';
import InternshipRoom from './components/InternshipRoom';
import EducationTimeline from './components/EducationTimeline';
import AchievementsVault from './components/AchievementsVault';
import GamesSection from './components/GamesSection';
import BossBattleContact from './components/BossBattleContact';
import ResumeModal from './components/ResumeModal';
import EasterEggModal from './components/EasterEggModal';
import { sound } from './utils/audioSynth';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hackerMode, setHackerMode] = useState(false);
  const [zeroGravity, setZeroGravity] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [easterEggMode, setEasterEggMode] = useState(null);

  // Initialize Lenis Smooth Scroll & Synchronize with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP Cinematic Section Reveal Transitions for Every Section
  useEffect(() => {
    const sections = [
      { id: '#hero', animation: { opacity: 0, y: 30, scale: 0.96 } },
      { id: '#about', animation: { opacity: 0, y: 50, scale: 0.97 } },
      { id: '#journey', animation: { opacity: 0, y: 60, scale: 0.98 } },
      { id: '#skills', animation: { opacity: 0, scale: 0.92, y: 40 } },
      { id: '#projects', animation: { opacity: 0, y: 70, scale: 0.95 } },
      { id: '#devops', animation: { opacity: 0, x: -40, scale: 0.97 } },
      { id: '#internship', animation: { opacity: 0, y: 50, scale: 0.97 } },
      { id: '#achievements', animation: { opacity: 0, x: 40, scale: 0.97 } },
      { id: '#games', animation: { opacity: 0, y: 50, scale: 0.96 } },
      { id: '#contact', animation: { opacity: 0, y: 60, scale: 0.95 } }
    ];

    sections.forEach(({ id, animation }) => {
      const el = document.querySelector(id);
      if (el) {
        gsap.fromTo(
          el,
          animation,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Konami Code Sequence Tracking
  const [konamiIdx, setKonamiIdx] = useState(0);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'd' || e.key === 'D') {
        sound.playClick();
        setHackerMode((prev) => !prev);
      }

      if (e.key === 'g' || e.key === 'G') {
        sound.playClick();
        setZeroGravity((prev) => !prev);
      }

      if (e.key === 'm' || e.key === 'M') {
        sound.toggleMute();
      }

      if (e.key === konamiCode[konamiIdx]) {
        const nextIdx = konamiIdx + 1;
        if (nextIdx === konamiCode.length) {
          sound.playAchievement();
          setEasterEggMode('Konami Secret Room Unlocked');
          setKonamiIdx(0);
        } else {
          setKonamiIdx(nextIdx);
        }
      } else {
        setKonamiIdx(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx]);

  // Scroll spy to update active section in Navbar
  useEffect(() => {
    const sections = ['hero', 'about', 'journey', 'skills', 'projects', 'devops', 'internship', 'achievements', 'games', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-[#101828] relative selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Vertical Liquid Blue Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Light Mesh Gradient Background Canvas */}
      <ParticleBackground hackerMode={hackerMode} zeroGravity={zeroGravity} />

      {/* VisionOS Intro YUVAN Morph Loader */}
      {isLoading ? (
        <MissionLoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Floating Apple Glass Navigation */}
          <Navbar
            hackerMode={hackerMode}
            setHackerMode={setHackerMode}
            zeroGravity={zeroGravity}
            setZeroGravity={setZeroGravity}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main Portfolio Story Sections */}
          <main className="relative z-10 space-y-16">
            <HeroSection
              onExploreProjects={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenResume={() => setShowResumeModal(true)}
            />

            <AboutMission />

            <EducationTimeline />

            <SkillsPlanet />

            <ProjectsUniverse />

            <DevOpsCommandCenter />

            <InternshipRoom />

            <AchievementsVault />

            <GamesSection />

            <BossBattleContact onOpenResume={() => setShowResumeModal(true)} />
          </main>

          {/* Resume Viewer Modal */}
          {showResumeModal && (
            <ResumeModal onClose={() => setShowResumeModal(false)} />
          )}

          {/* Secret Easter Egg Room Modal */}
          {easterEggMode && (
            <EasterEggModal mode={easterEggMode} onClose={() => setEasterEggMode(null)} />
          )}
        </>
      )}
    </div>
  );
}
