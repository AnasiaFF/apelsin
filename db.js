

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "conf.db"));

db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT  NOT NULL,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
    );
`);
const count = db.prepare("SELECT COUNT(*) AS c FROM rooms").get().c;
if (count === 0) {
  const stmt = db.prepare(`
            INSERT INTO rooms (name, type, capacity)
            VALUES(?,?,?)`);

  stmt.run("Гостиная", "-", "-", );
  stmt.run("Кухня", "-", "-", );
  stmt.run("спальня", "-", "-",);
  console.log("Комнаты");
}

export default db;