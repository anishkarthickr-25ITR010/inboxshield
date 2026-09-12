import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Register Tamil-capable fonts ──────────────────────────────────────────────
FONT_REG  = "NotoSansTamil-Regular.ttf"
FONT_BOLD = "NotoSansTamil-Bold.ttf"

pdfmetrics.registerFont(TTFont("Tamil",     FONT_REG))
pdfmetrics.registerFont(TTFont("Tamil-Bold", FONT_BOLD))
# Fallback mapping so <b> tags work inside Paragraphs
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily("Tamil", normal="Tamil", bold="Tamil-Bold",
                   italic="Tamil", boldItalic="Tamil-Bold")

# ── Color palette ─────────────────────────────────────────────────────────────
DARK_NAVY   = colors.HexColor("#0a0d14")
ACCENT_BLUE = colors.HexColor("#1d4ed8")
EMERALD     = colors.HexColor("#059669")
AMBER       = colors.HexColor("#d97706")
TEXT_DARK   = colors.HexColor("#1e293b")
LIGHT_BLUE  = colors.HexColor("#eff6ff")

# ── Styles ────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def S(name, **kw):
    """Helper – create a ParagraphStyle based on Tamil font."""
    base    = kw.pop("parent", styles["Normal"])
    font    = kw.pop("fontName", "Tamil")
    leading = kw.pop("leading", 18)
    return ParagraphStyle(name, parent=base, fontName=font, leading=leading, **kw)

title_style    = S("Title",    fontSize=20, textColor=DARK_NAVY,   spaceAfter=4,
                   fontName="Tamil-Bold", leading=26)
subtitle_style = S("Subtitle", fontSize=11, textColor=ACCENT_BLUE, spaceAfter=10,
                   fontName="Tamil-Bold", leading=16)
h1_style       = S("H1",       fontSize=13, textColor=DARK_NAVY,   spaceAfter=8,
                   spaceBefore=14, fontName="Tamil-Bold", keepWithNext=True)
h2_style       = S("H2",       fontSize=11, textColor=ACCENT_BLUE, spaceAfter=5,
                   spaceBefore=10, fontName="Tamil-Bold", keepWithNext=True)
body_style     = S("Body",     fontSize=9.5, textColor=TEXT_DARK,  spaceAfter=5)
bullet_style   = S("Bullet",   fontSize=9.5, textColor=TEXT_DARK,  spaceAfter=4,
                   leftIndent=15, firstLineIndent=-10)
indent_style   = S("Indent",   fontSize=9.5, textColor=TEXT_DARK,  spaceAfter=5,
                   leftIndent=15)
note_style     = S("Note",     fontSize=9,   textColor=colors.HexColor("#374151"),
                   fontName="Tamil", leftIndent=10, spaceAfter=6)
blue_style     = S("Blue",     fontSize=9.5, textColor=colors.HexColor("#1e40af"),
                   leftIndent=15)

def B(text):   return f"<font name='Tamil-Bold'>{text}</font>"
def CYAN(text): return f"<font color='#0284c7'>{text}</font>"
def GREEN(text): return f"<font color='#059669'>{text}</font>"
def RED(text):  return f"<font color='#dc2626'>{text}</font>"
def AMBER_T(text): return f"<font color='#d97706'>{text}</font>"

def p(text, style=None):
    return Paragraph(text, style or body_style)

def h1(text): return p(text, h1_style)
def h2(text): return p(text, h2_style)
def bp(text): return p(f"• {text}", bullet_style)
def ind(text): return p(text, indent_style)
def sp(n=8):  return Spacer(1, n)
def hr():     return HRFlowable(width="100%", thickness=1.5,
                                color=ACCENT_BLUE, spaceAfter=10)

# ── Build story ───────────────────────────────────────────────────────────────
story = []

