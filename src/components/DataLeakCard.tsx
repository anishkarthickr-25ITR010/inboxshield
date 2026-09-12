import React from 'react';
import { SensitiveDataLeak } from '../types/privacy';
import { AlertTriangle, ShieldCheck, Lock, Terminal, Check } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

interface DataLeakCardProps {
  leak: SensitiveDataLeak;
}

export const DataLeakCard: React.FC<DataLeakCardProps> = ({ leak }) => {
  const { blockLeak } = usePrivacy();

  return (
    <div className={`p-5 rounded-2xl border transition-all shadow-xl font-mono ${
      leak.blocked
        ? 'bg-cyber-card border-emerald-500/40 text-slate-300'
        : 'bg-red-950/25 border-red-800/70 text-slate-200 animate-pulse-slow'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyber-border pb-3">
        <div className="flex items-center gap-2">
          {leak.blocked ? (
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 animate-ping">
              <AlertTriangle className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className={`font-bold text-sm ${leak.blocked ? 'text-emerald-400' : 'text-red-400'}`}>
              {leak.blocked ? '🛡️ SENSITIVE DATA LEAK BLOCKED' : '⚠ SENSITIVE DATA DETECTED IN TRANSMISSION'}
            </span>
            <div className="text-[11px] text-slate-400">
              Source: <span className="text-white">{leak.sourceWebsite}</span> | Timestamp: {leak.timestamp}
            </div>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
          leak.blocked
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-800'
            : 'bg-red-500/20 text-red-400 border border-red-800'
        }`}>
          Risk Score: {leak.riskScore}/100
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
        {/* Destination & Items detected */}
        <div className="space-y-2">
          <div>
            <span className="text-slate-400 text-[10px] uppercase">Destination Domain:</span>
            <div className="text-white font-bold text-sm flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              {leak.destinationDomain}
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase">Detected Sensitive Attributes:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {leak.detectedItems.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-300 font-semibold text-[11px]"
                >
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Payload Snippet */}
        <div className="space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Raw Synthetic Payload Inspect:</span>
          <pre className="p-2.5 bg-slate-950 border border-cyber-border rounded-xl text-[10px] text-amber-300 overflow-x-auto max-h-24 whitespace-pre-wrap">
            {leak.payloadSnippet}
          </pre>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between border-t border-cyber-border pt-3">
        <span className="text-[11px] text-slate-400">
          Status: {leak.blocked ? 'Request dropped before transmission' : 'Pending firewall mitigation action'}
        </span>

        {leak.blocked ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <Check className="w-4 h-4" />
            PROTECTED BY PRIVACY GATE
          </div>
        ) : (
          <button
            onClick={() => blockLeak(leak.id)}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/30 transition-all flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            [BLOCK REQUEST]
          </button>
        )}
      </div>
    </div>
  );
};
