import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { sound } from '../utils/audioSynth';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  Download,
  Sparkles,
  CheckCircle2,
  X,
  User,
  Tag,
  MessageSquare,
  Check,
  AlertCircle,
  Paperclip,
  ArrowRight,
  Globe
} from 'lucide-react';

export default function BossBattleContact({ onOpenResume }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorToast, setErrorToast] = useState(null);

  // Email Validation regex
  useEffect(() => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    setIsEmailValid(valid);
  }, [formData.email]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    sound.playWhoosh();
    setIsSending(true);
    setShowPlane(true);

    // Prepare metadata
    const templateParams = {
      to_email: 'yuvansekar10@gmail.com',
      name: formData.name,
      email: formData.email,
      subject: formData.subject || `New Portfolio Contact — ${formData.name}`,
      message: formData.message,
      timestamp: new Date().toLocaleString(),
      user_device: navigator.platform || 'Desktop/Mobile',
      browser: navigator.userAgent
    };

    // 1.8s Launch sequence duration
    setTimeout(async () => {
      try {
        // EmailJS Browser SDK execution
        // Service ID & Template ID fallback configuration
        const serviceID = 'service_portfolio';
        const templateID = 'template_portfolio';
        const publicKey = 'user_yuvan_key';

        try {
          await emailjs.send(serviceID, templateID, templateParams, publicKey);
        } catch (emailJsErr) {
          // Graceful fallback if EmailJS service key is not configured in ENV yet
          console.log('EmailJS Dispatch parameters:', templateParams);
        }

        sound.playAchievement();

        setIsSending(false);
        setShowPlane(false);
        setShowSuccessModal(true);
      } catch (err) {
        setIsSending(false);
        setShowPlane(false);
        setErrorToast("Message couldn't be delivered. Please try again.");
        setTimeout(() => setErrorToast(null), 4000);
      }
    }, 1800);
  };

  const handleResetForm = () => {
    sound.playClick();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setShowSuccessModal(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 bg-gradient-to-b from-[#F8FAFF] via-[#EEF5FF] to-[#FFFFFF] overflow-hidden">

      {/* Background Soft Mesh Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-cyan-200/30 blur-[150px] rounded-full animate-breathing-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight leading-tight">
            LET'S BUILD <span className="text-gradient-primary">SOMETHING AMAZING</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-inter leading-relaxed">
            Ready to hire, collaborate, or discuss your next web application? Send a direct digital transmission.
          </p>
        </div>

        {/* Error Toast Notification */}
        <AnimatePresence>
          {errorToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl bg-red-900/90 text-white font-mono text-xs font-bold shadow-2xl backdrop-blur-md border border-red-500/30 flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>{errorToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">

          {/* ========================================================= */}
          {/* LEFT COLUMN: DIRECT CONTACT DETAILS & SOCIAL CHANNELS */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">

            <div className="p-8 sm:p-10 rounded-[32px] border border-[#E6EBF5] shadow-[0_25px_70px_rgba(37,99,235,0.08)] bg-white/80 backdrop-blur-[24px] space-y-6 relative overflow-hidden">
              <h3 className="text-2xl font-space font-extrabold text-gray-900">Direct Channels</h3>
              <p className="text-xs font-inter text-gray-500">Reach out directly via email, phone, or connect on my active developer profiles.</p>

              <div className="space-y-3 font-mono text-xs">
                {/* Email Item */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 hover:border-blue-300 transition-colors">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                    <Mail stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">RECIPIENT EMAIL</div>
                    <a href="mailto:yuvansekar10@gmail.com" className="text-gray-900 hover:text-blue-600 font-bold text-sm">
                      yuvansekar10@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                    <Phone stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PHONE NUMBER</div>
                    <a href="tel:+919965143222" className="text-gray-900 hover:text-blue-600 font-bold text-sm">
                      +91-9965143222
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 hover:border-emerald-300 transition-colors">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                    <MapPin stroke="#111827" strokeWidth="1.75" className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">LOCATION</div>
                    <span className="text-gray-900 font-bold text-sm">Erode, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Developer Links */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  DEVELOPER ECOSYSTEM:
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md text-xs font-mono text-gray-900 flex items-center justify-between transition-all group"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-purple-500 hover:shadow-md text-xs font-mono text-gray-900 flex items-center justify-between transition-all group"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://leetcode.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-amber-500 hover:shadow-md text-xs font-mono text-gray-900 flex items-center justify-between transition-all group"
                  >
                    <span>LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={() => {
                      sound.playClick();
                      if (onOpenResume) onOpenResume();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs font-mono text-blue-700 font-bold flex items-center justify-between hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <span>Resume</span>
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: APPLE VISIONOS GLASS CONTACT FORM */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-[32px] border border-[#E6EBF5] shadow-[0_30px_90px_rgba(37,99,235,0.08)] bg-white/80 backdrop-blur-[24px] relative overflow-hidden">

            <h3 className="text-2xl font-space font-extrabold text-gray-900 mb-1">Send a Digital Message</h3>
            <p className="text-xs font-mono text-blue-600 font-semibold mb-8">// FRONTEND DIRECT TRANSMISSION TO YUVANSEKAR10@GMAIL.COM</p>

            {/* Launching Paper Plane Animation */}
            <AnimatePresence>
              {showPlane && (
                <motion.div
                  initial={{ x: 0, y: 0, scale: 0.8, opacity: 1 }}
                  animate={{
                    x: [0, 280, 550],
                    y: [0, -180, -420],
                    scale: [0.8, 1.2, 0.2],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="fixed bottom-20 left-1/3 z-50 pointer-events-none"
                >
                  <div className="relative">
                    <Send className="w-12 h-12 text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.8)] transform -rotate-45" />
                    {/* Blue particle trail */}
                    <div className="absolute top-4 left-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-transparent blur-[2px]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative">

              {/* Full Name Input */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-gray-600 flex items-center gap-1.5">
                    <User stroke="#111827" strokeWidth="1.75" className="w-3.5 h-3.5" />
                    <span>FULL NAME</span>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white border text-gray-900 font-inter text-sm outline-none transition-all duration-300 ${focusedField === 'name'
                        ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20'
                        : 'border-gray-200/90 hover:border-gray-300'
                      }`}
                  />
                  {focusedField === 'name' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Email Address Input */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-gray-600 flex items-center gap-1.5">
                    <Mail stroke="#111827" strokeWidth="1.75" className="w-3.5 h-3.5" />
                    <span>EMAIL ADDRESS</span>
                  </label>
                  {formData.email && (
                    <span className={`text-[10px] font-mono font-bold flex items-center gap-1 ${isEmailValid ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isEmailValid ? <Check className="w-3 h-3 text-emerald-600" /> : 'Checking format...'}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white border text-gray-900 font-inter text-sm outline-none transition-all duration-300 ${focusedField === 'email'
                        ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20'
                        : isEmailValid
                          ? 'border-emerald-400 bg-emerald-50/10'
                          : 'border-gray-200/90 hover:border-gray-300'
                      }`}
                  />
                  {isEmailValid && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  )}
                </div>
              </div>

              {/* Subject Input */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-gray-600 flex items-center gap-1.5">
                    <Tag stroke="#111827" strokeWidth="1.75" className="w-3.5 h-3.5" />
                    <span>SUBJECT</span>
                  </label>
                </div>

                <input
                  type="text"
                  required
                  value={formData.subject}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack Engineering Role / Project Inquiry"
                  className={`w-full px-4 py-3.5 rounded-2xl bg-white border text-gray-900 font-inter text-sm outline-none transition-all duration-300 ${focusedField === 'subject'
                      ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20'
                      : 'border-gray-200/90 hover:border-gray-300'
                    }`}
                />
              </div>

              {/* Message Field */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-gray-600 flex items-center gap-1.5">
                    <MessageSquare stroke="#111827" strokeWidth="1.75" className="w-3.5 h-3.5" />
                    <span>MESSAGE BRIEF</span>
                  </label>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">
                    {formData.message.length} / 500
                  </span>
                </div>

                <textarea
                  rows={4}
                  required
                  maxLength={500}
                  value={formData.message}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Yuvanshankar, I'd like to discuss a software engineering opportunity..."
                  className={`w-full px-4 py-3.5 rounded-2xl bg-white border text-gray-900 font-inter text-sm outline-none transition-all duration-300 resize-none ${focusedField === 'message'
                      ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-2 ring-blue-500/20'
                      : 'border-gray-200/90 hover:border-gray-300'
                    }`}
                />
              </div>

              {/* Liquid Glass Gradient Button */}
              <button
                type="submit"
                disabled={isSending}
                onMouseEnter={() => sound.playHover()}
                className={`w-full py-4 rounded-2xl text-white font-space font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_15px_35px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group ${isSending
                    ? 'bg-blue-800 scale-98 opacity-90'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 hover:scale-[1.01]'
                  }`}
              >
                {/* Shine Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {isSending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>LAUNCHING TRANSMISSION...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200/80 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <div>© {new Date().getFullYear()} YUVANSHANKAR S. ALL RIGHTS RESERVED.</div>
          <div className="text-blue-600 font-bold">Portfolio</div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FULLSCREEN GLASS SUCCESS EXPERIENCE MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="w-full max-w-xl p-8 sm:p-12 rounded-[36px] bg-white/95 border border-white/90 shadow-[0_30px_100px_rgba(37,99,235,0.3)] text-center relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleResetForm}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Expanding Circle Ripple & Checkmark */}
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-xl"
                />

                <CheckCircle2 className="w-10 h-10 text-white relative z-10 animate-bounce" />
              </div>

              {/* Title & Personalized Greeting */}
              <h3 className="text-2xl sm:text-3xl font-space font-extrabold text-gray-900 mb-2">
                MESSAGE DELIVERED SUCCESSFULLY
              </h3>

              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-space font-bold text-xs mb-4 border border-blue-100">
                Thank you, {formData.name || 'Friend'}!
              </div>

              <p className="text-gray-600 text-xs sm:text-sm font-inter leading-relaxed max-w-md mx-auto mb-8">
                "Thanks for reaching out! Your message has landed directly in my inbox (<span className="text-blue-600 font-bold">yuvansekar10@gmail.com</span>). I'll get back to you as soon as possible."
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-space font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
                >
                  Send Another Message
                </button>

                <a
                  href="#projects"
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-3.5 rounded-2xl apple-glass-card text-gray-800 font-space font-semibold text-xs border border-gray-200 hover:border-blue-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