# ── COVER ─────────────────────────────────────────────────────────────────────
story += [
    p("PRIVACY GATE — TANGLISH GUIDE", title_style),
    p("Zero-Trust Browser Privacy Firewall | Hackathon Subtrack: SURVEILLANCE TRANSPARENCY",
      subtitle_style),
    hr(),
    p("இந்த guide Tanglish-ல இருக்கு — Tamil + English mix பண்ணி, "
      "beginners-கும் easy-ஆ புரியும்படி explain பண்ணோம்!", note_style),
    sp(12),
]

# ── SECTION 1 ─────────────────────────────────────────────────────────────────
story += [
    h1("1. Privacy Gate என்ன? (What is Privacy Gate?)"),
    p(f"{B('Simple-ஆ சொல்லணும்னா:')} நீங்க ஒரு website open பண்ண, "
      "உங்களுக்கு தெரியாம background-ல நிறைய hidden requests போகுது. "
      "Facebook, Google Analytics, DoubleClick — எல்லாம் உங்க data-வ திருடிக்கிட்டே இருக்கா. "
      f"Privacy Gate அந்த hidden traffic-ஐ எல்லாம் catch பண்ணி, user-க்கு {B('real-time-ல காட்டும்')} "
      "— ஒரு security firewall மாதிரி!"),
    p(f"{B('One-line tagline:')} "
      "\"Browser-ல என்ன நடக்குதுன்னு உனக்கே தெரியாம இருக்கா? Privacy Gate கண்டுபிடிக்கும்!\""),
    sp(10),
]

# ── SECTION 2 ─────────────────────────────────────────────────────────────────
story += [
    h1("2. நாம் Choose பண்ண Subtrack: SURVEILLANCE TRANSPARENCY"),
    p("Hackathon-ல 3 subtracks இருந்துச்சு. நாம் "
      f"{B('Surveillance Transparency')}-ஐ choose பண்ணோம் — "
      "ஏன்னா இது Privacy Gate-ஓட exact goal-க்கு match ஆகுது:"),
]

