import React from 'react';
import {
  Activity,
  Eye,
  ShieldAlert,
  Globe,
  Cookie,
  Fingerprint,
  AlertTriangle
} from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const StatsCards: React.FC = () => {
  const { stats } = usePrivacy();

  const cards = [
    {
      title: 'Requests Intercepted',
      value: stats.intercepted.toLocaleString(),
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      tag: 'Total HTTP/S'
    },
    {
      title: 'Trackers Detected',
      value: stats.trackersDetected.toString(),
      icon: Eye,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      tag: 'Analytics & Ads'
    },
    {
      title: 'Trackers Blocked',
      value: stats.trackersBlocked.toString(),
      icon: ShieldAlert,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      tag: '75% Block Rate'
    },
    {
      title: 'Third-Party Domains',
      value: stats.thirdPartyDomains.toString(),
      icon: Globe,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      tag: 'Cross-Origin'
    },
    {
      title: 'Cookies Detected',
      value: stats.cookiesCount.toString(),
      icon: Cookie,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      tag: 'Storage Inspector'
    },
    {
      title: 'Fingerprinting Signals',
      value: stats.fingerprintingSignals.toString(),
      icon: Fingerprint,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      tag: 'Canvas & WebGL'
    },
    {
      title: 'Sensitive Data Alerts',
      value: stats.sensitiveAlerts.toString(),
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/20',
      tag: 'PII Transmission'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border bg-cyber-card border-cyber-border hover:border-slate-700 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate">{card.title}</span>
              <div className={`p-1.5 rounded-lg ${card.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${card.color}`} />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-bold font-mono text-white tracking-tight">{card.value}</div>
              <div className="text-[10px] font-mono text-slate-400 truncate">{card.tag}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
