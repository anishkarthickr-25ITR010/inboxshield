import { NetworkRequest, TrackerItem, StorageItem, SensitiveDataLeak, WebsiteScanResult } from '../types/privacy';

export const INITIAL_REQUESTS: NetworkRequest[] = [
  {
    id: 'req-101',
    timestamp: '11:42:05',
    sourceWebsite: 'example.com',
    destinationDomain: 'google.com',
    requestType: 'GET',
    classification: 'allowed',
    category: 'Essential',
    actionTaken: 'allowed',
    sizeKb: 12.4
  },
  {
    id: 'req-102',
    timestamp: '11:42:06',
    sourceWebsite: 'example.com',
    destinationDomain: 'analytics.example.com',
    requestType: 'POST',
    classification: 'tracker',
    category: 'Analytics',
    actionTaken: 'blocked',
    payloadSnippet: '{"event":"pageview","cid":"8849201.22910","ts":1710240125}',
    sizeKb: 1.8
  },
  {
    id: 'req-103',
    timestamp: '11:42:07',
    sourceWebsite: 'example.com',
    destinationDomain: 'cdn.example.com',
    requestType: 'GET',
    classification: 'suspicious',
    category: 'Infrastructure',
    actionTaken: 'allowed',
    sizeKb: 145.2
  },
  {
    id: 'req-104',
    timestamp: '11:42:08',
    sourceWebsite: 'example.com',
    destinationDomain: 'tracker.example.net',
    requestType: 'GET',
    classification: 'fingerprint',
    category: 'Fingerprinting',
    actionTaken: 'blocked',
    payloadSnippet: 'canvas_hash=0x9f83a21b&webgl_vendor=ANGLE_NVIDIA&audio_ctx=0.00392',
    sizeKb: 0.9
  },
  {
    id: 'req-105',
    timestamp: '11:42:10',
    sourceWebsite: 'example.com',
    destinationDomain: 'connect.facebook.net',
    requestType: 'POST',
    classification: 'tracker',
    category: 'Social Tracking',
    actionTaken: 'blocked',
    payloadSnippet: 'ev=Subscribed&ud[email]=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    sizeKb: 2.3
  },
  {
    id: 'req-106',
    timestamp: '11:42:12',
    sourceWebsite: 'example.com',
    destinationDomain: 'telemetry.tracker.org',
    requestType: 'POST',
    classification: 'leak',
    category: 'Analytics',
    actionTaken: 'blocked',
    sensitiveDataDetected: ['Email address', 'IP address', 'Device ID'],
    payloadSnippet: 'user_email=user.test@demo-privacy.org&client_ip=192.168.1.105&uuid=a8f9-4321-b654',
    sizeKb: 3.1
  }
];

export const INITIAL_TRACKERS: TrackerItem[] = [
  {
    id: 'trk-1',
    name: 'Google Analytics',
    category: 'Analytics',
    domain: 'analytics.example.com',
    riskLevel: 'medium',
    requestsCount: 142,
    blockedCount: 140,
    status: 'blocked',
    description: 'Collects user behavior, duration, page clicks, and demographic insights.',
    firstSeen: '2026-09-12 10:15:00'
  },
  {
    id: 'trk-2',
    name: 'Meta Pixel',
    category: 'Social Tracking',
    domain: 'connect.facebook.net',
    riskLevel: 'high',
    requestsCount: 98,
    blockedCount: 98,
    status: 'blocked',
    description: 'Cross-site social graph tracker linking session identity to ad profile.',
    firstSeen: '2026-09-12 10:18:22'
  },
  {
    id: 'trk-3',
    name: 'DoubleClick Ad Network',
    category: 'Advertising',
    domain: 'stats.doubleclick.net',
    riskLevel: 'high',
    requestsCount: 215,
    blockedCount: 215,
    status: 'blocked',
    description: 'Behavioral ad profiling network tracking user interest cohorts.',
    firstSeen: '2026-09-12 10:20:05'
  },
  {
    id: 'trk-4',
    name: 'Canvas Fingerprinter',
    category: 'Fingerprinting',
    domain: 'tracker.example.net',
    riskLevel: 'critical',
    requestsCount: 12,
    blockedCount: 12,
    status: 'blocked',
    description: 'Renders hidden 2D/3D canvas elements to uniquely identify GPU font rendering signatures.',
    firstSeen: '2026-09-12 11:02:44'
  },
  {
    id: 'trk-5',
    name: 'Mixpanel Metrics',
    category: 'Analytics',
    domain: 'api.mixpanel.com',
    riskLevel: 'low',
    requestsCount: 45,
    blockedCount: 38,
    status: 'active',
    description: 'First-party application performance metrics and clickstream funnel logging.',
    firstSeen: '2026-09-12 11:30:10'
  }
];

