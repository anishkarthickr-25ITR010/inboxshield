import React from 'react';
import { PrivacyScoreGauge } from '../components/PrivacyScoreGauge';
import { StatsCards } from '../components/StatsCards';
import { NetworkGraph } from '../components/NetworkGraph';
import { ActivityFeed } from '../components/ActivityFeed';
import { DemoAttackOverlay } from '../components/DemoAttackOverlay';
import { BeforeAfterPanel } from '../components/BeforeAfterPanel';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hackathon Demo Attack Banner when active */}
      <DemoAttackOverlay />

      {/* Stats Counters Grid */}
      <StatsCards />

      {/* Main Grid: Privacy Gauge + Network Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PrivacyScoreGauge />
        </div>
        <div className="lg:col-span-2">
          <NetworkGraph />
        </div>
      </div>

      {/* Live Activity Stream */}
      <ActivityFeed />

      {/* Before / After Comparison */}
      <BeforeAfterPanel />
    </div>
  );
};
