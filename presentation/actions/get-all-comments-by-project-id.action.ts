import { CommentDao } from "@/infraestructure/data/dao/comment.dao";
import { ProjectComment } from "@/interfaces";

export async function getAllCommentsByProjectIdAction(
  project_id: number | undefined,
): Promise<ProjectComment[]> {
  const commentsDao = new CommentDao();
  try {
    if (!project_id) return [];
    const response = await commentsDao.getAllByProjectId(project_id);
    return response;
  } catch (error) {
    console.error("Error al obtener los comentarios", error);
    return [];
  }
}
