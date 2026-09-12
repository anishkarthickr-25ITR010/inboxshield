import React from 'react';
import { ActivityFeed } from '../components/ActivityFeed';
import { NetworkGraph } from '../components/NetworkGraph';

export const NetworkPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <NetworkGraph />
      <ActivityFeed />
    </div>
  );
};
