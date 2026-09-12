import React from 'react';
import { Lock, Eye, ShieldCheck, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

export const SecurityPrinciples: React.FC = () => {
  const principles = [
    {
      title: 'Local First Architecture',
      desc: 'All packet inspection, storage auditing, and score calculation run strictly inside local browser memory. Zero external telemetry servers required.',
      icon: Cpu,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      title: 'Zero Trust Monitoring',
      desc: 'Every third-party domain request is treated as untrusted by default until classified against local rule registries and payload signature matches.',
      icon: Lock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'Complete Transparency',
      desc: 'No secret ad-whitelists or black-box blocking. Privacy Gate exposes the full destination domain, request method, raw payload, and exact reason.',
      icon: Eye,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      title: 'Zero Data Collection',
      desc: 'Privacy Gate is built to protect user privacy—not monetize it. The firewall creates 0 analytics cookies, collects 0 logs, and sends 0 telemetry.',
      icon: ShieldCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      title: 'Explainable Privacy Scoring',
      desc: 'No mystery scores. Privacy Gate uses deterministic point deduction math (+100 base) so you know exactly which script or cookie reduced your score.',
      icon: Terminal,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30'
    }
  ];

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 space-y-6 shadow-xl font-mono">
      <div className="border-b border-cyber-border pb-3">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          Core Security Architecture & Zero-Trust Principles
        </h3>
        <p className="text-xs text-slate-400">
          Built for privacy transparency. Designed to give users absolute visibility over outbound browser activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-slate-900/70 border border-cyber-border hover:border-slate-700 rounded-xl space-y-3 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg border ${item.bg}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <h4 className="font-bold text-white text-xs">{item.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
