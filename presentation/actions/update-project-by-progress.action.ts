import { ProjectDao } from "@/infraestructure/data/dao/project-dao";

export default async function updateProjectByProgressAction(
  id: number,
  progress: number,
): Promise<boolean> {
  const projectDao = new ProjectDao();
  try {
    const response = await projectDao.updateByProgress(id, progress);
    return response;
  } catch (error) {
    console.error("Error al actualizar el progreso del proyecto", error);
    return false;
  }
}
