import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audioSynth';

export default function MissionLoadingScreen({ onComplete }) {
  // Step 1: 0.0-0.6s (Abstract Symbol), Step 2: 0.6-1.5s (Morph), Step 3: 1.5-2.0s (Typography Hold & Exit)
  const [step, setStep] = useState(1);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    if (typeof sound.playClick === 'function') {
      sound.playClick();
    }

    // Step 2: Morph starts at 0.6s
    const timerStep2 = setTimeout(() => setStep(2), 600);

    // Step 3: Typography Hold & Shimmer at 1.5s
    const timerStep3 = setTimeout(() => {
      setStep(3);
      setShimmer(true);
    }, 1500);

    // Exit & Complete at 2.0s
    const timerExit = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(timerStep2);
      clearTimeout(timerStep3);
      clearTimeout(timerExit);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-0 z-50 bg-[#FAFBFF] flex items-center justify-center pointer-events-auto overflow-hidden select-none cursor-default"
      >
        {/* CENTER CONTAINER (Desktop ~140px, Mobile ~90px) */}
        <div className="relative flex items-center justify-center w-[90px] sm:w-[140px] h-[60px] sm:h-[80px]">

          {/* STEP 1: ABSTRACT SYMBOL (0.0s - 0.6s) */}
          {step === 1 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [0.9, 1.0, 0.96, 1.0],
                opacity: 1
              }}
              transition={{
                duration: 0.6,
                ease: [0.65, 0, 0.35, 1]
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2.5 h-full"
            >
              {/* Solid Circle */}
              <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-black shadow-sm" />

              {/* 3 Vertical Rounded Bars with Different Heights */}
              <div className="w-1.5 sm:w-2 h-7 sm:h-10 rounded-full bg-black" />
              <div className="w-1.5 sm:w-2 h-10 sm:h-14 rounded-full bg-black" />
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full bg-black" />

              {/* Small Dot */}
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black" />
            </motion.div>
          )}

          {/* STEP 2 & STEP 3: MORPH & TYPOGRAPHY HOLD (0.6s - 2.0s) */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative font-space font-extrabold text-2xl sm:text-4xl tracking-[0.08em] text-black uppercase flex items-center gap-1 sm:gap-1.5 select-none">
                
                {/* Letter Y */}
                <motion.span
                  initial={{ scaleY: 0.2, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.0, ease: [0.65, 0, 0.35, 1] }}
                  className="inline-block"
                >
                  Y
                </motion.span>

                {/* Letter U */}
                <motion.span
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
                  className="inline-block"
                >
                  U
                </motion.span>

                {/* Letter V */}
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.16, ease: [0.65, 0, 0.35, 1] }}
                  className="inline-block"
                >
                  V
                </motion.span>

                {/* Letter A */}
                <motion.span
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.24, ease: [0.65, 0, 0.35, 1] }}
                  className="inline-block"
                >
                  A
                </motion.span>

                {/* Letter N */}
                <motion.span
                  initial={{ scaleY: 0.2, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.32, ease: [0.65, 0, 0.35, 1] }}
                  className="inline-block"
                >
                  N
                </motion.span>

                {/* Thin Blue-Purple Shimmer Passing Once (Step 3: 1.5s - 2.0s) */}
                {shimmer && (
                  <motion.div
                    initial={{ left: '-30%', opacity: 0 }}
                    animate={{ left: '130%', opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-transparent via-blue-500/35 to-purple-500/35 skew-x-[-20deg] pointer-events-none mix-blend-multiply"
                  />
                )}
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
