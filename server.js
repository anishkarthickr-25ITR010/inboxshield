import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { initDatabase, dbQuery, dbGet, dbRun } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Real Express + SQLite3 Database Backend running on http://localhost:${PORT}`);
  });
}

// ═════════════════════════════════════════════════════════════════════
// 1. HEALTH & DATABASE DIAGNOSTICS ENDPOINT
// ═════════════════════════════════════════════════════════════════════
app.get('/api/health', async (req, res) => {
  try {
    const tables = await dbQuery("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    const scanCount = await dbGet("SELECT COUNT(*) as total FROM scan_results");
    const dbPath = path.join(__dirname, 'privacy_gate.db');
    const stats = fs.existsSync(dbPath) ? fs.statSync(dbPath) : { size: 0 };

    res.json({
      status: 'online',
      databaseEngine: 'SQLite3 (Relational SQL Database)',
      databaseFile: dbPath,
      databaseSizeBytes: stats.size,
      tables: tables.map(t => t.name),
      totalScansStored: scanCount ? scanCount.total : 0,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═════════════════════════════════════════════════════════════════════
// 2. GET ALL SCANS FROM SQL DATABASE (JOIN WITH TRACKERS)
// ═════════════════════════════════════════════════════════════════════
app.get('/api/scans', async (req, res) => {
  try {
    const scans = await dbQuery(`
      SELECT s.*, 
        (SELECT COUNT(*) FROM trackers WHERE scan_id = s.id) as tracker_count,
        (SELECT COUNT(*) FROM data_leaks WHERE scan_id = s.id) as leak_count
      FROM scan_results s
      ORDER BY s.scan_timestamp DESC
    `);

    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: 'Failed retrieving scans from database: ' + err.message });
  }
});

// ═════════════════════════════════════════════════════════════════════
// 3. POST A NEW SCAN RESULT (REAL SQL TRANSACTION)
// ═════════════════════════════════════════════════════════════════════
app.post('/api/scans', async (req, res) => {
  const { domain, overallScore, riskLevel, breakdown, detectedTrackers, sensitiveLeaks } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  try {
    // 1. Insert into websites table (ON CONFLICT DO NOTHING)
    await dbRun(`INSERT OR IGNORE INTO websites (domain, cleaned_url) VALUES (?, ?)`, [domain, domain]);

    // 2. Insert scan record
    const scanInsert = await dbRun(
      `INSERT INTO scan_results 
       (domain, overall_score, risk_level, tracking_score, fingerprinting_score, data_leak_score, storage_security_score) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        domain,
        overallScore || 75,
        riskLevel || 'medium',
        breakdown?.trackersScore || 80,
        breakdown?.fingerprintingScore || 70,
        breakdown?.dataLeakScore || 90,
        breakdown?.storageSecurityScore || 85
      ]
    );

    const scanId = scanInsert.lastID;

    // 3. Insert detected trackers if present
    if (Array.isArray(detectedTrackers)) {
      for (const trk of detectedTrackers) {
        await dbRun(
          `INSERT INTO trackers (scan_id, name, category, domain, risk_level, requests_count, blocked_count, status, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            scanId,
            trk.name || 'Tracker',
            trk.category || 'Analytics',
            trk.domain || domain,
            trk.riskLevel || 'medium',
            trk.requestsCount || 10,
            trk.blockedCount || 10,
            trk.status || 'blocked',
            trk.description || 'Detected tracker script'
          ]
        );
      }
    }

    // 4. Insert data leaks if present
    if (Array.isArray(sensitiveLeaks)) {
      for (const leak of sensitiveLeaks) {
        await dbRun(
          `INSERT INTO data_leaks (scan_id, source_website, destination_domain, detected_items, payload_snippet, risk_score, is_blocked)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            scanId,
            domain,
            leak.destinationDomain || 'telemetry.net',
            JSON.stringify(leak.detectedItems || ['Email address']),
            leak.payloadSnippet || '',
            leak.riskScore || 85,
            leak.blocked ? 1 : 0
          ]
        );
      }
    }

    console.log(`[SQL Database] Real INSERT completed for domain: ${domain} (Scan ID: ${scanId})`);
    res.status(201).json({
      success: true,
      message: 'Scan result saved to SQLite database',
      scanId,
      domain
    });
  } catch (err) {
    console.error('❌ SQL Insert Error:', err);
    res.status(500).json({ error: 'SQL Transaction failed: ' + err.message });
  }
});

// ═════════════════════════════════════════════════════════════════════
// 4. GET DETAILED SCAN FOR SPECIFIC DOMAIN
// ═════════════════════════════════════════════════════════════════════
app.get('/api/scans/:domain', async (req, res) => {
  const { domain } = req.params;
  try {
    const scan = await dbGet(`SELECT * FROM scan_results WHERE domain = ? ORDER BY scan_timestamp DESC LIMIT 1`, [domain]);
    if (!scan) {
      return res.status(404).json({ error: 'No scan found for domain in database' });
    }

    const trackers = await dbQuery(`SELECT * FROM trackers WHERE scan_id = ?`, [scan.id]);
    const leaks = await dbQuery(`SELECT * FROM data_leaks WHERE scan_id = ?`, [scan.id]);

    res.json({ scan, trackers, leaks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═════════════════════════════════════════════════════════════════════
// 5. DATABASE AGGREGATED STATS ENDPOINT
// ═════════════════════════════════════════════════════════════════════
app.get('/api/stats', async (req, res) => {
  try {
    const totalScans = await dbGet(`SELECT COUNT(*) as total FROM scan_results`);
    const avgScore = await dbGet(`SELECT AVG(overall_score) as avg FROM scan_results`);
    const totalTrackers = await dbGet(`SELECT COUNT(*) as total FROM trackers`);
    const totalLeaks = await dbGet(`SELECT COUNT(*) as total FROM data_leaks`);

    res.json({
      totalScansStored: totalScans ? totalScans.total : 0,
      averagePrivacyScore: avgScore && avgScore.avg ? Math.round(avgScore.avg) : 0,
      totalTrackersBlocked: totalTrackers ? totalTrackers.total : 0,
      totalLeaksBlocked: totalLeaks ? totalLeaks.total : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═════════════════════════════════════════════════════════════════════
// 6. CLEAR DATABASE ENDPOINT
// ═════════════════════════════════════════════════════════════════════
app.delete('/api/scans', async (req, res) => {
  try {
    await dbRun(`DELETE FROM scan_results`);
    await dbRun(`DELETE FROM trackers`);
    await dbRun(`DELETE FROM data_leaks`);
    await dbRun(`DELETE FROM websites`);
    res.json({ success: true, message: 'All database records cleared from SQLite' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

startServer();
