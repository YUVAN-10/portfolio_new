import React from 'react';
import { sound } from '../utils/audioSynth';
import { Terminal, Shield, Sparkles, X, Code, Flame } from 'lucide-react';

export default function EasterEggModal({ mode, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/60 max-w-xl w-full relative animate-fadeIn text-white font-mono shadow-2xl">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-space font-bold text-white">SECRET DEVELOPER ROOM</h3>
            <span className="text-xs text-emerald-400">// EASTER EGG MODE: {mode.toUpperCase()}</span>
          </div>
        </div>

        <div className="bg-black/80 p-5 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300 space-y-3 mb-6 shadow-inner">
          <p>&gt; CONGRATULATIONS! YOU UNLOCKED THE SECRET DEVELOPER VAULT.</p>
          <p>&gt; YUVANSHANKAR S // LEVEL 99 FULL STACK ENGINEER</p>
          <p>&gt; CHEAT CODE ACTIVE: UNLIMITED CREATIVITY & ZERO LATENCY</p>
          <div className="pt-2 border-t border-emerald-500/20 text-gray-400 text-[11px]">
            Shortcuts: Press 'D' for Matrix Hacker Mode, 'G' for Zero Gravity Mode.
          </div>
        </div>

        <button
          onClick={() => {
            sound.playAchievement();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-space font-bold text-xs uppercase shadow-lg hover:scale-105"
        >
          CLOSE SECRET ROOM
        </button>
      </div>
    </div>
  );
}
