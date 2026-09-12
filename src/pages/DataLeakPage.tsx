import React from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { DataLeakCard } from '../components/DataLeakCard';
import { AlertTriangle, Lock, ShieldCheck } from 'lucide-react';

export const DataLeakPage: React.FC = () => {
  const { sensitiveLeaks } = usePrivacy();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2>Sensitive Data Transmission Monitor (PII Leak Shield)</h2>
        </div>
        <p className="text-xs text-slate-400">
          Inspects outbound HTTP request parameters and body payloads for sensitive Personally Identifiable Information (Emails, IP addresses, Phone numbers, Device UUIDs, Authorization Bearer Tokens).
        </p>
      </div>

      <div className="space-y-4">
        {sensitiveLeaks.map(leak => (
          <DataLeakCard key={leak.id} leak={leak} />
        ))}
      </div>
    </div>
  );
};
