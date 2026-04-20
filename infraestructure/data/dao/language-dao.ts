import { CreateLanguage, Language } from "../../../interfaces";
import { sqliteDatabase } from "../bd/sqlite-database";

export class LanguageDao {
  private db = sqliteDatabase;

  async create(language: CreateLanguage): Promise<number | false> {
    const statement = await this.db.prepareAsync(
      `INSERT INTO languages (name, project_size, icon, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
    );

    try {
      const result = await statement.executeAsync(
        language.name,
        language.project_size,
        language.icon,
        language.color,
        new Date().toISOString(),
        new Date().toISOString(),
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error creating project:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  update() {}

  delete() {}

  getById() {}

  async getAll(): Promise<Language[]> {
    try {
      const data: Language[] = [];
      const result = await this.db.getAllAsync("SELECT * FROM languages");

      result.forEach((item) => {
        data.push(item as Language);
      });
      return data;
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  }
}
