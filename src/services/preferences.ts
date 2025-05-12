import { openDatabase } from 'react-native-sqlite-storage';
import { Preferences } from '../types';

const db = openDatabase({ name: 'studentManagement.db', location: 'default' });

export const initPreferences = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS preferences (key TEXT PRIMARY KEY, value TEXT)',
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const savePreference = async (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO preferences (key, value) VALUES (?, ?)',
        [key, value],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const getPreference = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT value FROM preferences WHERE key = ?',
        [key],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0).value : null),
        (_, error) => reject(error)
      );
    });
  });
};