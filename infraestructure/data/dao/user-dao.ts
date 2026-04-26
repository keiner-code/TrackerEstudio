import { UserMapper } from "@/infraestructure/mapper/user-mapper";
import { User } from "@/interfaces";
import { sqliteDatabase } from "../bd/sqlite-database";

export class UserDao {
  private db = sqliteDatabase;

  async create(
    name: string,
    lastName: string,
    age: number,
    photo: string | null = null,
  ): Promise<number | false> {
    const statement = await this.db.prepareAsync(
      `INSERT INTO user (name, last_name, age, photo, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    );

    try {
      const result = await statement.executeAsync(
        name,
        lastName,
        age,
        photo,
        new Date().toISOString(),
        new Date().toISOString(),
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  delete() {}

  async getUser(): Promise<User | null> {
    try {
      const result = await this.db.getFirstAsync(`SELECT * FROM user`);

      return UserMapper.dbToJson(result);
    } catch (error) {
      console.error("Error getting projects:", error);
      return null;
    }
  }
}
