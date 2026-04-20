import * as SQLite from "expo-sqlite";

const DATABASE_NAME = process.env.EXPO_PUBLIC_DATABASE_NAME;

export const sqliteDatabase = SQLite.openDatabaseSync(DATABASE_NAME!);
