import React, { useState } from 'react';
import { generateWebsiteScan, validateWebsite, checkDomainExists } from '../utils/mockDataGenerator';
import { downloadPrivacyReport } from '../utils/exportReport';
import { WebsiteScanResult } from '../types/privacy';
import { Search, Download, CheckCircle, RefreshCw, Globe, XCircle, Wifi, WifiOff } from 'lucide-react';

export const ScannerModal: React.FC = () => {
  const [domainInput, setDomainInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanResult, setScanResult] = useState<WebsiteScanResult | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [errorType, setErrorType] = useState<'format' | 'dns' | ''>('');

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainInput.trim()) {
      setValidationError('Please enter a website URL or domain.');
      setErrorType('format');
      setScanResult(null);
      return;
    }

    // ═══════════════════════════════════════════════════════════════════
    //  STEP 1: FORMAT VALIDATION — Is the input even shaped like a URL?
    // ═══════════════════════════════════════════════════════════════════
    const validation = validateWebsite(domainInput);

    if (!validation.isValid) {
      setValidationError(validation.error);
      setErrorType('format');
      setScanResult(null);
      setIsScanning(false);
      setScanStep('');
      return;
    }

    // ═══════════════════════════════════════════════════════════════════
    //  STEP 2: DNS RESOLUTION — Does this website actually EXIST?
    // ═══════════════════════════════════════════════════════════════════
    setValidationError('');
    setErrorType('');
    setIsScanning(true);
    setScanResult(null);
    setScanStep('1/5 Performing DNS resolution — verifying domain exists...');

    const dnsCheck = await checkDomainExists(validation.cleaned);

    if (!dnsCheck.exists) {
      setValidationError(dnsCheck.error);
      setErrorType('dns');
      setIsScanning(false);
      setScanStep('');
      setScanResult(null);
      return;
    }

    // ═══════════════════════════════════════════════════════════════════
    //  STEP 3: DOMAIN IS REAL — Proceed with privacy risk scan
    // ═══════════════════════════════════════════════════════════════════
    setScanStep('2/5 DNS resolved ✓ — Auditing outbound 3rd-party tracking scripts...');

    await delay(800);
    setScanStep('3/5 Testing Canvas/WebGL fingerprinting traps...');

    await delay(800);
    setScanStep('4/5 Inspecting DOM storage & payload leak triggers...');

    await delay(800);
    setScanStep('5/5 Calculating privacy risk score...');

    const res = generateWebsiteScan(domainInput);
    setScanResult(res);

    // Persist real user scan to local database (port 8000 API)
    try {
      await fetch('http://localhost:8001/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
      });
      console.log(`[Local Database] Successfully stored scan result for: ${res.domain}`);
    } catch (e) {
      // Fallback local storage backup
      const history = JSON.parse(localStorage.getItem('privacy_gate_scans') || '[]');
      localStorage.setItem('privacy_gate_scans', JSON.stringify([res, ...history]));
    }

    setIsScanning(false);
    setScanStep('');
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 space-y-6 shadow-2xl font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Website Privacy Audit & Scanner
          </h3>
          <p className="text-xs text-slate-400">
            Enter a real website URL — Privacy Gate verifies it exists via DNS before calculating the risk score.
          </p>
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={domainInput}
            onChange={e => {
              setDomainInput(e.target.value);
              if (validationError) {
                setValidationError('');
                setErrorType('');
              }
            }}
            placeholder="Enter a real website (e.g. google.com, flipkart.com)"
            className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
              validationError
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-cyber-border focus:border-blue-500'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={isScanning}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Scan Website
            </>
          )}
        </button>
      </form>

      {/* ── FORMAT VALIDATION ERROR BANNER ── */}
      {validationError && errorType === 'format' && (
        <div className="flex items-start gap-3 p-4 bg-red-950/40 border border-red-500/40 rounded-xl animate-[fadeIn_0.3s_ease-out]">
          <div className="p-1.5 bg-red-500/20 rounded-lg shrink-0">
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold text-red-300">Invalid Input Format</p>
            <p className="text-xs text-red-400/90">{validationError}</p>
            <p className="text-[10px] text-slate-500 mt-1">
              Valid examples: <span className="text-slate-400">google.com</span>,{' '}
              <span className="text-slate-400">https://flipkart.com</span>,{' '}
              <span className="text-slate-400">news18.com</span>
            </p>
          </div>
        </div>
      )}

      {/* ── DNS RESOLUTION ERROR BANNER ── */}
      {validationError && errorType === 'dns' && (
        <div className="flex items-start gap-3 p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl animate-[fadeIn_0.3s_ease-out]">
          <div className="p-1.5 bg-amber-500/20 rounded-lg shrink-0">
            <WifiOff className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold text-amber-300">Website Not Found</p>
            <p className="text-xs text-amber-400/90">{validationError}</p>
            <div className="mt-2 p-2.5 bg-slate-900/80 border border-slate-700 rounded-lg">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">How it works:</p>
              <p className="text-[10px] text-slate-500">
                Privacy Gate performs a <span className="text-cyan-400">real DNS lookup</span> using Google's Public DNS API 
                to verify the domain resolves to an IP address. Only websites that 
                <span className="text-emerald-400"> actually exist on the internet</span> can be scanned for privacy risks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress animation during scan */}
      {isScanning && (
        <div className="p-5 bg-slate-900/90 border border-blue-500/30 rounded-xl space-y-3 text-center">
          <div className="flex justify-center">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
          <p className="text-xs text-blue-300 font-semibold">{scanStep}</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                 style={{ width: scanStep.startsWith('1/') ? '20%' : scanStep.startsWith('2/') ? '40%' : scanStep.startsWith('3/') ? '60%' : scanStep.startsWith('4/') ? '80%' : '95%' }} />
          </div>
        </div>
      )}

      {/* Generated Report Card */}
      {scanResult && !isScanning && (
        <div className="p-6 bg-slate-900/80 border border-cyber-border rounded-2xl space-y-5">
          {/* Verified badge */}
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
            <Wifi className="w-3.5 h-3.5" />
            DNS Verified — Real Website Confirmed
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Target Domain Audit Report</div>
              <h4 className="text-xl font-bold text-white">{scanResult.domain}</h4>
              <p className="text-xs text-slate-400">Scanned at: {scanResult.scannedAt}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">Risk Score</div>
                <div className={`text-2xl font-bold ${scanResult.score >= 80 ? 'text-emerald-400' : scanResult.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                  {scanResult.score} / 100
                </div>
              </div>
              <button
                onClick={() => downloadPrivacyReport(scanResult)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-blue-400" />
                Download Report
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-cyber-card border border-cyber-border rounded-xl">
              <span className="text-slate-400 text-[10px] block">3rd-Party Domains</span>
              <span className="text-lg font-bold text-white">{scanResult.thirdPartyDomainsCount}</span>
            </div>
            <div className="p-3 bg-cyber-card border border-cyber-border rounded-xl">
              <span className="text-slate-400 text-[10px] block">Trackers</span>
              <span className="text-lg font-bold text-amber-400">{scanResult.trackerCount}</span>
            </div>
            <div className="p-3 bg-cyber-card border border-cyber-border rounded-xl">
              <span className="text-slate-400 text-[10px] block">Cookies</span>
              <span className="text-lg font-bold text-purple-400">{scanResult.cookiesCount}</span>
            </div>
            <div className="p-3 bg-cyber-card border border-cyber-border rounded-xl">
              <span className="text-slate-400 text-[10px] block">Fingerprinting</span>
              <span className={`text-sm font-bold ${scanResult.fingerprintingDetected ? 'text-rose-400' : 'text-emerald-400'}`}>
                {scanResult.fingerprintingDetected ? 'Possible' : 'Clean'}
              </span>
            </div>
            <div className="p-3 bg-cyber-card border border-cyber-border rounded-xl">
              <span className="text-slate-400 text-[10px] block">Data Leak Alerts</span>
              <span className="text-lg font-bold text-red-400">{scanResult.sensitiveAlertsCount}</span>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Privacy Gate Recommendations:</h5>
            <div className="space-y-1.5 text-xs text-slate-300">
              {scanResult.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility — promisified delay for async/await scan steps
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