export const INITIAL_STORAGE: StorageItem[] = [
  {
    id: 'stg-1',
    name: 'session_id',
    domain: 'example.com',
    type: 'Cookie',
    duration: 'Session',
    isThirdParty: false,
    riskLevel: 'Low',
    sampleValue: 's%3A98a21f7e3c98... (HttpOnly, Secure)',
    purpose: 'First-party application session identification and authentication state.'
  },
  {
    id: 'stg-2',
    name: 'tracking_id',
    domain: 'tracker.com',
    type: 'Cookie',
    duration: '365 days',
    isThirdParty: true,
    riskLevel: 'High',
    sampleValue: 'trk_v2_9874102948291048102948',
    purpose: 'Persistent cross-site tracking identifier shared with advertising demand side platforms.'
  },
  {
    id: 'stg-3',
    name: '_ga',
    domain: 'google-analytics.com',
    type: 'Cookie',
    duration: '730 days',
    isThirdParty: true,
    riskLevel: 'Medium',
    sampleValue: 'GA1.2.192049182.1710240125',
    purpose: 'Google Analytics visitor identifier used to aggregate session frequency.'
  },
  {
    id: 'stg-4',
    name: 'user_preferences_v1',
    domain: 'example.com',
    type: 'LocalStorage',
    duration: 'Persistent',
    isThirdParty: false,
    riskLevel: 'Low',
    sampleValue: '{"theme":"dark","compact":true,"currency":"USD"}',
    purpose: 'Local client UI settings and theme choices stored in browser DOM storage.'
  },
  {
    id: 'stg-5',
    name: 'fbp',
    domain: 'facebook.com',
    type: 'Cookie',
    duration: '90 days',
    isThirdParty: true,
    riskLevel: 'High',
    sampleValue: 'fb.1.1710240128.991827419',
    purpose: 'Meta advertising cookie storing browser fingerprint hash.'
  },
  {
    id: 'stg-6',
    name: 'cache_vector_db',
    domain: 'example.com',
    type: 'IndexedDB',
    duration: 'Persistent',
    isThirdParty: false,
    riskLevel: 'Low',
    sampleValue: 'Database: app_data (2 tables, 1.4 MB)',
    purpose: 'Local browser offline cache store for web application state.'
  }
];

export const INITIAL_LEAKS: SensitiveDataLeak[] = [
  {
    id: 'leak-1',
    timestamp: '11:42:12',
    sourceWebsite: 'example.com',
    destinationDomain: 'telemetry.tracker.org',
    detectedItems: ['Email address', 'IP address', 'Device ID'],
    payloadSnippet: 'POST /v1/collect HTTP/1.1\nHost: telemetry.tracker.org\nContent-Type: application/json\n\n{"user_email":"user.test@demo-privacy.org","ip":"192.168.1.105","device_id":"uuid-a8f9-4321"}',
    blocked: true,
    riskScore: 85
  },
  {
    id: 'leak-2',
    timestamp: '11:28:40',
    sourceWebsite: 'shop-demo.net',
    destinationDomain: 'ad-target.service.io',
    detectedItems: ['Phone number', 'Location coordinates'],
    payloadSnippet: 'GET /pixel.gif?phone=%2B1-555-019-2834&lat=37.7749&lng=-122.4194 HTTP/1.1',
    blocked: true,
    riskScore: 92
  },
  {
    id: 'leak-3',
    timestamp: '10:54:15',
    sourceWebsite: 'portal.example.com',
    destinationDomain: 'metrics-raw.net',
    detectedItems: ['Authentication token', 'IP address'],
    payloadSnippet: 'POST /log HTTP/1.1\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    blocked: true,
    riskScore: 98
  }
];

