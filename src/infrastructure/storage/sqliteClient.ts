import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_NAME = 'ArquetipoApp.db';
let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });
  return dbInstance;
};

export const executeSql = async (sql: string, params: any[] = []) => {
  const db = await getDb();
  const [result] = await db.executeSql(sql, params);
  return result;
};
