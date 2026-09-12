import React from 'react';
import { ShieldX, ShieldCheck, Check, AlertOctagon } from 'lucide-react';

export const BeforeAfterPanel: React.FC = () => {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-4 shadow-xl font-mono">
      <div className="border-b border-cyber-border pb-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Before / After Protection Impact Comparison
        </h3>
        <p className="text-xs text-slate-400">
          Visual demonstration of raw browser vulnerability versus zero-trust Privacy Gate firewall active.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WITHOUT PRIVACY GATE */}
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
          <div className="flex items-center gap-2 border-b border-red-900/40 pb-2">
            <ShieldX className="w-5 h-5 text-red-400" />
            <h4 className="font-bold text-red-400 text-sm">WITHOUT PRIVACY GATE</h4>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-red-950/40">
              <span className="text-slate-400">Trackers Active:</span>
              <span className="font-bold text-red-400">14 detected</span>
            </div>
            <div className="flex justify-between py-1 border-b border-red-950/40">
              <span className="text-slate-400">Third-Party Requests:</span>
              <span className="font-bold text-amber-400">27 requests</span>
            </div>
            <div className="flex justify-between py-1 border-b border-red-950/40">
              <span className="text-slate-400">Sensitive-Data Requests:</span>
              <span className="font-bold text-red-400">4 exposed</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-sm">
              <span className="text-slate-400">Total Blocked:</span>
              <span className="text-red-400">0 (0%)</span>
            </div>
          </div>

          <div className="p-2.5 bg-red-950/60 rounded-lg text-[11px] text-red-300 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            <span>Browser transmits tracking IDs, GPU hashes & user email directly to third-party ad networks.</span>
          </div>
        </div>

        {/* WITH PRIVACY GATE */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
          <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-emerald-400 text-sm">WITH PRIVACY GATE</h4>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-emerald-950/40">
              <span className="text-slate-400">Trackers Active:</span>
              <span className="font-bold text-emerald-400">14 identified</span>
            </div>
            <div className="flex justify-between py-1 border-b border-emerald-950/40">
              <span className="text-slate-400">Third-Party Requests:</span>
              <span className="font-bold text-blue-400">27 analyzed</span>
            </div>
            <div className="flex justify-between py-1 border-b border-emerald-950/40">
              <span className="text-slate-400">Sensitive-Data Requests:</span>
              <span className="font-bold text-emerald-400">4 neutralized</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-sm">
              <span className="text-slate-400">Total Blocked:</span>
              <span className="text-emerald-400">19 (70.3%)</span>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-950/60 rounded-lg text-[11px] text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero-Trust firewall drops tracking packets and sanitizes PII payload outbound requests.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
