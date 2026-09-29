import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';
import { Cpu, GitBranch, Terminal, Server, CheckCircle2, Play, Sparkles, Box, ShieldCheck } from 'lucide-react';

export default function DevOpsCommandCenter() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState([
    '[SYSTEM] Apple Data Center Pipeline Ready. Awaiting deployment trigger...'
  ]);
  const [deploySuccess, setDeploySuccess] = useState(false);

  const pipeline = [
    { title: 'GitHub Commit', icon: GitBranch, sub: 'git push origin main' },
    { title: 'Jenkins Build', icon: Terminal, sub: 'npm run test & build' },
    { title: 'Docker Container', icon: Box, sub: 'docker build -t app:v2' },
    { title: 'Kubernetes Pods', icon: Cpu, sub: 'kubectl apply -f deployment.yaml' },
    { title: 'AWS EC2 Deployment', icon: Server, sub: 'Nginx Proxy 200 OK' }
  ];

  const triggerDeployment = () => {
    if (isDeploying) return;
    sound.playDeploy();
    setIsDeploying(true);
    setDeploySuccess(false);
    setActiveStep(0);
    setLogs(['[DEVOPS_PIPELINE] Initializing Apple Data Center Deployment sequence...']);

    const stepDuration = 800;

    pipeline.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        sound.playClick();
        setLogs((prev) => [
          ...prev,
          `[STAGE 0${idx + 1}] Executing ${step.title} (${step.sub})... SUCCESS!`
        ]);

        if (idx === pipeline.length - 1) {
          setTimeout(() => {
            setIsDeploying(false);
            setDeploySuccess(true);
            sound.playAchievement();
            setLogs((prev) => [
              ...prev,
              '[SUCCESS] 🎉 Deployment Complete! Production cluster healthy at 100% SLA uptime.'
            ]);
          }, 800);
        }
      }, (idx + 1) * stepDuration);
    });
  };

  return (
    <section id="devops" className="py-24 relative z-10 px-4 bg-[#F7FBFF]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            DEVOPS <span className="text-gradient-primary">CI/CD PIPELINE BASICS</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-inter">
            Interactive simulation of containerized deployment fundamentals. Click "TRIGGER DEPLOYMENT" to trace the automated workflow from commit to cloud hosting.
          </p>
        </div>

        {/* 3D Glass Pipeline Container */}
        <div className="apple-glass-panel p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-[0_30px_80px_rgba(120,130,180,0.12)] relative">
          
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
              <span className="font-mono text-xs text-gray-800 font-bold uppercase tracking-wider">
                PIPELINE ENV: DEVOPS-BASIC-BUILD-01
              </span>
            </div>

            <button
              onClick={triggerDeployment}
              disabled={isDeploying}
              onMouseEnter={() => sound.playHover()}
              className={`px-6 py-3.5 rounded-2xl font-space font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 ${
                isDeploying
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 shadow-[0_15px_35px_rgba(37,99,235,0.3)]'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDeploying ? 'DEPLOYING PIPELINE...' : 'TRIGGER DEPLOYMENT'}</span>
            </button>
          </div>

          {/* Pipeline Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 relative">
            {pipeline.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx || deploySuccess;

              return (
                <div
                  key={step.title}
                  className={`apple-glass-card p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center relative ${
                    isActive
                      ? 'border-blue-500 bg-blue-50/80 shadow-[0_15px_35px_rgba(37,99,235,0.15)] scale-105'
                      : isPassed
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-gray-200 bg-white/80'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                      isPassed
                        ? 'bg-emerald-600 text-white font-bold'
                        : isActive
                        ? 'bg-blue-600 text-white font-bold animate-pulse'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>

                  <h4 className="font-space font-bold text-sm text-gray-900 mb-1">{step.title}</h4>
                  <span className="text-[10px] font-mono text-gray-500">{step.sub}</span>

                  {idx < pipeline.length - 1 && (
                    <>
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-blue-500 font-mono text-xs font-bold">
                        ➔
                      </div>
                      <div className="block md:hidden my-1 text-blue-500 font-mono text-xs font-bold text-center">
                        👇
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Terminal Console */}
          <div className="bg-gray-900 rounded-2xl p-5 font-mono text-xs text-blue-300 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 text-gray-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>k8s-stdout // apple data center stream</span>
              </div>
              <span className="text-emerald-400 text-[10px]">LOG_LEVEL: INFO</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-400">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {deploySuccess && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-space font-bold text-sm animate-bounce flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>PRODUCTION DEPLOYMENT 100% SUCCESSFUL! ALL KUBERNETES PODS HEALTHY.</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
