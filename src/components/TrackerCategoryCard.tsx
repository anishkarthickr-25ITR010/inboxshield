import React from 'react';
import { TrackerItem, TrackerCategory } from '../types/privacy';
import { Eye, ShieldAlert, BarChart3, Share2, Fingerprint, Lock } from 'lucide-react';

interface TrackerCategoryCardProps {
  category: TrackerCategory;
  trackers: TrackerItem[];
}

export const TrackerCategoryCard: React.FC<TrackerCategoryCardProps> = ({ category, trackers }) => {
  const getCategoryIcon = (cat: TrackerCategory) => {
    switch (cat) {
      case 'Analytics':
        return <BarChart3 className="w-4 h-4 text-blue-400" />;
      case 'Advertising':
        return <Eye className="w-4 h-4 text-amber-400" />;
      case 'Social Tracking':
        return <Share2 className="w-4 h-4 text-purple-400" />;
      case 'Fingerprinting':
        return <Fingerprint className="w-4 h-4 text-rose-400" />;
    }
  };

  const getCategoryBadge = (cat: TrackerCategory) => {
    switch (cat) {
      case 'Analytics':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Advertising':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Social Tracking':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Fingerprinting':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-cyber-border pb-3">
        <div className="flex items-center gap-2">
          {getCategoryIcon(category)}
          <h3 className="font-bold text-white font-mono text-sm">{category}</h3>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getCategoryBadge(category)}`}>
            {trackers.length} Active Rules
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">Zero-Trust Inspection</span>
      </div>

      <div className="space-y-3">
        {trackers.map(tracker => (
          <div
            key={tracker.id}
            className="p-3.5 bg-slate-900/60 border border-cyber-border hover:border-slate-700 rounded-xl space-y-2 text-xs font-mono transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{tracker.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({tracker.domain})</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  tracker.riskLevel === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-800'
                    : tracker.riskLevel === 'high'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-800'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-800'
                }`}
              >
                {tracker.riskLevel} risk
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">{tracker.description}</p>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-800">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldAlert className="w-3 h-3 text-emerald-400" />
                Requests Blocked: <strong className="text-emerald-400">{tracker.blockedCount}</strong> / {tracker.requestsCount}
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Lock className="w-3 h-3" /> Shield Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
