import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audioSynth';
import {
  Trophy,
  Sparkles,
  GitBranch,
  Database,
  Check,
  RotateCcw,
  ArrowRight,
  Layers,
  Box,
  Server,
  ShieldCheck,
  ChevronRight,
  Flame,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers3
} from 'lucide-react';

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState('pipeline'); // 'pipeline' | 'database'
  const [engineeringXP, setEngineeringXP] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // -------------------------------------------------------------
  // GAME 1: BUILD CI/CD PIPELINE STATE
  // -------------------------------------------------------------
  const initialPipelineNodes = [
    { id: 'docker', name: 'Docker', desc: 'Package app into container images', icon: Box },
    { id: 'github', name: 'GitHub', desc: 'Commit & push source code', icon: GitBranch },
    { id: 'kubernetes', name: 'Kubernetes', desc: 'Deploy & orchestrate cluster pods', icon: Layers },
    { id: 'jenkins', name: 'Jenkins', desc: 'Run automated build & unit test suites', icon: Server }
  ];

  const correctPipelineOrder = ['github', 'jenkins', 'docker', 'kubernetes'];
  const [pipelineNodes, setPipelineNodes] = useState(initialPipelineNodes);
  const [pipelineSolved, setPipelineSolved] = useState(false);
  const [shakeNodeId, setShakeNodeId] = useState(null);

  const handleSwapNodes = (fromIdx, toIdx) => {
    sound.playClick();
    const updated = [...pipelineNodes];
    const temp = updated[fromIdx];
    updated[fromIdx] = updated[toIdx];
    updated[toIdx] = temp;
    setPipelineNodes(updated);

    const isCorrect = updated.every((node, idx) => node.id === correctPipelineOrder[idx]);

    if (isCorrect && !pipelineSolved) {
      sound.playDeploy();
      setPipelineSolved(true);
      setEngineeringXP((prev) => prev + 150);
      triggerToast('🚀 +150 XP! CI/CD Pipeline Configured & Deployed Successfully!');
    } else if (!isCorrect) {
      if (updated[toIdx].id !== correctPipelineOrder[toIdx]) {
        setShakeNodeId(updated[toIdx].id);
        setTimeout(() => setShakeNodeId(null), 500);
      }
    }
  };

  const resetPipeline = () => {
    sound.playClick();
    setPipelineNodes(initialPipelineNodes);
    setPipelineSolved(false);
  };

  // -------------------------------------------------------------
  // GAME 2: FIND THE DATABASE STATE
  // -------------------------------------------------------------
  const dbChallenges = [
    { id: 'expense', name: 'Expense Tracker', req: 'ACID transactions & relational schema', targetDb: 'SQL', desc: 'Financial ledgers require strict transactional consistency.' },
    { id: 'auth', name: 'Authentication', req: 'User credentials & OAuth session tables', targetDb: 'SQL', desc: 'User accounts and auth tokens mapping to relational tables.' },
    { id: 'chat', name: 'Real-time Chat', req: 'Sub-millisecond WebSocket live sync', targetDb: 'Firestore', desc: 'Live messaging apps benefit from Firestore real-time listeners.' },
    { id: 'admin', name: 'Admin Panel', req: 'Complex relational joins & reporting', targetDb: 'SQL', desc: 'Internal management dashboards rely heavily on SQL queries.' },
    { id: 'analytics', name: 'Analytics', req: 'High-throughput flexible document logs', targetDb: 'MongoDB', desc: 'Big data event logging excels in MongoDB document stores.' }
  ];

  const dbOptions = [
    { id: 'MongoDB', name: 'MongoDB', tag: 'Document Store', desc: 'Flexible JSON documents & Atlas Cloud' },
    { id: 'Firestore', name: 'Firestore', tag: 'Real-time NoSQL', desc: 'Live listener sync & Firebase Cloud' },
    { id: 'SQL', name: 'SQL Database', tag: 'Relational DB', desc: 'PostgreSQL / MySQL with ACID compliance' }
  ];

  const [activeAppCard, setActiveAppCard] = useState(0);
  const [matchedAppIds, setMatchedAppIds] = useState([]);
  const [wrongTiltDb, setWrongTiltDb] = useState(null);
  const [dbSolved, setDbSolved] = useState(false);

  const handleMatchDatabase = (dbName) => {
    const currentChallenge = dbChallenges[activeAppCard];
    if (matchedAppIds.includes(currentChallenge.id)) return;

    if (currentChallenge.targetDb === dbName) {
      sound.playAchievement();
      const nextMatched = [...matchedAppIds, currentChallenge.id];
      setMatchedAppIds(nextMatched);
      setEngineeringXP((prev) => prev + 50);
      triggerToast(`✅ +50 XP! Matched ${currentChallenge.name} ➔ ${dbName}`);

      const nextUnmatchedIdx = dbChallenges.findIndex((c) => !nextMatched.includes(c.id));
      if (nextUnmatchedIdx !== -1) {
        setActiveAppCard(nextUnmatchedIdx);
      } else {
        setDbSolved(true);
        triggerToast('🎉 +100 XP Bonus! All Architecture Matches Completed!');
      }
    } else {
      sound.playClick();
      setWrongTiltDb(dbName);
      setTimeout(() => setWrongTiltDb(null), 500);
      triggerToast(`❌ Incorrect Match! ${currentChallenge.name} requires ${currentChallenge.targetDb}.`);
    }
  };

  const resetDbGame = () => {
    sound.playClick();
    setMatchedAppIds([]);
    setActiveAppCard(0);
    setDbSolved(false);
  };

  return (
    <section id="games" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 bg-gradient-to-b from-[#FFFFFF] via-[#EEF5FF] to-[#F8FAFF] overflow-hidden">
      
      {/* Background Soft Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-100/40 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Section Header with Floating XP Glass Capsule */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16">
          
          {/* Badge & Title */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight leading-tight">
              INTERACTIVE <span className="text-gradient-primary">TECH ARCADE</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base font-inter leading-relaxed">
              Two interactive challenges that showcase how I think as a software engineer.
            </p>
          </div>

          {/* Floating Glass Capsule: Engineering XP (Top Right) */}
          <div className="px-6 py-3.5 rounded-full border border-gray-200/80 shadow-lg bg-white/80 backdrop-blur-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Trophy className="w-5 h-5" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider block">
                Engineering XP
              </span>
              <span className="text-xl font-space font-extrabold text-gray-900">
                {engineeringXP} <span className="text-blue-600 text-xs font-mono">XP</span>
              </span>
            </div>

            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${Math.min(100, (engineeringXP / 250) * 100)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gray-900/90 text-white font-mono text-xs font-bold shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Navigation Selector Tabs (2 Large Glass Cards Selector) */}
        <div className="flex flex-row justify-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none snap-x">
          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('pipeline');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex-1 min-w-[280px] max-w-md p-6 rounded-[28px] text-left transition-all duration-300 relative group cursor-pointer border snap-center ${
              activeGame === 'pipeline'
                ? 'bg-white border-blue-500 shadow-[0_20px_45px_rgba(37,99,235,0.15)] -translate-y-2'
                : 'bg-white/70 backdrop-blur-xl border-[#E6EBF5] hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              {/* Minimal Black Outline Icon inside Glass Circle */}
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-center group-hover:rotate-6 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
                <GitBranch stroke="#111827" strokeWidth="1.75" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[11px] font-mono font-bold text-blue-600 border border-blue-100">
                Medium • 45s
              </span>
            </div>

            <h3 className="text-lg font-space font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
              Build CI/CD Pipeline
            </h3>
            <p className="text-xs font-inter text-gray-600 mt-1 leading-relaxed">
              Arrange GitHub, Jenkins, Docker and Kubernetes into the correct deployment workflow.
            </p>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('database');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex-1 min-w-[280px] max-w-md p-6 rounded-[28px] text-left transition-all duration-300 relative group cursor-pointer border snap-center ${
              activeGame === 'database'
                ? 'bg-white border-blue-500 shadow-[0_20px_45px_rgba(37,99,235,0.15)] -translate-y-2'
                : 'bg-white/70 backdrop-blur-xl border-[#E6EBF5] hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              {/* Minimal Black Outline Icon inside Glass Circle */}
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-center group-hover:rotate-6 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all">
                <Database stroke="#111827" strokeWidth="1.75" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[11px] font-mono font-bold text-blue-600 border border-blue-100">
                Easy • 20s
              </span>
            </div>

            <h3 className="text-lg font-space font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
              Find the Database
            </h3>
            <p className="text-xs font-inter text-gray-600 mt-1 leading-relaxed">
              Match backend application requirements with the correct database architecture.
            </p>
          </button>
        </div>

        {/* Main Stage Glass Workspace */}
        <div className="p-8 sm:p-12 rounded-[32px] border border-[#E6EBF5] shadow-[0_25px_70px_rgba(37,99,235,0.08)] bg-white/75 backdrop-blur-[24px] relative overflow-hidden min-h-[460px]">
          
          {/* ========================================================= */}
          {/* GAME 1: BUILD CI/CD PIPELINE WORKSPACE */}
          {/* ========================================================= */}
          {activeGame === 'pipeline' && (
            <div className="space-y-8">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200/80 gap-4">
                <div>
                  <h3 className="text-xl font-space font-extrabold text-gray-900 flex items-center gap-2">
                    <GitBranch stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-blue-600" />
                    <span>Workflow Builder Workspace</span>
                  </h3>
                  <p className="text-xs font-inter text-gray-500 mt-0.5">
                    Reorder the 4 deployment nodes into the correct pipeline sequence (GitHub ➔ Jenkins ➔ Docker ➔ Kubernetes).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold ${
                    pipelineSolved ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {pipelineSolved ? 'STATUS: DEPLOYED ✅' : 'STATUS: PENDING REORDER'}
                  </span>

                  {pipelineSolved && (
                    <button
                      onClick={resetPipeline}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      title="Reset Game"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Animated Connection Line & Pipeline Nodes */}
              <div className="relative pt-4">
                
                {/* Connection Energy Pulse Line behind nodes */}
                <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gray-200 rounded-full -translate-y-1/2 overflow-hidden pointer-events-none z-0">
                  <motion.div
                    className={`h-full ${pipelineSolved ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500' : 'bg-blue-500'}`}
                    animate={{
                      x: pipelineSolved ? ['0%', '100%'] : ['-100%', '100%']
                    }}
                    transition={{
                      duration: pipelineSolved ? 1.5 : 2.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                </div>

                {/* Nodes Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {pipelineNodes.map((node, idx) => {
                    const NodeIcon = node.icon;
                    const isShaking = shakeNodeId === node.id;
                    const isCorrectPos = node.id === correctPipelineOrder[idx];

                    return (
                      <motion.div
                        key={node.id}
                        animate={isShaking ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`p-6 rounded-[24px] border text-left transition-all duration-300 relative bg-white flex flex-col justify-between ${
                          pipelineSolved
                            ? 'border-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.12)] bg-emerald-50/20'
                            : isCorrectPos
                            ? 'border-blue-300 shadow-md'
                            : 'border-gray-200/90 shadow-sm'
                        }`}
                      >
                        {/* Top Row: Order Badge & Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center border ${
                            pipelineSolved
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            0{idx + 1}
                          </span>

                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                            <NodeIcon stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-gray-900" />
                          </div>
                        </div>

                        {/* Node Content */}
                        <div className="mb-6">
                          <h4 className="font-space font-extrabold text-base text-gray-900">{node.name}</h4>
                          <p className="text-xs font-inter text-gray-500 mt-1 leading-relaxed">{node.desc}</p>
                        </div>

                        {/* Swap Move Controls */}
                        {!pipelineSolved && (
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            {idx > 0 && (
                              <button
                                onClick={() => handleSwapNodes(idx, idx - 1)}
                                className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-xs font-mono font-bold text-gray-600 border border-gray-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>← Left</span>
                              </button>
                            )}
                            {idx < pipelineNodes.length - 1 && (
                              <button
                                onClick={() => handleSwapNodes(idx, idx + 1)}
                                className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-xs font-mono font-bold text-gray-600 border border-gray-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>Right →</span>
                              </button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* Success Banner */}
              {pipelineSolved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-[24px] bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-xl flex items-center justify-between flex-wrap gap-4"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-white animate-bounce shrink-0" />
                    <div>
                      <h4 className="font-space font-extrabold text-base">Pipeline Verification Complete!</h4>
                      <p className="text-xs font-inter text-blue-100">
                        GitHub (Source) ➔ Jenkins (CI Build) ➔ Docker (Container) ➔ Kubernetes (Deployment).
                      </p>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-xs font-mono font-extrabold tracking-wider uppercase">
                    +150 XP EARNED 🚀
                  </span>
                </motion.div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* GAME 2: FIND THE DATABASE WORKSPACE */}
          {/* ========================================================= */}
          {activeGame === 'database' && (
            <div className="space-y-8">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200/80 gap-4">
                <div>
                  <h3 className="text-xl font-space font-extrabold text-gray-900 flex items-center gap-2">
                    <Database stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-blue-600" />
                    <span>Glass Architecture Match Workspace</span>
                  </h3>
                  <p className="text-xs font-inter text-gray-500 mt-0.5">
                    Select an application card and match it to the correct backend database model.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-mono font-bold">
                    MATCHED: {matchedAppIds.length} / {dbChallenges.length}
                  </span>

                  {dbSolved && (
                    <button
                      onClick={resetDbGame}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      title="Reset Game"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* 3D Glass App Requirement Cards Selector */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  1. SELECT APP REQUIREMENT CARD:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {dbChallenges.map((card, idx) => {
                    const isMatched = matchedAppIds.includes(card.id);
                    const isSelected = activeAppCard === idx;

                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          sound.playClick();
                          setActiveAppCard(idx);
                        }}
                        className={`p-4 rounded-[20px] border text-left transition-all duration-300 relative cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 opacity-80'
                            : isSelected
                            ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-102'
                            : 'bg-white/70 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-gray-400">0{idx + 1}</span>
                          {isMatched && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <h4 className="font-space font-extrabold text-xs text-gray-900 truncate">{card.name}</h4>
                        <span className="text-[10px] font-inter text-gray-500 truncate block mt-0.5">{card.req}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Challenge Match Options */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">
                  2. MATCH TO OPTIMAL DATABASE ARCHITECTURE:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dbOptions.map((db) => {
                    const isWrongTilt = wrongTiltDb === db.name;
                    const isMatchedWithCurrent = matchedAppIds.includes(dbChallenges[activeAppCard]?.id) && dbChallenges[activeAppCard]?.targetDb === db.name;

                    return (
                      <motion.button
                        key={db.id}
                        animate={isWrongTilt ? { rotate: [-4, 4, -4, 4, 0] } : { rotate: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleMatchDatabase(db.name)}
                        className={`p-6 rounded-[24px] border text-left transition-all duration-300 relative group cursor-pointer ${
                          isMatchedWithCurrent
                            ? 'bg-emerald-50 border-emerald-400 shadow-lg'
                            : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:rotate-6 group-hover:border-blue-400 transition-all">
                            <Database stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-gray-900" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[10px] font-mono font-bold text-gray-600 border border-gray-200">
                            {db.tag}
                          </span>
                        </div>

                        <h4 className="font-space font-extrabold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                          {db.name}
                        </h4>
                        <p className="text-xs font-inter text-gray-500 mt-1 leading-relaxed">
                          {db.desc}
                        </p>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-blue-600">
                          <span>MATCH HERE</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Complete Banner */}
              {dbSolved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-[24px] bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-xl flex items-center justify-between flex-wrap gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-white animate-bounce shrink-0" />
                    <div>
                      <h4 className="font-space font-extrabold text-base">Database Architecture Mastered!</h4>
                      <p className="text-xs font-inter text-blue-100">
                        You matched all 5 backend application requirements with their optimal relational, NoSQL, and real-time database engines.
                      </p>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-xs font-mono font-extrabold tracking-wider uppercase">
                    +100 BONUS XP 🏆
                  </span>
                </motion.div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