tbl = Table(
    [
        [p(B("Subtrack"), h2_style),
         p(B("Score"), h2_style),
         p(B("Tanglish Reason"), h2_style)],
        [p(B("Surveillance Transparency")),
         p(GREEN("SELECTED ✓ 10/10")),
         p("Hidden trackers-ஐ expose பண்றோம், data leak alert காட்றோம் — Perfect fit!")],
        [p("Local-First Privacy"),
         p(CYAN("9/10")),
         p("எல்லாம் browser-ல process — cloud-க்கு data போகல. Secondary strength.")],
        [p("Defense & Sandboxing"),
         p(AMBER_T("6/10")),
         p("Kernel-level isolation focus — நமக்கு browser-level, so partial match மட்டுமே.")],
    ],
    colWidths=[1.5*inch, 1.1*inch, 4.4*inch]
)
tbl.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e2e8f0")),
    ("GRID",       (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
    ("VALIGN",     (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING",    (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story += [tbl, sp(12)]

# ── SECTION 3 ─────────────────────────────────────────────────────────────────
story += [h1("3. Cybersecurity Concepts — Tanglish Explanation")]

concepts = [
    ("First-Party vs Third-Party Domain என்ன?",
     "நீங்க 'flipkart.com' open பண்ணா — அது First Party. "
     "ஆனா Flipkart background-ல 'googletagmanager.com', 'facebook.net' கிட்ட "
     "request அனுப்பும் — அவங்க Third Party. "
     "உங்களுக்கு தெரியாம நடக்கும் இந்த communication-தான் Privacy Gate catch பண்றது!"),

    ("Tracker என்ன? (What is a Tracker?)",
     "உங்க browser behavior-ஐ record பண்ற ஒரு hidden script. "
     "நீங்க எந்த button click பண்ணீங்க, எவ்வளவு நேரம் scroll பண்ணீங்க — "
     "எல்லாம் collect பண்ணி ads company-க்கு அனுப்பும். "
     "Privacy Gate இந்த trackers-ஐ detect பண்ணி காட்டும்: "
     "Analytics, Advertising, Social Tracking, Fingerprinting."),

    ("Browser Fingerprinting என்ன?",
     "Cookies block பண்ணாலும் கூட உங்களை identify பண்ண முடியும். எப்படி? "
     "Canvas API மூலம் உங்க GPU font rendering unique-ஆ இருக்கும். "
     "WebGL driver version, Audio API latency — இந்த combination "
     "உங்களை 99% accuracy-ல கண்டுபிடிக்கும். இதுக்கு Fingerprinting னு பேர். "
     "Privacy Gate இதை detect பண்ணி alert காட்டும்!"),

    ("Tracking Cookie என்ன?",
     "Third-party cookie-ல உங்களுக்கு ஒரு unique ID store ஆகும் — "
     "_ga (Google Analytics), _fbp (Facebook Pixel). "
     "இந்த ID 2 years வரை இருக்கும். நீங்க எந்த site போனாலும் "
     "same ID-மூலம் track ஆவீங்க. Privacy Gate storage inspector-ல "
     "இந்த cookies எல்லாம் list பண்ணும்."),

    ("PII Leak என்ன? (Sensitive Data Leak)",
     "PII = Personally Identifiable Information. உங்க email, IP address, "
     "phone number, auth token — இதை எல்லாம் HTTP POST body-ல "
     "background-ல third-party servers-க்கு website அனுப்பும். "
     "Privacy Gate இந்த payloads-ஐ scan பண்ணி real-time-ல alert காட்டும்."),

    ("Zero-Trust Model என்ன?",
     "Default-ஆ எந்த website-யும் trust பண்ணாதே — prove பண்ண சொல்லு. "
     "இதுதான் Zero-Trust philosophy. "
     "Privacy Gate every outbound request-ஐ suspicious-ஆ treat பண்ணி "
     "local firewall rules-ஐ check பண்ணும். Prove பண்ணாட்டா block பண்ணும்!"),
]

for title, desc in concepts:
    story += [bp(B(title)), ind(desc), sp(5)]

story.append(sp(10))

# ── SECTION 4 ─────────────────────────────────────────────────────────────────
story.append(PageBreak())
story += [
    h1("4. Privacy Gate Architecture — Tanglish Code Walkthrough"),
    p("Privacy Gate-ஓட code 6 main layers-ல இருக்கு. ஒவ்வொன்னா பாக்கலாம்:"),
    sp(6),
]

files = [
    {
        "title": "src/types/privacy.ts — Data Blueprints",
        "purpose": "இந்த file-ல எல்லா data-ஓட 'shape' define பண்றோம். TypeScript-ல இதை Interface னு சொல்வாங்க.",
        "fns": [
            ("NetworkRequest Interface",
             "ஒரு HTTP request-ஓட details store பண்றது: எந்த site-லிருந்து போகுது, "
             "எந்த domain-க்கு போகுது, GET/POST type என்ன, classification என்ன (tracker/allowed/leak)."),
            ("TrackerItem Interface",
             "Tracker-ஓட details: domain name, category (Analytics/Ads), "
             "risk level (LOW/MEDIUM/HIGH/CRITICAL), எத்தனை requests blocked."),
            ("SensitiveDataLeak Interface",
             "Detected leak-ஓட info: என்ன PII data இருக்கு (email, IP, token), "
             "raw payload snippet, blocked-ஆ இல்லையா."),
        ],
    },
    {
        "title": "src/utils/scoreCalculator.ts — Privacy Score Engine",
        "purpose": "100 points-லிருந்து start பண்ணி, bad activity-க்கு points deduct பண்றோம். "
                   "Final score judges-க்கு explain பண்ண easy-ஆ இருக்கும்!",
        "fns": [
            ("calculatePrivacyScore() function",
             "Start: 100 points. "
             "Tracker domain ஒவ்வொன்னுக்கும் -4 pts. "
             "3rd party cookie ஒவ்வொன்னுக்கும் -3 pts. "
             "Fingerprinting detect ஆனா -7 pts. "
             "PII leak கண்டுபிடிச்சா -10 pts. "
             "8-க்கு மேல 3rd party domains இருந்தா -2 pts each. "
             "Result: Score + Rating label + Deduction breakdown list."),
        ],
    },
    {
        "title": "src/utils/mockDataGenerator.ts — Traffic Simulator",
        "purpose": "Real browser traffic இல்லாம realistic-ஆ simulate பண்றோம். "
                   "Hackathon demo-க்கு இது super useful!",
        "fns": [
            ("generateRandomRequest()",
             "Random-ஆ real-world domain structures generate பண்றது: "
             "Google Analytics, Meta Pixel, DoubleClick, Canvas fingerprinters — "
             "இவை எல்லாம் realistic-ஆ simulate ஆகும்."),
            ("generateWebsiteScan(domain)",
             "User type பண்ற domain-ஓட hash calculate பண்ணி "
             "consistent audit report generate பண்றது. "
             "Same domain type பண்ண போக same result வரும்."),
        ],
    },
    {
        "title": "src/context/PrivacyContext.tsx — Global State & Demo Controller",
        "purpose": "React Context = Global state manager. "
                   "எல்லா components-உம் இந்த one place-லிருந்து data எடுக்கும். "
                   "Plus, hackathon demo attack scenario இங்கே control ஆகுது!",
        "fns": [
            ("triggerDemoAttack() — Hackathon Demo Function",
             "8-step automated demo scenario: "
             "(1) Site loading simulate → "
             "(2) Request surge (30+ requests in 2s) → "
             "(3) Canvas fingerprinting trap → "
             "(4) PII exfiltration alert (email + IP leak) → "
             "(5) Score drop 94 to 61 animate → "
             "(6) Zero-trust firewall auto-mitigation → "
             "(7) Trackers blocked count update → "
             "(8) Summary banner show. "
             "Judges-க்கு WOW effect guaranteed!"),
        ],
    },
    {
        "title": "src/components/NetworkGraph.tsx — SVG Topology Visualizer",
        "purpose": "Browser-ல request pathways-ஐ visual-ஆ காட்றது. "
                   "Animated dots travel பண்றது — real traffic watch பண்றது மாதிரி feel!",
        "fns": [
            ("NetworkGraph Component",
             "SVG canvas-ல nodes draw பண்றது: YOU (center) → origin site → "
             "branching third-party domains. "
             "Animated light pulse dots lines-வழியா travel பண்றது. "
             "Tracker domains RED-ல glow பண்ணும், safe domains GREEN-ல."),
        ],
    },
    {
        "title": "extension/ — Chrome Extension (Bonus!)",
        "purpose": "Real browser extension மாதிரி demonstrate பண்ண இந்த folder use ஆகுது. Manifest V3 format.",
        "fns": [
            ("background.js Service Worker",
             "Chrome browser-ல webRequest API மூலம் network calls intercept பண்றது. "
             "Content script-லிருந்து Canvas fingerprinting detection messages receive பண்றது. "
             "declarativeNetRequest rules மூலம் known trackers block பண்றது."),
        ],
    },
]

for f in files:
    story += [h2(f["title"]),
              p(f"Purpose: {f['purpose']}")]
    for fn_name, fn_desc in f["fns"]:
        story += [bp(B(fn_name)), ind(fn_desc)]
    story.append(sp(8))

# ── SECTION 5 ─────────────────────────────────────────────────────────────────
story.append(PageBreak())
story += [
    h1("5. Judges-க்கு Impress பண்ற Demo Script (Tanglish)"),
    p("இந்த exact order-ல present பண்ணு — guaranteed wow effect!"),
    sp(6),
]

demo_steps = [
    ("Step 1: Landing Page திற",
     "\"Privacy Gate — இது ஒரு zero-trust browser privacy firewall. "
     "நீங்க ஒரு website visit பண்ண போகும்போது உங்களுக்கு தெரியாம "
     "எத்தனை companies உங்க data collect பண்றாங்கன்னு real-time-ல காட்டுது.\""),

    ("Step 2: Dashboard Open பண்ணு",
     "\"பாருங்க — இப்போ privacy score 94/100. "
     "ஒவ்வொரு tracker detect ஆகும்போதும் இந்த score drop ஆகும்.\""),

    ("Step 3: Network Graph காட்டு",
     "\"இந்த graph-ல YOU center-ல இருக்கீங்க. "
     "ஒவ்வொரு dot ஒரு hidden request. RED nodes — trackers. GREEN nodes — safe domains.\""),

    ("Step 4: DEMO ATTACK Button Press பண்ணு",
     "\"நான் இப்போ simulate பண்றேன் — ஒரு malicious site visit பண்றீங்க.\" "
     "Button press பண்ணு, score 94 to 61 drop ஆகுது — judges shock ஆவாங்க!"),

    ("Step 5: Data Leak Page காட்டு",
     "\"பாருங்க — உங்க email, IP address ஒரு third-party server-க்கு "
     "POST request-ல போகுது. Privacy Gate இதை catch பண்ணி block பண்ணுது.\""),

    ("Step 6: Protection Controls காட்டு",
     "\"User இந்த controls மூலம் customize பண்ணலாம் — "
     "Analytics block, Fingerprinting block, Cookie strip. "
     "Zero-trust mode ON பண்ணா everything suspicious-ஆ treat ஆகும்.\""),

    ("Step 7: Before/After Comparison காட்டு",
     "\"Protection ON-ஆனதுக்கு முன்னாடி vs அப்புறம் — "
     "tracker count 12 to 0, score 61 to 98. இதுதான் Privacy Gate-ஓட power!\""),
]

for step, script in demo_steps:
    story += [
        bp(B(step)),
        p(f"Script: {script}", blue_style),
        sp(5),
    ]

sp(12)

# ── SECTION 6 ─────────────────────────────────────────────────────────────────
story += [
    h1("6. Judges Questions-க்கு Ready-ஆ இரு (Q&A Prep)"),
]

qa = [
    ("Q: Real browser traffic-ஐ intercept பண்றீங்களா?",
     "A: Prototype-ல mock data use பண்றோம் — realistic-ஆ simulate ஆகுது. "
     "Chrome Extension version (extension/ folder) real webRequest API use பண்றது. "
     "Production-ல full interception possible."),
    ("Q: Data எங்க store ஆகுது?",
     "A: 100% browser memory-ல மட்டுமே. "
     "No cloud server, no database, no external API calls. "
     "True local-first architecture."),
    ("Q: இது VPN-லிருந்து எப்படி different?",
     "A: VPN traffic encrypt பண்றது — ஆனா tracker-ஐ hide பண்றது இல்லை. "
     "Privacy Gate tracker-ஓட identity expose பண்றது — "
     "transparency tool, not a tunnel."),
    ("Q: Scale பண்ண முடியுமா?",
     "A: Browser extension-ஆ deploy பண்ணா millions of users-க்கு scale ஆகும். "
     "Local processing-தான் — server cost zero!"),
]

for q, a in qa:
    story += [bp(B(q)), ind(a), sp(6)]

# ── CLOSING ───────────────────────────────────────────────────────────────────
story += [
    sp(15), hr(),
    p(f"{B('Final Words:')} Privacy Gate simple idea-மா start ஆச்சு — "
      "'Browser-ல என்ன நடக்குதுன்னு user-க்கு தெரியணும்.' "
      "அந்த ஒரு goal-ஐ visually powerful-ஆ, technically credible-ஆ build பண்ணோம். "
      f"Judges-க்கு confidently present பண்ணு — {B('நம்ம team win பண்றது guaranteed!')}"),
]

# ── Generate PDF ──────────────────────────────────────────────────────────────
pdf_path = "Privacy_Gate_Tanglish_Guide.pdf"
doc = SimpleDocTemplate(
    pdf_path, pagesize=letter,
    rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
)
doc.build(story)
print(f"Tanglish PDF created successfully: {pdf_path}")
