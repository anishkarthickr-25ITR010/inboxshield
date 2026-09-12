import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

pdf_filename = "Privacy_Gate_Beginner_Guide_and_Code_Walkthrough.pdf"

doc = SimpleDocTemplate(
    pdf_filename,
    pagesize=letter,
    rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
)

styles = getSampleStyleSheet()

# Custom Color Palette
DARK_NAVY = colors.HexColor("#0a0d14")
ACCENT_BLUE = colors.HexColor("#1d4ed8")
CYBER_CYAN = colors.HexColor("#0284c7")
EMERALD_GREEN = colors.HexColor("#059669")
AMBER_GOLD = colors.HexColor("#d97706")
ALERT_RED = colors.HexColor("#dc2626")
TEXT_DARK = colors.HexColor("#1e293b")

title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=DARK_NAVY,
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=ACCENT_BLUE,
    spaceAfter=12
)

h1_style = ParagraphStyle(
    'Heading1_Custom',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=14,
    leading=18,
    textColor=DARK_NAVY,
    spaceBefore=14,
    spaceAfter=8,
    keepWithNext=True
)

h2_style = ParagraphStyle(
    'Heading2_Custom',
    parent=styles['Heading3'],
    fontName='Helvetica-Bold',
    fontSize=11.5,
    leading=15,
    textColor=ACCENT_BLUE,
    spaceBefore=10,
    spaceAfter=6,
    keepWithNext=True
)

body_style = ParagraphStyle(
    'Body_Custom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_DARK,
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'Bullet_Custom',
    parent=body_style,
    leftIndent=15,
    firstLineIndent=-10,
    spaceAfter=4
)

story = []

# ==================== COVER / HEADER ====================
story.append(Paragraph("PRIVACY GATE (by InboxShield) — MASTER GUIDE", title_style))
story.append(Paragraph("Subtrack: <b>SURVEILLANCE TRANSPARENCY</b> | Repo: https://github.com/anishkarthickr-25ITR010/inboxshield.git", subtitle_style))
story.append(HRFlowable(width="100%", thickness=2, color=ACCENT_BLUE, spaceAfter=15))

# ==================== SECTION 1: HACKATHON SUBTRACK STRATEGY ====================
story.append(Paragraph("1. Hackathon Subtrack Decision & Winning Strategy", h1_style))

strategy_intro = (
    "<b>Selected Subtrack: SURVEILLANCE TRANSPARENCY (10/10 - WINNING FIT)</b><br/>"
    "Privacy Gate has been strategically aligned with the <b>Surveillance Transparency</b> subtrack. "
    "The core goal of the project is not simple ad blocking, but giving users total visibility into "
    "what their browser is transmitting behind their back before trusting any website."
)
story.append(Paragraph(strategy_intro, body_style))

# Subtrack Comparison Table
table_data = [
    [Paragraph("<b>Subtrack Name</b>", body_style), Paragraph("<b>Alignment Score</b>", body_style), Paragraph("<b>Judges' Key Criteria</b>", body_style), Paragraph("<b>Winning Verdict & Rationale</b>", body_style)],
    [
        Paragraph("<b>Surveillance Transparency</b>", body_style),
        Paragraph("<font color='#059669'><b>SELECTED (10/10)</b></font>", body_style),
        Paragraph("Visualizing hidden tracking, exposing 3rd-party domain topology, explainability, PII leak alerts.", body_style),
        Paragraph("<b>WINNING MATCH</b>. Exposes hidden third-party tracking hubs & payload leaks with full transparency math.", body_style)
    ],
    [
        Paragraph("<b>Local-First Privacy</b>", body_style),
        Paragraph("<font color='#0284c7'><b>9/10 (Secondary)</b></font>", body_style),
        Paragraph("On-device processing, zero cloud dependency, minimal data collection.", body_style),
        Paragraph("Runs 100% in local browser JS memory with 0 external telemetry servers.", body_style)
    ],
    [
        Paragraph("<b>Defense & Sandboxing</b>", body_style),
        Paragraph("<font color='#d97706'><b>6/10</b></font>", body_style),
        Paragraph("Malware isolation, hypervisors, kernel containerization.", body_style),
        Paragraph("Network & storage transparency firewall rather than a kernel hypervisor.", body_style)
    ]
]

t = Table(table_data, colWidths=[1.4*inch, 1.2*inch, 2.1*inch, 2.3*inch])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story.append(t)
story.append(Spacer(1, 10))

win_summary = (
    "<b>Winning Presentation Tagline for Judges:</b><br/>"
    "<i>'Privacy Gate exposes the hidden surveillance economy happening behind your browser without sending a single byte of your data to the cloud.'</i>"
)
story.append(Paragraph(win_summary, body_style))
story.append(Spacer(1, 15))

# ==================== SECTION 2: CYBERSECURITY BASICS FOR BEGINNERS ====================
story.append(Paragraph("2. Beginner-Friendly Cybersecurity Concepts", h1_style))

intro_cyber = (
    "Understanding web security fundamentals is essential for hackathon presentations. "
    "Here are the key concepts explained clearly:"
)
story.append(Paragraph(intro_cyber, body_style))

