import React, { useState } from 'react';
import { Info, AlertCircle, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const PrivacyScoreGauge: React.FC = () => {
  const { privacyScore } = usePrivacy();
  const [showModal, setShowModal] = useState<boolean>(false);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (privacyScore.score / 100) * circumference;

  const colorClass =
    privacyScore.ratingColor === 'green'
      ? 'text-emerald-400 stroke-emerald-500'
      : privacyScore.ratingColor === 'yellow'
      ? 'text-amber-400 stroke-amber-500'
      : 'text-red-400 stroke-red-500';

  const badgeBg =
    privacyScore.ratingColor === 'green'
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      : privacyScore.ratingColor === 'yellow'
      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      : 'bg-red-500/10 border-red-500/30 text-red-400';

  return (
    <div className="relative bg-cyber-card border border-cyber-border rounded-2xl p-6 flex flex-col items-center justify-between shadow-xl">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Privacy Score Rating
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Explain Breakdown</span>
        </button>
      </div>

      {/* SVG Circular Score Wheel */}
      <div className="relative my-4 flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-0.5">
            <span className="text-5xl font-extrabold font-mono text-white tracking-tight">
              {privacyScore.score}
            </span>
            <span className="text-sm font-mono text-slate-400">/100</span>
          </div>
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${badgeBg}`}>
            {privacyScore.ratingLabel}
          </div>
        </div>
      </div>

      <div className="w-full text-center space-y-2">
        <p className="text-xs text-slate-400">
          {privacyScore.deductions.length > 0
            ? `${privacyScore.deductions.length} privacy concerns deducted points from your 100 base score.`
            : 'Zero privacy risks detected in current active session.'}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors border border-slate-700"
        >
          <span>View Detailed Scoring Math</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Transparent Score Calculation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-cyber-border rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white font-mono text-base">Transparent Privacy Score Calculation</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-2.5 bg-slate-900/60 rounded-lg text-slate-300">
                <span>Base Privacy Score</span>
                <span className="text-emerald-400 font-bold">+100 pts</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {privacyScore.deductions.length === 0 ? (
                  <div className="p-4 text-center text-slate-400 bg-slate-900/30 rounded-lg">
                    No active deductions. Full privacy shield intact!
                  </div>
                ) : (
                  privacyScore.deductions.map((d, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg flex items-start justify-between gap-3 text-slate-300"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="font-semibold text-white">{d.reason}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-6">{d.details}</p>
                      </div>
                      <span className="text-red-400 font-bold shrink-0">-{d.points} pts</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-cyber-border pt-3 flex justify-between items-center text-sm font-bold">
                <span className="text-white">Final Calculated Score</span>
                <span className={`text-lg ${privacyScore.ratingColor === 'green' ? 'text-emerald-400' : privacyScore.ratingColor === 'yellow' ? 'text-amber-400' : 'text-red-400'}`}>
                  {privacyScore.score} / 100
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Privacy Gate uses explainable zero-trust scoring rather than black-box algorithms. Every score change is traceable to active network/storage activity.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold text-xs rounded-xl transition-all"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
