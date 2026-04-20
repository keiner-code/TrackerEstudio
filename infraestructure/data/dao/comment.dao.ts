import { CommentsMapper } from "@/infraestructure/mapper/comments_mapper";
import { CreateComment, ProjectComment } from "../../../interfaces";
import { sqliteDatabase } from "../bd/sqlite-database";

export class CommentDao {
  private db = sqliteDatabase;

  async create(comment: CreateComment): Promise<number | false> {
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

  update() {}

  delete() {}

  getById() {}

  async getAllByProjectId(project_id: number): Promise<ProjectComment[]> {
    try {
      const data: ProjectComment[] = [];
      const result = await this.db.getAllAsync(
        `SELECT * FROM project_comments WHERE project_id = ?`,
        [project_id],
      );

      result.forEach((item) => {
        data.push(CommentsMapper.dbToJson(item));
      });

      return data;
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  }
}
