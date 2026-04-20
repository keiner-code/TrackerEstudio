import { ProjectComment } from "../../../interfaces";
import { sqliteDatabase } from "../bd/sqlite-database";

export interface CreateProjectComment {
  project_id: number;
  content: string;
}

export class ProjectCommentsDao {
  private db = sqliteDatabase;

  async create(comment: CreateProjectComment): Promise<number | false> {
    const statement = await this.db.prepareAsync(
      `INSERT INTO project_comments (project_id, content, created_at, updated_at) 
      VALUES (?, ?, ?, ?)`,
    );

    try {
      const result = await statement.executeAsync(
        comment.project_id,
        comment.content,
        new Date().toISOString(),
        new Date().toISOString(),
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error creating comment:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async getByProjectId(projectId: number): Promise<ProjectComment[]> {
    try {
      const data: ProjectComment[] = [];
      const result = await this.db.getAllAsync(
        "SELECT * FROM project_comments WHERE project_id = ? ORDER BY created_at DESC",
        [projectId],
      );

      result.forEach((item) => {
        data.push(item as ProjectComment);
      });
      return data;
    } catch (error) {
      console.error("Error getting comments:", error);
      return [];
    }
  }

  async update(id: number, content: string): Promise<boolean> {
    const statement = await this.db.prepareAsync(
      `UPDATE project_comments SET content = ?, updated_at = ? WHERE id = ?`,
    );

    try {
      await statement.executeAsync(content, new Date().toISOString(), id);
      return true;
    } catch (error) {
      console.error("Error updating comment:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async delete(id: number): Promise<boolean> {
    const statement = await this.db.prepareAsync(
      `DELETE FROM project_comments WHERE id = ?`,
    );

    try {
      await statement.executeAsync(id);
      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }
}
