import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8000;
const DB_PATH = path.join(__dirname, 'privacy_gate_db.json');

// Initialize local database file if missing
if (!fs.existsSync(DB_PATH)) {
  const initialDb = {
    scans: [],
    savedAt: new Date().toISOString()
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
}

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { scans: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // API Route: GET /api/scans - Retrieve all user-entered domain scans
  if (req.method === 'GET' && url.pathname === '/api/scans') {
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.scans));
    return;
  }

  // API Route: POST /api/scans - Save a real user-entered domain scan result
  if (req.method === 'POST' && url.pathname === '/api/scans') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const scanResult = JSON.parse(body);
        if (!scanResult || !scanResult.domain) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing website domain' }));
          return;
        }

        const db = readDb();
        // Remove existing scan for same domain if re-scanned, then prepend latest scan
        db.scans = [scanResult, ...db.scans.filter(s => s.domain !== scanResult.domain)];
        db.lastUpdated = new Date().toISOString();
        writeDb(db);

        console.log(`[Database] Stored real user scan for: ${scanResult.domain} (Score: ${scanResult.overallScore})`);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: db.scans.length, scan: scanResult }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save scan to database' }));
      }
    });
    return;
  }

  // API Route: DELETE /api/scans - Clear scan database
  if (req.method === 'DELETE' && url.pathname === '/api/scans') {
    writeDb({ scans: [], lastUpdated: new Date().toISOString() });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Local database cleared' }));
    return;
  }

  // API Route: GET /api/stats - Aggregated database stats
  if (req.method === 'GET' && url.pathname === '/api/stats') {
    const db = readDb();
    const totalScans = db.scans.length;
    const avgScore = totalScans > 0 ? Math.round(db.scans.reduce((acc, s) => acc + (s.overallScore || 0), 0) / totalScans) : 0;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ totalScans, avgScore, domains: db.scans.map(s => s.domain) }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(8001, () => {
  console.log(`[Local DB Server] Running on http://localhost:8001`);
});