export function generateRandomRequest(source: string = 'example.com'): NetworkRequest {
  const domains = [
    { domain: 'analytics.example.com', class: 'tracker', cat: 'Analytics', action: 'blocked' },
    { domain: 'ads.example.net', class: 'tracker', cat: 'Advertising', action: 'blocked' },
    { domain: 'social.example.org', class: 'tracker', cat: 'Social Tracking', action: 'blocked' },
    { domain: 'tracker.example.net', class: 'fingerprint', cat: 'Fingerprinting', action: 'blocked' },
    { domain: 'cdn.example.com', class: 'allowed', cat: 'Infrastructure', action: 'allowed' },
    { domain: 'api.example.com', class: 'allowed', cat: 'Essential', action: 'allowed' },
    { domain: 'telemetry.data.io', class: 'leak', cat: 'Analytics', action: 'blocked' }
  ];

  const chosen = domains[Math.floor(Math.random() * domains.length)];
  const now = new Date();
  const timestamp = now.toTimeString().split(' ')[0];
  const reqTypes: ('GET' | 'POST' | 'OPTIONS')[] = ['GET', 'POST', 'OPTIONS'];
  const requestType = reqTypes[Math.floor(Math.random() * reqTypes.length)];

  let sensitiveDataDetected: string[] | undefined = undefined;
  let payloadSnippet: string | undefined = undefined;

  if (chosen.class === 'leak') {
    sensitiveDataDetected = ['Email address', 'Device identifier', 'IP address'];
    payloadSnippet = `user_email=john.smith@domain.com&client_ip=192.168.1.${Math.floor(Math.random() * 200)}&device_id=node-${Math.floor(Math.random() * 9000 + 1000)}`;
  } else if (chosen.class === 'fingerprint') {
    payloadSnippet = `canvas_readout=0x${Math.floor(Math.random() * 0xffffff).toString(16)}&webgl_vendor=ANGLE_DIRECT3D11`;
  } else if (chosen.class === 'tracker') {
    payloadSnippet = `{"sid":"${Math.random().toString(36).substring(2, 10)}","event":"click","url":"${source}"}`;
  }

  return {
    id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    sourceWebsite: source,
    destinationDomain: chosen.domain,
    requestType,
    classification: chosen.class as any,
    category: chosen.cat as any,
    actionTaken: chosen.action as any,
    payloadSnippet,
    sensitiveDataDetected,
    sizeKb: parseFloat((Math.random() * 15 + 0.5).toFixed(1))
  };
}

/**
 * Validates whether the input is a valid website domain or URL.
 *
 * Valid examples:
 *   example.com, https://example.com, www.news.co.in,
 *   sub.domain.org/path, http://192.168.1.1:8080
 *
 * Invalid examples:
 *   hello, 12345, just some random text, foo@bar, !!!
 *
 * Returns an object with:
 *   isValid  – boolean
 *   cleaned  – the extracted domain (only meaningful when isValid === true)
 *   error    – human-readable error message (only when isValid === false)
 */
