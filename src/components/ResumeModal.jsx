import React from 'react';
import { sound } from '../utils/audioSynth';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

export default function ResumeModal({ onClose }) {
  const resumeUrl = "/YUVANSHANKAR_S_RESUME.pdf";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="apple-glass-panel p-4 sm:p-6 rounded-3xl border border-white/90 max-w-5xl w-full relative animate-fadeIn shadow-2xl bg-white my-4 text-gray-900 font-inter flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5 font-space font-bold text-sm sm:text-lg text-blue-600">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>YUVANSHANKAR S — OFFICIAL RESUME</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Download Button */}
            <a
              href={resumeUrl}
              download="YUVANSHANKAR_S_RESUME.pdf"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all scale-100 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Open in New Tab Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              aria-label="Close Resume Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Live PDF Viewer Container */}
        <div className="w-full flex-1 min-h-[500px] sm:min-h-[620px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-inner">
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0`}
            title="Yuvanshankar S Official Resume PDF"
            className="w-full h-full min-h-[500px] sm:min-h-[620px] border-none"
          />
        </div>

      </div>
    </div>
  );
}
