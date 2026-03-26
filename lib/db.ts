import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { DashboardPayload } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const DB_PATH = path.join(DATA_DIR, 'dashboard.db')
const db = new Database(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS dashboard_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    sync_timestamp TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS sync_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    sync_time TEXT NOT NULL,
    status TEXT NOT NULL,
    records_count INTEGER DEFAULT 0,
    error_message TEXT DEFAULT NULL
  )
`)

export function getLatestSnapshot(company: string): DashboardPayload | null {
  const row = db.prepare(
    'SELECT payload FROM dashboard_snapshots WHERE company = ? ORDER BY id DESC LIMIT 1'
  ).get(company) as { payload: string } | undefined

  if (!row) return null
  return JSON.parse(row.payload) as DashboardPayload
}

export function saveSnapshot(company: string, payload: DashboardPayload): void {
  db.prepare(
    'INSERT INTO dashboard_snapshots (company, sync_timestamp, payload) VALUES (?, ?, ?)'
  ).run(company, payload.sync_timestamp, JSON.stringify(payload))
}

export function logSync(company: string, status: string, count: number, error?: string): void {
  db.prepare(
    'INSERT INTO sync_log (company, sync_time, status, records_count, error_message) VALUES (?, datetime(\'now\'), ?, ?, ?)'
  ).run(company, status, count, error || null)
}

export default db
