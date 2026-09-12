import React from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { Zap, AlertTriangle, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const DemoAttackOverlay: React.FC = () => {
  const { isDemoAttackActive, demoAttackStep, demoAttackMessage } = usePrivacy();

  if (!isDemoAttackActive) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-2 border-red-500 rounded-2xl p-5 shadow-2xl space-y-4 font-mono animate-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-900/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-xl text-white animate-bounce">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
              🚨 HACKATHON DEMO ATTACK IN PROGRESS
            </h3>
            <p className="text-xs text-slate-300">
              Simulating rapid privacy threat escalation on untrusted website: <span className="text-amber-300 font-bold">malicious-ad-spawner.com</span>
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-red-900/60 border border-red-700 text-red-200 text-xs font-bold rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          STEP {demoAttackStep} OF 8
        </div>
      </div>

      {/* Message Step Output */}
      <div className="p-3 bg-black/60 rounded-xl border border-red-900/50 text-xs text-amber-200 font-bold">
        {demoAttackMessage}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"
          style={{ width: `${(demoAttackStep / 8) * 100}%` }}
        />
      </div>

      {/* Post Mitigation Summary (Steps 7 & 8) */}
      {demoAttackStep >= 7 && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl space-y-2 text-xs text-emerald-200">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            🛡️ PRIVACY GATE ACTIVE — SUSPICIOUS THREATS NEUTRALIZED!
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center">
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Requests Analyzed</span>
              <span className="font-bold text-white text-sm">24</span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Trackers Detected</span>
              <span className="font-bold text-amber-400 text-sm">8</span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Requests Blocked</span>
              <span className="font-bold text-red-400 text-sm">3</span>
            </div>
            <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Sensitive Leaks</span>
              <span className="font-bold text-emerald-400 text-sm">2 Prevented</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
