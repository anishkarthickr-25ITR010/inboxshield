export type RequestClassification = 'allowed' | 'tracker' | 'suspicious' | 'fingerprint' | 'leak';

export type TrackerCategory = 'Analytics' | 'Advertising' | 'Social Tracking' | 'Fingerprinting';

export type ActionTaken = 'allowed' | 'blocked' | 'sanitized';

export interface NetworkRequest {
  id: string;
  timestamp: string;
  sourceWebsite: string;
  destinationDomain: string;
  requestType: 'GET' | 'POST' | 'OPTIONS' | 'PUT';
  classification: RequestClassification;
  category?: TrackerCategory | 'Infrastructure' | 'Essential';
  actionTaken: ActionTaken;
  payloadSnippet?: string;
  sensitiveDataDetected?: string[];
  sizeKb?: number;
}

export interface TrackerItem {
  id: string;
  name: string;
  category: TrackerCategory;
  domain: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  requestsCount: number;
  blockedCount: number;
  status: 'active' | 'blocked';
  description: string;
  firstSeen: string;
}

export interface StorageItem {
  id: string;
  name: string;
  domain: string;
  type: 'Cookie' | 'LocalStorage' | 'SessionStorage' | 'IndexedDB';
  duration: string;
  isThirdParty: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  sampleValue: string;
  purpose: string;
}

export interface SensitiveDataLeak {
  id: string;
  timestamp: string;
  destinationDomain: string;
  sourceWebsite: string;
  detectedItems: string[];
  payloadSnippet: string;
  blocked: boolean;
  riskScore: number;
}

export interface ProtectionSettings {
  blockTrackers: boolean;
  blockFingerprinting: boolean;
  blockThirdPartyCookies: boolean;
  sensitiveDataAlerts: boolean;
  strictMode: boolean;
  level: 'balanced' | 'strict' | 'maximum';
}

export interface ScoreDeduction {
  reason: string;
  points: number;
  category: 'trackers' | 'cookies' | 'fingerprinting' | 'leaks' | 'thirdParty';
  details: string;
}

export interface PrivacyScoreBreakdown {
  score: number;
  ratingLabel: string;
  ratingColor: 'green' | 'yellow' | 'red';
  deductions: ScoreDeduction[];
}

export interface DomainNode {
  id: string;
  name: string;
  category: string;
  requestsCount: number;
  blockedCount: number;
  riskLevel: 'safe' | 'medium' | 'high';
  isFirstParty: boolean;
  firstDetected: string;
}

export interface WebsiteScanResult {
  domain: string;
  score: number;
  thirdPartyDomainsCount: number;
  trackerCount: number;
  cookiesCount: number;
  fingerprintingDetected: boolean;
  sensitiveAlertsCount: number;
  recommendations: string[];
  scannedAt: string;
  detectedTrackers: string[];
}
