import React, { useState } from 'react';
import { PrivacyProvider } from './context/PrivacyContext';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TrackersPage } from './pages/TrackersPage';
import { NetworkPage } from './pages/NetworkPage';
import { StoragePage } from './pages/StoragePage';
import { DataLeakPage } from './pages/DataLeakPage';
import { ReportPage } from './pages/ReportPage';
import { ProtectionPage } from './pages/ProtectionPage';
import { AboutPage } from './pages/AboutPage';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('landing');

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage onLaunch={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'trackers':
        return <TrackersPage />;
      case 'network':
        return <NetworkPage />;
      case 'storage':
        return <StoragePage />;
      case 'dataleak':
        return <DataLeakPage />;
      case 'report':
        return <ReportPage />;
      case 'protection':
        return <ProtectionPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header & Navigation Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className={`flex-1 ${activeTab === 'landing' ? '' : 'lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8'}`}>
        <div className={activeTab === 'landing' ? 'w-full' : 'max-w-7xl mx-auto'}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PrivacyProvider>
      <AppContent />
    </PrivacyProvider>
  );
}
