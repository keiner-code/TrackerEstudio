import { ProjectDao } from "@/infraestructure/data/dao/project-dao";

export default async function deleteProjectAction(
  id: number,
): Promise<boolean> {
  const projectDao = new ProjectDao();
  try {
    return await projectDao.delete(id);
  } catch (error) {
    console.error("Error al Eliminar el proyecto", error);
    return false;
  }
}