concepts = [
    ("First-Party vs. Third-Party Domains",
     "When you visit <b>example.com</b> (First Party), the site embeds scripts from external ad servers like <b>connect.facebook.net</b> (Third Party). Your browser automatically contacts these third parties behind your back."),

    ("What is a Tracker?",
     "A script or transparent pixel that records user behavior (clicks, duration, scroll depth) to build a cross-site behavioral profile."),

    ("What is Browser Fingerprinting?",
     "Probes unique hardware features (GPU font rendering on HTML5 Canvas, WebGL drivers, Audio API latency) to identify your computer with over 99% accuracy across the web without using cookies."),

    ("Persistent Storage & Tracking Cookies",
     "Third-party cookies (e.g. <code>_ga</code>, <code>fbp</code>) store unique IDs for up to 2 years, allowing ad networks to track your identity across different websites."),

    ("Sensitive Data Transmission (PII Leaks)",
     "Personally Identifiable Information (email, IP address, phone number, device UUID, auth tokens) leaked in background HTTP POST body payloads."),

    ("Zero-Trust Security Model",
     "Treats <i>every outbound request as untrusted</i> until verified against local firewall rules and signature matches.")
]

for title, desc in concepts:
    story.append(Paragraph(f"• <b>{title}</b>", bullet_style))
    story.append(Paragraph(desc, ParagraphStyle('Indented', parent=body_style, leftIndent=15)))
    story.append(Spacer(1, 4))

story.append(Spacer(1, 10))

# ==================== SECTION 3: LINE-BY-LINE CODE & FUNCTION EXPLANATION ====================
story.append(PageBreak())
story.append(Paragraph("3. Detailed Codebase & Function Breakdown", h1_style))

code_files = [
    {
        "filename": "src/types/privacy.ts",
        "purpose": "Central TypeScript data contracts and security interfaces.",
        "functions": [
            ("NetworkRequest Interface", "Defines intercepted HTTP traffic properties: timestamp, source site, destination domain, request type (GET/POST), classification ('allowed', 'tracker', 'fingerprint', 'leak'), and payload snippets."),
            ("TrackerItem Interface", "Defines tracker metadata: category ('Analytics', 'Advertising', 'Social Tracking', 'Fingerprinting'), domain, risk level, and block counters."),
            ("SensitiveDataLeak Interface", "Defines payload exfiltration alerts: detected PII items (email, IP, device UUID), raw HTTP body snippet, and block status.")
        ]
    },
    {
        "filename": "src/utils/scoreCalculator.ts",
        "purpose": "Transparent 100-point privacy score calculation engine.",
        "functions": [
            ("calculatePrivacyScore(requests, storageItems, sensitiveLeaks)", 
             "Baseline +100 points. Deducts: -4 pts per unique tracker domain, -3 pts per persistent 3rd-party cookie, -7 pts per fingerprinting signal, -10 pts per sensitive leak, -2 pts per excess 3rd-party domain (>8 connected). Returns score, rating label, and deduction list.")
        ]
    },
    {
        "filename": "src/utils/mockDataGenerator.ts",
        "purpose": "Traffic stream generator & domain scanner.",
        "functions": [
            ("generateRandomRequest(sourceWebsite)", "Generates synthetic HTTP requests targeting real-world domain structures (Google Analytics, Meta Pixel, DoubleClick, Canvas Fingerprinters)."),
            ("generateWebsiteScan(domainInput)", "Deterministically hashes any domain string (e.g. 'example.com') to generate a consistent multi-attribute security audit report card.")
        ]
    },
    {
        "filename": "src/context/PrivacyContext.tsx",
        "purpose": "React Context state provider & 🎬 DEMO ATTACK scenario controller.",
        "functions": [
            ("triggerDemoAttack() Function", "Core 8-step hackathon presentation controller: Simulates site loading → request surge → Canvas fingerprinting trap → PII exfiltration → score drop (94 → 61) → zero-trust firewall auto-mitigation → summary banner.")
        ]
    },
    {
        "filename": "src/components/NetworkGraph.tsx & PrivacyScoreGauge.tsx",
        "purpose": "Interactive SVG Network Topology Graph & Circular Gauge Wheel.",
        "functions": [
            ("NetworkGraph Component", "Renders SVG node-edge topology mapping YOU → origin site → branching 3rd-party domains with animated traveling light pulse dots.")
        ]
    },
    {
        "filename": "extension/manifest.json & background.js",
        "purpose": "Manifest V3 Chrome Extension source code.",
        "functions": [
            ("background.js Service Worker", "Listens for declarativeNetRequest rules and receives content script messages when Canvas fingerprinting is detected.")
        ]
    }
]

for file in code_files:
    story.append(Paragraph(f"<b>File: {file['filename']}</b>", h2_style))
    story.append(Paragraph(f"<i>Purpose:</i> {file['purpose']}", body_style))
    for fn_name, fn_desc in file['functions']:
        story.append(Paragraph(f"• <b>{fn_name}</b>", bullet_style))
        story.append(Paragraph(fn_desc, ParagraphStyle('IndentedCode', parent=body_style, leftIndent=15)))
    story.append(Spacer(1, 6))

doc.build(story)
print("PDF successfully updated:", pdf_filename)
