import React from 'react';
import { Shield, Activity, Eye, Lock, ArrowRight, Play, CheckCircle2, Terminal } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  const { triggerDemoAttack } = usePrivacy();

  const handleRunDemo = () => {
    onLaunch();
    setTimeout(() => {
      triggerDemoAttack();
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#0a0d14] text-slate-100 flex flex-col justify-between p-6 lg:p-12 space-y-12 font-sans">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
          <Shield className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>36-HOUR CYBERSECURITY HACKATHON PROTOTYPE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-mono">
          PRIVACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">GATE</span>
        </h1>

        <p className="text-lg sm:text-xl font-mono text-slate-300 max-w-2xl mx-auto">
          See what your browser doesn't tell you.
        </p>

        <p className="text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Privacy Gate gives you a transparent view of trackers, third-party requests, storage mechanisms, fingerprinting scripts, and potential data leaks happening while you browse.
        </p>

        {/* Hero Core Statement Box */}
        <div className="p-4 bg-cyber-card border border-blue-500/30 rounded-2xl max-w-2xl mx-auto shadow-2xl font-mono text-xs sm:text-sm text-blue-300 flex items-center justify-center gap-3">
          <Terminal className="w-5 h-5 text-blue-400 shrink-0" />
          <span>“You should know what your browser is sending before you trust a website.”</span>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono">
          <button
            onClick={onLaunch}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleRunDemo}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-900/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Run 🎬 DEMO ATTACK</span>
          </button>
        </div>
      </div>

      {/* Interactive Animated Architecture Diagram */}
      <div className="max-w-4xl mx-auto w-full bg-cyber-card border border-cyber-border rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="text-center space-y-1">
          <h3 className="text-sm font-mono font-bold uppercase text-white">How Privacy Gate Intercepts Traffic</h3>
          <p className="text-xs text-slate-400">Inline zero-trust evaluation between client browser and external third parties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-center relative items-center py-4">
          {/* Node 1: Browser */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div className="font-bold text-white">1. YOUR BROWSER</div>
            <p className="text-[11px] text-slate-400">Generates page requests & executes JS scripts.</p>
          </div>

          {/* Node 2: Privacy Gate Firewall */}
          <div className="p-4 bg-gradient-to-b from-blue-950/60 to-slate-900 border-2 border-blue-500 rounded-xl space-y-2 relative shadow-glow">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div className="font-bold text-blue-300">2. PRIVACY GATE</div>
            <p className="text-[11px] text-emerald-400 font-semibold">Zero-Trust Local Firewall & Payload Inspector</p>
          </div>

          {/* Node 3: Trackers & Web */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-300">3. WEB & TRACKERS</div>
            <p className="text-[11px] text-slate-400">Google Analytics, Meta Pixel, Ad Networks.</p>
          </div>
        </div>
      </div>

      {/* Feature Teasers */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-400 text-center">
        <div className="p-4 bg-slate-900/60 border border-cyber-border rounded-xl space-y-1">
          <span className="text-white font-bold block text-sm">🔒 Local-First</span>
          <span>Zero telemetry transmitted. All evaluation happens inside browser JS context.</span>
        </div>
        <div className="p-4 bg-slate-900/60 border border-cyber-border rounded-xl space-y-1">
          <span className="text-white font-bold block text-sm">📊 Explainable Score</span>
          <span>Transparent score math (+100 base) with clear deduction logs.</span>
        </div>
        <div className="p-4 bg-slate-900/60 border border-cyber-border rounded-xl space-y-1">
          <span className="text-white font-bold block text-sm">⚠️ Data Leak Monitor</span>
          <span>Inspects request payloads for sensitive email, IP, and device ID leaks.</span>
        </div>
      </div>
    </div>
  );
};
