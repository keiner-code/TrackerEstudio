import { CommentDao } from "@/infraestructure/data/dao/comment.dao";
import { CreateComment } from "@/interfaces";

export default async function CreateCommentAction(comment: CreateComment) {
  const commentDao = new CommentDao();
  try {
    const result = await commentDao.create(comment);

    if (result) {
      return {
        ok: true,
        id: result,
        message: "Comentario creado exitosamente.",
      };
    }
    return {
      ok: false,
      message: "Error en la base de datos al crear el comentario.",
    };
  } catch (error) {
    console.error("Error en createCommentAction:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado.",
    };
  }
}
