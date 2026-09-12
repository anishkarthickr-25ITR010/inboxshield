import { NetworkRequest, StorageItem, SensitiveDataLeak, PrivacyScoreBreakdown, ScoreDeduction } from '../types/privacy';

export function calculatePrivacyScore(
  requests: NetworkRequest[],
  storageItems: StorageItem[],
  sensitiveLeaks: SensitiveDataLeak[]
): PrivacyScoreBreakdown {
  const deductions: ScoreDeduction[] = [];
  
  // 1. Tracker Deductions
  const trackerRequests = requests.filter(r => r.classification === 'tracker');
  const uniqueTrackerDomains = new Set(trackerRequests.map(r => r.destinationDomain)).size;
  if (uniqueTrackerDomains > 0) {
    const pts = Math.min(25, uniqueTrackerDomains * 4);
    deductions.push({
      reason: `${uniqueTrackerDomains} active third-party tracker domains detected`,
      points: pts,
      category: 'trackers',
      details: `${trackerRequests.length} total tracking requests intercepted`
    });
  }

  // 2. Persistent 3rd-party Cookies
  const thirdPartyCookies = storageItems.filter(s => s.type === 'Cookie' && s.isThirdParty && s.riskLevel !== 'Low');
  if (thirdPartyCookies.length > 0) {
    const pts = Math.min(20, thirdPartyCookies.length * 3);
    deductions.push({
      reason: `${thirdPartyCookies.length} persistent third-party tracking cookies`,
      points: pts,
      category: 'cookies',
      details: `Includes tracking IDs stored across browsing sessions`
    });
  }

  // 3. Fingerprinting Signals
  const fingerprintRequests = requests.filter(r => r.classification === 'fingerprint');
  if (fingerprintRequests.length > 0) {
    const pts = Math.min(25, fingerprintRequests.length * 7);
    deductions.push({
      reason: `${fingerprintRequests.length} browser fingerprinting indicators`,
      points: pts,
      category: 'fingerprinting',
      details: `Canvas, WebGL, or Audio API probing detected`
    });
  }

  // 4. Sensitive Data Leaks
  const unblockedLeaks = sensitiveLeaks.filter(l => !l.blocked);
  if (unblockedLeaks.length > 0) {
    const pts = Math.min(30, unblockedLeaks.length * 10);
    deductions.push({
      reason: `${unblockedLeaks.length} sensitive data transmission alerts`,
      points: pts,
      category: 'leaks',
      details: `Email, device UUID, or location coordinates in outbound request body`
    });
  }

  // 5. Excessive 3rd-Party Domains
  const all3rdPartyDomains = new Set(
    requests
      .filter(r => r.sourceWebsite && !r.destinationDomain.includes(r.sourceWebsite.replace('www.', '')))
      .map(r => r.destinationDomain)
  ).size;

  if (all3rdPartyDomains > 8) {
    const excess = all3rdPartyDomains - 8;
    const pts = Math.min(15, excess * 2);
    deductions.push({
      reason: `${all3rdPartyDomains} third-party domains connected`,
      points: pts,
      category: 'thirdParty',
      details: `Excessive multi-domain connection graph`
    });
  }

  // Calculate final score
  const totalDeductions = deductions.reduce((acc, curr) => acc + curr.points, 0);
  const rawScore = Math.max(12, 100 - totalDeductions);

  let ratingLabel = 'EXCELLENT PRIVACY';
  let ratingColor: 'green' | 'yellow' | 'red' = 'green';

  if (rawScore < 55) {
    ratingLabel = 'HIGH PRIVACY THREAT';
    ratingColor = 'red';
  } else if (rawScore < 75) {
    ratingLabel = 'MODERATE RISK';
    ratingColor = 'yellow';
  } else if (rawScore < 90) {
    ratingLabel = 'GOOD PRIVACY';
    ratingColor = 'green';
  }

  return {
    score: rawScore,
    ratingLabel,
    ratingColor,
    deductions
  };
}
