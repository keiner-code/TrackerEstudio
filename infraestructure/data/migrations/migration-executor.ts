import { sqliteDatabase } from "../bd/sqlite-database";

interface Migration {
  version: string;
  name: string;
  up: () => Promise<void> | void;
}

const migrations: Migration[] = [
  {
    version: "001",
    name: "create_initial_tables",
    up: async () => {
      await sqliteDatabase.execSync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS languages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          project_size INTEGER NOT NULL,
          icon TEXT NOT NULL,
          color TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'ACTIVE',
          created_at TEXT DEFAULT (datetime('now', 'localtime')),
          updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );

        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT NOT NULL, 
          language_id INTEGER,
          progress INTEGER DEFAULT 0,
          hours_per_day INTEGER DEFAULT 0,
          description TEXT,
          status TEXT DEFAULT 'ACTIVE',
          created_at TEXT DEFAULT (datetime('now', 'localtime')),
          updated_at TEXT DEFAULT (datetime('now', 'localtime')),
          FOREIGN KEY (language_id) REFERENCES languages (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS project_comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT DEFAULT (datetime('now', 'localtime')),
          updated_at TEXT DEFAULT (datetime('now', 'localtime')),
          FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
        );
      `);
    },
  },

  {
    version: "002",
    name: "add_new_field_study_day",
    up: async () => {
      await sqliteDatabase.execSync(
        `ALTER TABLE projects ADD COLUMN study_day TEXT;`,
      );
    },
  },

  {
    version: "003",
    name: "add_new_field_total_hours",
    up: async () => {
      await sqliteDatabase.execAsync(
        `ALTER TABLE projects ADD COLUMN total_hours INTEGER DEFAULT 0;`,
      );
    },
  },

  {
    version: "004",
    name: "create_table_user",
    up: async () => {
      await sqliteDatabase.execAsync(
        `CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          age INTEGER NOT NULL,
          created_at TEXT DEFAULT (datetime('now', 'localtime')),
          updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        );`,
      );
    },
  },
  {
    version: "005",
    name: "add_photo_to_user",
    up: async () => {
      await sqliteDatabase.execAsync(
        `ALTER TABLE user ADD COLUMN photo TEXT;`,
      );
    },
  },
];

export const runMigrations = async () => {
  try {
    // Crear tabla de control de migraciones
    await sqliteDatabase.execSync(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        executed_at TEXT DEFAULT (datetime('now', 'localtime'))
      );
    `);

    // Ejecutar migraciones pendientes
    for (const migration of migrations) {
      const exists = await sqliteDatabase.getFirstAsync(
        "SELECT version FROM _migrations WHERE version = ?",
        [migration.version],
      );

      if (!exists) {
        await migration.up();
        await sqliteDatabase.runAsync(
          `INSERT INTO _migrations (version, name) VALUES (?, ?)`,
          [migration.version, migration.name],
        );
        console.log(`✓ Migración ${migration.version}: ${migration.name}`);
      }
    }

    console.log("✓ Todas las migraciones han sido ejecutadas");
  } catch (error) {
    console.error("❌ Error en migraciones:", error);
  }
};
