
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "conf.db"));
db.pragma("foreing_keys=ON");
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

  stmt.run("Аудитория №1", "Аудитория", 100, );
  stmt.run("Аудитория №2", "Аудитория", 50, );
  stmt.run("Кинозал Октябрь", "Кинозал", 20,);
  console.log("Комнаты");
}

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE  NOT NULL,
    password TEXT NOT NULL,
    fio TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
    );
`);
const counts = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
if (counts === 0) {
  const stmt = db.prepare(`
            INSERT INTO users (login, password, fio, phone, email)
            VALUES(?,?,?,?,?)`);

  stmt.run("ivan", "demo", "Иванов Иван","8(888)888-88-88","ivan@gmail.com" );
  stmt.run("petr", "demo", "Петров Петр","8(885)888-55-88","petr@gmail.com");
  stmt.run("anna", "demo", "Анна Сидорова","8(875)788-55-88","anna@gmail.com");
  console.log("Тестовые пользователи добавлены");
}

db.exec(`
  CREATE TABLE IF NOT EXISTS requests(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  date_start TEXT NOT NULL,
  payment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Новая',
  reviev TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE RESTRICT)
  `)
const requestsCount= db.prepare("SELECT COUNT(*) AS c FROM requests").get().c;

if (requestsCount===0){
  const stmtRequest = db.prepare(`
    INSERT INTO requests(user_id, room_id, date_start, payment)
    VALUES (?,?,?,?)
  `);
   stmtRequest.run(1,1, "2027-03-15", "При очном посещение");
  stmtRequest.run(1,3, "2027-03-20", "Переводом по СБП" );
  stmtRequest.run(2,3, "2027-04-01", "При очном посещении" );
  console.log("Тестовые заявки добавлены");
    
}

class User {
  constructor(){
    this.table = "users";
  }
  findById(id){
    return db.prepare(`SELECT * FROM ${this.table} WHERE id = ?`).get(id);

  }
  findByLogin(login){
    return db.prepare(`SELECT * FROM ${this.table} WHERE login = ?`).get(login);
  }
  findAll(user){
  return db.prepare(`SELECT * FROM ${this.table} WHERE user`).all();
  }
  count() {
    return db.prepare(`SELECT COUNT(*) AS c FROM ${this.table}`).get().c;
  }
}

export { User} 
export default db;




