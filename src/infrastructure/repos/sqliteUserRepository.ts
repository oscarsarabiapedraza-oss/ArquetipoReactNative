import { IUserRepository } from '../../domain/repos/userRepository';
import { User } from '../../domain/entities/user';
import { getDb } from '../storage/sqliteClient';

export class SQLiteUserRepository implements IUserRepository {
  async init() {
    const db = await getDb();
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE,
         password TEXT,
         fullName TEXT
       );`
    );
  }

  async saveUser(user: User): Promise<number> {
    const db = await getDb();
    await db.executeSql('INSERT INTO users (username, password, fullName) VALUES (?, ?, ?);', [user.username, user.password, user.fullName || null]);
    const r = await db.executeSql('SELECT last_insert_rowid() as id;');
    const id = (r[0].rows.item(0) as any).id;
    return id;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const db = await getDb();
    const res = await db.executeSql('SELECT * FROM users WHERE username = ? LIMIT 1;', [username]);
    const rows = res[0].rows;
    if (rows.length === 0) return null;
    const r = rows.item(0);
    return { id: r.id, username: r.username, password: r.password, fullName: r.fullName };
  }
}
