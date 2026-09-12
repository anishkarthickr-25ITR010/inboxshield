import React, { useState } from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { NetworkRequest } from '../types/privacy';
import {
  Activity,
  Play,
  Pause,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Fingerprint,
  FileCode,
  Search,
  Trash2
} from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { requests, isSimulating, toggleSimulation, clearRequests } = usePrivacy();
  const [filterClass, setFilterClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<NetworkRequest | null>(null);

  const filteredRequests = requests.filter(r => {
    const matchesSearch =
      r.destinationDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.sourceWebsite.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterClass === 'all') return matchesSearch;
    if (filterClass === 'allowed') return matchesSearch && r.classification === 'allowed';
    if (filterClass === 'tracker') return matchesSearch && r.classification === 'tracker';
    if (filterClass === 'fingerprint') return matchesSearch && r.classification === 'fingerprint';
    if (filterClass === 'leak') return matchesSearch && r.classification === 'leak';
    return matchesSearch;
  });

  const getStatusBadge = (r: NetworkRequest) => {
    if (r.actionTaken === 'blocked') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 font-semibold">
          <XCircle className="w-3 h-3 text-red-400" />
          Blocked
        </span>
      );
    }
    if (r.classification === 'suspicious') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Suspicious
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        Allowed
      </span>
    );
  };

  const getClassificationBadge = (r: NetworkRequest) => {
    switch (r.classification) {
      case 'tracker':
        return <span className="text-amber-400 font-mono">Tracker</span>;
      case 'fingerprint':
        return <span className="text-rose-400 font-mono flex items-center gap-1"><Fingerprint className="w-3 h-3" /> Fingerprinting</span>;
      case 'leak':
        return <span className="text-red-400 font-mono font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Data Leak</span>;
      case 'suspicious':
        return <span className="text-amber-300 font-mono">Suspicious 3rd-Party</span>;
      default:
        return <span className="text-slate-400 font-mono">Allowed Asset</span>;
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyber-border pb-4">
        <div>
          <h3 className="font-bold text-white font-mono text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Live Network Traffic Activity Stream
          </h3>
          <p className="text-xs text-slate-400">
            Real-time inspection of browser network requests classified by local zero-trust firewall.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              isSimulating
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600/30'
                : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5 text-blue-400" /> : <Play className="w-3.5 h-3.5" />}
            {isSimulating ? 'Simulating Traffic...' : 'Simulate Traffic'}
          </button>

          <button
            onClick={clearRequests}
            className="p-1.5 rounded-xl text-slate-400 hover:text-red-400 bg-slate-900 border border-cyber-border hover:border-red-900/50 transition-colors"
            title="Clear Feed Log"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['all', 'tracker', 'fingerprint', 'leak', 'allowed'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterClass(tab)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                filterClass === tab
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-cyber-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search domain..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-cyber-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Real-time Stream Table */}
      <div className="overflow-x-auto rounded-xl border border-cyber-border max-h-[380px] overflow-y-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#090d16] text-slate-400 sticky top-0 z-10 border-b border-cyber-border uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Source Site</th>
              <th className="py-2.5 px-3">Destination Domain</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Classification</th>
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3 text-right">Payload</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border bg-cyber-card">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No network requests matching current filters.
                </td>
              </tr>
            ) : (
              filteredRequests.map(r => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRequest(r)}
                  className="hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 text-slate-400">{r.timestamp}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{r.sourceWebsite}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-200">
                    <span className={r.classification === 'tracker' ? 'text-amber-300' : r.classification === 'fingerprint' ? 'text-rose-400' : r.classification === 'leak' ? 'text-red-400' : 'text-slate-300'}>
                      {r.destinationDomain}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {r.requestType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{getClassificationBadge(r)}</td>
                  <td className="py-2.5 px-3">{getStatusBadge(r)}</td>
                  <td className="py-2.5 px-3 text-right">
                    {r.payloadSnippet ? (
                      <span className="text-blue-400 flex items-center justify-end gap-1 hover:underline">
                        <FileCode className="w-3 h-3" /> Inspect
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payload Inspector Drawer Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-cyber-border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span>Payload Inspector: {selectedRequest.destinationDomain}</span>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-900/80 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[10px]">Timestamp</span>
                  <span className="text-white">{selectedRequest.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Request Type</span>
                  <span className="text-blue-400">{selectedRequest.requestType}</span>
                </div>
              </div>

              {selectedRequest.sensitiveDataDetected && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl space-y-1">
                  <span className="text-red-400 font-bold text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> SENSITIVE DATA EXPOSED:
                  </span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedRequest.sensitiveDataDetected.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-red-900/50 text-red-200 text-[10px]">
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1">Payload Content / Parameters:</span>
                <pre className="p-3 bg-slate-950 border border-cyber-border rounded-xl text-slate-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {selectedRequest.payloadSnippet || 'No body payload transmitted (Standard GET header)'}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded-xl"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