export function validateWebsite(raw: string): {
  isValid: boolean;
  cleaned: string;
  error: string;
} {
  const trimmed = raw.trim();

  // ── Basic empty check ──────────────────────────────────────────────
  if (!trimmed) {
    return { isValid: false, cleaned: '', error: 'Please enter a website URL or domain.' };
  }

  // ── Strip protocol and www, extract domain portion ─────────────────
  const cleaned = trimmed
    .replace(/^(https?:\/\/)?(www\.)?/, '')   // remove protocol & www
    .split('/')[0]                             // drop path
    .split('?')[0]                             // drop query string
    .split('#')[0]                             // drop hash
    .split(':')[0]                             // drop port
    .toLowerCase();

  // ── Must not be empty after cleaning ───────────────────────────────
  if (!cleaned) {
    return { isValid: false, cleaned: '', error: 'Could not extract a valid domain from the input.' };
  }

  // ── Must not contain spaces ────────────────────────────────────────
  if (/\s/.test(cleaned)) {
    return {
      isValid: false,
      cleaned: '',
      error: `"${trimmed}" contains spaces — a valid domain cannot have spaces.`
    };
  }

  // ── Must contain at least one dot (TLD required) ───────────────────
  //    Exception: "localhost" is accepted for dev purposes.
  if (!cleaned.includes('.') && cleaned !== 'localhost') {
    return {
      isValid: false,
      cleaned: '',
      error: `"${trimmed}" is not a website. A valid domain must have a TLD (e.g. .com, .org, .in).`
    };
  }

  // ── Regex: valid domain characters (letters, digits, hyphens, dots) ─
  const domainRegex = /^[a-z0-9]([a-z0-9\-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]*[a-z0-9])?)+$/;
  const ipRegex     = /^(\d{1,3}\.){3}\d{1,3}$/;

  if (!domainRegex.test(cleaned) && !ipRegex.test(cleaned) && cleaned !== 'localhost') {
    return {
      isValid: false,
      cleaned: '',
      error: `"${trimmed}" contains invalid characters. Use only letters, numbers, hyphens, and dots.`
    };
  }

  // ── TLD must be at least 2 characters ──────────────────────────────
  if (!ipRegex.test(cleaned) && cleaned !== 'localhost') {
    const tld = cleaned.split('.').pop() || '';
    if (tld.length < 2) {
      return {
        isValid: false,
        cleaned: '',
        error: `"${trimmed}" has an invalid TLD ".${tld}". TLDs must be at least 2 characters (e.g. .com, .io).`
      };
    }
  }

  return { isValid: true, cleaned, error: '' };
}

export function generateWebsiteScan(domainInput: string): WebsiteScanResult | null {
  // ── Step 1: Validate that the input is actually a website ──────────
  const validation = validateWebsite(domainInput);
  if (!validation.isValid) {
    return null; // caller handles the error via validateWebsite()
  }

  const cleanDomain = validation.cleaned;

  // ── Step 2: Deterministic seed from domain string ──────────────────
  let hash = 0;
  for (let i = 0; i < cleanDomain.length; i++) {
    hash = cleanDomain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.max(38, Math.min(96, 100 - (Math.abs(hash) % 55)));
  const trackerCount = Math.abs(hash % 14) + 2;
  const thirdPartyDomainsCount = Math.abs(hash % 11) + 4;
  const cookiesCount = Math.abs(hash % 9) + 3;
  const fingerprintingDetected = (hash % 2) === 0;
  const sensitiveAlertsCount = (hash % 3) === 0 ? 2 : 0;

  const recommendations: string[] = [];
  if (trackerCount > 5) recommendations.push('Block known third-party tracking scripts immediately');
  if (fingerprintingDetected) recommendations.push('Enable Canvas & WebGL anti-fingerprinting traps');
  if (cookiesCount > 5) recommendations.push('Purge persistent cross-site tracking cookies');
  if (sensitiveAlertsCount > 0) recommendations.push('Enable payload sanitization for sensitive PII transmission');
  recommendations.push('Enforce Strict Privacy Gate firewall profile for this domain');

  return {
    domain: cleanDomain,
    score,
    thirdPartyDomainsCount,
    trackerCount,
    cookiesCount,
    fingerprintingDetected,
    sensitiveAlertsCount,
    recommendations,
    scannedAt: new Date().toLocaleTimeString(),
    detectedTrackers: [
      'google-analytics.com',
      'connect.facebook.net',
      'doubleclick.net',
      'criteo.com',
      'hotjar.com'
    ].slice(0, trackerCount)
  };
}
