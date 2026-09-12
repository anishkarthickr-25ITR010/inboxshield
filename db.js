import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'privacy_gate.db');

// Enable verbose SQLite logging
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Could not connect to SQLite database:', err.message);
  } else {
    console.log(`✅ Real SQLite Database connected at: ${DB_PATH}`);
  }
});

// Initialize database schema tables synchronously using db.serialize
export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Websites master table
      db.run(`
        CREATE TABLE IF NOT EXISTS websites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          domain TEXT UNIQUE NOT NULL,
          cleaned_url TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 2. Scan Results table
      db.run(`
        CREATE TABLE IF NOT EXISTS scan_results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          domain TEXT NOT NULL,
          overall_score INTEGER NOT NULL,
          risk_level TEXT NOT NULL,
          tracking_score INTEGER,
          fingerprinting_score INTEGER,
          data_leak_score INTEGER,
          storage_security_score INTEGER,
          scan_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 3. Trackers table
      db.run(`
        CREATE TABLE IF NOT EXISTS trackers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          scan_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          domain TEXT NOT NULL,
          risk_level TEXT NOT NULL,
          requests_count INTEGER DEFAULT 0,
          blocked_count INTEGER DEFAULT 0,
          status TEXT DEFAULT 'blocked',
          description TEXT,
          FOREIGN KEY(scan_id) REFERENCES scan_results(id) ON DELETE CASCADE
        )
      `);

      // 4. Data Leaks table
      db.run(`
        CREATE TABLE IF NOT EXISTS data_leaks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          scan_id INTEGER NOT NULL,
          source_website TEXT NOT NULL,
          destination_domain TEXT NOT NULL,
          detected_items TEXT NOT NULL,
          payload_snippet TEXT,
          risk_score INTEGER NOT NULL,
          is_blocked INTEGER DEFAULT 1,
          FOREIGN KEY(scan_id) REFERENCES scan_results(id) ON DELETE CASCADE
        )
      `);

      // 5. Network Request Logs table
      db.run(`
        CREATE TABLE IF NOT EXISTS network_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT,
          source_website TEXT NOT NULL,
          destination_domain TEXT NOT NULL,
          request_type TEXT,
          classification TEXT,
          category TEXT,
          action_taken TEXT,
          size_kb REAL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('❌ Failed initializing SQL tables:', err);
          reject(err);
        } else {
          console.log('✅ SQLite Schema initialized: websites, scan_results, trackers, data_leaks, network_logs');
          resolve();
        }
      });
    });
  });
}

// SQL Query Wrapper Helpers (Promises)
export const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export default db;
