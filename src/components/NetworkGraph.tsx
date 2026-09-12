import React, { useState } from 'react';
import { DomainNode } from '../types/privacy';
import { Shield, ShieldAlert, Globe, X, Lock } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const NetworkGraph: React.FC = () => {
  const { requests } = usePrivacy();
  const [selectedNode, setSelectedNode] = useState<DomainNode | null>(null);

  // Core central topology nodes
  const nodes: DomainNode[] = [
    {
      id: 'you',
      name: 'YOU (Your Browser)',
      category: 'Client',
      requestsCount: requests.length,
      blockedCount: requests.filter(r => r.actionTaken === 'blocked').length,
      riskLevel: 'safe',
      isFirstParty: true,
      firstDetected: 'Session Start'
    },
    {
      id: 'origin',
      name: 'example.com',
      category: 'First-Party Site',
      requestsCount: 28,
      blockedCount: 0,
      riskLevel: 'safe',
      isFirstParty: true,
      firstDetected: '11:42:00'
    },
    {
      id: 'analytics',
      name: 'analytics.example.com',
      category: 'Analytics',
      requestsCount: 42,
      blockedCount: 42,
      riskLevel: 'medium',
      isFirstParty: false,
      firstDetected: '11:42:06'
    },
    {
      id: 'ads',
      name: 'ads.example.net',
      category: 'Advertising',
      requestsCount: 88,
      blockedCount: 88,
      riskLevel: 'high',
      isFirstParty: false,
      firstDetected: '11:42:07'
    },
    {
      id: 'tracker',
      name: 'tracker.example.net',
      category: 'Fingerprinting',
      requestsCount: 14,
      blockedCount: 14,
      riskLevel: 'high',
      isFirstParty: false,
      firstDetected: '11:42:08'
    },
    {
      id: 'cdn',
      name: 'cdn.example.com',
      category: 'Infrastructure',
      requestsCount: 65,
      blockedCount: 0,
      riskLevel: 'safe',
      isFirstParty: false,
      firstDetected: '11:42:07'
    },
    {
      id: 'social',
      name: 'social.example.net',
      category: 'Social Tracking',
      requestsCount: 31,
      blockedCount: 31,
      riskLevel: 'medium',
      isFirstParty: false,
      firstDetected: '11:42:10'
    }
  ];

  // Map coordinates in SVG view box (800x400)
  const coords: Record<string, { x: number; y: number }> = {
    you: { x: 120, y: 200 },
    origin: { x: 320, y: 200 },
    analytics: { x: 580, y: 80 },
    ads: { x: 620, y: 150 },
    tracker: { x: 640, y: 230 },
    cdn: { x: 580, y: 310 },
    social: { x: 520, y: 370 }
  };

  const links = [
    { from: 'you', to: 'origin' },
    { from: 'origin', to: 'analytics' },
    { from: 'origin', to: 'ads' },
    { from: 'origin', to: 'tracker' },
    { from: 'origin', to: 'cdn' },
    { from: 'origin', to: 'social' }
  ];

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyber-border pb-3">
        <div>
          <h3 className="font-bold text-white font-mono text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Third-Party Connection Topology Graph
          </h3>
          <p className="text-xs text-slate-400">
            Real-time visual map of outbound requests branching from first-party origin to third-party trackers.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> YOU
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Safe Origin
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Blocked 3rd Party
          </span>
        </div>
      </div>

      {/* SVG Animated Network Graph */}
      <div className="relative w-full h-[360px] bg-[#090d16] rounded-xl border border-cyber-border overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <defs>
            {/* Animated Connection Lines */}
            <linearGradient id="lineGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGradRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Draw Link Lines */}
          {links.map((link, idx) => {
            const start = coords[link.from];
            const end = coords[link.to];
            const isRed = link.to !== 'origin' && link.to !== 'cdn';
            return (
              <g key={idx}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isRed ? 'url(#lineGradRed)' : 'url(#lineGradBlue)'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Traveling Light Pulse Dot */}
                <circle r="3" fill={isRed ? '#ef4444' : '#60a5fa'}>
                  <animateMotion
                    path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                    dur={`${2 + (idx % 3)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

          {/* Draw Nodes */}
          {nodes.map(node => {
            const pos = coords[node.id];
            const isYou = node.id === 'you';
            const isOrigin = node.id === 'origin';
            const isBlocked = node.blockedCount > 0;
            const nodeColor = isYou ? '#3b82f6' : isOrigin ? '#10b981' : isBlocked ? '#ef4444' : '#06b6d4';

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Node Outer Glow Halo */}
                <circle
                  r={isYou ? 28 : 22}
                  fill={nodeColor}
                  fillOpacity="0.15"
                  stroke={nodeColor}
                  strokeWidth="1.5"
                  className="group-hover:scale-125 transition-transform"
                />

                {/* Node Center Circle */}
                <circle
                  r={isYou ? 18 : 14}
                  fill="#121824"
                  stroke={nodeColor}
                  strokeWidth="2.5"
                />

                {/* Label text */}
                <text
                  y={isYou ? 38 : 30}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {node.name}
                </text>

                {/* Category Badge Text */}
                <text
                  y={isYou ? 50 : 42}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {node.category}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Node Detail Drawer Modal overlay */}
        {selectedNode && (
          <div className="absolute top-4 right-4 max-w-xs w-full bg-[#121824]/95 border border-cyber-border rounded-xl p-4 shadow-2xl backdrop-blur-md z-20 space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-border pb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xs text-white font-mono">{selectedNode.name}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-white font-bold">{selectedNode.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Request Volume:</span>
                <span className="text-blue-400">{selectedNode.requestsCount} requests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Requests Blocked:</span>
                <span className={selectedNode.blockedCount > 0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {selectedNode.blockedCount} blocked
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Risk Assessment:</span>
                <span className={`uppercase font-bold ${selectedNode.riskLevel === 'high' ? 'text-red-400' : selectedNode.riskLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedNode.riskLevel}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedNode(null)}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Enforce Domain Block Rule
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
