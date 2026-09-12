import React from 'react';
import { SecurityPrinciples } from '../components/SecurityPrinciples';
import { Chrome, Terminal, ShieldCheck, Download, Code, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-6 font-mono">
      <SecurityPrinciples />

      {/* Chrome Extension Setup Instructions for Hackathon Judges */}
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-cyber-border pb-3">
          <Chrome className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white text-base">Chrome Extension Manifest V3 Integration</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Privacy Gate includes a complete standalone Manifest V3 Chrome Extension codebase bundled in the <code className="text-blue-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">/extension</code> directory.
        </p>

        <div className="p-4 bg-slate-900 border border-cyber-border rounded-xl space-y-3 text-xs text-slate-300">
          <h4 className="font-bold text-white uppercase text-[11px]">How Judges Can Test live in Google Chrome:</h4>
          <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-300">
            <li>Open Chrome and navigate to <code className="text-amber-300">chrome://extensions/</code></li>
            <li>Enable <strong>Developer mode</strong> in the top-right toggle switch.</li>
            <li>Click <strong>Load unpacked</strong>.</li>
            <li>Select the <code className="text-blue-300">privacy-gate/extension</code> folder from this project directory.</li>
            <li>Click the Privacy Gate shield icon in your Chrome extensions bar to launch the popup firewall listener!</li>
          </ol>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Manifest V3 Ready (chrome.declarativeNetRequest)
          </span>
          <span className="text-[11px]">36-Hour Hackathon Submission</span>
        </div>
      </div>
    </div>
  );
};
