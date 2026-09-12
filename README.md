# 🛡️ PRIVACY GATE (by InboxShield) — Zero-Trust Browser Privacy Firewall

> **“You should know what your browser is sending before you trust a website.”**

**Repository URL**: [https://github.com/anishkarthickr-25ITR010/inboxshield.git](https://github.com/anishkarthickr-25ITR010/inboxshield.git)  
**Hackathon Subtrack**: 🎯 **SURVEILLANCE TRANSPARENCY**

Privacy Gate is a local-first browser privacy and zero-trust monitoring tool built for a 36-hour cybersecurity hackathon under the **Surveillance Transparency** subtrack. It acts as an inline privacy firewall between the user's browser and websites, bringing complete transparency to third-party trackers, cookies, fingerprinting scripts, and sensitive PII data leaks.

---

## 🏆 Why Surveillance Transparency is the Winning Subtrack

Privacy Gate was engineered specifically to address **Surveillance Transparency**:

1. **Exposing Hidden Tracking**: Unmasks background third-party domains (Google Analytics, Meta Pixel, DoubleClick, Canvas fingerprinters) that secretly receive requests during normal browsing.
2. **Third-Party Topology Network Graph**: Visualizes outbound connections branching from your browser to third-party tracking hubs in an interactive node-edge map.
3. **Transparent Score Math**: Eliminates black-box privacy scoring by providing an explainable breakdown (+100 base score with precise deduction math for every detected tracker, cookie, or leak).
4. **Sensitive PII Transmission Alerts**: Inspects outbound payloads for email addresses, IP addresses, device UUIDs, and auth tokens, offering single-click request blocking.
5. **Local-First Zero-Trust Architecture**: 100% of inspection, scoring, and firewall mitigation happens in local browser memory. Zero user browsing data leaves your machine.

---

## 🚀 Quick Start Guide

### Option A: 1-Click Standalone Browser Launch (No Setup Required)
Open `index_standalone.html` directly in any web browser:
```
C:\Users\reach\.gemini\antigravity\scratch\privacy-gate\index_standalone.html
```

### Option B: Local Node.js Development Server
```bash
npm install
npm run dev
```
The application will launch automatically at **`http://localhost:3000`**.

---

## 🎬 2-Minute Hackathon Presentation Script

To demonstrate the full capability of Privacy Gate to judges in under 2 minutes:

1. **Launch Dashboard**: Open `http://localhost:3000` or `index_standalone.html` → Click **Launch Dashboard**.
2. **Inspect Privacy Score**: Note the dynamic circular gauge (**82 / 100 — GOOD PRIVACY**). Click **"Explain Breakdown"** to view transparent point deduction math.
3. **Live Network Feed**: Click **"Simulate Traffic"** to watch live requests stream with color-coded classification badges (Allowed, Trackers, Fingerprinting, Sensitive Data Leaks). Click any row to inspect raw payload parameters.
4. **Third-Party Network Topology Graph**: Scroll to the interactive graph showing `YOU` → `origin site` → branching 3rd-party domains. Click any node to open the domain risk drawer.
5. **🎬 DEMO ATTACK Presentation**: Click the prominent **`🎬 DEMO ATTACK`** button in the header bar. Watch step-by-step:
   - Untrusted site loads (`malicious-ad-spawner.com`)
   - Surge of 10 tracking requests
   - Canvas/WebGL fingerprinting trap triggers
   - Sensitive PII data exfiltration alert exposed (Email, IP, Device ID)
   - Privacy score drops from `94 → 61 (HIGH PRIVACY THREAT)`
   - Privacy Gate Zero-Trust Firewall automatically engages and blocks 100% of malicious requests!
6. **Website Privacy Report**: Click **Privacy Report** in sidebar → enter any website domain (e.g. `example.com`) → click **Scan Website** → view recommendations and click **Download Report**.
7. **Protection Controls**: Toggle protection switches (Block Trackers, Anti-Fingerprinting, Cookie Shield, Strict Mode) or select **Strict / Maximum Mode** presets and watch the dashboard adapt in real-time.

---

## 🧩 Chrome Extension (Manifest V3) Setup

Privacy Gate includes a ready-to-load Manifest V3 Chrome Extension bundle:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle switch).
3. Click **Load unpacked**.
4. Select the `privacy-gate/extension` folder.
5. Click the Privacy Gate shield icon in Chrome to view the active popup listener.

---

## 📄 Repository & Subtrack Details
- **Git Remote**: `https://github.com/anishkarthickr-25ITR010/inboxshield.git`
- **Subtrack**: Surveillance Transparency
- **License**: MIT / Hackathon Submission
