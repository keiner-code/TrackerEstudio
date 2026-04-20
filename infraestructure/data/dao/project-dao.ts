import { ProjectMapper } from "@/infraestructure/mapper/project-mapper";
import { createProject, Project } from "../../../interfaces";
import { sqliteDatabase } from "../bd/sqlite-database";

export class ProjectDao {
  private db = sqliteDatabase;

  async create(project: createProject): Promise<number | false> {
    const statement = await this.db.prepareAsync(
      `INSERT INTO projects (title, language_id, description, study_day, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    );

    try {
      const result = await statement.executeAsync(
        project.title,
        project.language_id,
        project.description,
        project.study_day,
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

  async updateByProgress(id: number, progress: number): Promise<boolean> {
    const statement = await this.db.prepareAsync(
      `UPDATE projects SET progress = ?, updated_at = ? WHERE id = ?`,
    );
    try {
      await statement.executeAsync(progress, new Date().toISOString(), id);
      return true;
    } catch (error) {
      console.error("Error updating project progress:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async updateHoursForDay(id: number, hours_for_day: number): Promise<boolean> {
    const statement = await this.db.prepareAsync(
      `UPDATE projects SET hours_per_day = ?, updated_at = ? WHERE id = ?`,
    );
    try {
      console.log(hours_for_day);

      await statement.executeAsync(hours_for_day, new Date().toISOString(), id);
      return true;
    } catch (error) {
      console.error("Error updating project hours_for_day:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async updateByTotalHours(id: number, total_hours: number): Promise<boolean> {
    const statement = await this.db.prepareAsync(
      `UPDATE projects SET total_hours = ?, updated_at = ? WHERE id = ?`,
    );
    try {
      await statement.executeAsync(total_hours, new Date().toISOString(), id);
      return true;
    } catch (error) {
      console.error("Error updating project total_hours:", error);
      return false;
    } finally {
      await statement.finalizeAsync();
    }
  }

  delete() {}

  async getAllProjectByDayOfWeek(study_day: string): Promise<Project[]> {
    const statement = await this.db.prepareAsync(
      `SELECT 
      l.name, l.icon, l.color, 
      p.title, p.description,
      p.progress, p.updated_at,
      p.hours_per_day, p.total_hours,
      p.id FROM projects AS p 
      INNER JOIN languages AS l 
      WHERE l.id = p.language_id AND p.study_day = ?`,
    );
    const projets: Project[] = [];
    try {
      const result = await statement.executeAsync(study_day);

      const data = await result.getAllAsync();

      for (const item of data) {
        projets.push(ProjectMapper.dbToJson(item));
      }

      return projets;
    } catch (error) {
      console.error("Error getting projects by day of week:", error);
      return [];
    } finally {
      await statement.finalizeAsync();
    }
  }

  async getAll(): Promise<Project[]> {
    try {
      const data: Project[] = [];
      const result = await this.db.getAllAsync(
        `SELECT 
          p.*, 
          l.*,
          COALESCE(
            (
              SELECT json_group_array(
                json_object(
                  'id', pc.id,
                  'content', pc.content,
                  'created_at', pc.created_at,
                  'updated_at', pc.updated_at,
                  'project_id', pc.project_id
                )
              )
              FROM project_comments pc
              WHERE pc.project_id = p.id
            ),
            '[]'
          ) AS comments
        FROM projects AS p 
        INNER JOIN languages AS l ON p.language_id = l.id`,
      );

      result.forEach((item: any) => {
        if (typeof item.comments === "string") {
          try {
            item.comments = JSON.parse(item.comments);
          } catch (e) {
            console.log(e);
            item.comments = [];
          }
        }
        data.push(ProjectMapper.dbToJson(item));
      });

      return data;
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  }
}
