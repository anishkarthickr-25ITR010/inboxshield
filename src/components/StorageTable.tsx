import React, { useState } from 'react';
import { StorageItem } from '../types/privacy';
import { Database, Cookie, HardDrive, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const StorageTable: React.FC = () => {
  const { storageItems } = usePrivacy();
  const [activeTab, setActiveTab] = useState<'All' | 'Cookie' | 'LocalStorage' | 'IndexedDB'>('All');

  const filteredItems = storageItems.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Cookie') return item.type === 'Cookie';
    if (activeTab === 'LocalStorage') return item.type === 'LocalStorage' || item.type === 'SessionStorage';
    if (activeTab === 'IndexedDB') return item.type === 'IndexedDB';
    return true;
  });

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyber-border pb-4">
        <div>
          <h3 className="font-bold text-white font-mono text-base flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            Client Storage & Cookie Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Audit client-side persistent state, tracking cookies, DOM LocalStorage, and IndexedDB vaults.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-900 p-1 border border-cyber-border rounded-xl">
          {['All', 'Cookie', 'LocalStorage', 'IndexedDB'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Educational Explainer Banner */}
      <div className="p-3.5 bg-purple-950/20 border border-purple-900/40 rounded-xl flex items-start gap-3 text-xs font-mono text-slate-300">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-white">Why Storage & Cookie Auditing Matters for Privacy:</span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            While first-party session cookies keep you logged into websites, <strong>persistent third-party cookies</strong> and DOM LocalStorage allow ad aggregators to reconstruct your cross-site browsing history across months.
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-cyber-border">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#090d16] text-slate-400 border-b border-cyber-border uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3">Domain</th>
              <th className="py-2.5 px-3">Storage Type</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3">Third-Party?</th>
              <th className="py-2.5 px-3">Risk Assessment</th>
              <th className="py-2.5 px-3">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border bg-cyber-card">
            {filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                  {item.type === 'Cookie' ? (
                    <Cookie className="w-3.5 h-3.5 text-purple-400" />
                  ) : (
                    <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  {item.name}
                </td>
                <td className="py-3 px-3 text-slate-300">{item.domain}</td>
                <td className="py-3 px-3 text-slate-400">{item.type}</td>
                <td className="py-3 px-3 text-slate-300">{item.duration}</td>
                <td className="py-3 px-3">
                  {item.isThirdParty ? (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-800 text-[10px] font-bold">
                      YES (3rd-Party)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-800 text-[10px]">
                      No (1st-Party)
                    </span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.riskLevel === 'High'
                        ? 'bg-red-500/20 text-red-400 border border-red-800'
                        : item.riskLevel === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-800'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-400 max-w-xs truncate" title={item.purpose}>
                  {item.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
