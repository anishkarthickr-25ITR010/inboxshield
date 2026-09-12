import React from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { TrackerCategoryCard } from '../components/TrackerCategoryCard';
import { TrackerCategory } from '../types/privacy';
import { Eye, ShieldCheck, Filter } from 'lucide-react';

export const TrackersPage: React.FC = () => {
  const { trackers } = usePrivacy();

  const categories: TrackerCategory[] = [
    'Analytics',
    'Advertising',
    'Social Tracking',
    'Fingerprinting'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 font-mono text-base font-bold text-white">
          <Eye className="w-5 h-5 text-amber-400" />
          <h2>Categorized Tracker Intelligence Database</h2>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Detects and blocks third-party tracking scripts across Analytics, Advertising networks, Social graph pixels, and Browser Fingerprinting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const categoryTrackers = trackers.filter(t => t.category === cat);
          return <TrackerCategoryCard key={cat} category={cat} trackers={categoryTrackers} />;
        })}
      </div>
    </div>
  );
};
