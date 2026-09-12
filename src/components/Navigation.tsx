import React from 'react';
import {
  Shield,
  LayoutDashboard,
  Activity,
  Eye,
  Database,
  AlertTriangle,
  FileSearch,
  Sliders,
  Info,
  Zap,
  Radio,
  Lock
} from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { mode, setMode, triggerDemoAttack, isDemoAttackActive, protectionSettings } = usePrivacy();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trackers', label: 'Trackers', icon: Eye },
    { id: 'network', label: 'Network Monitor', icon: Activity },
    { id: 'storage', label: 'Storage Inspector', icon: Database },
    { id: 'dataleak', label: 'Data Leak Monitor', icon: AlertTriangle },
    { id: 'report', label: 'Privacy Report', icon: FileSearch },
    { id: 'protection', label: 'Protection', icon: Sliders },
    { id: 'about', label: 'About & Setup', icon: Info },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-cyber-border px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="relative p-2 bg-blue-600/10 rounded-xl border border-blue-500/30 text-blue-400">
            <Shield className="w-6 h-6 text-blue-400 animate-pulse-slow" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-white">PRIVACY GATE</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                PROTOTYPE V1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">Your browser. Your data. Your visibility.</p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-3">
          {/* Protection Active Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>🛡 PROTECTION ACTIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-cyber-card border border-cyber-border rounded-lg text-xs font-mono">
            <button
              onClick={() => setMode('live')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                mode === 'live' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3 h-3" />
              LIVE
            </button>
            <button
              onClick={() => setMode('demo')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                mode === 'demo' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              DEMO
            </button>
          </div>

          {/* Hackathon Demo Attack Button */}
          <button
            onClick={triggerDemoAttack}
            disabled={isDemoAttackActive}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-lg ${
              isDemoAttackActive
                ? 'bg-red-950 text-red-400 border border-red-800 cursor-not-allowed animate-pulse'
                : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-900/30 hover:scale-105 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {isDemoAttackActive ? 'ATTACK IN PROGRESS...' : '🎬 DEMO ATTACK'}
          </button>
        </div>
      </header>

      {/* Main Navigation Sidebar */}
      <aside className="fixed left-0 top-[61px] bottom-0 w-64 bg-[#0d121d] border-r border-cyber-border hidden lg:flex flex-col justify-between p-4 z-30">
        <nav className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            Monitoring & Controls
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:bg-cyber-card hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-glow" />}
              </button>
            );
          })}
        </nav>

        {/* Protection Quick Status Card */}
        <div className="p-3.5 bg-cyber-card border border-cyber-border rounded-xl space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span>Shield Mode</span>
            <span className="text-emerald-400 font-bold uppercase">{protectionSettings.level}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                protectionSettings.level === 'maximum'
                  ? 'w-full bg-red-500'
                  : protectionSettings.level === 'strict'
                  ? 'w-3/4 bg-amber-500'
                  : 'w-1/2 bg-emerald-500'
              }`}
            />
          </div>
          <p className="text-[11px] text-slate-400">Local Zero-Trust firewall active. Zero data leaves browser.</p>
        </div>
      </aside>

      {/* Mobile Horizontal Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d121d] border-t border-cyber-border px-2 py-2 flex items-center justify-around overflow-x-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-mono ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
