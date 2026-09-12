import React from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { Sliders, Shield, Lock, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export const ProtectionPage: React.FC = () => {
  const { protectionSettings, updateProtectionSettings, setProtectionLevel } = usePrivacy();

  const handleToggle = (key: keyof typeof protectionSettings) => {
    if (typeof protectionSettings[key] === 'boolean') {
      updateProtectionSettings({ [key]: !protectionSettings[key] });
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <Sliders className="w-5 h-5 text-blue-400" />
          <h2>Zero-Trust Protection Firewall Controls</h2>
        </div>
        <p className="text-xs text-slate-400">
          Configure local interception policies, strictness levels, and anti-fingerprinting traps.
        </p>
      </div>

      {/* Preset Level Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balanced Preset */}
        <button
          onClick={() => setProtectionLevel('balanced')}
          className={`p-5 rounded-2xl border text-left space-y-3 transition-all ${
            protectionSettings.level === 'balanced'
              ? 'bg-emerald-950/30 border-emerald-500 shadow-xl ring-1 ring-emerald-500'
              : 'bg-cyber-card border-cyber-border hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              🟢 BALANCED MODE
            </span>
            {protectionSettings.level === 'balanced' && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Blocks known aggressive trackers & 3rd-party cookies while preserving standard website functionality.
          </p>
        </button>

        {/* Strict Preset */}
        <button
          onClick={() => setProtectionLevel('strict')}
          className={`p-5 rounded-2xl border text-left space-y-3 transition-all ${
            protectionSettings.level === 'strict'
              ? 'bg-amber-950/30 border-amber-500 shadow-xl ring-1 ring-amber-500'
              : 'bg-cyber-card border-cyber-border hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-amber-400 flex items-center gap-2">
              🟡 STRICT MODE
            </span>
            {protectionSettings.level === 'strict' && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Blocks Canvas fingerprinting, cross-origin trackers, and strips tracking parameters from URL queries.
          </p>
        </button>

        {/* Maximum Preset */}
        <button
          onClick={() => setProtectionLevel('maximum')}
          className={`p-5 rounded-2xl border text-left space-y-3 transition-all ${
            protectionSettings.level === 'maximum'
              ? 'bg-red-950/30 border-red-500 shadow-xl ring-1 ring-red-500'
              : 'bg-cyber-card border-cyber-border hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-red-400 flex items-center gap-2">
              🔴 MAXIMUM SHIELD
            </span>
            {protectionSettings.level === 'maximum' && (
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Paranoid zero-trust firewall: drops all unverified 3rd-party domains & blocks script payload transmission.
          </p>
        </button>
      </div>

      {/* Individual Feature Switch Toggles */}
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 space-y-5">
        <h3 className="font-bold text-white text-sm border-b border-cyber-border pb-3">
          Granular Firewall Rule Switches
        </h3>

        <div className="space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-cyber-border">
            <div>
              <span className="font-bold text-white text-xs block">Block Known Trackers</span>
              <span className="text-[11px] text-slate-400">Intersects request domains against local Disconnect/EasyList rules.</span>
            </div>
            <button
              onClick={() => handleToggle('blockTrackers')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                protectionSettings.blockTrackers ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  protectionSettings.blockTrackers ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-cyber-border">
            <div>
              <span className="font-bold text-white text-xs block">Block Fingerprinting Signals</span>
              <span className="text-[11px] text-slate-400">Intercepts Canvas, WebGL vendor queries & Web Audio API probes.</span>
            </div>
            <button
              onClick={() => handleToggle('blockFingerprinting')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                protectionSettings.blockFingerprinting ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  protectionSettings.blockFingerprinting ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-cyber-border">
            <div>
              <span className="font-bold text-white text-xs block">Block Third-Party Cookies</span>
              <span className="text-[11px] text-slate-400">Prevents cross-site cookie set-header operations.</span>
            </div>
            <button
              onClick={() => handleToggle('blockThirdPartyCookies')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                protectionSettings.blockThirdPartyCookies ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  protectionSettings.blockThirdPartyCookies ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-cyber-border">
            <div>
              <span className="font-bold text-white text-xs block">Sensitive Data Payload Alerts</span>
              <span className="text-[11px] text-slate-400">Monitors outbound POST body payloads for email, IP, and UUID leaks.</span>
            </div>
            <button
              onClick={() => handleToggle('sensitiveDataAlerts')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                protectionSettings.sensitiveDataAlerts ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  protectionSettings.sensitiveDataAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 5 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/60 rounded-xl border border-cyber-border">
            <div>
              <span className="font-bold text-white text-xs block">Strict Zero-Trust Mode</span>
              <span className="text-[11px] text-slate-400">Enforces hard block on any unverified third-party asset domain.</span>
            </div>
            <button
              onClick={() => handleToggle('strictMode')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                protectionSettings.strictMode ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  protectionSettings.strictMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
